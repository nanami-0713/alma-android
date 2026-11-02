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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "493fd16a-17d2-4773-95c1-e96ed73abd16", e._sentryDebugIdIdentifier = "sentry-dbid-493fd16a-17d2-4773-95c1-e96ed73abd16");
    })();
  } catch (e) {
  }
}
;
import { j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { u as useSettings, P as PostHogProvider, g as getPostHogConfig } from "./ThemeContext-Ac9lDiNd.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
function ConditionalPostHogProvider({ children }) {
  const { settings, isLoading } = useSettings();
  if (isLoading || settings?.general?.analyticsEnabled === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  const { apiKey, options } = getPostHogConfig();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostHogProvider, { apiKey, options, children });
}
export {
  ConditionalPostHogProvider as C
};
