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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "a6dd3360-19af-401c-87f9-0d91d3c8c75c", e._sentryDebugIdIdentifier = "sentry-dbid-a6dd3360-19af-401c-87f9-0d91d3c8c75c");
    })();
  } catch (e) {
  }
}
;
import { s as styles_default, c as classRenderer_v3_unified_default, a as classDiagram_default, C as ClassDB } from "./chunk-B4BG7PRW-BlDLflN1.js";
import { _ as __name } from "./mermaid.core-BONQWAGC.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import "./chunk-FMBD7UC4-BbSw3XFq.js";
import "./chunk-55IACEB6-CSUQnqku.js";
import "./chunk-QN33PNHL-C3RhKbVO.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-B0zE39VE.js";
import "./ThemeContext-Ac9lDiNd.js";
import "./createLucideIcon-sFEqYeet.js";
import "./x-BzMxEGBY.js";
import "./index-CZUfqr00.js";
import "./label-CF1Fh03r.js";
import "./wand-sparkles-D4aHx43i.js";
import "./overflow-container-CXkfjaRd.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./loader-circle-BsCo_wlW.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
var diagram = {
  parser: classDiagram_default,
  get db() {
    return new ClassDB();
  },
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
