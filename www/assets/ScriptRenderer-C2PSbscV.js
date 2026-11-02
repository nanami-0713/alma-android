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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "62083f9d-530f-4c04-aa09-89d996206366", e._sentryDebugIdIdentifier = "sentry-dbid-62083f9d-530f-4c04-aa09-89d996206366");
    })();
  } catch (e) {
  }
}
;
import { f as fetchWithTimeout, r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
import { a as getDisplayLanguage } from "./App-CJD1Pyfa.js";
import { h as highlightCode, B as Button, e as Square, c as cn } from "./ThemeContext-Ac9lDiNd.js";
import { u as useTheme, P as Play, O as OverflowContainer, C as CircleAlert } from "./overflow-container-CXkfjaRd.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { a as apiClient } from "./apiClient-DmP45vUN.js";
import { C as CircleCheckBig } from "./PluginNotificationListener-DQz_TGb2.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import "./label-CF1Fh03r.js";
import "./wand-sparkles-D4aHx43i.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import "./index-CZUfqr00.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
import "./pencil-BtEsZPL8.js";
import "./trash-2-DTP27QMN.js";
import "./TwemojiIcon-qeDCXH7q.js";
import "./index-pfi9S7gc.js";
import "./slider-CpZgBHCs.js";
import "./ExecutionHistory-CJxOXAbK.js";
import "./alma-icon-BzHspoaH.js";
import "./generative-ui-block-1Rj38gNW.js";
import "./en-US-CZvvliM3.js";
import "./addLeadingZeros-DCGuLiwe.js";
import "./PlatformContext-BWz3dz-T.js";
/* empty css                   */
import "./ImageAnnotator-CcNrU1f9.js";
import "./v4-D_ZMSocT.js";
import "./ConditionalPostHogProvider-Cgb2BAQg.js";
const FALLBACK_API_BASE = "http://localhost:23001";
function apiBase() {
  return apiClient.getBaseURL() ?? FALLBACK_API_BASE;
}
function wsBase() {
  return apiBase().replace(/^http/, "ws");
}
class BunApiClient {
  /**
   * Get Bun runtime status
   */
  async getStatus() {
    const response = await fetchWithTimeout(`${apiBase()}/api/bun/status`);
    if (!response.ok) {
      throw new Error("Failed to get Bun status");
    }
    return response.json();
  }
  /**
   * Execute code in Bun sandbox
   */
  async execute(config) {
    const response = await fetchWithTimeout(`${apiBase()}/api/bun/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(config)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to execute code");
    }
    return response.json();
  }
  /**
   * Get execution session status
   */
  async getExecution(executionId) {
    const response = await fetchWithTimeout(`${apiBase()}/api/bun/executions/${executionId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to get execution");
    }
    return response.json();
  }
  /**
   * Cancel execution
   */
  async cancel(executionId) {
    const response = await fetchWithTimeout(`${apiBase()}/api/bun/executions/${executionId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to cancel execution");
    }
    return response.json();
  }
  /**
   * Connect to WebSocket for real-time execution output
   */
  connectWs(executionId, onMessage) {
    const ws = new WebSocket(`${wsBase()}/ws/bun/${executionId}`);
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        onMessage(msg);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return ws;
  }
  /**
   * Execute code and wait for completion with real-time output
   */
  async executeWithOutput(config, onOutput) {
    const { executionId } = await this.execute(config);
    return new Promise((resolve, reject) => {
      const ws = this.connectWs(executionId, (msg) => {
        if (msg.type === "stdout" || msg.type === "stderr") {
          onOutput(msg.type, msg.data);
        } else if (msg.type === "exit") {
          ws.close();
          try {
            const result = JSON.parse(msg.data);
            resolve({
              id: executionId,
              status: result.success ? "completed" : "error",
              startTime: Date.now() - result.duration,
              endTime: Date.now(),
              result
            });
          } catch {
            this.getExecution(executionId).then(resolve).catch(reject);
          }
        }
      });
      ws.onerror = () => {
        this.pollExecution(executionId).then(resolve).catch(reject);
      };
    });
  }
  /**
   * Poll execution status until completion
   */
  async pollExecution(executionId) {
    const maxAttempts = 600;
    let attempts = 0;
    while (attempts < maxAttempts) {
      const session = await this.getExecution(executionId);
      if (session.status !== "pending" && session.status !== "running") {
        return session;
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      attempts++;
    }
    throw new Error("Execution polling timeout");
  }
}
const bunApiClient = new BunApiClient();
function parseShikiLines(html) {
  const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  if (!codeMatch) return [];
  const codeContent = codeMatch[1];
  const lineStartRegex = /<span class="line"[^>]*>/g;
  let match;
  const starts = [];
  while ((match = lineStartRegex.exec(codeContent)) !== null) {
    starts.push(match.index);
  }
  const lines = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1] : codeContent.length;
    let line = codeContent.slice(start, end).trim();
    if (!line.endsWith("</span>")) {
      const lastSpanClose = line.lastIndexOf("</span>");
      if (lastSpanClose !== -1) {
        line = line.slice(0, lastSpanClose + 7);
      }
    }
    lines.push(line);
  }
  return lines;
}
const ScriptRenderer = reactExports.memo(function ScriptRenderer2({ artifact }) {
  const language = getDisplayLanguage(artifact);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const [executionState, setExecutionState] = reactExports.useState("idle");
  const [output, setOutput] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [highlightedLines, setHighlightedLines] = reactExports.useState([]);
  const outputRef = reactExports.useRef(null);
  const executionIdRef = reactExports.useRef(null);
  const rawLines = reactExports.useMemo(() => artifact.content.split("\n"), [artifact.content]);
  reactExports.useEffect(() => {
    if (!artifact.content) {
      setHighlightedLines([]);
      return;
    }
    highlightCode(artifact.content, language, isDark).then((result2) => {
      const parsedLines = parseShikiLines(result2);
      setHighlightedLines(parsedLines);
    }).catch(() => {
      const plainLines = artifact.content.split("\n").map((line) => `<span class="line">${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`);
      setHighlightedLines(plainLines);
    });
  }, [artifact.content, language, isDark]);
  reactExports.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  const handleRun = reactExports.useCallback(async () => {
    setExecutionState("running");
    setOutput("");
    setResult(null);
    setError(null);
    try {
      const session = await bunApiClient.executeWithOutput(
        {
          code: artifact.content,
          language: language === "javascript" ? "javascript" : "typescript",
          timeout: 3e4,
          allowNetwork: true
        },
        (_type, data) => {
          setOutput((prev) => prev + data);
        }
      );
      executionIdRef.current = session.id;
      setResult(session.result || null);
      setExecutionState(session.result?.success ? "completed" : "error");
      if (!session.result?.success && session.result?.error) {
        setError(session.result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : instance.t("artifactsUi.executionFailed"));
      setExecutionState("error");
    }
  }, [artifact.content, language]);
  const handleStop = reactExports.useCallback(async () => {
    if (executionIdRef.current) {
      try {
        await bunApiClient.cancel(executionIdRef.current);
        setExecutionState("idle");
      } catch (err) {
        console.error("Failed to cancel execution:", err);
      }
    }
  }, []);
  const renderStatusIcon = () => {
    switch (executionState) {
      case "running":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" });
      case "completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" });
      case "error":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-red-500" });
      default:
        return null;
    }
  };
  const isHighlightValid = highlightedLines.length === rawLines.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 border-b border-border bg-muted/30", children: [
      executionState === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "destructive", onClick: handleStop, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4 mr-1" }),
        instance.t("common.stop")
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: handleRun, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 mr-1" }),
        instance.t("artifactsUi.run")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto text-xs text-muted-foreground", children: [
        renderStatusIcon(),
        result && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          result.duration,
          "ms",
          result.exitCode !== 0 && ` (exit: ${result.exitCode})`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max min-w-full", children: rawLines.map((rawLine, lineIndex) => {
      const hasHighlight = isHighlightValid && lineIndex < highlightedLines.length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex font-mono text-[0.8125rem] leading-[1.5] whitespace-pre", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sticky left-0 z-10 flex-shrink-0 min-w-[3rem] pr-4 pl-3 text-right text-muted-foreground/40 bg-zinc-100 dark:bg-zinc-800 select-none", children: lineIndex + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 pr-4", children: hasHighlight ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: highlightedLines[lineIndex] || "" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: isDark ? "#abb2bf" : "#383a42" }, children: rawLine }) })
      ] }, lineIndex);
    }) }) }) }),
    (output || error) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/30 border-b border-border", children: instance.t("toolBlock.output") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "h-32", ref: outputRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: cn("p-3 font-mono text-xs whitespace-pre-wrap", error && "text-red-500"), children: [
        output,
        error && !output && error,
        result?.stderr && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: result.stderr })
      ] }) })
    ] })
  ] });
});
export {
  ScriptRenderer
};
