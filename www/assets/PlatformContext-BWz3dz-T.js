!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "alma@0.4.378" };
  } catch (e2) {
  }
}();
;
{
  try {
    (function() {
      var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "bd61af34-7a07-412f-a3d1-6ffb5a76af83", e._sentryDebugIdIdentifier = "sentry-dbid-bd61af34-7a07-412f-a3d1-6ffb5a76af83");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { a as useI18n, c as cn, e as Square, M as Maximize2, B as Button } from "./ThemeContext-Ac9lDiNd.js";
import { X } from "./x-BzMxEGBY.js";
import { c as createLucideIcon } from "./createLucideIcon-sFEqYeet.js";
import "./preload-helper-D_8ag_Pp.js";
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 14v1", key: "askpd8" }],
  ["path", { d: "M9 19v2", key: "16tejx" }],
  ["path", { d: "M9 3v2", key: "1noubl" }],
  ["path", { d: "M9 9v1", key: "19ebxg" }]
];
const PanelLeftDashed = createLucideIcon("panel-left-dashed", __iconNode);
const PlatformContext = reactExports.createContext(null);
function usePlatformContext() {
  const context = reactExports.useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatformContext must be used within a PlatformProvider");
  }
  return context;
}
function WindowControls({ onSidebarToggle }) {
  const { t } = useI18n();
  const { isMac, isIOS, windowControlsHidden } = usePlatformContext();
  const [isMaximized, setIsMaximized] = reactExports.useState(false);
  const [isFullScreen, setIsFullScreen] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(true);
  const [mode, setMode] = reactExports.useState(isMac ? "unknown" : "dom");
  const [nativeHovered, setNativeHovered] = reactExports.useState(false);
  const stripRef = reactExports.useRef(null);
  const reportRects = reactExports.useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const balls = strip.querySelectorAll(".mac-traffic-light > div");
    if (balls.length !== 3) return;
    const rects = Array.from(balls, (b) => {
      const r = b.getBoundingClientRect();
      return { x: r.left, y: r.top, width: r.width, height: r.height };
    });
    if (rects.some((r) => r.width <= 0)) return;
    void window.windowControls?.reportTrafficLightRects?.(rects);
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "overlay") return;
    reportRects();
    const strip = stripRef.current;
    const ro = typeof ResizeObserver !== "undefined" && strip ? new ResizeObserver(() => reportRects()) : null;
    if (ro && strip) ro.observe(strip);
    window.addEventListener("resize", reportRects);
    const html = document.documentElement;
    const mo = typeof MutationObserver !== "undefined" ? new MutationObserver(() => reportRects()) : null;
    mo?.observe(html, { attributes: true, attributeFilter: ["style", "class", "data-ui-density"] });
    return () => {
      ro?.disconnect();
      mo?.disconnect();
      window.removeEventListener("resize", reportRects);
    };
  }, [mode, reportRects]);
  reactExports.useEffect(() => {
    if (!isMac) return;
    let cancelled = false;
    const api = window.windowControls;
    api?.getTrafficLightsMode?.().then((m) => {
      if (!cancelled) setMode(m === "overlay" ? "overlay" : "dom");
    }).catch(() => {
      if (!cancelled) setMode("dom");
    });
    const off = api?.onTrafficLightsHover?.(setNativeHovered);
    return () => {
      cancelled = true;
      off?.();
    };
  }, [isMac]);
  reactExports.useEffect(() => {
    const initializeWindow = async () => {
      if (window.windowControls) {
        setIsMaximized(await window.windowControls.isMaximized());
        setIsFullScreen(await window.windowControls.isFullScreen());
        setIsFocused(await window.windowControls.isFocused());
      }
    };
    initializeWindow();
    const handleWindowStateChange = () => {
      if (window.windowControls) {
        window.windowControls.isMaximized().then(setIsMaximized);
        window.windowControls.isFullScreen().then(setIsFullScreen);
      }
    };
    let cleanupFocusListener;
    if (window.windowControls && window.windowControls.onFocusChange) {
      cleanupFocusListener = window.windowControls.onFocusChange(setIsFocused);
    }
    const interval = setInterval(handleWindowStateChange, 1e3);
    return () => {
      clearInterval(interval);
      if (cleanupFocusListener) {
        cleanupFocusListener();
      }
    };
  }, []);
  const handleMinimize = async () => {
    if (window.windowControls) {
      await window.windowControls.minimize();
    }
  };
  const handleMaximize = async () => {
    if (window.windowControls) {
      const maximized = await window.windowControls.maximize();
      setIsMaximized(maximized);
    }
  };
  const handleFullScreen = async () => {
    if (window.windowControls) {
      const fullscreen = await window.windowControls.fullscreen();
      setIsFullScreen(fullscreen);
    }
  };
  const handleClose = async () => {
    if (window.windowControls) {
      await window.windowControls.close();
    }
  };
  const handleZoomContextMenu = (e) => {
    e.preventDefault();
    void window.windowControls?.showTilingMenu?.(e.clientX, e.clientY);
  };
  if (isIOS) {
    return null;
  }
  if (isMac) {
    const overlay = mode === "overlay";
    const interactive = mode === "dom";
    const PALETTE = {
      red: {
        base: "bg-red-500",
        hover: "group-hover:bg-red-600",
        hoverOn: "bg-red-600",
        dimHover: "group-hover:bg-red-500",
        dimHoverOn: "bg-red-500",
        glyph: "text-red-900"
      },
      yellow: {
        base: "bg-yellow-500",
        hover: "group-hover:bg-yellow-600",
        hoverOn: "bg-yellow-600",
        dimHover: "group-hover:bg-yellow-500",
        dimHoverOn: "bg-yellow-500",
        glyph: "text-yellow-900"
      },
      green: {
        base: "bg-green-500",
        hover: "group-hover:bg-green-600",
        hoverOn: "bg-green-600",
        dimHover: "group-hover:bg-green-500",
        dimHoverOn: "bg-green-500",
        glyph: "text-green-900"
      }
    };
    const glyph = overlay ? nativeHovered ? "opacity-100" : "opacity-0" : "opacity-0 group-hover:opacity-100";
    const ballClass = (color) => {
      const c = PALETTE[color];
      const hover = overlay ? nativeHovered ? c.hoverOn : "" : c.hover;
      const dimHover = overlay ? nativeHovered ? c.dimHoverOn : "" : c.dimHover;
      return cn("w-3 h-3 rounded-full transition-colors flex items-center justify-center", isFocused ? cn(c.base, hover) : cn("bg-gray-400", dimHover));
    };
    const glyphClass = (color) => cn("transition-opacity", glyph, isFocused ? PALETTE[color].glyph : "text-gray-700");
    const buttonClass = cn("mac-traffic-light flex items-center justify-center w-3 h-3 group", overlay && "pointer-events-none");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: stripRef, className: cn("flex items-center", mode === "unknown" && "invisible"), "aria-hidden": overlay || void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: interactive ? handleClose : void 0,
          className: cn(buttonClass, "mr-2"),
          title: overlay ? void 0 : t("windowControls.close"),
          tabIndex: overlay ? -1 : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ballClass("red"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 8, className: glyphClass("red") }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: interactive ? handleMinimize : void 0,
          className: cn(buttonClass, "mr-2"),
          title: overlay ? void 0 : t("windowControls.minimize"),
          tabIndex: overlay ? -1 : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ballClass("yellow"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 8, className: glyphClass("yellow") }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: interactive ? handleFullScreen : void 0,
          onContextMenu: interactive ? handleZoomContextMenu : void 0,
          className: buttonClass,
          title: overlay ? void 0 : isFullScreen ? t("windowControls.exitFullscreen") : t("windowControls.fullscreen"),
          tabIndex: overlay ? -1 : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ballClass("green"), children: isFullScreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 6, className: glyphClass("green") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 6, className: glyphClass("green") }) })
        }
      ),
      onSidebarToggle && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onSidebarToggle, className: "ml-2 h-7 w-7 p-0 pointer-events-auto", title: t("sidebar.toggle"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftDashed, { size: 14 }) })
    ] });
  }
  if (windowControlsHidden) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    onSidebarToggle && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onSidebarToggle, className: "mr-2 h-7 w-7 p-0", title: t("sidebar.toggle"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftDashed, { size: 14 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleMinimize,
        className: "flex items-center justify-center w-8 h-8 hover:bg-muted rounded transition-colors",
        title: t("windowControls.minimize"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, className: "text-muted-foreground" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleMaximize,
        className: "flex items-center justify-center w-8 h-8 hover:bg-muted rounded transition-colors",
        title: isMaximized ? t("windowControls.restore") : t("windowControls.maximize"),
        children: isMaximized ? /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 12, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 12, className: "text-muted-foreground" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleClose,
        className: "flex items-center justify-center w-8 h-8 bg-transparent hover:bg-destructive hover:text-destructive-foreground rounded transition-colors group",
        title: t("windowControls.close"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground group-hover:text-destructive-foreground" })
      }
    )
  ] });
}
function PlatformProvider({ children }) {
  const [platform, setPlatform] = reactExports.useState(function () { try { return document.body.dataset.platform || "darwin"; } catch (e) { return "darwin"; } });
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [windowControlsHidden, setWindowControlsHidden] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.platform) {
      window.platform.get().then((p) => {
        setPlatform(p);
        setIsLoading(false);
      });
      window.platform.windowControlsHidden?.().then((hidden) => setWindowControlsHidden(hidden === true)).catch(() => {
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    document.body.dataset.platform = platform;
  }, [platform]);
  const value = reactExports.useMemo(
    () => ({
      platform,
      isMac: platform === "darwin",
      isWindows: platform === "win32",
      isLinux: platform === "linux",
      isIOS: platform === "ios" || platform === "android", isAndroid: platform === "android",
      isLoading,
      windowControlsHidden: windowControlsHidden && platform !== "darwin"
    }),
    [platform, isLoading, windowControlsHidden]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformContext.Provider, { value, children });
}
export {
  Minus as M,
  PlatformProvider as P,
  WindowControls as W,
  PanelLeftDashed as a,
  usePlatformContext as u
};
