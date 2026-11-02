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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "0a442b85-85b1-4d85-9bec-ebd4548558fc", e._sentryDebugIdIdentifier = "sentry-dbid-0a442b85-85b1-4d85-9bec-ebd4548558fc");
    })();
  } catch (e) {
  }
}
;
if (window.electronClipboard?.writeText) {
  const electronClipboard = window.electronClipboard;
  const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
  navigator.clipboard.writeText = async (text) => {
    try {
      const success = await electronClipboard.writeText(text);
      if (success) return;
      try {
        await originalWriteText(text);
      } catch (fallbackError) {
        console.warn("Clipboard fallback failed:", fallbackError);
      }
    } catch (error) {
      try {
        await originalWriteText(text);
      } catch (fallbackError) {
        console.warn("Clipboard fallback failed:", fallbackError);
      }
    }
  };
}
if (window.electronClipboard?.write) {
  const electronClipboard = window.electronClipboard;
  const originalWrite = navigator.clipboard.write.bind(navigator.clipboard);
  navigator.clipboard.write = async (items) => {
    try {
      const item = items[0];
      if (!item) {
        try {
          await originalWrite(items);
        } catch (fallbackError) {
          console.warn("Clipboard fallback failed:", fallbackError);
        }
        return;
      }
      const data = {};
      if (item.types.includes("text/plain")) {
        const blob = await item.getType("text/plain");
        data.text = await blob.text();
      }
      if (item.types.includes("text/html")) {
        const blob = await item.getType("text/html");
        data.html = await blob.text();
      }
      const success = await electronClipboard.write(data);
      if (success) return;
      try {
        await originalWrite(items);
      } catch (fallbackError) {
        console.warn("Clipboard fallback failed:", fallbackError);
      }
    } catch {
      try {
        await originalWrite(items);
      } catch (fallbackError) {
        console.warn("Clipboard fallback failed:", fallbackError);
      }
    }
  };
}
