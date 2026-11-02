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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "d107132c-2446-46f0-ba12-1e3934a97042", e._sentryDebugIdIdentifier = "sentry-dbid-d107132c-2446-46f0-ba12-1e3934a97042");
    })();
  } catch (e) {
  }
}
;
const lang = Object.freeze(JSON.parse('{"displayName":"Diff","name":"diff","patterns":[{"captures":{"1":{"name":"punctuation.definition.separator.diff"}},"match":"^((\\\\*{15})|(={67})|(-{3}))$\\\\n?","name":"meta.separator.diff"},{"match":"^\\\\d+(,\\\\d+)*([acd])\\\\d+(,\\\\d+)*$\\\\n?","name":"meta.diff.range.normal"},{"captures":{"1":{"name":"punctuation.definition.range.diff"},"2":{"name":"meta.toc-list.line-number.diff"},"3":{"name":"punctuation.definition.range.diff"}},"match":"^(@@)\\\\s*(.+?)\\\\s*(@@)($\\\\n?)?","name":"meta.diff.range.unified"},{"captures":{"3":{"name":"punctuation.definition.range.diff"},"4":{"name":"punctuation.definition.range.diff"},"6":{"name":"punctuation.definition.range.diff"},"7":{"name":"punctuation.definition.range.diff"}},"match":"^(((-{3}) .+ (-{4}))|((\\\\*{3}) .+ (\\\\*{4})))$\\\\n?","name":"meta.diff.range.context"},{"match":"^diff --git a/.*$\\\\n?","name":"meta.diff.header.git"},{"match":"^diff (-|\\\\S+\\\\s+\\\\S+).*$\\\\n?","name":"meta.diff.header.command"},{"captures":{"4":{"name":"punctuation.definition.from-file.diff"},"6":{"name":"punctuation.definition.from-file.diff"},"7":{"name":"punctuation.definition.from-file.diff"}},"match":"^((((-{3}) .+)|((\\\\*{3}) .+))$\\\\n?|(={4}) .+(?= - ))","name":"meta.diff.header.from-file"},{"captures":{"2":{"name":"punctuation.definition.to-file.diff"},"3":{"name":"punctuation.definition.to-file.diff"},"4":{"name":"punctuation.definition.to-file.diff"}},"match":"(^(\\\\+{3}) .+$\\\\n?| (-) .* (={4})$\\\\n?)","name":"meta.diff.header.to-file"},{"captures":{"3":{"name":"punctuation.definition.inserted.diff"},"6":{"name":"punctuation.definition.inserted.diff"}},"match":"^(((>)( .*)?)|((\\\\+).*))$\\\\n?","name":"markup.inserted.diff"},{"captures":{"1":{"name":"punctuation.definition.changed.diff"}},"match":"^(!).*$\\\\n?","name":"markup.changed.diff"},{"captures":{"3":{"name":"punctuation.definition.deleted.diff"},"6":{"name":"punctuation.definition.deleted.diff"}},"match":"^(((<)( .*)?)|((-).*))$\\\\n?","name":"markup.deleted.diff"},{"begin":"^(#)","captures":{"1":{"name":"punctuation.definition.comment.diff"}},"end":"\\\\n","name":"comment.line.number-sign.diff"},{"match":"^index [0-9a-f]{7,40}\\\\.\\\\.[0-9a-f]{7,40}.*$\\\\n?","name":"meta.diff.index.git"},{"captures":{"1":{"name":"punctuation.separator.key-value.diff"},"2":{"name":"meta.toc-list.file-name.diff"}},"match":"^Index(:) (.+)$\\\\n?","name":"meta.diff.index"},{"match":"^Only in .*: .*$\\\\n?","name":"meta.diff.only-in"}],"scopeName":"source.diff"}'));
const diff = [
  lang
];
export {
  diff as default
};
