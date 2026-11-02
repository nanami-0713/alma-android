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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "82cb19e1-2965-4c60-85ae-91f54e17f42f", e._sentryDebugIdIdentifier = "sentry-dbid-82cb19e1-2965-4c60-85ae-91f54e17f42f");
    })();
  } catch (e) {
  }
}
;
import { j as jsxRuntimeExports, R as React, r as reactExports } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { i as initObservability, S as SWRConfig, s as swrConfig, T as ThemeProvider, b as usePostHog, d as Toaster } from "./ThemeContext-Ac9lDiNd.js";
import "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { C as ConditionalPostHogProvider } from "./ConditionalPostHogProvider-Cgb2BAQg.js";
import { S as SettingsWindow, P as PluginInputBoxModal, a as PluginQuickPickModal, b as PluginConfirmModal, c as PluginNotificationListener } from "./PluginNotificationListener-DQz_TGb2.js";
import { P as PlatformProvider } from "./PlatformContext-BWz3dz-T.js";
import { u as useTheme } from "./overflow-container-CXkfjaRd.js";
import "./index-CZUfqr00.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import "./label-CF1Fh03r.js";
import "./wand-sparkles-D4aHx43i.js";
import "./TwemojiIcon-qeDCXH7q.js";
import "./index-pfi9S7gc.js";
import "./apiClient-DmP45vUN.js";
import "./loader-circle-BsCo_wlW.js";
import "./slider-CpZgBHCs.js";
import "./pencil-BtEsZPL8.js";
import "./trash-2-DTP27QMN.js";
import "./image-C_h5oH_f.js";
import "./alma-icon-BzHspoaH.js";
import "./addLeadingZeros-DCGuLiwe.js";
initObservability();
function SettingsPageView() {
  const posthog = usePostHog();
  reactExports.useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: "/settings"
      });
    }
  }, [posthog]);
  return null;
}
function ThemedToaster() {
  const { effectiveTheme } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", theme: effectiveTheme });
}
function SettingsApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SWRConfig, { value: swrConfig, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalPostHogProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPageView, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsWindow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemedToaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PluginInputBoxModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PluginQuickPickModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PluginConfirmModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PluginNotificationListener, {})
  ] }) }) }) });
}
function Root() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsApp, {});
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {}) })
);
window.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
