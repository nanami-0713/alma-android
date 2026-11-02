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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "fbe4a4a3-ab59-4cea-9aaf-f9b97dbd4b55", e._sentryDebugIdIdentifier = "sentry-dbid-fbe4a4a3-ab59-4cea-9aaf-f9b97dbd4b55");
    })();
  } catch (e) {
  }
}
;
import { _ as __name, l as log, K as selectSvgElement, e as configureSvgSize, L as package_default } from "./mermaid.core-BONQWAGC.js";
import { p as parse } from "./treemap-KMMF4GRG-CKdrh0Jf.js";
import "./preload-helper-D_8ag_Pp.js";
import "./index-B0zE39VE.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
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
import "./_baseUniq-BiYMfpam.js";
import "./_basePickBy-CKaMdZjK.js";
import "./clone-DuBtLyB5.js";
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: package_default.version + ""
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
