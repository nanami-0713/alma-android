// alma-term-keys：终端 extra keys 按键条（Termux 式两行）。
//
// 手机上 xterm 终端没有 ESC / 方向键 / TAB / CTRL：软键盘给不出这些键，
// shell 基本没法用。本 shim 注入一条固定在视口底部的按键条：
//   行1  ESC  -  HOME  ↑  END  PGUP
//   行2  TAB CTRL ALT  ←  ↓  →  PGDN
// 按键以合成 KeyboardEvent(keydown) 派发到当前可见终端的
// .xterm-helper-textarea —— 走 xterm 官方键处理链
// （evaluateKeyboardEvent → onData → ws），不碰 renderer 产物：
//   ↑=\x1b[A  ESC=\x1b  TAB=\t  HOME=\x1b[H  PGUP=\x1b[5~ …
//
// CTRL / ALT 是 sticky 修饰键（Termux 语义）：点一下点亮，作用于下一个
// 按键（按键条上的键、硬件键盘、软键盘 IME 输入均可），用完自动熄灭；
// 再点一下取消。三条注入路径：
//   1) 按键条按键 → 直接带修饰派发；
//   2) 硬件键盘 keydown → document 捕获阶段拦下原件，改写修饰位后
//      重新派发（xterm 只看到改写后的事件，不会双发）；
//   3) 软键盘 IME（Android 上字母多为 keyCode 229 + input 事件）→
//      拦 beforeinput(insertText)，按字符现算 keyCode 派发组合键，
//      并掐掉随后的 input（xterm 挂在 input 上，不吃到原字符）。
// 不修改官方 renderer 与 www/assets/ 产物；只增量注入本文件 + script 标签。
(function () {
  "use strict";
  var inSubframe = false;
  try { inSubframe = window.parent && window.parent !== window; } catch (e) {}
  // 终端只存在于主文档；iframe（设置层等）里不装
  if (inSubframe) return;
  // 只在 android 手机壳生效（alma-droid-shim 先于本文件执行，已设好）
  var platform = "";
  try { platform = (document.body && document.body.dataset.platform) || ""; } catch (e) {}
  if (platform !== "android") return;

  // ── 按键表：合成事件的关键属性（keyCode 是 xterm evaluateKeyboardEvent
  //    的 switch 键；DOM 规范里 KeyboardEventInit 不含它，用 defineProperty 补）──
  var KEYS = {
    esc:   { label: "ESC",  key: "Escape",     code: "Escape",     keyCode: 27 },
    dash:  { label: "-",    key: "-",          code: "Minus",      keyCode: 189 },
    home:  { label: "HOME", key: "Home",       code: "Home",       keyCode: 36 },
    up:    { label: "↑", key: "ArrowUp",   code: "ArrowUp",    keyCode: 38 },
    end:   { label: "END",  key: "End",        code: "End",        keyCode: 35 },
    pgup:  { label: "PGUP", key: "PageUp",     code: "PageUp",     keyCode: 33 },
    tab:   { label: "TAB",  key: "Tab",        code: "Tab",        keyCode: 9 },
    left:  { label: "←", key: "ArrowLeft",  code: "ArrowLeft",  keyCode: 37 },
    down:  { label: "↓", key: "ArrowDown", code: "ArrowDown",  keyCode: 40 },
    right: { label: "→", key: "ArrowRight", code: "ArrowRight", keyCode: 39 },
    pgdn:  { label: "PGDN", key: "PageDown",   code: "PageDown",   keyCode: 34 }
  };
  var ROWS = [
    ["esc", "dash", "home", "up", "end", "pgup"],
    ["tab", "ctrl", "alt", "left", "down", "right", "pgdn"]
  ];

  // sticky 修饰键状态：armed = 已点亮待消费
  var armed = { ctrl: false, alt: false };

  // ── 终端定位 ────────────────────────────────────────────────────────
  function textareas() {
    var list = [];
    try {
      var all = document.querySelectorAll(".xterm-helper-textarea");
      for (var i = 0; i < all.length; i++) {
        if (all[i].isConnected) list.push(all[i]);
      }
    } catch (e) {}
    return list;
  }
  // 多终端 tab 时取正在展示的那个（.terminal 容器有非零盒）；都不可见时
  // 取最后一个（派发不依赖可见性，兜底仍能送达）。
  function activeTextarea() {
    var tas = textareas();
    if (!tas.length) return null;
    for (var i = 0; i < tas.length; i++) {
      var box = tas[i].closest ? tas[i].closest(".terminal") : null;
      if (!box) continue;
      var r = box.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return tas[i];
    }
    return tas[tas.length - 1];
  }

  // ── 合成派发 ────────────────────────────────────────────────────────
  function synthKeydown(ta, init, keyCode) {
    var ev;
    try {
      ev = new KeyboardEvent("keydown", init);
    } catch (e) { return; }
    // keyCode/which 是遗留属性，不在 KeyboardEventInit 规范里（Chromium
    // 实测可透传，但用自身 getter 盖掉原型读取，任何引擎都稳）
    try {
      Object.defineProperty(ev, "keyCode", { get: function () { return keyCode; }, configurable: true });
      Object.defineProperty(ev, "which", { get: function () { return keyCode; }, configurable: true });
    } catch (e) {}
    // 自产事件标记：document 捕获层的改写器见到它直接放行（防回环）
    try { ev.__almaTermKeys = true; } catch (e) {}
    ta.dispatchEvent(ev);
  }

  // ALT 的终端标准展开（xterm keydown 不处理 alt 修饰组合，CDP 实测：
  // alt+x 带 keyCode 也无输出）：先发 ESC(\x1b)，再发无修饰的本键 ——
  // readline 的 meta 语义 alt+x == ESC x。
  function sendEsc(ta) {
    synthKeydown(ta, { key: "Escape", code: "Escape",
      bubbles: true, cancelable: true, composed: true }, 27);
  }

  // 可打印字符走 keypress（xterm 的 keydown 表不含无修饰字母；字符
  // 由 keypress charCode 路径进 onData）
  function synthKeypress(ta, ch, charCode) {
    var ev;
    try {
      ev = new KeyboardEvent("keypress", {
        key: ch, bubbles: true, cancelable: true, composed: true });
    } catch (e) { return; }
    try {
      Object.defineProperty(ev, "keyCode", { get: function () { return charCode; }, configurable: true });
      Object.defineProperty(ev, "which", { get: function () { return charCode; }, configurable: true });
      Object.defineProperty(ev, "charCode", { get: function () { return charCode; }, configurable: true });
    } catch (e) {}
    try { ev.__almaTermKeys = true; } catch (e) {}
    ta.dispatchEvent(ev);
  }

  function consumeSticky() {
    armed.ctrl = false;
    armed.alt = false;
    paintModifiers();
  }

  // 按键条按键：把 sticky 修饰合进事件直接派发
  function pressBarKey(id) {
    var ta = activeTextarea();
    if (!ta) return;
    var spec = KEYS[id];
    if (!spec) return;
    if (armed.ctrl && id === "dash") {
      // Ctrl + "-" ：真终端语义 = Ctrl+_ = \x1f(US)。xterm 的 keydown 表
      // 只认 key:"_"+ctrl+shift，照实映射（与硬件键盘 Ctrl+Shift+- 等价）。
      synthKeydown(ta, { key: "_", code: "Minus", ctrlKey: true, shiftKey: true,
        bubbles: true, cancelable: true, composed: true }, 189);
    } else {
      if (armed.alt) sendEsc(ta);
      synthKeydown(ta, { key: spec.key, code: spec.code,
        ctrlKey: armed.ctrl, altKey: false, shiftKey: false, metaKey: false,
        bubbles: true, cancelable: true, composed: true }, spec.keyCode);
    }
    consumeSticky();
  }

  // ── 路径 2：硬件键盘 keydown 改写（document 捕获阶段，先于 xterm 的
  //    textarea 监听器执行）──────────────────────────────────────────
  function isModifierKeyCode(kc) { return kc === 16 || kc === 17 || kc === 18 || kc === 229; }

  document.addEventListener("keydown", function (e) {
    if (e.__almaTermKeys) return;                      // 自产事件不回环
    if (!armed.ctrl && !armed.alt) return;             // 无 sticky：全透传
    var t = e.target;
    if (!t || !t.closest || !t.closest(".xterm-helper-textarea")) return; // 只管终端
    if (isModifierKeyCode(e.keyCode)) return;          // 修饰键本体/IME 229：不消费
    try { if (e.isComposing) return; } catch (err) {}  // 输入法组合中不插手
    // 拦下原件（xterm 看不到 → 不会双发），带修饰重派
    e.stopImmediatePropagation();
    e.preventDefault();
    var init = {
      key: e.key, code: e.code, location: e.location, repeat: e.repeat,
      ctrlKey: armed.ctrl || e.ctrlKey, altKey: armed.alt || e.altKey,
      shiftKey: e.shiftKey, metaKey: e.metaKey,
      bubbles: true, cancelable: true, composed: true
    };
    // 合成/异常事件的 keyCode 可能缺 0：xterm 的 ctrl 表按 keyCode 查
    // （CDP 实测 key:'c'+ctrl 无 keyCode 无输出，补 67 即 \x03），
    // 单字符 key 现算兜底。
    var kc = e.keyCode || (e.key && e.key.length === 1 ? e.key.toUpperCase().charCodeAt(0) : 0);
    var useCtrl = armed.ctrl, useAlt = armed.alt;
    consumeSticky();
    var ta = activeTextarea() || t;
    init.ctrlKey = useCtrl || e.ctrlKey;
    init.altKey = false; // alt 走 ESC 展开前置发送
    if (useAlt) sendEsc(ta);
    synthKeydown(ta, init, kc);
  }, true);

  // ── 路径 3：软键盘 IME insertText → 组合键（Android 字母键 keydown 多为
  //    keyCode 229，真字符走 input 事件；xterm 挂 input，拦 beforeinput 即可
  //    既掐掉原字符又送出组合字节）───────────────────────────────────
  function hookTextarea(ta) {
    if (ta.__almaTermKeysHooked) return;
    try { ta.__almaTermKeysHooked = true; } catch (e) { return; }
    ta.addEventListener("beforeinput", function (e) {
      if (e.__almaTermKeys) return;
      if (!armed.ctrl && !armed.alt) return;
      if (e.inputType !== "insertText" || !e.data || e.data.length !== 1) return;
      try { if (e.isComposing) return; } catch (err) {}
      try { e.preventDefault(); } catch (err) {}
      try { e.stopImmediatePropagation(); } catch (err) {}
      var ch = e.data;
      // 字母 → 大写 keyCode（xterm 的 ctrl/alt 字母表按 65-90 算）；
      // 其他字符保持原字面 keyCode（alt+数字/标点走 xterm 的 ESC+字面表）。
      // shift 恒 false：IME 给的是最终字符，ctrl 表要求不带 shift 才命中
      var upper = ch.toUpperCase();
      var kc = upper.charCodeAt(0);
      var code = (upper >= "A" && upper <= "Z") ? ("Key" + upper) : null;
      var useCtrl = armed.ctrl, useAlt = armed.alt;
      consumeSticky();
      var ta2 = activeTextarea() || ta;
      if (useAlt) sendEsc(ta2);
      if (useCtrl) {
        var init = { key: ch, ctrlKey: true, altKey: false,
          shiftKey: false, metaKey: false, bubbles: true, cancelable: true, composed: true };
        if (code) init.code = code;
        synthKeydown(ta2, init, kc);
      } else {
        // alt 单修饰：ESC 已发，字符走无修饰 keypress（onData 顺序 = ESC 后
        // 字符）。charCode 用原字符（kc 是大写化的 keyCode，只供 ctrl 表查）
        synthKeypress(ta2, ch, ch.charCodeAt(0));
      }
    });
  }

  // ── 按键条 UI ───────────────────────────────────────────────────────
  var bar = null;
  var btns = {};

  function buildBar() {
    bar = document.createElement("div");
    bar.className = "alma-term-keys";
    bar.setAttribute("aria-label", "terminal extra keys");
    bar.hidden = true;
    for (var r = 0; r < ROWS.length; r++) {
      var row = document.createElement("div");
      row.className = "atk-row";
      for (var i = 0; i < ROWS[r].length; i++) {
        var id = ROWS[r][i];
        var b = document.createElement("button");
        b.type = "button";
        if (id === "ctrl" || id === "alt") {
          b.className = "atk-mod";
          b.textContent = id.toUpperCase();
          b.setAttribute("aria-pressed", "false");
          (function (which) {
            b.addEventListener("click", function () {
              armed[which] = !armed[which];
              paintModifiers();
              try { window.almaHaptics && window.almaHaptics.selection(); } catch (e) {}
            });
          })(id);
        } else {
          b.textContent = KEYS[id].label;
          (function (keyId) {
            b.addEventListener("click", function () {
              pressBarKey(keyId);
              try { window.almaHaptics && window.almaHaptics.selection(); } catch (e) {}
            });
          })(id);
        }
        b.setAttribute("data-k", id);
        btns[id] = b;
        row.appendChild(b);
      }
      bar.appendChild(row);
    }
    // pointerdown 只 preventDefault（不抢终端焦点，click 照常派发）
    bar.addEventListener("pointerdown", function (e) {
      try { e.preventDefault(); } catch (err) {}
      // 焦点不在终端上时点按键条：把终端聚焦回来（软键盘继续可用）
      var ta = activeTextarea();
      if (ta && document.activeElement !== ta) {
        try { ta.focus({ preventScroll: true }); } catch (err) { ta.focus(); }
      }
    });
    var style = document.createElement("style");
    style.textContent = [
      ".alma-term-keys{position:fixed;left:0;right:0;bottom:0;z-index:2147480000;",
      "display:flex;flex-direction:column;gap:2px;",
      "padding:3px 3px calc(3px + env(safe-area-inset-bottom,0px));",
      "background:var(--muted,rgba(34,37,46,.96));",
      "border-top:1px solid var(--border,rgba(127,127,127,.35));",
      "font:600 12.5px/1 system-ui,sans-serif;color:var(--foreground,#e8e8e8);",
      "user-select:none;-webkit-user-select:none;touch-action:manipulation;}",
      ".alma-term-keys[hidden]{display:none}",
      ".atk-row{display:flex;gap:3px}",
      ".alma-term-keys button{flex:1 1 0;height:38px;margin:0;padding:0;",
      "border:0;border-radius:8px;background:transparent;",
      "color:inherit;font:inherit;letter-spacing:.02em;cursor:pointer}",
      ".alma-term-keys button:active{background:var(--background,rgba(127,127,127,.25))}",
      ".alma-term-keys .atk-mod{background:var(--background,rgba(127,127,127,.18))}",
      ".alma-term-keys .atk-mod.atk-armed{",
      "background:var(--primary,#2563eb);color:var(--primary-foreground,#fff)}"
    ].join("");
    document.head.appendChild(style);
    document.body.appendChild(bar);
  }

  function paintModifiers() {
    if (!bar) return;
    for (var i = 0; i < ROWS.length; i++) {
      for (var j = 0; j < ROWS[i].length; j++) {
        var id = ROWS[i][j];
        if (id === "ctrl" || id === "alt") {
          var on = armed[id];
          btns[id].classList.toggle("atk-armed", on);
          btns[id].setAttribute("aria-pressed", on ? "true" : "false");
        }
      }
    }
  }

  // 可见性：页面里有「正在展示」的终端才显示按键条；终端没了自动隐藏并
  // 复位 sticky（避免修饰键状态泄漏到别处）。
  function refresh() {
    if (!bar) return;
    var tas = textareas();
    var visible = false;
    for (var i = 0; i < tas.length; i++) {
      hookTextarea(tas[i]);
      var box = tas[i].closest ? tas[i].closest(".terminal") : null;
      if (box) {
        var r = box.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) { visible = true; break; }
      }
    }
    if (bar.hidden === visible) {
      bar.hidden = !visible;
      if (!visible) consumeSticky();
    }
  }

  // ── 挂载与追踪 ──────────────────────────────────────────────────────
  function start() {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", start);
      return;
    }
    buildBar();
    // 终端出现/消失（React 挂载）、tab 切换（className 变化）都要跟进
    try {
      var mo = new MutationObserver(function () {
        try { refresh(); } catch (e) {}
      });
      mo.observe(document.documentElement, {
        childList: true, subtree: true,
        attributes: true, attributeFilter: ["class", "style", "hidden"]
      });
    } catch (e) {}
    // 兜底轮询：捕获无 DOM 变化的显隐切换（如祖先 display 变更未冒泡观察）
    setInterval(function () {
      try { refresh(); } catch (e) {}
    }, 700);
    refresh();
  }

  start();

  // CDP 回归测试钩子（只读状态，不引入额外能力）
  window.__almaTermKeysState = function () {
    return { ctrl: armed.ctrl, alt: armed.alt, visible: !!(bar && !bar.hidden) };
  };
})();
