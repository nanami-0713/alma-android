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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "d90a0614-331d-4363-9775-0dcae01f0f0b", e._sentryDebugIdIdentifier = "sentry-dbid-d90a0614-331d-4363-9775-0dcae01f0f0b");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse(`{"displayName":"dotEnv","name":"dotenv","patterns":[{"captures":{"1":{"patterns":[{"include":"#line-comment"}]}},"match":"^\\\\s?(#.*)$\\\\n"},{"captures":{"1":{"patterns":[{"include":"#key"}]},"2":{"name":"keyword.operator.assignment.dotenv"},"3":{"name":"property.value.dotenv","patterns":[{"include":"#line-comment"},{"include":"#double-quoted-string"},{"include":"#single-quoted-string"},{"include":"#interpolation"}]}},"match":"^\\\\s?(.*?)\\\\s?(=)(.*)$"}],"repository":{"double-quoted-string":{"captures":{"1":{"patterns":[{"include":"#interpolation"},{"include":"#escape-characters"}]}},"match":"\\"(.*)\\"","name":"string.quoted.double.dotenv"},"escape-characters":{"match":"\\\\\\\\(?:[\\"'\\\\\\\\bfnrt]|u[0-9A-F]{4})","name":"constant.character.escape.dotenv"},"interpolation":{"captures":{"1":{"name":"keyword.interpolation.begin.dotenv"},"2":{"name":"variable.interpolation.dotenv"},"3":{"name":"keyword.interpolation.end.dotenv"}},"match":"(\\\\$\\\\{)(.*)(})"},"key":{"captures":{"1":{"name":"keyword.key.export.dotenv"},"2":{"name":"variable.key.dotenv","patterns":[{"include":"#variable"}]}},"match":"(export\\\\s)?(.*)"},"line-comment":{"match":"#.*$","name":"comment.line.dotenv"},"single-quoted-string":{"match":"'(.*)'","name":"string.quoted.single.dotenv"},"variable":{"match":"[A-Z_a-z]+[0-9A-Z_a-z]*"}},"scopeName":"source.dotenv"}`));
const dotenv = [
  lang
];
export {
  dotenv as default
};
