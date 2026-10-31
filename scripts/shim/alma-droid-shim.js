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
  // 无缓存（首装/清数据）时退回系统深浅色，不再是"没打底"。
  try {
    var raw = localStorage.getItem("alma:appearance-cache");
    var mode = raw ? (JSON.parse(raw).mode || null) : null;
    if (mode !== "dark" && mode !== "light") {
      mode = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }
    document.documentElement.style.backgroundColor = mode === "dark" ? "#282c34" : "#ffffff";
  } catch (e) {}

  // ── 主题工具：当前生效底色 + 上报原生（WebView 底色/系统栏图标） ──────
  // 原生侧（MainActivity.UiBridge）持同样的 dark=#282c34 / light=#ffffff，
  // 这里把「应用主题」（appearance-cache，可能非跟随系统）同步过去：
  // 冷启动/重载兜底底色、edge-to-edge 下状态栏图标对比度都依赖它。
  function resolvedThemeMode() {
    var m = null;
    try {
      var raw = localStorage.getItem("alma:appearance-cache");
      m = raw ? (JSON.parse(raw).mode || null) : null;
    } catch (e) {}
    return m === "dark" || m === "light" ? m : "system";
  }
  function pageBg(mode) {
    var m = mode || resolvedThemeMode();
    var dark = m === "dark" ||
      (m !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return dark ? "#282c34" : "#ffffff";
  }
  function notifyNativeTheme(mode) {
    try {
      if (window.__almaAndroidUi && window.__almaAndroidUi.setTheme) {
        window.__almaAndroidUi.setTheme(mode || resolvedThemeMode());
      }
    } catch (e) {}
  }
  notifyNativeTheme();


  // ── 语言：跟随系统 ────────────────────────────────────────────────
  // i18next 检测顺序 localStorage → navigator，且结果永久缓存；而 Android WebView
  // 的 navigator.language 长期不随系统语言（Capacitor 已知问题，常返 en-US）→
  // 首启误检为英文后永不重检。原生侧提供权威 locale（__almaAndroidLang__ 由
  // documentStart 脚本注入 / __almaAndroidLocale 由 JavascriptInterface 提供），
  // 本 shim 在 i18next 模块执行前预置缓存键；用户在设置里手动选过语言
  // （alma.android.lang.user 标记）后不再自动跟随。
  try {
    var natLang = "";
    try { natLang = String(window.__almaAndroidLang__ || ""); } catch (e) {}
    if (!natLang && window.__almaAndroidLocale) {
      try { natLang = String(window.__almaAndroidLocale.getLanguageTag()); } catch (e) {}
    }
    if (!natLang) natLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    // 无论是否手动选过语言都暴露原生 locale：设置层「跟随系统」档要现算
    // 系统语言（documentStart 注入 <API 33 不存在，iframe 也能走到这里）。
    try { window.__almaAndroidLang__ = window.__almaAndroidLang__ || natLang; } catch (e) {}
    if (!localStorage.getItem("alma.android.lang.user")) {
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

  // ── 工作区侧栏（Outputs & Sources 打开的 dock）手机适配 ──────────
  // renderer 的 dock 是桌面右侧分栏：resolveDockWidth 在窄屏把它钳到 ≤300px，
  // 与会话区同层挤排（竖屏实拍：会话列被挤成 ~110px 一列一字）。手机语义
  // 应该是「文件页」：竖屏 = 全屏覆盖层（position:fixed 压过顶栏固定钮，
  // dock 自带的关闭钮不再被新建对话钮盖住）；横屏保留分栏（宽度足够），
  // 但 dock 打开时藏掉与 dock 头部右侧撞位的固定钮（右上钮组 + 资源宿主）。
  // :has() 需 Chromium 105+，与 webview-gate 的 111 门槛兼容。
  try {
    var st3 = document.createElement("style");
    st3.textContent = [
      // 竖屏：dock 整页化。width/min-width/max-width 用 !important 顶掉内联
      // style 写入的 effectiveWidth（300px）；inset:0 铺满视口。
      "@media (orientation: portrait){",
      "[data-right-dock]{position:fixed!important;inset:0!important;",
      "width:100vw!important;min-width:100vw!important;max-width:100vw!important;",
      "z-index:2147480000!important;border-left:0!important;",
      // dock 本体是 bg-muted/30（分栏下的毛玻璃感）：整页模式下后面的会话
      // 会透出来，全屏页必须不透明（内容区自带实底，这里兜最底层）。
      "background:var(--background)!important;}",
      // 拖宽把手在全屏页里没有意义，还挡左侧边缘触摸
      "[data-right-dock]>.cursor-col-resize{display:none!important}",
      // ⚠ dock 的 z-index 再大也被父级 `relative z-10 h-screen flex` 的层叠
      // 上下文封顶 —— 外层 fixed 顶栏（z-100 新建对话钮等）照样浮在整页
      // dock 之上盖住其关闭钮（-16 实机：竖屏 X 仍不可点、横屏正常）。
      // z-index 无解，唯一出路：dock 开着时把固定顶栏整行 + 资源宿主
      // visibility:hidden（关闭钮从此是右上角唯一可点元素；关 dock 即恢复）。
      // 抽屉（z-201）同理浮在 dock 上，但整行隐藏后竖屏全屏页里已无入口
      // 打开抽屉，状态不可达。
      "body:has([data-right-dock]) [data-layout-chrome-actions],",
      'body:has([data-right-dock]) .fixed.top-1.z-\\[100\\]{visibility:hidden!important}',
      "}",
      // 横屏：dock 打开时，与其头部右侧撞位的固定元素让位（visibility 保布局）
      "@media (orientation: landscape){",
      "body:has([data-right-dock]) [data-layout-chrome-actions]>div:last-child,",
      'body:has([data-right-dock]) .fixed.top-1.z-\\[100\\]{visibility:hidden!important}',
      "}",
      // 触控目标：dock tab 栏右端两个 26px 图标钮（折叠/关闭）提到 36px；
      // 文件面包屑行（h-8）里的 19px 图标钮（含关闭文件）提到 28px。
      '[data-right-dock] .dock-tab-bar>.flex-shrink-0.items-center~button',
      "{min-width:36px!important;min-height:36px!important}",
      "[data-right-dock] .h-8>.size-5{min-width:28px!important;min-height:28px!important}",
      // 预览排版兜底：表格横向滚动、图片限宽、长 token（URL/哈希/路径）可断行。
      // 代码行的换行由 renderer 自己的 wordWrap 状态管（见下方 localStorage 预置），
      // 这里只管 markdown 预览与表格。
      "[data-right-dock] table{display:block;max-width:100%;overflow-x:auto}",
      "[data-right-dock] img,[data-right-dock] video{max-width:100%}",
      "[data-right-dock] p,[data-right-dock] li,[data-right-dock] h1,[data-right-dock] h2,",
      "[data-right-dock] h3,[data-right-dock] h4,[data-right-dock] td,[data-right-dock] th,",
      "[data-right-dock] dd,[data-right-dock] dt{overflow-wrap:anywhere}"
    ].join("");
    document.head.appendChild(st3);
  } catch (e) {}

  // 文件预览默认自动换行：renderer 的 readFileWordWrap 只认 "1"（"0" = 用户
  // 明确关过）。手机竖屏 ~300-400px 宽，代码不换行基本没法读。仅首启预置，
  // 不覆盖用户选择；Alt+Z 开关照常可用。
  try {
    if (localStorage.getItem("alma.filePreview.wordWrap") === null) {
      localStorage.setItem("alma.filePreview.wordWrap", "1");
    }
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
  // 清掉上次会话遗留的延迟重载标记（正常路径设置层关闭时就已消费；异常退出
  // ——如忘记后直接杀进程—— 标记已无意义：本次启动本身已按新 backendMode 自举）
  if (!inSubframe) {
    try { localStorage.removeItem("alma.android.pendingMainReload"); } catch (e) {}
  }

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
    // applyPairingLink 的 location.reload() 也只重载 iframe。
    //   → remote（配对/切到我的 Mac）：转发宿主整页重载 —— 主应用必须以连接态重启。
    //   → local（忘记这台 Mac / 切回本机）：不打断用户！立即重载会把用户从设置层
    //     踢回对话页（v0.4.213-6 实测反馈）。改为记 pending 标记，等设置层关闭
    //     （完成/原生返回，都走宿主 hideSettingsFrame）再重载 —— 主应用若不重载
    //     会残留已断开的 remote 态，重载本身省不掉，但时机放在离开设置层的瞬间。
    // 注意不转发 e2e-config-changed：它先于 setBackendMode 触发，此时重载会截断
    // 流程，留下半配对状态。
    window.addEventListener("alma:ios:backend-mode-changed", function (e) {
      var mode = e && e.detail;
      try {
        if (mode === "local") {
          localStorage.setItem("alma.android.pendingMainReload", "1");
          return;
        }
        localStorage.removeItem("alma.android.pendingMainReload");
      } catch (err) {}
      try { window.parent.postMessage({ type: "alma-android-reload-main" }, "*"); } catch (e2) {}
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
    // 设置层 iframe 的兜底底色同步（打开瞬间的空窗不再闪白）
    var f0 = settingsFrame();
    if (f0) f0.style.background = dark ? "#282c34" : "#ffffff";
    // 原生侧：WebView 底色 + 系统栏图标深浅
    notifyNativeTheme(mode);
    // 与官方 FOUC 缓存同键：主文档下次冷启动直接用新主题打底
    try {
      var raw = localStorage.getItem("alma:appearance-cache");
      var cache = raw ? JSON.parse(raw) : {};
      cache.mode = mode;
      localStorage.setItem("alma:appearance-cache", JSON.stringify(cache));
    } catch (e) {}
  }

  function settingsFrame() { return document.getElementById("alma-settings-frame"); }
  function settingsLayerOpen() {
    var f = settingsFrame();
    return !!(f && f.style.display !== "none");
  }
  // renderer 自己的覆层（会盖住主界面，pill 不该浮在它们上面）：
  // ① 会话抽屉 —— 固定 z-201 左侧面板（关闭态停在屏幕外，遮罩挂 pointer-events-none）
  // ② 全屏 role=dialog（底部动作单等）。用 computed z-index 判，class 串不稳定。
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
        if (d.id === "alma-update-dialog") continue;
        var dr = d.getBoundingClientRect();
        if (dr.width * dr.height >= innerWidth * innerHeight * 0.5) return true;
      }
    } catch (e) {}
    return false;
  }
  function hideSettingsFrame() {
    var f = settingsFrame();
    if (f) f.style.display = "none";
    // 层关了 pill 可以露头（若仍有新版）
    try { ensureUpdatePill(); } catch (e) {}
    // 断开/忘记后的延迟主文档重载（见 iframe 侧 backend-mode-changed）：设置层
    // 关闭正好是回主界面的过渡点，此刻冷启动成本最低、用户感知最自然。
    try {
      if (localStorage.getItem("alma.android.pendingMainReload") === "1") {
        localStorage.removeItem("alma.android.pendingMainReload");
        location.reload();
      }
    } catch (e) {}
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
    // 设置层内部的子屛回退（我的 Mac / AI 提供商等 detail Pane）：找 renderer 的
    // 返回钮 —— ChevronLeft 图标 + 头部样式 pl-1/pr-2（Tailwind 工具类，不随构建
    // 哈希、语言无关）——它只渲染在 detail Pane 里；Pane 的 aria-hidden 直接由
    // pushed（section !== null）驱动，false = 子屛当前推出。找到且已推出则点它
    // （renderer 自己做 setSection(null) + 滑动动画）；不在子屛 / 找不到返回 false。
    // 结构对不上时静默降级（上层会走整层关闭，即旧行为），绝不抛错。
    function settingsInternalBack(f) {
      try {
        var w = f.contentWindow, d = w && w.document;
        if (!d || !d.querySelectorAll) return false;
        var btns = d.querySelectorAll("button");
        for (var i = 0; i < btns.length; i++) {
          var b = btns[i];
          if (!b.querySelector || !b.querySelector("svg")) continue;
          var cls = " " + (b.className || "") + " ";
          if (cls.indexOf(" pl-1 ") < 0 || cls.indexOf(" pr-2 ") < 0) continue;
          var pane = b.closest ? b.closest("div[aria-hidden]") : null;
          if (!pane || (" " + pane.className + " ").indexOf(" inset-0 ") < 0) continue;
          if (pane.getAttribute("aria-hidden") === "true") continue;
          b.click();
          return true;
        }
      } catch (e) {}
      return false;
    }
    // 原生返回键入口（MainActivity.onBackPressed 调用）：按层级消化 ——
    // 更新弹窗开着先关弹窗（最顶层优先）；设置层可见时在配对屏等子屛上
    // 先于 iframe 内部回退（点 renderer 自己的返回钮，走其动画与
    // 状态机），已在设置根页才整层关闭；两层都算已处理。都不适用才返回 false
    // （交回原生：Web 历史回退，或默认行为）。v0.4.213-7 实测：一刀切关层让
    // 「配对页侧滑」直接踹出应用（第二次返回键 = 退出 App），层级必须在这里补全。
    window.__almaAndroidBack = function () {
      try { if (closeUpdateDialog()) return true; } catch (e) {}
      var f = settingsFrame();
      if (f && f.style.display !== "none") {
        if (settingsInternalBack(f)) return true;
        hideSettingsFrame();
        return true;
      }
      // 工作区侧栏（文件页）开着：返回键 = 关页。竖屏下它是全屏覆盖层
      // （见上方 CSS），没有它的关闭钮手机上几乎退不出去 —— 返回键是
      // 主关闭路径。dock tab 栏最后一个按钮是 renderer 的关闭钮（无
      // aria-label，按 DOM 序取末位；点它走组件自己的状态机与动画）。
      try {
        var dock = document.querySelector("[data-right-dock]");
        if (dock) {
          var btns = dock.querySelectorAll(".dock-tab-bar button");
          if (btns.length) {
            btns[btns.length - 1].click();
            return true;
          }
        }
      } catch (e) {}
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
        // 底色跟主题走（原硬编码 #fff：暗色下每次打开设置都白闪一下）
        f.setAttribute("style",
          "position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483000;background:" + pageBg());
        document.body.appendChild(f);
      } else {
        f.style.display = "block";
      }
      // 设置层盖住主界面，pill 不露头（返回键也不该打着 pill 的主意）
      try { ensureUpdatePill(); } catch (e) {}
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

  // ── 应用内自更新：把 renderer 自带的 updater UI 接到真实现 ─────────
  // renderer 的 AboutSettings / 桌面 badge 全部走 window.almaApp 的
  // autoUpdate 协议（getInfo.autoUpdateSupported / checkForUpdates /
  // downloadUpdate / quitAndInstall / onAutoUpdateStatus 事件流），此前
  // shim 只给"不可用"stub。真实现：GitHub Releases 检查（直连失败走
  // 镜像 raw latest.json）→ 原生 DownloadManager 下载（通知栏可见）→
  // FileProvider 拉起系统安装器（__almaAndroidUpdate 桥）。
  var UPDATE = {
    repo: "nanami-0713/alma-android",
    branch: "main",
    mirrorKey: "alma.android.update.mirror",   // 空串 = 显式禁用镜像
    checkedKey: "alma.android.update.checkedAt",
    stateKey: "alma.android.update.state",     // 终态（设置层 iframe 启动时取）
    relKey: "alma.android.update.rel",         // 最近一次检查结果（tag/apk/fallback）
    // 2026-10 实测：gh-proxy.com 可用（资产 + raw）；旧默认 mirror.ghproxy.com 已失效
    defaultMirror: "https://gh-proxy.com/",
    // 下载兜底镜像链（原生侧按序换：下载失败或文件无效时取下一个）。
    // 2026-10-30 实测单一 gh-proxy 对 39MB 资产可慢至 ~15KB/s 拉不完（实机
    // "安装包已损坏"的主因之一）→ 多备几个分散风险；latest.json 的 mirrors
    // 字段（如有）优先生效，可在不发版的情况下远程调整。
    mirrors: ["https://gh-proxy.com/", "https://ghfast.top/"],
    interval: 6 * 60 * 60 * 1000,              // 启动静默检查限频
    skipKey: "alma.android.update.skippedTag"  // 「跳过此版本」记住的 tag（pill 不再露头）
  };
  var updateState = { status: "idle" };
  var updateListeners = [];
  var updateRel = null;        // { tag, apk, fallback, fallbacks, notes }
  var progressTimer = 0;
  var lastProg = null;         // { t, bytes } 速度估算
  var pollFailCount = 0;       // 连续 failed 计数（广播丢失兜底）

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function mirrorPrefix() {
    var v = lsGet(UPDATE.mirrorKey);
    return v === null ? UPDATE.defaultMirror : v;
  }

  /** APK 壳版本（versionName，与 GitHub tag 对齐）；非壳环境（桌面/E2E）为空。 */
  function shellVersion() {
    try { return (window.__almaAndroidUpdate.getVersionName() || "").trim(); } catch (e) { return ""; }
  }

  // 版本权威 = APK versionName = 内嵌 renderer 版本（0.4.213 形态，用户可见
  // 版本与 Alma 桌面一致）。壳独立修复（renderer 不变）时 release.sh 会发
  // "0.4.213-N" 形态 → 第 4 段参与比较。
  function parseVer(tag) {
    var out = [], p = String(tag || "").replace(/^v/i, "").split(/[.+-]/);
    for (var i = 0; i < 4; i++) out.push(parseInt(p[i], 10) || 0);
    return out;
  }
  function isNewer(tag, current) {
    if (!tag || !current) return false;
    // 遗留壳号折算：1.x 时代的 versionName（1.0 / 1.3.0）与 renderer 版本无关，
    // 它们随包的 renderer 都是 0.4.213 —— 统一折算后比较，否则 1.3.0 用户
    // 收不到 v0.4.213-N 过渡版的升级提示（数值上 0.4.x < 1.x）。
    if (/^1\.\d+(\.\d+)?$/.test(current)) current = "0.4.213";
    var a = parseVer(tag), b = parseVer(current);
    for (var i = 0; i < 4; i++) if (a[i] !== b[i]) return a[i] > b[i];
    return false;
  }

  function emitUpdate(state) {
    updateState = state;
    for (var i = 0; i < updateListeners.length; i++) {
      try { updateListeners[i](state); } catch (e) {}
    }
  }

  // 状态本地生效 + 跨帧广播（主帧/设置 iframe 各跑一份 shim：原生回调只进
  // 主帧 → 主帧转发进 iframe；iframe 发起的检查反向广播给主帧 badge）。
  // 接收方只 emit 不再转发，无回环。终态落 localStorage：iframe 启动时
  // 由 getInfo().autoUpdateStatus 读回。
  function broadcastUpdateState(state) {
    emitUpdate(state);
    if (state.status !== "checking" && state.status !== "downloading") {
      lsSet(UPDATE.stateKey, JSON.stringify(state));
    }
    try { ensureUpdatePill(); } catch (e) {}
    try {
      if (inSubframe) {
        window.parent.postMessage({ type: "alma-android-update-state", state: state }, "*");
      } else {
        var f = settingsFrame();
        if (f && f.contentWindow) f.contentWindow.postMessage({ type: "alma-android-update-state", state: state }, "*");
      }
    } catch (e) {}
  }
  window.addEventListener("message", function (e) {
    if (e && e.data && e.data.type === "alma-android-update-state" && e.data.state) {
      emitUpdate(e.data.state);
    }
  });

  function fetchJson(url, timeoutMs) {
    // 缓存击穿：版本检查必须拿「现在」的答案。三重缓存都可能发旧版本——
    // ①WebView HTTP 缓存（fetch 默认遵循响应头，镜像站常给 max-age）；
    // ②镜像站边缘缓存（gh-proxy 前面 Fastly/CF，实测发布后数分钟内还回
    //   旧 latest.json——v0.4.213-16 发布 3 分钟后实机检查仍拿 -15 的
    //   元凶；其缓存键含 query string，实测唯一 qs 必 MISS 回源）；
    // ③GitHub API 自身 60s 缓存。查询参数加时间戳 + cache:no-cache 双保险。
    var bust = (url.indexOf("?") > -1 ? "&" : "?") + "_=" + Date.now();
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () {
        if (!done) { done = true; reject(new Error("timeout")); }
      }, timeoutMs || 10000);
      fetch(url + bust, { cache: "no-cache", headers: { Accept: "application/vnd.github+json" } })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then(function (j) { if (!done) { done = true; clearTimeout(timer); resolve(j); } })
        .catch(function (err) { if (!done) { done = true; clearTimeout(timer); reject(err); } });
    });
  }

  function relFallbacks(apk, m) {
    // 镜像 URL 全列表 = 前缀 + 资产直链（同款拼接，去重）
    var list = [];
    var add = function (u) { if (u && list.indexOf(u) < 0) list.push(u); };
    for (var i = 0; i < UPDATE.mirrors.length; i++) add(UPDATE.mirrors[i] + apk);
    return list;
  }

  // 双源检查：GitHub API releases/latest（tag_name + apk 资产）；直连失败
  // （国内网络）→ 镜像前缀 + raw latest.json（release.sh 随仓库生成）。
  function checkLatestRelease() {
    var m = mirrorPrefix();
    var api = "https://api.github.com/repos/" + UPDATE.repo + "/releases/latest";
    return fetchJson(api, 10000).then(function (rel) {
      var apk = "";
      var assets = (rel && rel.assets) || [];
      for (var i = 0; i < assets.length; i++) {
        if (/\.apk$/i.test(assets[i].name || "")) { apk = assets[i].browser_download_url; break; }
      }
      if (!rel || !rel.tag_name || !apk) throw new Error("bad-release");
      var fb = relFallbacks(apk, m);
      return { tag: rel.tag_name, apk: apk, fallback: fb[0] || "", fallbacks: fb, notes: rel.body || "" };
    }).catch(function (e1) {
      // 显式禁用镜像（mirrorKey 置空串）时保持原语义：直连失败即失败
      if (m === "") throw e1;
      // raw latest.json 也按镜像链轮试：只打一个源时，那个镜像恰好挂了
      // （检查更新「有时超时」的主因之一）整次检查就失败。
      var prefixes = [];
      var addP = function (p) { if (p && prefixes.indexOf(p) < 0) prefixes.push(p); };
      addP(m);
      for (var mi = 0; mi < UPDATE.mirrors.length; mi++) addP(UPDATE.mirrors[mi]);
      var rawPath = "https://raw.githubusercontent.com/" + UPDATE.repo + "/" + UPDATE.branch + "/latest.json";
      var tryRaw = function (i) {
        if (i >= prefixes.length) throw e1;
        return fetchJson(prefixes[i] + rawPath, 10000).then(function (j) {
          if (!j || !j.tag || !j.apk) throw new Error("bad-latest");
          var apk = String(j.apk).indexOf("http") === 0 ? String(j.apk)
            : "https://github.com/" + UPDATE.repo + "/releases/download/" + j.tag + "/" + j.apk;
          // latest.json 的 mirrors（完整 URL 数组，release.sh 生成）优先；没有就本地默认链
          var fb = (j.mirrors && j.mirrors.length ? j.mirrors : relFallbacks(apk, m));
          return { tag: j.tag, apk: apk, fallback: fb[0] || "", fallbacks: fb, notes: j.notes || "" };
        }, function () { return tryRaw(i + 1); });
      };
      if (!prefixes.length) throw e1;
      return tryRaw(0);
    });
  }

  function doUpdateCheck(triggeredByUser) {
    if (triggeredByUser) broadcastUpdateState({ status: "checking", checkedAt: Date.now() });
    return checkLatestRelease().then(function (rel) {
      updateRel = rel;
      // notes/fallbacks 一并持久化：更新弹窗（更新内容）与重试链重启后仍可用
      lsSet(UPDATE.relKey, JSON.stringify({
        tag: rel.tag, apk: rel.apk, fallback: rel.fallback,
        fallbacks: rel.fallbacks || [], notes: rel.notes || ""
      }));
      lsSet(UPDATE.checkedKey, String(Date.now()));
      var cur = shellVersion();
      var avail = isNewer(rel.tag, cur);
      // 静默检查只在"有新版"时广播（不打扰）；手动检查两种终态都广播
      if (triggeredByUser || avail) {
        broadcastUpdateState(avail
          ? { status: "update-available", version: rel.tag.replace(/^v/i, ""), checkedAt: Date.now() }
          : { status: "update-not-available", checkedAt: Date.now() });
      }
      return { status: avail ? "available" : "not-available", version: rel.tag.replace(/^v/i, "") };
    }).catch(function (e) {
      var msg = String((e && e.message) || e);
      if (triggeredByUser) broadcastUpdateState({ status: "error", detail: msg, checkedAt: Date.now() });
      return { status: "error", message: msg };
    });
  }

  function nativeDownloading() {
    try {
      var p = JSON.parse(window.__almaAndroidUpdate.downloadProgress() || "");
      return !!(p && p.status === "downloading");
    } catch (e) { return false; }
  }

  function pollUpdateProgress() {
    if (progressTimer) clearInterval(progressTimer);
    lastProg = null; pollFailCount = 0;
    progressTimer = setInterval(function () {
      var p;
      try { p = JSON.parse(window.__almaAndroidUpdate.downloadProgress() || ""); } catch (e) { return; }
      if (!p) return;
      if (p.status === "failed") {
        // 兜底：完成广播丢失（个别 ROM / 进程回收）时连续 failed 也终态化，
        // 避免 UI 永远"下载中"；正常路径由原生广播转 error 或镜像重试。
        if (++pollFailCount >= 3) {
          stopUpdateProgress();
          broadcastUpdateState({ status: "error", checkedAt: Date.now() });
        }
        return;
      }
      pollFailCount = 0;
      if (p.status !== "downloading") return; // 终态由 __almaUpdateState 驱动
      var now = Date.now();
      var s = { status: "downloading", transferred: p.transferred || 0 };
      if (p.total > 0) {
        s.total = p.total;
        if (lastProg && now > lastProg.t && s.transferred >= lastProg.bytes) {
          s.bytesPerSecond = Math.round((s.transferred - lastProg.bytes) * 1000 / (now - lastProg.t));
        }
      }
      lastProg = { t: now, bytes: s.transferred };
      broadcastUpdateState(s);
    }, 800);
  }
  function stopUpdateProgress() {
    if (progressTimer) { clearInterval(progressTimer); progressTimer = 0; }
  }

  // 原生回调（evaluateJavascript 只进主帧）：downloaded=安装器已拉起，
  // permission=去授权页（APK 已就绪，回 UI 再点"安装"即可），error=下载失败。
  window.__almaUpdateState = function (s) {
    stopUpdateProgress();
    broadcastUpdateState(s === "error"
      ? { status: "error", checkedAt: Date.now() }
      : { status: "update-downloaded", version: updateRel ? updateRel.tag.replace(/^v/i, "") : undefined, checkedAt: Date.now() });
  };

  function doUpdateDownload() {
    // 下载已在进行（页面重载/另一帧先点过）：续上进度即可
    if (nativeDownloading()) {
      broadcastUpdateState({ status: "downloading" });
      pollUpdateProgress();
      return Promise.resolve({ success: true });
    }
    if (!updateRel || !updateRel.apk) {
      // UI 先 available 才出下载键，正常不至此；兜底先查一次
      return doUpdateCheck(false).then(function () {
        return updateRel && updateRel.apk ? doUpdateDownload() : { success: false, error: "no-release" };
      });
    }
    // 版本闸门：持久化的 rel 可能旧于当前壳（手动 sideload 新版后残留，
    // v0.4.213-16 实机：-15 的 available 态 + 手装 -16 → 点下载白拉 40MB
    // 旧包、原生校验拒收后还按镜像链把每个镜像的同一旧包各拉一遍）。
    // 旧于当前壳 = 无可更新，直接终态 not-available，一个字节都不下。
    try {
      if (updateRel.tag && !isNewer(updateRel.tag, shellVersion())) {
        broadcastUpdateState({ status: "update-not-available", checkedAt: Date.now() });
        return Promise.resolve({ success: false, error: "stale-release" });
      }
    } catch (e) {}
    var r;
    try {
      // fallback 参数 = 镜像 URL 的 JSON 数组（原生侧按序换：下载失败/文件无效）
      var fbs = updateRel.fallbacks && updateRel.fallbacks.length
        ? updateRel.fallbacks : (updateRel.fallback ? [updateRel.fallback] : []);
      r = window.__almaAndroidUpdate.downloadAndInstall(updateRel.apk, JSON.stringify(fbs));
    }
    catch (e) { r = "error"; }
    if (r !== "ok") return Promise.resolve({ success: false, error: r });
    broadcastUpdateState({ status: "downloading" });
    pollUpdateProgress();
    return Promise.resolve({ success: true });
  }

  // 恢复上次终态/检查结果；主帧若检测到下载仍在进行则续上进度条
  try {
    var s0 = lsGet(UPDATE.stateKey);
    if (s0) { var st0 = JSON.parse(s0); if (st0 && st0.status) updateState = st0; }
    var r0 = lsGet(UPDATE.relKey);
    if (r0) { var rr0 = JSON.parse(r0); if (rr0 && rr0.apk) updateRel = rr0; }
  } catch (e) {}
  // 陈旧终态自愈：残留 update-downloaded 对应的版本已装上（手动装新版后
  // localStorage 与 updates/alma-update.apk 都还是旧的）→ 清回 idle。否则
  // 设置页永远显示「已下载·重启安装」，点行把旧/坏 APK 递给系统安装器
  // （v0.4.213-10 实机「安装包已损坏」）。原生侧 isValidUpdateApk 同款兜底。
  // v0.4.213-18 起自愈面扩大到 update-available：手动 sideload 新版后残留的
  // 「旧版本可更新」态会把旧包当更新递给下载（-16 实机踩坑：手装 -16 后
  // pill 仍报 -15、下载白拉旧包被原生拒收）。rel 不新于当前壳一律清回 idle。
  try {
    var restoredStale = updateState
      && (updateState.status === "update-downloaded" || updateState.status === "update-available")
      && !(updateRel && updateRel.tag && isNewer(updateRel.tag, shellVersion()));
    if (restoredStale) {
      updateRel = null;             // 内存同步作废（localStorage 之外的活引用）
      updateState = { status: "idle", checkedAt: Date.now() };
      lsSet(UPDATE.stateKey, JSON.stringify(updateState));
      lsSet(UPDATE.relKey, "");   // rel 一并作废：旧 tag 不许再被下载路径捡走
    }
  } catch (e) {}
  if (!inSubframe) {
    if (nativeDownloading()) {
      broadcastUpdateState({ status: "downloading" });
      pollUpdateProgress();
    } else {
      // 启动静默检查（6h 限频；只在新版可用时露头 = 更新 pill + 设置页入口）
      setTimeout(function () {
        var last = parseInt(lsGet(UPDATE.checkedKey), 10) || 0;
        if (Date.now() - last >= UPDATE.interval) void doUpdateCheck(false);
      }, 4000);
    }
    // 恢复的终态若是 update-available，先把 pill 挂出来（不等下次检查）
    try { ensureUpdatePill(); } catch (e) {}
    // renderer 重渲染可能吞掉 pill / 布局变化会挪动菜单钮 —— 兜底重挂+重定位。
    // attributes 也要看：抽屉开合是既有节点上的 class/style 变化（滑入动画），
    // 只看 childList 会漏掉「pill 该让位/归位」的时机。
    var pillObs = null, pillObsTimer = 0;
    var queueEnsurePill = function () {
      if (pillObsTimer) return;
      pillObsTimer = setTimeout(function () {
        pillObsTimer = 0;
        try { ensureUpdatePill(); } catch (e) {}
      }, 250);
    };
    if (window.MutationObserver) {
      pillObs = new MutationObserver(queueEnsurePill);
      var startObs = function () {
        if (document.body) pillObs.observe(document.body, {
          childList: true, subtree: true,
          attributes: true, attributeFilter: ["class", "style"]
        });
        else setTimeout(startObs, 400);
      };
      startObs();
    }
    // 抽屉等覆层靠属性变化驱动（上面的 observer 已覆盖）；点击/动画收尾再兜一层
    document.addEventListener("click", queueEnsurePill, true);
    document.addEventListener("transitionend", queueEnsurePill, true);
  }

  // 应用信息：version = APK versionName（即内嵌 renderer 版本，与 GitHub tag
  // 对齐、与 Alma 桌面版本一致）；build 留空 —— 手机设置页会拼 "version (build)"，
  // 二者同源时只显示一个版本号。
  window.almaApp ??= {
    getInfo: function () {
      var ver = "";
      try {
        var id = (window.SENTRY_RELEASE && window.SENTRY_RELEASE.id) || "";
        ver = id.indexOf("@") > -1 ? id.split("@")[1] : id;
      } catch (e) {}
      return Promise.resolve({
        name: "Alma",
        version: shellVersion() || ver,
        build: "",
        platform: PLATFORM, arch: "android",
        autoUpdateSupported: true,
        autoUpdateStatus: updateState
      });
    },
    getVersion: function () {
      return this.getInfo().then(function (i) { return i.version; });
    },
    checkForUpdates: function () { return doUpdateCheck(true); },
    downloadUpdate: function () { return doUpdateDownload(); },
    quitAndInstall: function () {
      // 「已下载」对应的版本已装上（手动装过新版后残留的终态）：清掉状态
      // 回 idle，绝不把磁盘上的旧 APK 递给安装器（原生侧同款兜底会拒收）。
      // 无已知 rel（v0.4.213-18 起启动自愈会作废陈旧 rel）同样不装：
      // 什么都不该被递给安装器。
      if (!updateRel || !updateRel.tag || !isNewer(updateRel.tag, shellVersion())) {
        broadcastUpdateState({ status: "idle", checkedAt: Date.now() });
        return;
      }
      try { window.__almaAndroidUpdate.launchInstaller(); } catch (e) {}
    },
    onAutoUpdateStatus: function (cb) {
      if (typeof cb !== "function") return function () {};
      updateListeners.push(cb);
      return function () {
        var i = updateListeners.indexOf(cb);
        if (i > -1) updateListeners.splice(i, 1);
      };
    },
    getUpdateInfo: function () {
      return Promise.resolve(updateRel
        ? { available: isNewer(updateRel.tag, shellVersion()), version: updateRel.tag, notes: updateRel.notes || "" }
        : { available: false, version: null });
    },
    quit: noop, relaunch: noop
  };

  // ── 更新提示 UI（仅主帧）：菜单钮旁的「更新」pill + 版本说明弹窗 ─────
  // pill 用 position:fixed 直接挂 body、按 ⋯ 菜单钮的 rect 定位 —— 刻意
  // 不进 React 树（renderer 重渲染会吞掉外来节点），MutationObserver 兜底
  // 重挂。样式参考用户设计稿：深灰圆角 pill，↺-圈-上箭头 + 「更新」。
  function updatePillShouldShow() {
    return !inSubframe
      && !settingsLayerOpen()
      && !rendererOverlayOpen()
      && updateState && updateState.status === "update-available"
      && updateRel && updateRel.tag
      && lsGet(UPDATE.skipKey) !== updateRel.tag;
  }

  // 左上 ⋯ 菜单钮：无 aria/文本，按几何位置找（近左上角的小图标钮）
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

  function ensureUpdatePill() {
    if (inSubframe) return;
    var pill = document.getElementById("alma-update-pill");
    if (!updatePillShouldShow()) { if (pill) pill.remove(); return; }
    var toggle = findMenuToggle();
    if (!toggle) { if (pill) pill.remove(); return; }
    if (!pill) {
      pill = document.createElement("button");
      pill.id = "alma-update-pill";
      pill.type = "button";
      pill.setAttribute("aria-label", "update available");
      pill.innerHTML =
        '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"' +
        ' stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9.2"/><path d="M12 15.5V8.5m-3 3 3-3 3 3"/></svg><span>更新</span>';
      pill.addEventListener("click", function () { showUpdateDialog(); });
      (document.body || document.documentElement).appendChild(pill);
    }
    // 贴着菜单钮右侧（微微压叠），随其位置校准。位置没变就不写 style：
    // observer 现在也看 attributes，自己写自己看会自激励成常转循环。
    var tr = toggle.getBoundingClientRect();
    var pos = Math.round(tr.right - 7) + "x" + Math.round(tr.top + (tr.height - 30) / 2);
    if (pill.dataset.pos === pos) return;
    pill.dataset.pos = pos;
    pill.style.cssText =
      "position:fixed;z-index:2147482000;display:inline-flex;align-items:center;gap:4px;" +
      "height:30px;padding:0 11px 0 9px;border:0;border-radius:9999px;cursor:pointer;" +
      "font-size:13px;font-weight:500;letter-spacing:.2px;" +
      "background:" + (document.documentElement.classList.contains("dark") ? "#4a4f58" : "#d8dce3") + ";" +
      "color:" + (document.documentElement.classList.contains("dark") ? "#f2ead8" : "#3a3f47") + ";" +
      "box-shadow:0 1px 4px rgba(0,0,0,.25);" +
      "left:" + Math.round(tr.right - 7) + "px;top:" + Math.round(tr.top + (tr.height - 30) / 2) + "px;";
  }

  // release notes（markdown 正文）→ 弹窗用的条目列表
  function updateNoteItems() {
    var out = [];
    var lines = String((updateRel && updateRel.notes) || "").split(/\r?\n/);
    for (var i = 0; i < lines.length && out.length < 8; i++) {
      var raw = lines[i].trim();
      if (!raw || /^#/.test(raw) || /^Co-Authored-By|^🤖|^\[?skip/i.test(raw)) continue;
      var t = raw.replace(/^[-*•]\s+/, "").replace(/\*\*/g, "").replace(/`/g, "");
      if (!t || t.length > 140) continue;
      out.push(t);
    }
    return out;
  }

  /** 关掉更新弹窗；@return 弹窗原本开着（调用方据此判定返回键消化）。 */
  function closeUpdateDialog() {
    var d = document.getElementById("alma-update-dialog");
    if (d) { d.remove(); return true; }
    return false;
  }

  function showUpdateDialog() {
    if (inSubframe || !updateRel || !updateRel.tag) return;
    closeUpdateDialog();
    var dark = document.documentElement.classList.contains("dark");
    var cardBg = dark ? "#2b2f36" : "#ffffff";
    var fg = dark ? "#eceef1" : "#2b2f36";
    var muted = dark ? "#9aa0aa" : "#7c828c";
    var mono = "ui-monospace,SFMono-Regular,Menlo,monospace";
    var ver = String(updateRel.tag).replace(/^v/i, "");
    var cur = shellVersion() || "—";
    var items = updateNoteItems();
    var overlay = document.createElement("div");
    overlay.id = "alma-update-dialog";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147482100;display:flex;" +
      "align-items:center;justify-content:center;background:rgba(0,0,0,.52);";
    var itemsHtml = items.length
      ? '<div style="font-size:12px;color:' + muted + ';margin:14px 0 6px">更新内容</div>' +
        items.map(function (t) {
          return '<div style="display:flex;gap:8px;align-items:baseline;font-size:13.5px;color:' + fg +
            ';line-height:1.55;margin:5px 0"><span style="flex:none;width:5px;height:5px;border-radius:50%;' +
            'background:' + muted + ';transform:translateY(-2px)"></span><span>' + t.replace(/</g, "&lt;") + "</span></div>";
        }).join("")
      : "";
    overlay.innerHTML =
      '<div role="dialog" aria-label="软件更新" style="width:min(420px,86vw);max-height:78vh;overflow:auto;' +
      "background:" + cardBg + ";border-radius:14px;padding:20px 22px 16px;box-shadow:0 12px 40px rgba(0,0,0,.45);\">" +
      '<div style="font-size:18px;font-weight:700;color:' + fg + '">软件更新</div>' +
      '<div style="font-size:13px;color:' + muted + ';margin-top:6px">发现新版本可用</div>' +
      '<div style="font-family:' + mono + ";font-size:15px;color:" + fg + ';margin-top:12px">' +
      cur + '<span style="color:' + muted + ';padding:0 8px">→</span>' + ver + "</div>" +
      itemsHtml +
      '<div style="height:1px;background:' + (dark ? "#3a3f47" : "#e4e6ea") + ';margin:16px 0 10px"></div>' +
      '<div style="display:flex;align-items:center;gap:10px">' +
      '<button id="alma-update-skip" type="button" style="all:unset;cursor:pointer;font-size:12.5px;color:' +
      muted + ';margin-right:auto;padding:6px 2px">跳过此版本</button>' +
      '<button id="alma-update-cancel" type="button" style="all:unset;cursor:pointer;font-size:13.5px;color:' +
      fg + ';padding:7px 12px">取消</button>' +
      '<button id="alma-update-go" type="button" style="all:unset;cursor:pointer;display:inline-flex;' +
      'align-items:center;gap:6px;background:#3d7dff;color:#fff;font-size:13.5px;font-weight:600;' +
      'padding:8px 16px;border-radius:9999px">' +
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"' +
      ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5v11m-4-4 4 4 4-4"/>' +
      '<path d="M4.5 19.5h15"/></svg>立即下载</button>' +
      "</div></div>";
    (document.body || document.documentElement).appendChild(overlay);
    overlay.querySelector("#alma-update-skip").addEventListener("click", function () {
      try { lsSet(UPDATE.skipKey, updateRel.tag); } catch (e) {}
      closeUpdateDialog();
      ensureUpdatePill();
    });
    overlay.querySelector("#alma-update-cancel").addEventListener("click", closeUpdateDialog);
    overlay.querySelector("#alma-update-go").addEventListener("click", function () {
      closeUpdateDialog();
      void doUpdateDownload();
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeUpdateDialog(); });
  }

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
