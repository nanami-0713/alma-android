// alma-diag.js — 连接诊断面板（现场排查「已连接但零内容」类问题）
//
// 面板从左下角小圆钮打开，展示四层事实：配置 / LAN 直连状态 / 中继可达性 /
// 隧道内业务请求实测。全部只读（除「文本帧模式」开关）。
//
// 文本帧模式（实验开关）：0.4.378 起 E2E 内层默认二进制帧（bin:1）。握手是
// 文本、业务数据是二进制 —— 个别 ROM 的 WebView 若二进制 WS 帧异常，症状正是
// 「连接绿了但所有内容加载不出」。开关写入 localStorage
// alma.android.e2e.text=1，由 sync-assets 的 chunk 补丁读取（默认关）。
(function () {
  "use strict";
  if (typeof window === "undefined") return;
  var isSubframe = false;
  try { isSubframe = window.parent && window.parent !== window; } catch (e) {}
  if (isSubframe) return;
  var page = "";
  try { page = location.pathname.split("/").pop() || ""; } catch (e) {}
  if (page && !/^index\.html?$/i.test(page)) return;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function cap(k) { try { return localStorage.getItem("CapacitorStorage." + k); } catch (e) { return null; } }

  var ui = {};

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function fmtCfg() {
    var origin = cap("alma.ios.e2e.relayOrigin") || "(未配置)";
    var code = cap("alma.ios.e2e.code") || "";
    var mode = cap("alma.ios.backendMode") || "?";
    var text = lsGet("alma.android.e2e.text") === "1" ? "开（文本帧）" : "关（二进制帧）";
    return [
      "后端模式: " + mode,
      "中继: " + origin,
      "配对码: " + (code ? code.slice(0, 10) + "…（" + code.length + " 字符）" : "(无)"),
      "文本帧模式: " + text
    ];
  }

  function fmtLan() {
    var h = window.__almaLanDirect;
    if (!h) return ["LAN 直连模块: 未加载"];
    var lines = ["LAN 直连模块: 已加载"];
    try {
      var r = h.route && h.route();
      if (r) lines.push("最近路由: " + (r.kind === "direct" ? "直连" : "中继") + "（" + new Date(r.at).toLocaleTimeString() + "）");
      var c = h.cache && h.cache();
      if (c) lines.push("直连缓存: " + c.host + ":" + c.port);
      else lines.push("直连缓存: 无");
      var lr = h.lastResult && h.lastResult();
      if (lr && lr.subnets) lines.push("最近发现: 网段[" + lr.subnets.join(",") + "] 命中[" + (lr.hit || "无") + "]");
      if (lr && lr.giveUp) lines.push("最近发现: 直连连续失败已冷却");
    } catch (e) {}
    return lines;
  }

  // 中继可达性：拨一个不存在配对的房间 —— 升级成功并挂起 = 中继可达
  function probeRelay(origin) {
    return new Promise(function (resolve) {
      var url = origin.replace(/\/+$/, "").replace(/^http/, "ws") + "/c/almaDiagDummyRoom0123/__alma_e2e__";
      var t0 = Date.now();
      var ws;
      try { ws = new WebSocket(url); } catch (e) { return resolve("✗ 构造失败: " + e.message); }
      var timer = setTimeout(function () {
        try { ws.close(); } catch (e) {}
        resolve("✗ " + (Date.now() - t0) + "ms 无响应");
      }, 6000);
      ws.onopen = function () {
        clearTimeout(timer);
        try { ws.close(); } catch (e) {}
        resolve("✓ 可达（升级 " + (Date.now() - t0) + "ms，房间等待语义正常）");
      };
      ws.onclose = function (ev2) {
        clearTimeout(timer);
        resolve("✗ 被关闭 code=" + ev2.code + " " + (ev2.reason || "") + "（" + (Date.now() - t0) + "ms）");
      };
      ws.onerror = function () {
        clearTimeout(timer);
        resolve("✗ 连接错误（" + (Date.now() - t0) + "ms）— DNS/网络/被墙");
      };
    });
  }

  // 隧道内业务请求实测
  function probeTunnel() {
    var t0 = Date.now();
    var api = window.apiServer;
    if (!api || !api.getInfo) return Promise.resolve("✗ apiServer 桥缺失");
    return api.getInfo().then(function (info) {
      var b = info && info.baseURL;
      if (!b) return "✗ 无 baseURL（backendMode=" + (info && info.port) + "）";
      return fetch(b + "/api/health", { cache: "no-store" })
        .then(function (r) { return r.text().then(function (tx) {
          return (r.ok ? "✓" : "✗ HTTP " + r.status) + " /api/health " + (Date.now() - t0) + "ms " + tx.length + "B";
        }); })
        .catch(function (e) { return "✗ 请求失败 " + (Date.now() - t0) + "ms: " + String(e && e.message || e).slice(0, 90); });
    }).catch(function (e) { return "✗ getInfo 失败: " + e; });
  }

  function render(lines) {
    if (!ui.body) return;
    ui.body.innerHTML = lines.map(function (l) { return "<div>" + esc(l) + "</div>"; }).join("");
  }

  function runChecks() {
    var all = [];
    all.push("── 配置 ──"); all = all.concat(fmtCfg());
    all.push("── LAN 直连 ──"); all = all.concat(fmtLan());
    var origin = cap("alma.ios.e2e.relayOrigin") || "";
    var doRelay = origin ? probeRelay(origin) : Promise.resolve(origin ? "" : "✗ 未配置中继");
    var doTunnel = probeTunnel();
    if (origin) {
      all.push("── 中继可达性 ──");
      all.push("…探测中");
      render(all);
    }
    all.push("── 隧道实测 ──");
    all.push("…请求中");
    render(all);
    Promise.all([doRelay, doTunnel]).then(function (rs) {
      // 按序回填（占位行被替换，而不是追加到尾部）
      var relayIdx = all.indexOf("…探测中");
      if (relayIdx >= 0) all[relayIdx] = rs[0];
      var tunIdx = all.indexOf("…请求中");
      if (tunIdx >= 0) all[tunIdx] = rs[1];
      all.push("（检测完成，可复制结果）");
      render(all);
    });
    ui.last = all;
  }

  function buildPanel() {
    if (ui.root) return;
    var root = document.createElement("div");
    root.id = "alma-diag";
    root.innerHTML =
      '<div class="ad-card">' +
      '<div class="ad-head"><span>连接诊断</span><button class="ad-x" aria-label="close">✕</button></div>' +
      '<div class="ad-body"></div>' +
      '<div class="ad-btns">' +
      '<button class="ad-b" data-a="rerun">重新检测</button>' +
      '<button class="ad-b" data-a="text">切换文本帧模式</button>' +
      '<button class="ad-b" data-a="copy">复制结果</button>' +
      "</div></div>";
    (document.body || document.documentElement).appendChild(root);
    ui.root = root;
    ui.body = root.querySelector(".ad-body");
    root.querySelector(".ad-x").addEventListener("click", function () { root.remove(); ui = {}; });
    root.addEventListener("click", function (e) {
      var a = e.target && e.target.getAttribute && e.target.getAttribute("data-a");
      if (!a) return;
      if (a === "rerun") runChecks();
      if (a === "copy") {
        var txt = (ui.last || []).join("\n");
        var c = window.electronClipboard;
        (c && c.writeText ? Promise.resolve(c.writeText(txt)) : Promise.reject())
          .catch(function () { return navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject(); })
          .then(function () { toast("已复制"); }, function () { toast("复制失败：请长按本卡片手动复制\n" + txt); });
      }
      if (a === "text") {
        var on = lsGet("alma.android.e2e.text") === "1";
        try { localStorage.setItem("alma.android.e2e.text", on ? "0" : "1"); } catch (e) {}
        toast(on ? "已切回二进制帧，正在重载…" : "已切换文本帧模式，正在重载…");
        setTimeout(function () { location.reload(); }, 600);
      }
    });
    var toastEl = document.createElement("div");
    toastEl.id = "alma-diag-toast";
    root.appendChild(toastEl);
    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.style.display = "block";
      setTimeout(function () { toastEl.style.display = "none"; }, 2200);
    }
    ui.toast = toast;
    runChecks();
  }

  // 样式 + 入口钮
  try {
    var st = document.createElement("style");
    st.textContent =
      "#alma-diag{position:fixed;inset:0;z-index:2147482400;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);}" +
      "#alma-diag *{box-sizing:border-box;}" +
      ".ad-card{width:min(430px,92vw);max-height:80vh;display:flex;flex-direction:column;background:#23262c;color:#e8eaed;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.5);}" +
      ".ad-head{display:flex;justify-content:space-between;align-items:center;padding:13px 16px 9px;font-size:15px;font-weight:700;}" +
      ".ad-x{all:unset;cursor:pointer;color:#9aa0aa;padding:2px 8px;font-size:14px;}" +
      ".ad-body{overflow:auto;padding:2px 16px 10px;font:11.5px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace;color:#c7ccd4;white-space:pre-wrap;word-break:break-all;}" +
      ".ad-btns{display:flex;gap:8px;padding:10px 16px 14px;flex-wrap:wrap;}" +
      ".ad-b{all:unset;cursor:pointer;font-size:12.5px;padding:7px 12px;border-radius:8px;background:rgba(255,255,255,.09);color:#e8eaed;}" +
      ".ad-b:active{background:rgba(255,255,255,.22);}" +
      "#alma-diag-toast{display:none;position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(28,30,35,.95);padding:8px 14px;border-radius:9px;font-size:12.5px;color:#e8eaed;max-width:86%;white-space:pre-wrap;}" +
      "#alma-diag-fab{position:fixed;left:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:2147482300;" +
      "width:30px;height:30px;border:0;border-radius:50%;background:rgba(60,64,72,.72);color:#aab0ba;font-size:12px;" +
      "display:flex;align-items:center;justify-content:center;opacity:.55;cursor:pointer;}";
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}

  var fab = document.createElement("button");
  fab.id = "alma-diag-fab";
  fab.type = "button";
  fab.textContent = "诊";
  fab.title = "连接诊断";
  fab.addEventListener("click", buildPanel);
  var ensureFab = function () {
    if (!document.body || document.getElementById("alma-diag-fab")) return;
    document.body.appendChild(fab);
  };
  if (document.body) ensureFab();
  else document.addEventListener("DOMContentLoaded", ensureFab);
  // renderer 重渲染可能吞节点 —— 兜底重挂
  setInterval(ensureFab, 4000);
})();
