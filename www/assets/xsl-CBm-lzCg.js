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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "1eb00dc7-50cb-42a7-959f-c5916e04d64d", e._sentryDebugIdIdentifier = "sentry-dbid-1eb00dc7-50cb-42a7-959f-c5916e04d64d");
    })();
  } catch (e) {
  }
}
;
import xml from "./xml-U2dswaQj.js";
import "./java-DW7YNU8Y.js";
const lang = Object.freeze(JSON.parse(`{"displayName":"XSL","name":"xsl","patterns":[{"begin":"(<)(xsl)((:))(template)","captures":{"1":{"name":"punctuation.definition.tag.xml"},"2":{"name":"entity.name.tag.namespace.xml"},"3":{"name":"entity.name.tag.xml"},"4":{"name":"punctuation.separator.namespace.xml"},"5":{"name":"entity.name.tag.localname.xml"}},"end":"(>)","name":"meta.tag.xml.template","patterns":[{"captures":{"1":{"name":"entity.other.attribute-name.namespace.xml"},"2":{"name":"entity.other.attribute-name.xml"},"3":{"name":"punctuation.separator.namespace.xml"},"4":{"name":"entity.other.attribute-name.localname.xml"}},"match":" (?:([-0-9A-Z_a-z]+)((:)))?([-A-Za-z]+)"},{"include":"#doublequotedString"},{"include":"#singlequotedString"}]},{"include":"text.xml"}],"repository":{"doublequotedString":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.xml"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.xml"}},"name":"string.quoted.double.xml"},"singlequotedString":{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.xml"}},"end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.xml"}},"name":"string.quoted.single.xml"}},"scopeName":"text.xml.xsl","embeddedLangs":["xml"]}`));
const xsl = [
  ...xml,
  lang
];
export {
  xsl as default
};
