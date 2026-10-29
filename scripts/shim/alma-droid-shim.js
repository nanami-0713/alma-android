// alma-android 平台 shim：在应用 JS 之前就位，等价官方 iOS 壳提供的原生桥。
// 全部 ??= —— 只补缺失，不覆盖任何已存在实现。
// 平台身份：android（isPhoneShell / PlatformContext 已扩展 android 分支）
(function () {
  var noop = function () {};
  var rejecter = function (name) {
    return function () { return Promise.reject(new Error(name + " unavailable on this device")); };
  };
  var noopObj = function (fns, base) {
    var o = base || {};
    fns.forEach(function (n) { if (!o[n]) o[n] = function () { return Promise.resolve({}); }; });
    return o;
  };
  var capPlugin = function (name) {
    try { return (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins[name]) || null; }
    catch (e) { return null; }
  };

  var PLATFORM = "android";

  // ── 关键：首帧就是手机布局 ─────────────────────────────────────
  // PlatformProvider 初始 platform="darwin"，get() 异步返回后切换会导致
  // 桌面布局闪现再重挂载（"一闪一闪"的元凶）。本脚本在应用模块执行前同步设好。
  if (document.body) document.body.dataset.platform = PLATFORM;
  document.addEventListener("DOMContentLoaded", function () {
    document.body.dataset.platform = PLATFORM;
  });

  // ── 冷启动底色：React 挂载前用主题色打底（与官方 FOUC guard 同一缓存键）──
  // html 背景/主题变量在 CSS 与 root class 之外再垫一层内联底色，
  // 避免 body 为空时露出视口默认白底（暗色用户看到的是"白屏"的主因）。
  try {
    var raw = localStorage.getItem("alma:appearance-cache");
    var mode = raw ? (JSON.parse(raw).mode || null) : null;
    if (mode === "dark" || mode === "light") {
      document.documentElement.style.backgroundColor = mode === "dark" ? "#282c34" : "#ffffff";
    }
  } catch (e) {}

  // ── 语言：跟随系统 ────────────────────────────────────────────────
  // i18next 检测顺序 localStorage → navigator，且结果永久缓存；而 Android WebView
  // 的 navigator.language 长期不随系统语言（Capacitor 已知问题，常返 en-US）→
  // 首启误检为英文后永不重检。原生侧提供权威 locale（__almaAndroidLang__ 由
  // documentStart 脚本注入 / __almaAndroidLocale 由 JavascriptInterface 提供），
  // 本 shim 在 i18next 模块执行前预置缓存键；用户在设置里手动选过语言
  // （alma.android.lang.user 标记）后不再自动跟随。
  try {
    if (!localStorage.getItem("alma.android.lang.user")) {
      var natLang = "";
      try { natLang = String(window.__almaAndroidLang__ || ""); } catch (e) {}
      if (!natLang && window.__almaAndroidLocale) {
        try { natLang = String(window.__almaAndroidLocale.getLanguageTag()); } catch (e) {}
      }
      if (!natLang) natLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
      var nl = natLang.toLowerCase();
      localStorage.setItem("i18nextLng", nl.indexOf("zh") === 0 ? "zh" : nl.indexOf("ja") === 0 ? "ja" : "en");
    }
  } catch (e) {}

  window.platform = window.platform || {
    get: function () { return Promise.resolve(PLATFORM); },
    windowControlsHidden: function () { return Promise.resolve(false); }
  };
  window.__ALMA_ANDROID__ = true;

  // UI 细节：hero 副标题平衡换行（中文文案末尾的 "Alma" 不再孤行到第二行）
  try {
    var st = document.createElement("style");
    st.textContent = ".hero-fade.mb-8{text-wrap:balance}";
    document.head.appendChild(st);
  } catch (e) {}

  // 手机顶栏触控尺寸：renderer 的尺寸全走 rem，root font-size 默认 13px
  // （UI_FONT_SIZE_DEFAULT=13 / compact 密度）→ h-11 实算 35.75px、图标
  // size-4 只有 13px，远低于 Android 48dp 触控标准。这里用物理 px 锁死，
  // 不受 UI 字体缩放影响；!important 是因为 [&_svg:not([class*='size-'])]
  // :size-4 会盖掉 lucide 的 size 属性。布局让位见 scripts/patch-phone-chrome.py。
  try {
    var st2 = document.createElement("style");
    st2.textContent = [
      "[data-layout-chrome-actions] button{width:44px!important;height:44px!important;padding:0!important}",
      "[data-layout-chrome-actions] button svg{width:20px!important;height:20px!important}",
      'button[aria-label="Outputs & Sources"]{width:40px!important;height:40px!important;padding:0!important}',
      'button[aria-label="Outputs & Sources"] svg{width:18px!important;height:18px!important}'
    ].join("");
    document.head.appendChild(st2);
  } catch (e) {}

  // API 桥：不在本 shim 定义 —— connected 模块的官方 apiServerShim（??= 安装）接管：
  // getBackendMode()（Preferences：remote/local）→ remote+E2E 激活给哨兵 baseURL、
  // local 给 LOCAL_BASE。配对状态读的是 Capacitor Preferences（真机原生存储），
  // 与 setE2EConfig 写入同源，避免手写判定在真机上错位。

  // ── 设置窗口：同文档 iframe 覆盖层 ──────────────────────────────
  // 桌面端设置是独立 BrowserWindow；直接用 location 导航会让整个 renderer
  // 冷启动（且 E2E 中继的活跃 WebSocket 使页面无 bfcache 资格）→ 关设置白屏数秒。
  // 改为 iframe 承载 settings.html：开=显示（首开后常驻隐藏复用，秒开），关=隐藏。
  // 注意：刻意不做 pushState/history.back —— iframe 参与联合会话历史，
  // 跨 frame 的历史操作存在竞态（实测会把主文档弹到 about:blank）；
  // Android 返回键由 MainActivity 原生侧调 window.__almaAndroidBack() 接管。
  var inSubframe = false;
  try { inSubframe = window.parent && window.parent !== window; } catch (e) {}

  // ── 设置层（iframe）专属修复 ─────────────────────────────────────
  if (inSubframe) {
    // Capacitor 官方注入主帧优先（现代设备 documentStart 脚本本就覆盖同源 iframe）；
    // 但部分 WebView 版本 iframe 拿不到完整原生桥 —— 只要宿主的原生桥可用就强制
    // 借用宿主的（闭包都在宿主上下文，androidBridge 等引用正确），兜底裂脑：
    // iframe 写 localStorage / 主帧读原生 SharedPreferences 的"配对没反应"。
    try {
      var pCap = window.parent && window.parent.Capacitor;
      if (pCap && pCap.isNativePlatform && pCap.isNativePlatform()) {
        window.Capacitor = pCap;
      } else if (!window.Capacitor && pCap) {
        window.Capacitor = pCap;
      }
    } catch (e) {}
    // 配对/忘记/切换运行模式都发生在设置层内：setBackendMode 只派发本帧事件，
    // applyPairingLink 的 location.reload() 也只重载 iframe —— 把"运行模式已提交"
    // （backend-mode-changed，applyPairingLink 里位于 setE2EConfig 之后的提交点）
    // 转发给宿主整页重载。注意不转发 e2e-config-changed：它先于 setBackendMode
    // 触发，此时重载会截断流程，留下半配对状态。
    window.addEventListener("alma:ios:backend-mode-changed", function () {
      try { window.parent.postMessage({ type: "alma-android-reload-main" }, "*"); } catch (e) {}
    });
  }

  // 主帧侧：把主题/配对类同步请求应用到主文档（设置层 iframe 发来）
  function applyThemeToMain(mode) {
    if (mode !== "light" && mode !== "dark" && mode !== "system") return;
    var dark = mode === "dark" ||
      (mode === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(dark ? "dark" : "light");
    root.style.backgroundColor = dark ? "#282c34" : "#ffffff";
    // 与官方 FOUC 缓存同键：主文档下次冷启动直接用新主题打底
    try {
      var raw = localStorage.getItem("alma:appearance-cache");
      var cache = raw ? JSON.parse(raw) : {};
      cache.mode = mode;
      localStorage.setItem("alma:appearance-cache", JSON.stringify(cache));
    } catch (e) {}
  }

  function settingsFrame() { return document.getElementById("alma-settings-frame"); }
  function hideSettingsFrame() {
    var f = settingsFrame();
    if (f) f.style.display = "none";
  }
  if (!inSubframe) {
    window.addEventListener("message", function (e) {
      if (!e || !e.data) return;
      if (e.data.type === "alma-settings-close") hideSettingsFrame();
      // 设置层里完成配对/断开：主文档整页重载（iframe 自己的 reload 不影响宿主）
      if (e.data.type === "alma-android-reload-main") location.reload();
      // 设置层扫码解码成功：链接交主帧执行（almaIOSConfig + 原生 Capacitor 都在
      // 主帧，v1.0 验证过的环境；applyPairingLink 成功后自行 reload）
      if (e.data.type === "alma-android-apply-pairing") {
        var cfg = window.almaIOSConfig;
        if (cfg && cfg.applyPairingLink) {
          try { void cfg.applyPairingLink(String(e.data.link)); } catch (err) {}
        }
      }
      // 设置层切换主题：主文档即时同步（不等冷启动）
      if (e.data.type === "alma-android-theme") applyThemeToMain(e.data.theme);
    });
    // 原生返回键入口（MainActivity.onBackPressed 调用）：设置层可见则关闭并报告已处理
    window.__almaAndroidBack = function () {
      var f = settingsFrame();
      if (f && f.style.display !== "none") { hideSettingsFrame(); return true; }
      return false;
    };
  }

  window.settingsWindow ??= {
    open: function (tab) {
      if (inSubframe) return Promise.resolve(); // 设置层内部不再开新层
      var f = settingsFrame();
      if (!f) {
        f = document.createElement("iframe");
        f.id = "alma-settings-frame";
        f.src = "./settings.html" + (tab ? "#" + encodeURIComponent(tab) : "");
        // 扫码相机跑在本 iframe：显式授予 camera/mic（同源本应默认放行，
        // 加上以规避个别 WebView 版本的 Permissions Policy 判定）
        f.setAttribute("allow", "camera; microphone; fullscreen");
        f.setAttribute("style",
          "position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483000;background:#fff");
        document.body.appendChild(f);
      } else {
        f.style.display = "block";
      }
      return Promise.resolve();
    },
    close: function () {
      if (inSubframe) {
        // 设置层内部（settings.html 的完成按钮）：通知宿主隐藏
        try { window.parent.postMessage({ type: "alma-settings-close" }, "*"); } catch (e) {}
      } else {
        hideSettingsFrame();
      }
      return Promise.resolve();
    }
  };

  // 触感：优先 Capacitor Haptics 原生震动
  window.haptics ??= {
    tick: function (style) {
      var H = capPlugin("Haptics");
      if (H) H.impact({ style: "LIGHT" }).catch(noop);
    },
    impact: function (o) { var H = capPlugin("Haptics"); if (H) H.impact(o || { style: "LIGHT" }).catch(noop); },
    notification: function (o) { var H = capPlugin("Haptics"); if (H) H.notification(o || { type: "SUCCESS" }).catch(noop); },
    selection: function () { var H = capPlugin("Haptics"); if (H) H.selectionChanged().catch(noop); }
  };

  // Electron ipcRenderer：不可用语义（未配对手机同样无主进程）
  window.ipcRenderer ??= {
    send: noop, sendSync: function () { return undefined; }, sendTo: noop, sendToHost: noop, postMessage: noop,
    invoke: rejecter("ipcRenderer"),
    on: noop, once: noop, off: noop, removeListener: noop, removeAllListeners: noop,
    emit: noop, listenerCount: function () { return 0; }
  };

  // 剪贴板：优先 Capacitor 原生（Android WebView 的 navigator.clipboard 常被拒）
  window.electronClipboard ??= {
    writeText: function (t) {
      var C = capPlugin("Clipboard");
      if (C) return C.write({ string: t });
      return (navigator.clipboard || { writeText: noop }).writeText(t);
    },
    readText: function () {
      var C = capPlugin("Clipboard");
      if (C) return C.read().then(function (r) { return r && r.value || ""; });
      if (navigator.clipboard && navigator.clipboard.readText) return navigator.clipboard.readText();
      return Promise.resolve("");
    }
  };

  // 应用信息：真值实现（版本懒读 renderer 自带的 SENTRY_RELEASE，形如 alma@0.4.213）
  window.almaApp ??= {
    getInfo: function () {
      var ver = "";
      try {
        var id = (window.SENTRY_RELEASE && window.SENTRY_RELEASE.id) || "";
        ver = id.indexOf("@") > -1 ? id.split("@")[1] : id;
      } catch (e) {}
      return Promise.resolve({ name: "Alma", version: ver, build: "", platform: PLATFORM, arch: "android" });
    },
    getVersion: function () {
      return this.getInfo().then(function (i) { return i.version; });
    },
    checkForUpdates: function () { return Promise.resolve({ available: false, version: null }); },
    getUpdateInfo: function () { return Promise.resolve({ available: false, version: null }); },
    quit: noop, relaunch: noop
  };

  // 桌面专属桥：无害降级
  window.windowControls ??= {
    setWindowControlsHidden: noop, getWindowControlsHidden: function () { return Promise.resolve(false); },
    isMaximized: function () { return Promise.resolve(false); },
    isFullscreen: function () { return Promise.resolve(false); },
    isFullScreen: function () { return Promise.resolve(false); },
    isFocused: function () { return Promise.resolve(true); },
    minimize: noop, maximize: noop, unmaximize: noop, close: noop, toggleFullscreen: noop
  };
  window.systemFile ??= noopObj(["open", "save", "reveal", "openAndRead"]);
  window.moreMenu ??= { show: noop, hide: noop };
  window.selectDirectory ??= rejecter("selectDirectory");
  window.getPathForFile ??= function (f) { return f && f.name; };
})();
