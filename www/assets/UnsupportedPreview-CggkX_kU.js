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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "ae504667-d28f-4b67-8700-a35d238ae2c2", e._sentryDebugIdIdentifier = "sentry-dbid-ae504667-d28f-4b67-8700-a35d238ae2c2");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
import { F as FileQuestionMark } from "./file-question-mark-fwidY3ON.js";
const UnsupportedPreview = reactExports.memo(function UnsupportedPreview2({ extension }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestionMark, { className: "size-12 opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: instance.t("artifactsUi.previewUnavailable") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: instance.t("artifactsUi.fileTypeNotSupported", { extension }) })
    ] })
  ] });
});
export {
  UnsupportedPreview
};
