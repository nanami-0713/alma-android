// alma-lan-direct.js — 手机 E2E 隧道「局域网直连优先」
//
// 为什么：relay.alma.now 从家里网络时好时坏（实测 TCP 5.4s / TLS 13s / 超时），
// 手机主隧道（聊天/API/herdr/远程屏幕的 jpeg 通道）全走它 → 中继一卡全局卡。
// Mac 端 Alma 在 0.0.0.0:<port> 监听 /__alma_e2e__（实测 23019，全网卡，
// 只认该裸路径），协议与中继路径完全同构（E2ESession + connectCode）。
// 桌面版 herdr-remote 早有同款「直连优先 + 回落中继」；这里是手机侧实现。
//
// 机制（必须在 connected chunk 捕获 window.WebSocket 之前装好，故注入在
// 所有 chunk 之前的普通脚本）：
//   ① 包装 window.WebSocket：只拦截 E2E 客户端到中继的拨号
//      （wss://<relay>/c/<rt>/__alma_e2e__），其余一律原样透传
//   ② 有新鲜直连缓存 → 先拨 ws://<host>:<port>/__alma_e2e__（串行，
//      失败立即回落原中继 URL，复用同一 routing token）
//   ③ 无缓存 → 直接走中继；隧道就绪后后台「发现」：
//      herdr 主机名 .local 解析 → /24 网段探扫（RTCPeerConnection 拿本机
//      私网 IP；对每地址发假 hi，1.2s 内回 {"t":"hi"} 即命中）→ 缓存
//   ④ E2E 加密在应用层（PAKE+AES-GCM），直连走 ws:// 明文与桌面直连一致
//
// 调试：localStorage['alma.android.lan.mode']='off' 整体停用；
// 'alma.android.lan.direct' = {"host":"192.168.x.x","port":23019} 手工指定。
(function () {
  "use strict";
  if (typeof window === "undefined") return;
  var isSubframe = false;
  try { isSubframe = window.parent && window.parent !== window; } catch (e) {}
  if (isSubframe) return;

  var RealWS = window.WebSocket;
  if (!RealWS || window.__ALMA_LAN_DIRECT__) return;
  window.__ALMA_LAN_DIRECT__ = true;

  var MODE_KEY = "alma.android.lan.mode";      // "off" = 停用
  var CACHE_KEY = "alma.android.lan.direct";   // {host, port, at}
  var NAME_KEY = "alma.android.lan.hostName";  // herdr 主机名（.local 用）
  var FAIL_KEY = "alma.android.lan.fails";     // 直连连续 open 失败计数
  var FRESH_MS = 12 * 60 * 60 * 1000;          // 缓存 12h 内视为新鲜
  var DIRECT_PORT = 23019;                     // Mac 直连监听口（0.4.378/392 实测）
  var DIRECT_OPEN_MS = 2500;                   // 直连拨号上限（LAN 通则 <50ms）
  var lastDiscoverAt = 0;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function disabled() { return lsGet(MODE_KEY) === "off"; }
  function failCount() { return parseInt(lsGet(FAIL_KEY) || "0", 10) || 0; }
  function bumpFail() {
    var n = failCount() + 1;
    lsSet(FAIL_KEY, String(n));
    // 连续 2 次「连接都建立不了」（网络不通 / ROM 拦 ws://）：作废缓存并
    // 冷却 1h——否则每次连接都先在必败的直连上白等再回落，中继再一慢
    // 就是「已连接但数据出不来」（v0.4.378-29 实机）
    if (n >= 2) {
      lsSet(CACHE_KEY, "");
      lsSet(FAIL_KEY, "0");
      lsSet(CACHE_KEY + ".cooldown", String(Date.now()));
      lastResult = { at: Date.now(), giveUp: true, reason: "direct dial failed x" + n };
    }
  }
  function clearFails() { lsSet(FAIL_KEY, "0"); }
  function inCooldown() {
    var t = parseInt(lsGet(CACHE_KEY + ".cooldown") || "0", 10) || 0;
    return t && Date.now() - t < 60 * 60 * 1000;
  }
  function cached() {
    if (inCooldown()) return null;
    try {
      var c = JSON.parse(lsGet(CACHE_KEY) || "null");
      if (c && typeof c.host === "string" && c.port > 0 && Date.now() - (c.at || 0) < FRESH_MS) return c;
    } catch (e) {}
    return null;
  }
  function saveCache(host, port) {
    lsSet(CACHE_KEY, JSON.stringify({ host: host, port: port, at: Date.now() }));
    lsSet(CACHE_KEY + ".cooldown", "0");
  }

  // ── WebSocket 门面：对客户端呈现一个标准 WebSocket ─────────────────
  // RelayE2EClient 只用：binaryType / onopen / onmessage / onclose / onerror /
  // send() / close()（readyState 只经事件感知）。门面在直连失败时无缝换中继。
  // 注意不继承 RealWS.prototype：其 readyState 是无 setter 的访问器，
  // 严格模式下赋值会抛 TypeError；这里全部用自有属性。
  function LanDirectSocket(relayUrl) {
    var self = this;
    this.binaryType = "blob";
    this.readyState = 0;              // CONNECTING
    this.onopen = null; this.onmessage = null; this.onclose = null; this.onerror = null;
    var inner = null, adopted = false, closedByUser = false;

    function emit(ev, arg) {
      var h = self["on" + ev];
      if (typeof h === "function") {
        try { h(arg || { type: ev }); } catch (e) {}
      }
    }
    function adopt(ws) {
      if (adopted || closedByUser) { try { ws.close(); } catch (e) {} return; }
      adopted = true;
      inner = ws;
      ws.binaryType = self.binaryType;
      ws.onopen = function (e) { self.readyState = 1; emit("open", e); scheduleDiscover(); };
      ws.onmessage = function (e) { emit("message", e); };
      ws.onclose = function (e) { self.readyState = 3; emit("close", e); scheduleDiscover(); };
      ws.onerror = function (e) { emit("error", e); };
      if (ws.readyState >= 1) { self.readyState = ws.readyState; emit("open", {}); scheduleDiscover(); }
    }    this.send = function (d) {
      if (inner && inner.readyState === 1) inner.send(d);
    };
    this.close = function (code, reason) {
      closedByUser = true;
      self.readyState = 3;
      emit("close", { type: "close", code: code || 1000, reason: reason || "" });
      if (inner) { try { inner.close(code, reason); } catch (e) {} }
    };

    var c = disabled() ? null : cached();
    if (c) {
      // 直连优先：失败/超时立即回落中继（routing token 是 code 的确定派生，可复用）
      var dw;
      try { dw = new RealWS("ws://" + c.host + ":" + c.port + "/__alma_e2e__"); }
      catch (e) { dw = null; }
      if (!dw) { bumpFail(); adopt(new RealWS(relayUrl)); notifyRoute("relay"); return; }
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        try { dw.onopen = dw.onmessage = dw.onclose = dw.onerror = null; dw.close(); } catch (e) {}
        bumpFail();
        adopt(new RealWS(relayUrl)); notifyRoute("relay");
      }, DIRECT_OPEN_MS);
      dw.onopen = function () {
        if (settled) return;
        settled = true; clearTimeout(timer);
        clearFails();
        adopt(dw);
        notifyRoute("direct");
      };
      dw.onerror = function () {
        if (settled) return;
        settled = true; clearTimeout(timer);
        try { dw.close(); } catch (e) {}
        bumpFail();
        adopt(new RealWS(relayUrl)); notifyRoute("relay");
      };
      dw.onclose = function () {
        if (settled) return;
        settled = true; clearTimeout(timer);
        bumpFail();
        adopt(new RealWS(relayUrl)); notifyRoute("relay");
      };
      dw.onmessage = null;
    } else {
      adopt(new RealWS(relayUrl)); notifyRoute("relay");
    }
  }

  // ── 路径可见化：直连生效弹一次性 toast；路由记录进调试钩子 ────────
  var lastRoute = null;
  var routeNotified = false;
  function notifyRoute(kind) {
    lastRoute = { kind: kind, at: Date.now() };
    if (kind !== "direct" || routeNotified) return;
    routeNotified = true;
    try {
      var lang = "";
      try { lang = (localStorage.getItem("i18nextLng") || "").toLowerCase(); } catch (e) {}
      var text = lang.indexOf("zh") === 0 ? "已通过局域网直连你的 Mac"
        : lang.indexOf("ja") === 0 ? "LAN 経由で直接接続しました"
        : "Connected to your Mac over LAN";
      var el = document.createElement("div");
      el.id = "alma-lan-toast";
      el.textContent = text;
      el.style.cssText = "position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);" +
        "transform:translateX(-50%);z-index:2147482200;background:rgba(28,30,35,.94);color:#e8eaed;" +
        "font-size:13px;padding:9px 16px;border-radius:9999px;box-shadow:0 4px 16px rgba(0,0,0,.4);" +
        "pointer-events:none;transition:opacity .4s;";
      (document.body || document.documentElement).appendChild(el);
      setTimeout(function () { el.style.opacity = "0"; }, 2600);
      setTimeout(function () { el.remove(); }, 3100);
    } catch (e) {}
  }

  window.WebSocket = function LanDirectWebSocket(url, protocols) {
    var u = String(url || "");
    // 只拦截手机 E2E 客户端的中继拨号；其余（sentinel 桥接、远程屏幕、
    // 上传检查等）原样透传，包括 protocols 分支
    if (!disabled() && /^wss?:\/\/[^\/]+\/c\/[^\/]+\/__alma_e2e__/.test(u)) {
      return new LanDirectSocket(u);
    }
    return protocols === undefined ? new RealWS(url) : new RealWS(url, protocols);
  };
  window.WebSocket.prototype = RealWS.prototype;
  window.WebSocket.CONNECTING = RealWS.CONNECTING;
  window.WebSocket.OPEN = RealWS.OPEN;
  window.WebSocket.CLOSING = RealWS.CLOSING;
  window.WebSocket.CLOSED = RealWS.CLOSED;

  // ── 后台发现：隧道就绪后补课，缓存给下一次拨号 ─────────────────────
  function scheduleDiscover() {
    if (disabled() || cached()) return;
    var now = Date.now();
    if (now - lastDiscoverAt < 10 * 60 * 1000) return;
    lastDiscoverAt = now;
    setTimeout(discover, 1500);       // 让应用先跑起来，别抢启动带宽
  }

  // 探针：拨 ws://host:port/__alma_e2e__，发一个假 hi，对端是 Alma 桌面
  // 就会回 {"t":"hi",...}（responder 对任何格式合法的 hi 都会回应）。
  // 不做 auth（拿不到 E2ESession），命中即认为候选可用 —— 网段里另一台
  // 跑 Alma 的 Mac 才会误命中，家里单 Mac 场景可忽略。
  function probe(host, port, timeoutMs) {
    return new Promise(function (resolve) {
      var ws, done = false;
      var finish = function (ok) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { ws.onopen = ws.onmessage = ws.onclose = ws.onerror = null; ws.close(); } catch (e) {}
        resolve(ok ? host : null);
      };
      var timer = setTimeout(function () { finish(false); }, timeoutMs || 1400);
      try { ws = new RealWS("ws://" + host + ":" + port + "/__alma_e2e__"); }
      catch (e) { clearTimeout(timer); resolve(null); return; }
      ws.onopen = function () {
        // 假 hi：真 P-256 密钥对（协议用 ECDH P-256 裸公钥，65B；随机 32B
        // 不是合法点，responder importKey 即抛、秒断连——实测）。n 随机 16B。
        // 我们不校验回执，收到 hi 即认定命中。
        var nb = new Uint8Array(16);
        crypto.getRandomValues(nb);
        var b64u = function (u8) {
          var s = "";
          for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
          return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        };
        var nStr = b64u(nb);
        crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"])
          .then(function (kp) { return crypto.subtle.exportKey("raw", kp.publicKey); })
          .then(function (raw) {
            ws.send(JSON.stringify({ t: "hi", epk: b64u(new Uint8Array(raw)), n: nStr }));
          })
          .catch(function () { finish(false); });
      };
      ws.onmessage = function (ev) {
        var s = typeof ev.data === "string" ? ev.data : "";
        if (s.indexOf('"t":"hi"') > -1 || s.indexOf('"t"') > -1 && s.indexOf('"epk"') > -1) finish(true);
      };
      ws.onerror = function () { finish(false); };
      ws.onclose = function () { finish(false); };
    });
  }

  function phonePrivateIPs() {
    return new Promise(function (resolve) {
      // 注意：Chromium 默认用 mDNS 混淆 host 候选（xxx.local），srflx 的
      // raddr 也被清零 —— WebView 里通常拿不到本机私网 IP（实测）。此路径
      // 只对未混淆的 WebView 生效；拿不到时靠 gatewaySubnets() 找网段。
      // 蜂窝网下 10.x 是运营商 NAT，扫它只有噪声 —— 能识别就跳过
      try {
        var conn = navigator.connection || {};
        if (conn.type === "cellular") return resolve([]);
      } catch (e) {}
      var out = [];
      var pc = null;
      try {
        pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel("lan");
        pc.onicecandidate = function (e) {
          if (!e.candidate) { pc.close(); resolve(out); return; }
          var c = e.candidate.candidate || "";
          var parts = c.split(" ");
          if (parts.length > 4 && parts[7] === "host") {
            var ip = parts[4];
            if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip) && out.indexOf(ip) < 0) out.push(ip);
          }
        };
        pc.createOffer().then(function (o) { return pc.setLocalDescription(o); }).catch(function () {});
        setTimeout(function () { try { pc.close(); } catch (e) {} resolve(out); }, 1200);
      } catch (e) { resolve(out); }
    });
  }

  // 网关探测：RTC 拿不到本机 IP 时的网段发现。家用路由器 100% 开着管理页，
  // no-cors fetch 对「存在的主机」会 resolve（opaque），对不存在网段里的
  // 地址是 network error —— 探测候选网段的 .1 即可确定手机所在网段。
  var COMMON_SUBNETS = ["192.168.1", "192.168.0", "192.168.2", "192.168.3", "192.168.4",
    "192.168.5", "192.168.8", "192.168.10", "192.168.16", "192.168.20", "192.168.31",
    "192.168.50", "192.168.56", "192.168.100", "192.168.101", "192.168.102", "192.168.123",
    "192.168.177", "192.168.178", "192.168.192", "10.0.0", "10.0.1", "172.16.0"];
  function hostAlive(url) {
    return new Promise(function (resolve) {
      var ac = (window.AbortController ? new AbortController() : null);
      var t = setTimeout(function () { if (ac) ac.abort(); resolve(false); }, 1100);
      fetch(url, { mode: "no-cors", signal: ac ? ac.signal : undefined, cache: "no-store" })
        .then(function () { clearTimeout(t); resolve(true); },
              function () { clearTimeout(t); resolve(false); });
    });
  }
  function gatewaySubnets() {
    return new Promise(function (resolve) {
      var alive = [];
      var pend = COMMON_SUBNETS.length;
      COMMON_SUBNETS.forEach(function (base) {
        hostAlive("http://" + base + ".1/").then(function (ok) {
          if (ok) alive.push(base);
          if (--pend === 0) resolve(alive);
        });
      });
      setTimeout(function () { resolve(alive); }, 2500);   // 兜底返回
    });
  }

  async function discover() {
    if (disabled() || cached()) return;
    var port = DIRECT_PORT;
    var cands = [];
    var sources = [];
    // ① herdr 主机名（上次会话缓存）→ <name>.local（mDNS）
    var name = lsGet(NAME_KEY);
    if (name) { cands.push(name.replace(/\.local$/, "") + ".local"); sources.push("mdns"); }
    // ② 本机私网 IP（RTC 未混淆时才有）→ /24 邻居
    var ips = await phonePrivateIPs();
    var subnets = [];
    for (var i = 0; i < ips.length && i < 2; i++) subnets.push(ips[i].replace(/\.\d+$/, ""));
    // ③ 网关探测找网段（RTC 混淆时的主路径）
    if (subnets.length === 0) {
      var gw = await gatewaySubnets();
      for (var g = 0; g < gw.length && g < 2; g++) subnets.push(gw[g]);
    }
    for (var s2 = 0; s2 < subnets.length; s2++) {
      for (var h = 1; h <= 254; h++) cands.push(subnets[s2] + "." + h);
    }
    // 串批：.local 先试（一次），网段分批并发
    var hit = null;
    if (cands.length && cands[0].endsWith(".local")) {
      hit = await probe(cands.shift(), port, 1500);
    }
    var BATCH = 48;
    for (var s = 0; !hit && s < cands.length; s += BATCH) {
      var batch = cands.slice(s, s + BATCH);
      var results = await Promise.all(batch.map(function (h) { return probe(h, port, 1400); }));
      for (var r = 0; r < results.length; r++) {
        if (results[r]) { hit = results[r]; break; }
      }
    }
    lastResult = { at: Date.now(), subnets: subnets, hit: hit, port: port };
    if (hit) saveCache(hit, port);
  }
  var lastResult = null;

  // 隧道就绪后顺手刷新 herdr 主机名（供 .local 候选）：拿到即停，
  // 每 5 分钟最多试一次，不与正常流量抢带宽
  (function pollName() {
    setTimeout(function () {
      if (lsGet(NAME_KEY) || disabled()) return;   // 已知即不再轮询
      var api = window.apiServer;
      if (!api || !api.getInfo) { pollName(); return; }
      api.getInfo().then(function (info) {
        var b = info && info.baseURL;
        var ok = false;
        try { ok = !!b && new URL(b).host === "alma-e2e.local"; } catch (e) {}
        if (!ok) return;
        fetch(b + "/api/herdr/info", { cache: "no-store" }).then(function (r) {
          return r.ok ? r.json() : null;
        }).then(function (j) {
          var n = j && j.herdr && j.herdr.core && j.herdr.core.name;
          if (n) lsSet(NAME_KEY, String(n));
        }).catch(function () {});
      }).catch(function () {});
      pollName();
    }, 8000);
  })();

  // 启动期兜底发现：中继彻底不可达时（正是最需要直连的时刻），隧道永远
  // 起不来 → scheduleDiscover 永不触发 → 缓存永远空着（鸡生蛋）。这里在
  // 启动 12s 后若仍无缓存，直接做一轮网段发现（手机在 Mac 同网段即可命中；
  // 蜂窝网下 phonePrivateIPs/连接类型闸会让它安静空转）。
  setTimeout(function () {
    if (!disabled() && !cached()) discover();
  }, 12000);

  // 现场排查钩子：手动触发发现 / 看缓存、路由与最近一轮发现结果
  window.__almaLanDirect = {
    discover: function () { lastDiscoverAt = 0; if (disabled()) return "off"; discover(); return "running"; },
    cache: function () { try { return JSON.parse(lsGet(CACHE_KEY) || "null"); } catch (e) { return null; } },
    route: function () { return lastRoute; },
    lastResult: function () { return lastResult; },
    clear: function () { lsSet(CACHE_KEY, ""); lsSet(CACHE_KEY + ".cooldown", "0"); lsSet(FAIL_KEY, "0"); return "cleared"; }
  };
})();
