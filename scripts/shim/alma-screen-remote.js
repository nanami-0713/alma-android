// alma-screen-remote.js — 远程看 + 触控 Mac（iOS「Computer」同款能力的 Android 实现）
//
// 协议（与 Alma 桌面 0.4.378 本地 API 的 /ws/screen 一致，经 E2E 中继隧道透传）：
//   连接：wss://alma-e2e.local/ws/screen（sentinel host 被 connected chunk 的
//         PatchedWebSocket 拦截 → E2E wopen → Mac proxyWsOpen → 本地 /ws/screen）
//   下行：status{bound,displayId,width,height,scale,mode} / viewport{width,height}
//         frame{data(base64 jpeg),width,height,seq} / error{message}
//         clipboard{text}（Mac 剪贴板变化推送）/ rtc_offer|rtc_ice|rtc|rtc_stats
//   上行：pointer{action:move|down|up|click|double|right|middle, x,y∈[0,1], button}
//         scroll{x,y,dx,dy}（display 像素增量）/ text{text} / key{key}
//         （key 格式：esc/tab/up/down/left/right/enter/…，修饰键 cmd+ ctrl+ opt+ shift+）
//         clipboard{text,paste} / rtc_start{relayOnly} / rtc_answer{sdp}
//         / rtc_ice{candidate} / rtc_stop
//   帧通道双模：jpeg（服务端 ~8fps 基础流，任何环境可用）+ WebRTC H.264（rtc_start
//   后服务端转 video 模式；失败自动回落 jpeg，服务端 W() 同款回落）。
//
// 本文件只在主帧 index.html 注入；子帧（settings/connected 等）直接退出。
// 只在 E2E 远程模式（配对了 Mac）激活；本机模式不露入口。
(function () {
  "use strict";

  // ── 环境闸 ──────────────────────────────────────────────────────────
  if (typeof window === "undefined") return;
  var isSubframe = false;
  try { isSubframe = window.parent && window.parent !== window; } catch (e) {}
  if (isSubframe) return;
  // 只在主应用入口运行（connected/settings/share 等独立页面不跑）
  var page = "";
  try { page = location.pathname.split("/").pop() || ""; } catch (e) {}
  if (page && !/^index\.html?$/i.test(page)) return;

  var SENTINEL_HOST = "alma-e2e.local";
  // 调试：localStorage['alma.android.screen.base']='ws://127.0.0.1:23001'
  // 可直连本地 API（绕过 E2E，仅排查协议用；不影响正常判定）
  var DEBUG_BASE = null;
  try { DEBUG_BASE = localStorage.getItem("alma.android.screen.base") || null; } catch (e) {}

  // ── i18n（跟随 renderer 语言：zh/en/ja） ────────────────────────────
  var STR = {
    zh: { title: "电脑", done: "完成", viewOnly: "仅查看", conn: "连接中…",
          inputPh: "在电脑上输入", paste: "粘贴", fit: "适合", native: "1:1",
          offline: "已断开，重连中…", noPerm: "Mac 未授权屏幕录制/辅助功能，仅可观看",
          screen: "远程屏幕", open: "查看这台 Mac 的屏幕并触控" },
    en: { title: "Computer", done: "Done", viewOnly: "View only", conn: "Connecting…",
          inputPh: "Type on the computer", paste: "Paste", fit: "Fit", native: "1:1",
          offline: "Disconnected, reconnecting…", noPerm: "Grant Screen Recording / Accessibility on the Mac to control it",
          screen: "Remote Screen", open: "View and control this Mac's screen" },
    ja: { title: "コンピュータ", done: "完了", viewOnly: "閲覧のみ", conn: "接続中…",
          inputPh: "コンピュータに入力", paste: "ペースト", fit: "フィット", native: "1:1",
          offline: "切断されました。再接続中…", noPerm: "Mac の画面収録/補助機能の許可が必要です",
          screen: "リモート画面", open: "この Mac の画面を見て操作" }
  };
  function lang() {
    var v = "";
    try { v = (localStorage.getItem("i18nextLng") || "").toLowerCase(); } catch (e) {}
    if (v.indexOf("zh") === 0) return "zh";
    if (v.indexOf("ja") === 0) return "ja";
    return "en";
  }
  function t(k) { return (STR[lang()] || STR.en)[k] || STR.en[k]; }

  // ── 状态 ────────────────────────────────────────────────────────────
  var S = {
    open: false,           // 覆盖层开着
    ws: null,              // 桥接 WebSocket
    wsState: "idle",       // idle|connecting|open|closed
    retry: 0,              // 重连退避计数
    retryTimer: 0,
    status: null,          // 服务端 status（bound/width/height/scale/mode）
    capW: 0, capH: 0,      // 捕获尺寸（viewport 消息）
    viewOnly: false,       // !status.bound → 禁发输入
    zoomFit: true,         // 适合宽高（false = 1:1 原生像素）
    zoom: 1,               // 相对 fit 的倍率（1 = fit）
    panX: 0, panY: 0,      // 平移（view px，作用于 stage 变换）
    bytes: 0, bytesAt: 0,  // 码率统计（jpeg 通道）
    kbps: 0,
    frameCount: 0,
    pc: null,              // RTCPeerConnection
    rtcOn: false,
    rtcTried: false,
    wakeLock: null,
    ui: {}                 // DOM 引用
  };

  // ── 工具 ────────────────────────────────────────────────────────────
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function send(obj) {
    if (S.ws && S.ws.readyState === 1) {
      try { S.ws.send(JSON.stringify(obj)); } catch (e) {}
    }
  }

  // E2E 是否激活（带 5s 缓存：apiServer.getInfo 会打原生 Preferences）
  var baseCache = { at: 0, val: null };
  function wsBase() {
    if (DEBUG_BASE) return Promise.resolve(DEBUG_BASE.replace(/\/+$/, ""));
    var now = Date.now();
    if (baseCache.val !== null && now - baseCache.at < 5000) return Promise.resolve(baseCache.val);
    var api = window.apiServer;
    if (!api || !api.getInfo) return Promise.resolve(null);
    return api.getInfo().then(function (info) {
      var b = info && info.baseURL;
      var ok = false;
      try { ok = !!b && new URL(b).host === SENTINEL_HOST; } catch (e) {}
      baseCache = { at: Date.now(), val: ok ? b : null };
      return baseCache.val;
    }).catch(function () { baseCache = { at: Date.now(), val: null }; return null; });
  }
  function e2eActive() { return wsBase().then(function (b) { return !!b; }); }

  // ── 连接 ────────────────────────────────────────────────────────────
  function connect() {
    if (!S.open) return;
    teardownWs();
    S.wsState = "connecting";
    updateStatusLine();
    wsBase().then(function (base) {
      if (!S.open || !base) { S.wsState = "closed"; updateStatusLine(); return; }
      var url = base.replace(/^http/i, "ws") + "/ws/screen";
      var ws;
      try { ws = new WebSocket(url); }
      catch (e) { scheduleReconnect(); return; }
      S.ws = ws;
      ws.onopen = function () {
        S.wsState = "open"; S.retry = 0; S.bytes = 0; S.bytesAt = Date.now();
        updateStatusLine();
      };
      ws.onmessage = onMessage;
      ws.onclose = function () { if (S.ws === ws) { S.wsState = "closed"; scheduleReconnect(); } };
      ws.onerror = function () { if (S.ws === ws) { S.wsState = "closed"; } };
    });
  }
  function scheduleReconnect() {
    if (!S.open) return;
    updateStatusLine();
    if (S.retryTimer) return;
    var wait = [1000, 2000, 4000, 5000][Math.min(S.retry, 3)];
    S.retry++;
    S.retryTimer = setTimeout(function () {
      S.retryTimer = 0;
      connect();
    }, wait);
  }
  function teardownWs() {
    if (S.retryTimer) { clearTimeout(S.retryTimer); S.retryTimer = 0; }
    var ws = S.ws;
    S.ws = null;
    if (ws) { try { ws.onclose = ws.onerror = ws.onmessage = ws.onopen = null; ws.close(); } catch (e) {} }
  }

  // ── 下行消息 ────────────────────────────────────────────────────────
  function onMessage(ev) {
    var m;
    try { m = JSON.parse(String(ev.data)); } catch (e) { return; }
    if (!m || typeof m.type !== "string") return;
    switch (m.type) {
      case "status":
        S.status = m;
        S.viewOnly = !m.bound;
        if (m.mode === "video" || m.mode === "video-jpeg") S.rtcOn = true;
        if (m.mode === "jpeg") { S.rtcOn = false; }
        updateStatusLine(); updateViewOnlyBadge();
        break;
      case "viewport":
        S.capW = m.width | 0; S.capH = m.height | 0;
        syncFrameSize(); applyTransform();
        break;
      case "frame":
        S.frameCount++;
        // 码率：base64 → 字节（E2E 加密开销不计，展示用足够）
        if (typeof m.data === "string") {
          S.bytes += m.data.length * 0.75;
          var dt = Date.now() - S.bytesAt;
          if (dt >= 3000) {
            S.kbps = Math.round(S.bytes * 8 / dt);   // bytes*8/ms = kbit/s
            S.bytes = 0; S.bytesAt = Date.now();
            updateStatusLine();
          }
          if (!S.rtcOn) showJpegFrame(m.data);
          if (!S.capW && m.width) { S.capW = m.width | 0; S.capH = m.height | 0; syncFrameSize(); }
        }
        // jpeg 流稳定出帧后尝试 WebRTC（更流畅更省流量；失败静默留在 jpeg）
        if (!S.rtcTried && S.frameCount >= 2 && typeof window.RTCPeerConnection === "function") {
          S.rtcTried = true;
          send({ type: "rtc_start", relayOnly: false });
        }
        break;
      case "clipboard":
        if (typeof m.text === "string" && m.text && m.text.length <= 65536) {
          try {
            var c = window.electronClipboard;
            if (c && c.writeText) c.writeText(m.text);
          } catch (e) {}
        }
        break;
      case "error":
        if (typeof m.message === "string") toast(m.message);
        break;
      case "rtc_offer": rtcOnOffer(m); break;
      case "rtc_ice":
        if (m.candidate && S.pc) { try { S.pc.addIceCandidate(m.candidate); } catch (e) {} }
        break;
      case "rtc":
        if (m.state === "connected") { S.rtcOn = true; updateStatusLine(); }
        else if (m.state === "failed" || m.state === "closed") {
          S.rtcOn = false; updateStatusLine();
          rtcTeardown();
          // 失败后别再无限重试 rtc；jpeg 流由服务端自动恢复
        }
        break;
      case "rtc_stats":
        if (typeof m.bitrate === "number") { S.kbps = Math.round(m.bitrate / 1000); updateStatusLine(); }
        break;
    }
  }

  // ── WebRTC（信令走同一 WS；媒体 DTLS-SRTP 直连/TURN） ────────────────
  function rtcOnOffer(m) {
    if (typeof m.sdp !== "string") return;
    rtcTeardown();
    var pc;
    try {
      pc = new RTCPeerConnection({ iceServers: Array.isArray(m.iceServers) ? m.iceServers : [] });
    } catch (e) { return; }
    S.pc = pc;
    pc.ontrack = function (ev) {
      var v = S.ui.video;
      if (v && ev.streams && ev.streams[0]) {
        v.srcObject = ev.streams[0];
        v.style.display = "block";
        if (S.ui.img) S.ui.img.style.display = "none";
        // 视频通道码率：本地 getStats 采样（rtc_stats 字段不稳，自己算最可靠）
        startRtcStats(pc);
      }
    };
    pc.onicecandidate = function (ev) {
      if (ev.candidate) send({ type: "rtc_ice", candidate: ev.candidate.toJSON ? ev.candidate.toJSON() : ev.candidate });
    };
    pc.setRemoteDescription({ type: "offer", sdp: m.sdp }).then(function () {
      return pc.createAnswer();
    }).then(function (answer) {
      return pc.setLocalDescription(answer).then(function () {
        send({ type: "rtc_answer", sdp: answer.sdp });
      });
    }).catch(function () {
      rtcTeardown();
      send({ type: "rtc_stop" });
    });
  }
  var rtcStatsTimer = 0;
  function startRtcStats(pc) {
    if (rtcStatsTimer) clearInterval(rtcStatsTimer);
    var last = 0, lastAt = Date.now();
    rtcStatsTimer = setInterval(function () {
      if (!pc || pc.connectionState !== "connected") return;
      pc.getStats().then(function (stats) {
        var now = Date.now();
        stats.forEach(function (r) {
          if (r.type === "inbound-rtp" && (r.kind === "video" || r.mediaType === "video")) {
            var b = r.bytesReceived || 0;
            if (last && now > lastAt) {
              S.kbps = Math.round((b - last) * 8 / (now - lastAt));
              updateStatusLine();
            }
            last = b; lastAt = now;
          }
        });
      }).catch(function () {});
    }, 2000);
  }
  function rtcTeardown() {
    if (rtcStatsTimer) { clearInterval(rtcStatsTimer); rtcStatsTimer = 0; }
    var pc = S.pc;
    S.pc = null;
    if (pc) { try { pc.close(); } catch (e) {} }
    var v = S.ui.video;
    if (v) { try { v.srcObject = null; } catch (e) {} v.style.display = "none"; }
    if (S.ui.img) S.ui.img.style.display = "block";
  }
  // 视频通道看门狗：rtc 已连接但 <video> 5s 不前进（个别 WebView 解码/协商
  // 异常只会黑屏）→ rtc_stop 退回 jpeg（rtcTried 已置位，不会反复重试）
  var videoWatchTimer = setInterval(function () {
    if (!S.open || !S.rtcOn || !S.ui.video) return;
    var v = S.ui.video;
    var cur = 0;
    try { cur = v.currentTime || 0; } catch (e) {}
    if (!v.__lastT) { v.__lastT = cur || 0.001; v.__lastAt = Date.now(); return; }
    if (cur > v.__lastT) { v.__lastT = cur; v.__lastAt = Date.now(); return; }
    if (Date.now() - v.__lastAt > 5000) {
      v.__lastT = 0; v.__lastAt = 0;
      S.rtcOn = false;
      rtcTeardown();
      send({ type: "rtc_stop" });
      updateStatusLine();
    }
  }, 1500);

  // ── 帧渲染 ──────────────────────────────────────────────────────────
  var imgBusy = false;
  function syncFrameSize() {
    if (!S.capW || !S.ui.stage) return;
    var img = S.ui.img, video = S.ui.video;
    if (img.style.width !== S.capW + "px") {
      img.style.width = S.capW + "px";
      img.style.height = S.capH + "px";
    }
    if (video.style.width !== S.capW + "px") {
      video.style.width = S.capW + "px";
      video.style.height = S.capH + "px";
    }
  }
  function showJpegFrame(b64) {
    var img = S.ui.img;
    if (!img) return;
    if (imgBusy) { img.pending = b64; return; }   // 上一帧还没解码完：只留最新
    imgBusy = true;
    img.onload = function () {
      img.onload = null;
      imgBusy = false;
      if (img.pending) { var p = img.pending; img.pending = null; showJpegFrame(p); }
    };
    img.onerror = function () { img.onload = null; imgBusy = false; };
    img.src = "data:image/jpeg;base64," + b64;
  }

  // ══ UI ══════════════════════════════════════════════════════════════
  function buildOverlay() {
    if (S.ui.root) return;
    var root = document.createElement("div");
    root.id = "alma-screen-viewer";
    var bar = document.createElement("div");
    bar.className = "asv-bar";
    var stageWrap = document.createElement("div");
    stageWrap.className = "asv-stage";
    var img = document.createElement("img");
    img.alt = ""; img.draggable = false;
    img.naturalW = 0; img.pending = null;
    var video = document.createElement("video");
    video.autoplay = true; video.playsInline = true; video.muted = true;
    video.style.display = "none";
    var stage = document.createElement("div");
    stage.className = "asv-frame";
    stage.appendChild(img); stage.appendChild(video);
    stageWrap.appendChild(stage);
    var badge = document.createElement("div");
    badge.className = "asv-viewonly"; badge.textContent = t("viewOnly"); badge.style.display = "none";
    stageWrap.appendChild(badge);
    var toastEl = document.createElement("div");
    toastEl.className = "asv-toast"; toastEl.style.display = "none";
    stageWrap.appendChild(toastEl);

    // ── 顶栏：标题 / 状态行 / 缩放档 / 完成 ──
    var dot = document.createElement("span"); dot.className = "asv-dot";
    var stat = document.createElement("span"); stat.className = "asv-stat"; stat.textContent = t("conn");
    var zoomChip = document.createElement("button");
    zoomChip.type = "button"; zoomChip.className = "asv-zoom"; zoomChip.textContent = "1×";
    var title = document.createElement("div"); title.className = "asv-title";
    title.appendChild(dot); title.appendChild(stat);
    var done = document.createElement("button");
    done.type = "button"; done.className = "asv-done"; done.textContent = t("done");
    done.addEventListener("click", closeViewer);
    var expand = document.createElement("button");
    expand.type = "button"; expand.className = "asv-expand";
    expand.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
    expand.setAttribute("aria-label", t("fit") + "/" + t("native"));
    expand.addEventListener("click", toggleZoomMode);
    zoomChip.addEventListener("click", toggleZoomMode);
    bar.appendChild(title); bar.appendChild(zoomChip); bar.appendChild(expand); bar.appendChild(done);

    // ── 底部：按键条 + 输入行（iOS 同款布局） ──
    var keys = document.createElement("div");
    keys.className = "asv-keys";
    var keyDefs = [
      { k: "paste", label: t("paste"), wide: true },
      { k: "esc", label: "esc" },
      { k: "tab", label: "tab" },
      { k: "left", label: "←" },
      { k: "up", label: "↑" },
      { k: "down", label: "↓" },
      { k: "right", label: "→" }
    ];
    keyDefs.forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "asv-key" + (d.wide ? " asv-key-wide" : "");
      b.textContent = d.label;
      b.addEventListener("click", function () {
        b.classList.add("asv-key-hit");
        setTimeout(function () { b.classList.remove("asv-key-hit"); }, 150);
        if (d.k === "paste") doPaste(); else sendKey(d.k);
      });
      keys.appendChild(b);
    });
    var inputRow = document.createElement("div");
    inputRow.className = "asv-inputrow";
    var input = document.createElement("input");
    input.className = "asv-input"; input.type = "text"; input.autocomplete = "off";
    input.setAttribute("enterkeyhint", "send");
    input.placeholder = t("inputPh");
    var sendBtn = document.createElement("button");
    sendBtn.type = "button"; sendBtn.className = "asv-send";
    sendBtn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    sendBtn.setAttribute("aria-label", "send");
    function commit() {
      var v = input.value;
      // 空 + 回车/发送 = 电脑的回车键（终端等场景的主用法）
      if (!v) { if (!S.viewOnly) send({ type: "key", key: "enter" }); return; }
      input.value = "";
      send({ type: "text", text: v });
    }
    sendBtn.addEventListener("click", commit);
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); commit(); }
    });
    inputRow.appendChild(input); inputRow.appendChild(sendBtn);

    root.appendChild(bar);
    root.appendChild(stageWrap);
    root.appendChild(keys);
    root.appendChild(inputRow);
    // 阻断 renderer 的全局手势/键盘监听（覆盖层内的事件到本层为止）
    ["pointerdown", "pointermove", "pointerup", "pointercancel",
     "touchstart", "touchmove", "touchend", "wheel", "keydown"].forEach(function (tn) {
      root.addEventListener(tn, function (e) { e.stopPropagation(); }, { passive: false, capture: false });
    });
    (document.body || document.documentElement).appendChild(root);

    S.ui = {
      root: root, bar: bar, stageWrap: stageWrap, stage: stage, img: img, video: video,
      stat: stat, dot: dot, zoomChip: zoomChip, badge: badge, toastEl: toastEl,
      input: input, keys: keys
    };
    installGestures(stageWrap);
    // 容器尺寸变化（布局稳定/旋转/键盘开合）→ 重算 fit 变换。
    // 单靠 window resize 会漏掉首帧 0×0 → 有尺寸的过渡（headless 实测踩过）。
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { clampPan(); applyTransform(); });
      ro.observe(stageWrap);
    }
  }

  // ── 状态行 / 徽标 / toast ────────────────────────────────────────────
  function updateStatusLine() {
    if (!S.ui.stat) return;
    var s = S.status;
    if (S.wsState !== "open") { S.ui.stat.textContent = S.open ? t("offline") : ""; return; }
    if (!s) { S.ui.stat.textContent = t("conn"); return; }
    S.ui.stat.textContent = s.width + " × " + s.height + " · " + (S.kbps || 0) + " kbit/s"
      + (S.rtcOn ? " · HD" : "");
    S.ui.dot.className = "asv-dot" + (S.rtcOn ? " asv-dot-hd" : "");
  }
  function updateViewOnlyBadge() {
    if (S.ui.badge) S.ui.badge.style.display = S.viewOnly ? "block" : "none";
  }
  var toastTimer = 0;
  function toast(msg) {
    var el = S.ui.toastEl;
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.style.display = "none"; }, 3000);
  }

  // ── 缩放 / 平移 ─────────────────────────────────────────────────────
  // stage 用 transform: translate(panX,panY) scale(zoomCss)。zoom 是相对 fit
  // 的倍率（iOS 语义：1× = 适合），zoomCss = fitScale * zoom。
  function fitScale() {
    var w = S.ui.stageWrap;
    if (!w || !S.capW) return 1;
    var r = w.getBoundingClientRect();
    return Math.min(r.width / S.capW, r.height / S.capH);
  }
  function applyTransform() {
    if (!S.ui.stage) return;
    var sc = fitScale() * S.zoom;
    if (!(sc > 0)) sc = S.zoom;   // 容器矩形还没量出来（0×0）时不写 scale(0)
    S.ui.stage.style.transform = "translate(" + S.panX + "px," + S.panY + "px) scale(" + sc + ")";
    S.ui.zoomChip.textContent = (Math.round(S.zoom * 10) / 10) + "×";
  }
  function clampPan() {
    var w = S.ui.stageWrap;
    if (!w) return;
    var r = w.getBoundingClientRect();
    var sc = fitScale() * S.zoom;
    var fw = S.capW * sc, fh = S.capH * sc;
    var mx = Math.max(0, (fw - r.width) / 2), my = Math.max(0, (fh - r.height) / 2);
    S.panX = clamp(S.panX, -mx, mx);
    S.panY = clamp(S.panY, -my, my);
  }
  function toggleZoomMode() {
    S.zoomFit = !S.zoomFit;
    S.zoom = S.zoomFit ? 1 : clamp(nativeZoom(), 1, 8);
    S.panX = 0; S.panY = 0;
    applyTransform();
  }
  function nativeZoom() {
    // 1:1 = Mac 逻辑像素（status.width 是逻辑宽，如 1470）
    var w = S.ui.stageWrap;
    if (!w || !S.capW || !S.status) return 3;
    var fit = fitScale();
    if (!(fit > 0)) return 3;   // 容器尚未布局（rect 0×0）→ 兜底 3×
    // 逻辑像素/捕获像素 = status.width / capW；再除 fit 得相对倍率
    return (S.status.width / S.capW) / fit;
  }
  window.addEventListener("resize", function () { clampPan(); applyTransform(); });

  // ── 输入注入 ────────────────────────────────────────────────────────
  function norm(clientX, clientY) {
    // 视口坐标 → 帧内像素 → [0,1]（相对整个屏幕）
    var w = S.ui.stageWrap;
    if (!w || !S.capW) return null;
    var r = w.getBoundingClientRect();
    var sc = fitScale() * S.zoom;
    var fx = (clientX - r.left - r.width / 2 - S.panX) / sc + S.capW / 2;
    var fy = (clientY - r.top - r.height / 2 - S.panY) / sc + S.capH / 2;
    return { x: clamp(fx / S.capW, 0, 1), y: clamp(fy / S.capH, 0, 1) };
  }
  function sendPointer(action, x, y, button) {
    if (S.viewOnly) return;
    send({ type: "pointer", action: action, x: x, y: y, button: button || "left" });
  }
  function sendKey(key) {
    if (S.viewOnly) return;
    send({ type: "key", key: key });
  }
  function doPaste() {
    if (S.viewOnly) return;
    var c = window.electronClipboard;
    var p = c && c.readText ? c.readText() : Promise.resolve("");
    Promise.resolve(p).then(function (text) {
      if (!text) return;
      send({ type: "clipboard", text: String(text).slice(0, 65536), paste: true });
    }).catch(function () {});
  }

  // ── 手势 ────────────────────────────────────────────────────────────
  // 一指：直接控制（按下=鼠标按下；移动=拖动；抬起=释放；轻点=click；
  //       双击=double；长按 500ms=右键）
  // 双指：捏合=缩放视图；间距稳定的拖动=Mac 滚轮（增量按显示像素 1:1 物理）
  // 三指：拖动=平移视图（放大后用）
  function installGestures(el) {
    var pointers = new Map();       // pointerId → {x,y}
    var prim = null;                // 主指针手势状态
    var second = null;              // 双指几何
    var third = null;               // 三指平移
    var lastMoveSend = 0;

    function pinchInfo() {
      var pts = Array.from(pointers.values());
      if (pts.length < 2) return null;
      var dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
      return { span: Math.hypot(dx, dy) || 1, cx: (pts[0].x + pts[1].x) / 2, cy: (pts[0].y + pts[1].y) / 2 };
    }

    el.addEventListener("pointerdown", function (e) {
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        prim = {
          x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY,
          t0: Date.now(), moved: false, downSent: false,
          lpTimer: setTimeout(function () {
            if (prim && !prim.moved && pointers.size === 1) {
              // 长按 → 右键；随后到来的 pointerup 丢弃（不补发 up）
              var n = norm(prim.x, prim.y);
              if (n) sendPointer("right", n.x, n.y, "right");
              el.__dropNextUp = true;
              prim = null;
            }
          }, 500)
        };
      } else if (pointers.size === 2) {
        if (prim && prim.downSent) {
          // 双指介入：先把按下的鼠标抬起（拖动 → 滚动手势过渡）
          sendPointer("up", prim.x, prim.y);
        }
        if (prim && prim.lpTimer) clearTimeout(prim.lpTimer);
        prim = null;
        second = { p: pinchInfo(), mode: null };
        third = null;
      } else if (pointers.size >= 3) {
        second = null;
        var pts = Array.from(pointers.values()).slice(-3);
        third = { x: pts.reduce(function (a, p) { return a + p.x; }, 0) / pts.length,
                  y: pts.reduce(function (a, p) { return a + p.y; }, 0) / pts.length };
      }
    });

    el.addEventListener("pointermove", function (e) {
      var rec = pointers.get(e.pointerId);
      if (!rec) return;
      rec.x = e.clientX; rec.y = e.clientY;

      if (pointers.size === 1 && prim) {
        var dx = e.clientX - prim.x0, dy = e.clientY - prim.y0;
        if (!prim.moved && Math.hypot(dx, dy) > 12) prim.moved = true;
        if (prim.moved) {
          var n = norm(e.clientX, e.clientY);
          if (n) {
            if (!prim.downSent) { sendPointer("down", n.x, n.y); prim.downSent = true; }
            var now = Date.now();
            if (now - lastMoveSend > 33) { lastMoveSend = now; sendPointer("move", n.x, n.y); }
          }
        }
        prim.x = e.clientX; prim.y = e.clientY;
        return;
      }

      if (pointers.size === 2 && second) {
        var cur = pinchInfo();
        var prev = second.p;
        if (!cur || !prev) return;
        var dSpan = cur.span - prev.span;
        var cx = cur.cx - prev.cx, cy = cur.cy - prev.cy;
        var centroidMove = Math.hypot(cx, cy);
        if (second.mode === null) {
          // 头几次 move 判定意图：间距变化显著 = 捏合；平移显著 = 滚动
          if (Math.abs(dSpan) > 8) second.mode = "pinch";
          else if (centroidMove > 8) second.mode = "scroll";
        }
        if (second.mode === "pinch") {
          var ns = clamp(S.zoom * (cur.span / prev.span), 1, 8);
          S.zoom = ns; S.zoomFit = (ns === 1);
          clampPan(); applyTransform();
        } else if (second.mode === "scroll") {
          var nrm = norm(cur.cx, cur.cy);
          if (nrm && !S.viewOnly) {
            var sc = fitScale() * S.zoom;
            // 手指 view px → 显示像素（1:1 物理手感），方向同 Mac 触控板「自然滚动」
            send({ type: "scroll", x: nrm.x, y: nrm.y,
                   dx: Math.round(-cx / sc * (S.status ? S.status.width / S.capW : 1)),
                   dy: Math.round(-cy / sc * (S.status ? S.status.width / S.capW : 1)) });
          }
        }
        second.p = cur;
        return;
      }

      if (pointers.size >= 3 && third) {
        var pts2 = Array.from(pointers.values()).slice(-3);
        var tx = pts2.reduce(function (a, p) { return a + p.x; }, 0) / pts2.length;
        var ty = pts2.reduce(function (a, p) { return a + p.y; }, 0) / pts2.length;
        S.panX += tx - third.x; S.panY += ty - third.y;
        clampPan(); applyTransform();
        third = { x: tx, y: ty };
      }
    });

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) {
        if (el.__dropNextUp) { el.__dropNextUp = false; prim = null; second = null; third = null; return; }
        if (prim) {
          if (prim.lpTimer) clearTimeout(prim.lpTimer);
          var dt = Date.now() - prim.t0;
          var n = norm(e.clientX, e.clientY);
          if (prim.downSent) {
            if (n) sendPointer("up", n.x, n.y);
          } else if (n && !prim.moved && dt < 400) {
            // 轻点：双击窗口 300ms 内补发 double，否则 click
            var now = Date.now();
            if (el.__lastTap && now - el.__lastTap < 300 && el.__lastTapPos
                && Math.hypot(el.__lastTapPos.x - e.clientX, el.__lastTapPos.y - e.clientY) < 40) {
              sendPointer("double", n.x, n.y);
              el.__lastTap = 0;
            } else {
              sendPointer("click", n.x, n.y);
              el.__lastTap = now;
              el.__lastTapPos = { x: e.clientX, y: e.clientY };
            }
          }
          prim = null;
        }
        second = null; third = null;
      } else if (pointers.size === 1) {
        second = null; third = null;
        // 从多指回到一指：不接管为新的控制手势（避免误拖），等全部抬起
        prim = null;
      } else if (pointers.size === 2) {
        third = null;
        second = { p: pinchInfo(), mode: null };
      }
    }
    el.addEventListener("pointerup", endPointer);
    el.addEventListener("pointercancel", endPointer);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    // Mac 剪贴板 → 手机已同步；双击 stage 空白区不缩放（双击是 double click）
  }

  // ── 打开 / 关闭 ─────────────────────────────────────────────────────
  function openViewer() {
    if (S.open) return;
    e2eActive().then(function (ok) {
      if (!ok) return;
      S.open = true;
      S.rtcTried = false; S.rtcOn = false; S.frameCount = 0; S.kbps = 0;
      S.zoom = 1; S.zoomFit = true; S.panX = 0; S.panY = 0;
      S.status = null; S.capW = 0; S.capH = 0; S.viewOnly = false;
      buildOverlay();
      applyTransform(); updateStatusLine();
      connect();
      requestWakeLock();
      installKeyShield();
      ensurePill();
      try { if (window.haptics && window.haptics.tick) window.haptics.tick(); } catch (e) {}
    });
  }
  function closeViewer() {
    if (!S.open) return;
    S.open = false;
    send({ type: "rtc_stop" });          // 先发再断（ws 关闭服务端也会自清 rtc）
    teardownWs();
    rtcTeardown();
    releaseWakeLock();
    removeKeyShield();
    if (S.ui.root) { S.ui.root.remove(); S.ui = {}; }
    ensurePill();
  }

  // 查看器开着时，覆盖层之外的按键不再漏给 renderer（其全局快捷键在看不见的
  // 主界面上触发）。覆盖层内部的事件已被 root 的 stopPropagation 拦截。
  function installKeyShield() {
    if (S.keyShield) return;
    S.keyShield = function (e) {
      if (S.open && S.ui.root && !S.ui.root.contains(e.target)) {
        e.stopPropagation(); e.preventDefault();
      }
    };
    document.addEventListener("keydown", S.keyShield, true);
  }
  function removeKeyShield() {
    if (!S.keyShield) return;
    document.removeEventListener("keydown", S.keyShield, true);
    S.keyShield = null;
  }

  // Android 返回键链：alma-droid-shim 的 __almaAndroidBack 最先问这里
  window.__almaScreenRemote = {
    open: openViewer,
    close: closeViewer,
    handleBack: function () { if (S.open) { closeViewer(); return true; } return false; }
  };

  // ── 屏幕常亮 ────────────────────────────────────────────────────────
  function requestWakeLock() {
    try {
      if (navigator.wakeLock && navigator.wakeLock.request) {
        navigator.wakeLock.request("screen").then(function (wl) { S.wakeLock = wl; }).catch(function () {});
      }
    } catch (e) {}
  }
  function releaseWakeLock() {
    try { if (S.wakeLock) { S.wakeLock.release(); S.wakeLock = null; } } catch (e) {}
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && S.open) { teardownWs(); rtcTeardown(); }
    else if (!document.hidden && S.open) { S.retry = 0; connect(); requestWakeLock(); }
  });

  // ── 入口 pill（⋯ 菜单钮下方，更新 pill 同款机制） ────────────────────
  S.e2e = null;   // null=未知 true/false=上次检测结果
  // renderer 自己的覆层开着（会话抽屉 z-201 / 全屏 dialog / 设置层 iframe）
  // 时 pill 不露头 —— 否则浮在抽屉上面（v0.4.378-24 实机反馈）。
  // 判定逻辑与 alma-droid-shim 的 rendererOverlayOpen 同款。
  function settingsLayerOpen() {
    var f = document.getElementById("alma-settings-frame");
    return !!(f && f.style.display !== "none");
  }
  function rendererOverlayOpen() {
    try {
      var scrims = document.querySelectorAll('body > div[class*="z-["]');
      for (var i = 0; i < scrims.length; i++) {
        var s = scrims[i], sc = getComputedStyle(s);
        if (sc.position === "fixed" && sc.zIndex === "200" && sc.pointerEvents !== "none"
            && s.getBoundingClientRect().width >= innerWidth * 0.9) return true;
      }
      var panels = document.querySelectorAll('div[class*="z-["]');
      for (var j = 0; j < panels.length; j++) {
        var el = panels[j], cs = getComputedStyle(el);
        if (cs.position !== "fixed" || cs.zIndex !== "201") continue;
        var r = el.getBoundingClientRect();
        if (r.width >= 180 && r.height >= innerHeight * 0.7 && r.left > -40 && r.left < 40) return true;
      }
      var dl = document.querySelectorAll('[role="dialog"]');
      for (var k = 0; k < dl.length; k++) {
        var d = dl[k];
        if (d.id === "alma-update-dialog" || d.id === "alma-screen-viewer") continue;
        var dr = d.getBoundingClientRect();
        if (dr.width * dr.height >= innerWidth * innerHeight * 0.5) return true;
      }
    } catch (e) {}
    return false;
  }
  function pillShouldShow() {
    return S.e2e === true && !S.open && !settingsLayerOpen() && !rendererOverlayOpen();
  }
  function findMenuToggle() {
    try {
      var btns = document.querySelectorAll("button");
      for (var i = 0; i < btns.length; i++) {
        var r = btns[i].getBoundingClientRect();
        if (r.width >= 20 && r.width <= 60 && r.left > -10 && r.left < 60
            && r.top > -10 && r.top < 60 && btns[i].querySelector("svg")) return btns[i];
      }
    } catch (e) {}
    return null;
  }
  function ensurePill() {
    var pill = document.getElementById("alma-screen-pill");
    if (!pillShouldShow()) { if (pill) pill.remove(); return; }
    var toggle = findMenuToggle();
    if (!toggle) { if (pill) pill.remove(); return; }
    if (!pill) {
      pill = document.createElement("button");
      pill.id = "alma-screen-pill";
      pill.type = "button";
      pill.setAttribute("aria-label", t("screen"));
      pill.title = t("open");
      pill.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>';
      pill.addEventListener("click", function () { openViewer(); });
      (document.body || document.documentElement).appendChild(pill);
    }
    var tr = toggle.getBoundingClientRect();
    // 图形对齐（v0.4.378-24 实机反馈「没对齐」）：pill 内 svg 是 16px 居中于
    // 30px 宽 → 内缩 7px；取菜单钮 svg 的实际左缘，让两个图形左缘重合，
    // 而不是按钮盒子对盒子（按钮盒有内边距，视觉上会偏右）。
    var PILL_ICON_INSET = 7;
    var tsvg = toggle.querySelector("svg");
    var iconLeft = tsvg ? tsvg.getBoundingClientRect().left : tr.left;
    var left = Math.round(iconLeft - PILL_ICON_INSET);
    var top = Math.round(tr.bottom + 6);
    var pos = left + "x" + top;
    if (pill.dataset.pos === pos) return;
    pill.dataset.pos = pos;
    var dark = document.documentElement.classList.contains("dark");
    pill.style.cssText =
      "position:fixed;z-index:2147482000;display:inline-flex;align-items:center;justify-content:center;" +
      "width:30px;height:30px;border:0;border-radius:9px;cursor:pointer;" +
      "background:" + (dark ? "#4a4f58" : "#d8dce3") + ";color:" + (dark ? "#f2ead8" : "#3a3f47") + ";" +
      "box-shadow:0 1px 4px rgba(0,0,0,.25);left:" + left + "px;top:" + top + "px;";
  }
  // E2E 状态轮询（wsBase 内带 5s 缓存，这里 8s 一轮足够；配对/忘记都会整页重载）
  setInterval(function () {
    e2eActive().then(function (ok) {
      S.e2e = ok;
      ensurePill();
    });
  }, 8000);
  // renderer 重渲染可能吞 pill —— 与更新 pill 同款兜底
  if (window.MutationObserver) {
    var obs = new MutationObserver(function () {
      if (obs.__t) return;
      obs.__t = setTimeout(function () { obs.__t = 0; ensurePill(); }, 300);
    });
    var start = function () {
      if (document.body) obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
      else setTimeout(start, 500);
    };
    start();
  }
  setTimeout(function () { e2eActive().then(function (ok) { S.e2e = ok; ensurePill(); }); }, 1500);

  // ── 样式 ────────────────────────────────────────────────────────────
  var CSS = [
    "#alma-screen-viewer{position:fixed;inset:0;z-index:2147482500;display:flex;flex-direction:column;",
    "background:#000;color:#e8eaed;font-family:-apple-system,system-ui,'Segoe UI',Roboto,sans-serif;",
    "user-select:none;-webkit-user-select:none;touch-action:none;}",
    "#alma-screen-viewer *{box-sizing:border-box;}",
    ".asv-bar{display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;",
    "background:rgba(16,18,22,.92);border-bottom:1px solid rgba(255,255,255,.08);}",
    ".asv-title{display:flex;align-items:center;gap:7px;min-width:0;flex:1;font-size:13px;",
    "color:#b7bcc4;font-weight:600;}",
    ".asv-title::first-line{font-weight:700;}",
    ".asv-dot{width:7px;height:7px;border-radius:50%;background:#34c759;flex:none;}",
    ".asv-dot-hd{background:#3d9bff;}",
    ".asv-stat{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500;",
    "font-variant-numeric:tabular-nums;}",
    ".asv-zoom{all:unset;cursor:pointer;font-size:12px;font-weight:600;color:#e8eaed;",
    "padding:4px 9px;border-radius:9999px;background:rgba(255,255,255,.1);flex:none;",
    "font-variant-numeric:tabular-nums;}",
    ".asv-expand{all:unset;cursor:pointer;color:#e8eaed;display:inline-flex;align-items:center;",
    "justify-content:center;width:30px;height:30px;border-radius:8px;flex:none;}",
    ".asv-expand:active{background:rgba(255,255,255,.12);}",
    ".asv-done{all:unset;cursor:pointer;color:#4da3ff;font-size:14px;font-weight:600;",
    "padding:5px 10px;flex:none;}",
    ".asv-stage{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;",
    "align-items:center;justify-content:center;background:#0a0b0d;}",
    ".asv-frame{position:relative;transform-origin:center center;will-change:transform;line-height:0;}",
    ".asv-frame img,.asv-frame video{display:block;max-width:none;object-fit:fill;background:#17181c;}",
    ".asv-viewonly{position:absolute;top:10px;left:50%;transform:translateX(-50%);",
    "background:rgba(255,159,10,.92);color:#fff;font-size:11.5px;font-weight:600;",
    "padding:3px 10px;border-radius:9999px;pointer-events:none;}",
    ".asv-toast{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);max-width:86%;",
    "background:rgba(28,30,35,.94);color:#e8eaed;font-size:12px;padding:7px 13px;border-radius:9px;",
    "pointer-events:none;line-height:1.45;}",
    ".asv-keys{display:flex;gap:6px;padding:8px 10px 6px;overflow-x:auto;background:rgba(16,18,22,.92);",
    "border-top:1px solid rgba(255,255,255,.08);scrollbar-width:none;}",
    ".asv-keys::-webkit-scrollbar{display:none;}",
    ".asv-key{all:unset;cursor:pointer;flex:none;min-width:40px;height:36px;padding:0 10px;",
    "display:inline-flex;align-items:center;justify-content:center;border-radius:8px;",
    "background:rgba(255,255,255,.09);color:#e8eaed;font-size:13px;font-weight:600;",
    "font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}",
    ".asv-key:active{background:rgba(255,255,255,.22);}",
    ".asv-key-hit{background:rgba(77,163,255,.55)!important;}",
    ".asv-key-wide{font-family:inherit;font-size:12.5px;}",
    ".asv-inputrow{display:flex;gap:8px;align-items:center;padding:6px 10px calc(env(safe-area-inset-bottom,0px) + 8px);",
    "background:rgba(16,18,22,.92);}",
    ".asv-input{flex:1;min-width:0;height:38px;border:0;border-radius:10px;padding:0 13px;",
    "background:rgba(255,255,255,.09);color:#e8eaed;font-size:14px;outline:none;}",
    ".asv-input::placeholder{color:#7c828c;}",
    ".asv-send{all:unset;cursor:pointer;color:#4da3ff;display:inline-flex;align-items:center;",
    "justify-content:center;width:38px;height:38px;border-radius:10px;flex:none;}",
    ".asv-send:active{background:rgba(77,163,255,.15);}"
  ].join("");
  try {
    var st = document.createElement("style");
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
})();
