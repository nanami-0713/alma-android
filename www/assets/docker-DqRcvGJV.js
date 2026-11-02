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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "3d501448-1f0f-40b0-9b92-f559c6993c75", e._sentryDebugIdIdentifier = "sentry-dbid-3d501448-1f0f-40b0-9b92-f559c6993c75");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse(`{"displayName":"Dockerfile","name":"docker","patterns":[{"captures":{"1":{"name":"keyword.other.special-method.dockerfile"},"2":{"name":"keyword.other.special-method.dockerfile"}},"match":"^\\\\s*\\\\b(?i:(FROM))\\\\b.*?\\\\b(?i:(AS))\\\\b"},{"captures":{"1":{"name":"keyword.control.dockerfile"},"2":{"name":"keyword.other.special-method.dockerfile"}},"match":"^\\\\s*(?i:(ONBUILD)\\\\s+)?(?i:(ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR))\\\\s"},{"captures":{"1":{"name":"keyword.operator.dockerfile"},"2":{"name":"keyword.other.special-method.dockerfile"}},"match":"^\\\\s*(?i:(ONBUILD)\\\\s+)?(?i:(CMD|ENTRYPOINT))\\\\s"},{"include":"#string-character-escape"},{"begin":"\\"","beginCaptures":{"1":{"name":"punctuation.definition.string.begin.dockerfile"}},"end":"\\"","endCaptures":{"1":{"name":"punctuation.definition.string.end.dockerfile"}},"name":"string.quoted.double.dockerfile","patterns":[{"include":"#string-character-escape"}]},{"begin":"'","beginCaptures":{"1":{"name":"punctuation.definition.string.begin.dockerfile"}},"end":"'","endCaptures":{"1":{"name":"punctuation.definition.string.end.dockerfile"}},"name":"string.quoted.single.dockerfile","patterns":[{"include":"#string-character-escape"}]},{"captures":{"1":{"name":"punctuation.whitespace.comment.leading.dockerfile"},"2":{"name":"comment.line.number-sign.dockerfile"},"3":{"name":"punctuation.definition.comment.dockerfile"}},"match":"^(\\\\s*)((#).*$\\\\n?)"}],"repository":{"string-character-escape":{"match":"\\\\\\\\.","name":"constant.character.escaped.dockerfile"}},"scopeName":"source.dockerfile","aliases":["dockerfile"]}`));
const docker = [
  lang
];
export {
  docker as default
};
