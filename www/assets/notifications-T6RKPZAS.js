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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "05a3bfa7-ea07-4fcd-bffe-b9cd7d01306b", e._sentryDebugIdIdentifier = "sentry-dbid-05a3bfa7-ea07-4fcd-bffe-b9cd7d01306b");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
import { A as AnimatePresence, s as speakOnce, m as motion, a as almaIconUrl } from "./alma-icon-BzHspoaH.js";
import { s as settingsApiService, X } from "./x-BzMxEGBY.js";
import "./index-CZUfqr00.js";
let sharedCtx = null;
function getCtx() {
  if (typeof window === "undefined" || !window.AudioContext) return null;
  if (!sharedCtx) sharedCtx = new AudioContext();
  if (sharedCtx.state === "suspended") void sharedCtx.resume();
  return sharedCtx;
}
function strikeVoice(ctx, master, opts) {
  const { freq, delay, decay, peak, detuneCents = 0 } = opts;
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = detuneCents;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(freq * 6, start);
  filter.frequency.exponentialRampToValueAtTime(freq * 1.5, start + decay);
  filter.Q.value = 0.7;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + 6e-3);
  gain.gain.exponentialRampToValueAtTime(1e-4, start + decay);
  osc.connect(filter).connect(gain).connect(master);
  osc.start(start);
  osc.stop(start + decay + 0.05);
}
function playNotificationChime(volume = 0.18) {
  const ctx = getCtx();
  if (!ctx) return;
  const master = ctx.createGain();
  master.gain.value = Math.max(0, Math.min(1, volume));
  master.connect(ctx.destination);
  const A5 = 880;
  const E6 = 1318.5;
  strikeVoice(ctx, master, { freq: A5, delay: 0, decay: 0.55, peak: 1, detuneCents: -4 });
  strikeVoice(ctx, master, { freq: A5, delay: 0, decay: 0.55, peak: 0.5, detuneCents: 4 });
  strikeVoice(ctx, master, { freq: A5 * 2, delay: 0, decay: 0.45, peak: 0.18 });
  strikeVoice(ctx, master, { freq: E6, delay: 0.11, decay: 0.6, peak: 1, detuneCents: -4 });
  strikeVoice(ctx, master, { freq: E6, delay: 0.11, decay: 0.6, peak: 0.5, detuneCents: 4 });
  strikeVoice(ctx, master, { freq: E6 * 2, delay: 0.11, decay: 0.5, peak: 0.18 });
}
async function maybeSpeakNotification(notif) {
  try {
    const settings = await settingsApiService.loadSettings();
    if (!settings?.tts?.readNotifications) return;
    const text = [notif.title, notif.message].filter(Boolean).join(". ");
    if (text.trim()) {
      void speakOnce(text);
    }
  } catch {
  }
}
const bridge = () => window.notificationWindow;
const SWIPE_DISMISS_THRESHOLD = 80;
const SWIPE_VELOCITY_THRESHOLD = 500;
const DEFAULT_AUTO_DISMISS_MS = 5e3;
const NotificationCtx = reactExports.createContext(null);
const useNotificationCtx = () => {
  const v = reactExports.useContext(NotificationCtx);
  if (!v) throw new Error("NotificationCtx missing");
  return v;
};
const HoverCtx = reactExports.createContext(false);
function NotificationsRoot() {
  const [active, setActive] = reactExports.useState(null);
  const [animState, setAnimState] = reactExports.useState("enter");
  const [queueCount, setQueueCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const api = bridge();
    if (!api) return;
    const offShow = api.onShow((payload) => {
      setAnimState("enter");
      const notif = payload;
      setActive(notif);
      void maybeSpeakNotification(notif);
    });
    const offQueue = api.onQueueChanged((count) => setQueueCount(count));
    return () => {
      offShow();
      offQueue();
    };
  }, []);
  const dismiss = reactExports.useCallback(() => {
    bridge()?.setClickThrough(true);
    setAnimState("exit");
  }, []);
  const clearAll = reactExports.useCallback(() => {
    bridge()?.setClickThrough(true);
    setAnimState("exit");
    bridge()?.sendClearAll();
  }, []);
  const handleExitComplete = reactExports.useCallback(() => {
    if (!active) return;
    setActive(null);
    bridge()?.sendDismiss();
  }, [active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCtx.Provider, { value: { queueCount, dismiss, clearAll }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex h-screen w-screen items-start justify-end pt-4 pr-5",
      style: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        // Slightly looser tracking helps the all-text-xs/sm
        // hierarchy breathe; macOS uses similar values for
        // notification typography in SF Pro.
        letterSpacing: "-0.005em"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", onExitComplete: handleExitComplete, children: active && animState === "enter" && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationFrame, { notification: active }, active.id) })
    }
  ) });
}
function NotificationFrame({ notification }) {
  const { dismiss, clearAll, queueCount } = useNotificationCtx();
  const [hovered, setHovered] = reactExports.useState(false);
  const presentedRef = reactExports.useRef(false);
  const frameRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const report = () => bridge()?.setCardRect?.({ x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight });
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => {
      ro.disconnect();
      bridge()?.setCardRect?.(null);
    };
  }, []);
  reactExports.useEffect(() => {
    const t = setTimeout(() => playNotificationChime(), 30);
    return () => clearTimeout(t);
  }, [notification.id]);
  const handleMouseEnter = () => {
    bridge()?.setClickThrough(false);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    bridge()?.setClickThrough(true);
    setHovered(false);
  };
  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_DISMISS_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      dismiss();
    }
  };
  const handleAnimationComplete = (latest) => {
    if (presentedRef.current) return;
    if ((latest.opacity ?? 0) >= 0.95) {
      presentedRef.current = true;
      bridge()?.sendPresented(notification.id);
    }
  };
  reactExports.useEffect(() => {
    return () => bridge()?.setClickThrough(true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: frameRef,
      drag: "x",
      dragConstraints: { left: 0, right: 0 },
      dragElastic: { left: 0, right: 0.5 },
      onDragEnd: handleDragEnd,
      initial: { opacity: 0, y: -18, scale: 0.6, filter: "blur(2px)" },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0, x: 400, transition: { duration: 0.2, ease: "easeIn" } },
      transition: { type: "spring", stiffness: 300, damping: 24 },
      style: { transformOrigin: "top center" },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onAnimationComplete: handleAnimationComplete,
      className: [
        "relative cursor-grab active:cursor-grabbing",
        "w-[360px]",
        "rounded-[18px]",
        // Alma's own card colour, all but opaque: a transparent
        // window's `backdrop-filter` can't see the desktop, so a
        // translucent card only showed a muddy tint of the wallpaper.
        "bg-card/[0.96]",
        "text-card-foreground",
        "ring-1 ring-black/[0.05] dark:ring-white/[0.08]",
        // Soft drop shadow + hairline top-edge inset highlight; the
        // inset is what gives macOS-style surfaces their "lifted
        // off the desktop" feel. Toned down vs. opaque card so the
        // highlight doesn't fight the translucency.
        "shadow-[0_12px_32px_-4px_rgba(0,0,0,0.20),0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.45)]",
        "dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.06)]"
      ].join(" "),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(HoverCtx.Provider, { value: hovered, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          hovered && /* @__PURE__ */ jsxRuntimeExports.jsx(DismissButton, { onDismiss: dismiss }, "x"),
          hovered && queueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ClearAllButton, { onClearAll: clearAll }, "clear")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCard, { notification, onAutoDismiss: dismiss })
      ] })
    }
  );
}
function NotificationCard({ notification, onAutoDismiss }) {
  const dismissMs = resolveAutoDismissMs(notification.autoDismissMs);
  useAutoDismissTimer(dismissMs, onAutoDismiss);
  const handleBodyClick = () => {
    bridge()?.sendClick(notification.id);
    onAutoDismiss();
  };
  const handleAction = (actionId, e) => {
    e.stopPropagation();
    bridge()?.sendAction(notification.id, actionId);
    onAutoDismiss();
  };
  const hasActions = !!(notification.actions && notification.actions.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[18px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 px-3 py-[9px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleBodyClick, className: "group flex items-start gap-2.5 text-left focus:outline-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationIcon, { iconDataUrl: notification.iconDataUrl }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-px", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-baseline gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 shrink truncate text-left text-[13px] font-semibold leading-4 tracking-tight text-foreground", children: notification.title }),
            notification.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-left text-[11px] leading-4 text-foreground/50", children: notification.subtitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationStatus, { status: notification.status, cta: notification.cta })
          ] }),
          notification.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "whitespace-pre-wrap text-[11.5px] leading-[15px] text-foreground/[0.82]",
                hasActions ? "line-clamp-3" : "line-clamp-5"
              ].join(" "),
              children: notification.message
            }
          )
        ] })
      ] }),
      hasActions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-1.5 pl-[42px]", children: notification.actions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => handleAction(action.id, e),
          className: [
            "rounded-[8px] px-3 py-[5px] text-[11px] font-medium transition-colors",
            action.variant === "destructive" ? "text-destructive hover:bg-destructive/10" : "bg-foreground/[0.05] text-foreground/85 hover:bg-foreground/[0.09] hover:text-foreground dark:bg-white/[0.07] dark:hover:bg-white/[0.12]"
          ].join(" "),
          children: action.label
        },
        action.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { durationMs: dismissMs })
  ] });
}
function NotificationIcon({ iconDataUrl }) {
  const src = iconDataUrl || almaIconUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "mt-px size-8 min-w-8 max-w-8 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]", draggable: false });
}
function NotificationStatus({ status, cta }) {
  const hovered = reactExports.useContext(HoverCtx);
  if (!status && !cta) return null;
  const showCta = hovered && !!cta;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto grid shrink-0 justify-items-end text-[11px] font-medium leading-4 text-foreground", children: [
    status && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: ["col-start-1 row-start-1 inline-flex items-center gap-1 transition-opacity", showCta ? "opacity-0" : "opacity-60"].join(" "), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: [
            "size-1.5 rounded-full",
            status.tone === "done" ? "bg-[#30b25b]" : status.tone === "attention" ? "bg-[#f0a020]" : "bg-current"
          ].join(" ")
        }
      ),
      status.label
    ] }),
    cta && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["col-start-1 row-start-1 transition-opacity", showCta ? "opacity-70" : "opacity-0"].join(" "), children: cta })
  ] });
}
function DismissButton({ onDismiss }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: onDismiss,
      initial: { opacity: 0, scale: 0.6 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.6 },
      transition: { type: "spring", stiffness: 400, damping: 22, mass: 0.6 },
      whileTap: { scale: 0.85 },
      whileHover: { scale: 1.05 },
      "aria-label": instance.t("common.dismissNotification"),
      className: [
        "absolute -left-2 -top-2 z-50 flex size-[22px] items-center justify-center",
        "rounded-full bg-card text-muted-foreground hover:text-foreground",
        "ring-1 ring-black/10 dark:ring-white/15",
        "shadow-[0_2px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.10)]",
        "focus:outline-none"
      ].join(" "),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3", strokeWidth: 2.4 })
    }
  );
}
function ClearAllButton({ onClearAll }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: onClearAll,
      initial: { opacity: 0, scale: 0.6, x: -4 },
      animate: { opacity: 1, scale: 1, x: 0 },
      exit: { opacity: 0, scale: 0.6, x: -4 },
      transition: { type: "spring", stiffness: 400, damping: 22, mass: 0.6 },
      whileTap: { scale: 0.92 },
      whileHover: { scale: 1.04 },
      className: [
        "absolute left-5 -top-2 z-50 flex h-[22px] items-center justify-center px-2.5",
        "rounded-full bg-card text-muted-foreground hover:text-foreground",
        "ring-1 ring-black/10 dark:ring-white/15",
        "shadow-[0_2px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.10)]",
        "focus:outline-none"
      ].join(" "),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold tracking-wide", children: instance.t("common.clearAll") })
    }
  );
}
function resolveAutoDismissMs(value) {
  if (value === false) return null;
  if (typeof value === "number") return value;
  return DEFAULT_AUTO_DISMISS_MS;
}
function useAutoDismissTimer(durationMs, onComplete) {
  const hovered = reactExports.useContext(HoverCtx);
  const remainingRef = reactExports.useRef(durationMs ?? 0);
  const startedAtRef = reactExports.useRef(null);
  const timeoutRef = reactExports.useRef(null);
  const onCompleteRef = reactExports.useRef(onComplete);
  onCompleteRef.current = onComplete;
  reactExports.useEffect(() => {
    remainingRef.current = durationMs ?? 0;
  }, [durationMs]);
  reactExports.useEffect(() => {
    if (durationMs === null) return;
    const clear = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    if (hovered) {
      if (startedAtRef.current !== null) {
        const elapsed = performance.now() - startedAtRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        startedAtRef.current = null;
      }
      clear();
      return;
    }
    startedAtRef.current = performance.now();
    timeoutRef.current = setTimeout(() => {
      startedAtRef.current = null;
      remainingRef.current = 0;
      onCompleteRef.current();
    }, remainingRef.current);
    return clear;
  }, [hovered, durationMs]);
}
function ProgressBar({ durationMs }) {
  const hovered = reactExports.useContext(HoverCtx);
  const [progress, setProgress] = reactExports.useState(100);
  const remainingRef = reactExports.useRef(durationMs ?? 0);
  const startedAtRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    remainingRef.current = durationMs ?? 0;
    setProgress(durationMs === null ? 0 : 100);
  }, [durationMs]);
  reactExports.useEffect(() => {
    if (durationMs === null) return;
    const total = durationMs;
    const tick = () => {
      if (startedAtRef.current === null) return;
      const elapsed = performance.now() - startedAtRef.current;
      const remaining = Math.max(0, remainingRef.current - elapsed);
      setProgress(remaining / total * 100);
      if (remaining > 0) rafRef.current = requestAnimationFrame(tick);
    };
    if (hovered) {
      cancelAnimationFrame(rafRef.current);
      if (startedAtRef.current !== null) {
        remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAtRef.current));
        startedAtRef.current = null;
      }
    } else {
      startedAtRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered, durationMs]);
  if (durationMs === null) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary/55 dark:bg-primary/45 transition-[width] duration-150 ease-linear", style: { width: `${progress}%` } }) });
}
function applyThemeSnapshot(snap) {
  const root = document.documentElement;
  if (snap.mode === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
  if (snap.cssVars) {
    for (const [name, value] of Object.entries(snap.cssVars)) {
      root.style.setProperty(name, value);
    }
  }
  if (snap.fontFamily) {
    root.style.setProperty("--ui-font-family", snap.fontFamily);
    root.style.fontFamily = `${snap.fontFamily}, var(--font-sans)`;
  } else {
    root.style.fontFamily = "";
  }
  if (snap.fontSize) root.style.setProperty("--ui-root-font-size", `${snap.fontSize}px`);
}
function applyOSColorScheme() {
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  applyThemeSnapshot({ mode: mq?.matches ? "dark" : "light" });
}
applyOSColorScheme();
window.notificationWindow?.getTheme().then((snap) => {
  if (snap && snap.mode) applyThemeSnapshot(snap);
}).catch(() => {
});
window.notificationWindow?.onTheme((snap) => {
  if (snap && snap.mode) applyThemeSnapshot(snap);
});
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsRoot, {}) })
);
