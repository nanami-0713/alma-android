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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "77320b98-aea0-43ce-b789-0e786096f301", e._sentryDebugIdIdentifier = "sentry-dbid-77320b98-aea0-43ce-b789-0e786096f301");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse('{"displayName":"CSV","fileTypes":["csv"],"name":"csv","patterns":[{"captures":{"1":{"name":"rainbow1"},"2":{"name":"keyword.rainbow2"},"3":{"name":"entity.name.function.rainbow3"},"4":{"name":"comment.rainbow4"},"5":{"name":"string.rainbow5"},"6":{"name":"variable.parameter.rainbow6"},"7":{"name":"constant.numeric.rainbow7"},"8":{"name":"entity.name.type.rainbow8"},"9":{"name":"markup.bold.rainbow9"},"10":{"name":"invalid.rainbow10"}},"match":"( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?( *\\"(?:[^\\"]*\\"\\")*[^\\"]*\\" *(?:,|$)|[^,]*(?:,|$))?","name":"rainbowgroup"}],"scopeName":"text.csv"}'));
const csv = [
  lang
];
export {
  csv as default
};
