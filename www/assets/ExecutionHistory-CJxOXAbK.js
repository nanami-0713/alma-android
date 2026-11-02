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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "7da2e1ea-ea94-4528-8e06-740b10b45b77", e._sentryDebugIdIdentifier = "sentry-dbid-7da2e1ea-ea94-4528-8e06-740b10b45b77");
    })();
  } catch (e) {
  }
}
;
import { c as createLucideIcon } from "./createLucideIcon-sFEqYeet.js";
import { f as fetchWithTimeout, r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { N as NavigationContext, n as useNavigate } from "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import { o as useSWR, a as useI18n, B as Button, E as ExternalLink } from "./ThemeContext-Ac9lDiNd.js";
import { D as Dialog, w as DialogContent, x as DialogHeader, y as DialogTitle, O as OverflowContainer } from "./overflow-container-CXkfjaRd.js";
import "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { P as Paperclip, R as RotateCcw } from "./label-CF1Fh03r.js";
import { T as Trash2 } from "./trash-2-DTP27QMN.js";
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
];
const CircleStop = createLucideIcon("circle-stop", __iconNode$1);
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
const TOOL_DEFINITIONS = {
  Task: {
    labelKey: "chat.tools.items.Task.label",
    descriptionKey: "chat.tools.items.Task.description",
    group: "planning"
  },
  TodoWrite: {
    labelKey: "chat.tools.items.TodoWrite.label",
    descriptionKey: "chat.tools.items.TodoWrite.description",
    group: "planning"
  },
  EnterPlanMode: {
    labelKey: "chat.tools.items.EnterPlanMode.label",
    descriptionKey: "chat.tools.items.EnterPlanMode.description",
    group: "planning"
  },
  ExitPlanMode: {
    labelKey: "chat.tools.items.ExitPlanMode.label",
    descriptionKey: "chat.tools.items.ExitPlanMode.description",
    group: "planning"
  },
  Skill: {
    labelKey: "chat.tools.items.Skill.label",
    descriptionKey: "chat.tools.items.Skill.description",
    group: "planning"
  },
  SlashCommand: {
    labelKey: "chat.tools.items.SlashCommand.label",
    descriptionKey: "chat.tools.items.SlashCommand.description",
    group: "planning"
  },
  Bash: {
    labelKey: "chat.tools.items.Bash.label",
    descriptionKey: "chat.tools.items.Bash.description",
    group: "shell"
  },
  BashOutput: {
    labelKey: "chat.tools.items.BashOutput.label",
    descriptionKey: "chat.tools.items.BashOutput.description",
    group: "shell"
  },
  KillShell: {
    labelKey: "chat.tools.items.KillShell.label",
    descriptionKey: "chat.tools.items.KillShell.description",
    group: "shell"
  },
  Glob: {
    labelKey: "chat.tools.items.Glob.label",
    descriptionKey: "chat.tools.items.Glob.description",
    group: "workspace"
  },
  Grep: {
    labelKey: "chat.tools.items.Grep.label",
    descriptionKey: "chat.tools.items.Grep.description",
    group: "workspace"
  },
  Read: {
    labelKey: "chat.tools.items.Read.label",
    descriptionKey: "chat.tools.items.Read.description",
    group: "workspace"
  },
  Edit: {
    labelKey: "chat.tools.items.Edit.label",
    descriptionKey: "chat.tools.items.Edit.description",
    group: "workspace"
  },
  Write: {
    labelKey: "chat.tools.items.Write.label",
    descriptionKey: "chat.tools.items.Write.description",
    group: "workspace"
  },
  NotebookEdit: {
    labelKey: "chat.tools.items.NotebookEdit.label",
    descriptionKey: "chat.tools.items.NotebookEdit.description",
    group: "workspace"
  },
  WebFetch: {
    labelKey: "chat.tools.items.WebFetch.label",
    descriptionKey: "chat.tools.items.WebFetch.description",
    group: "web"
  },
  WebSearch: {
    labelKey: "chat.tools.items.WebSearch.label",
    descriptionKey: "chat.tools.items.WebSearch.description",
    group: "web"
  },
  ToolSearch: {
    labelKey: "chat.tools.items.ToolSearch.label",
    descriptionKey: "chat.tools.items.ToolSearch.description",
    group: "planning"
  }
};
const GROUP_LABEL_KEYS = {
  workspace: "chat.tools.groups.workspace",
  shell: "chat.tools.groups.shell",
  web: "chat.tools.groups.web",
  planning: "chat.tools.groups.planning"
};
const GROUP_ORDER = ["web", "workspace", "shell", "planning"];
const TOOL_GROUPS = GROUP_ORDER.map((groupId) => ({
  id: groupId,
  labelKey: GROUP_LABEL_KEYS[groupId],
  tools: Object.entries(TOOL_DEFINITIONS).filter(([, definition]) => definition.group === groupId).map(([key, definition]) => ({
    key,
    labelKey: definition.labelKey,
    descriptionKey: definition.descriptionKey
  }))
}));
const ALL_TOOL_KEYS = Object.keys(TOOL_DEFINITIONS);
const TOOL_ORDER_INDEX = new Map(ALL_TOOL_KEYS.map((key, index) => [key, index]));
const sortToolKeys = (keys) => {
  return [...new Set(keys)].sort((a, b) => {
    const aIndex = TOOL_ORDER_INDEX.get(a) ?? 0;
    const bIndex = TOOL_ORDER_INDEX.get(b) ?? 0;
    return aIndex - bIndex;
  });
};
const AUTO_TOOL_SELECTION = "__auto__";
function mcpServersOfTools(tools, mcpTools) {
  if (tools === AUTO_TOOL_SELECTION) return [];
  const selected = new Set(tools);
  return [...new Set(mcpTools.filter((tool) => selected.has(tool.id)).map((tool) => tool.serverName))];
}
const MAX_STREAMING_OUTPUT_TAIL = 1e5;
const appendStreamTail = (base, chunk) => {
  const joined = base + chunk;
  return joined.length > MAX_STREAMING_OUTPUT_TAIL ? joined.slice(joined.length - MAX_STREAMING_OUTPUT_TAIL) : joined;
};
class DeltaAccumulatorClass {
  accumulators = /* @__PURE__ */ new Map();
  // Global buffer for streaming deltas that arrive before the message is initialized
  // Key: messageId, Value: Map<toolCallId, {stdout, stderr}>
  earlyStreamingDeltas = /* @__PURE__ */ new Map();
  /**
   * Initialize accumulator with a full message (from message_added)
   */
  initMessage(message) {
    const earlyDeltas = this.earlyStreamingDeltas.get(message.id);
    this.accumulators.set(message.id, {
      message: this.cloneMessageForAccumulator(message),
      lastSeq: 0,
      pendingDeltas: [],
      pendingStreamingDeltas: earlyDeltas || /* @__PURE__ */ new Map()
    });
    if (earlyDeltas) {
      this.earlyStreamingDeltas.delete(message.id);
    }
    const MAX_ACCUMULATORS = 100;
    for (const key of this.accumulators.keys()) {
      if (this.accumulators.size <= MAX_ACCUMULATORS) break;
      if (key === message.id) continue;
      this.accumulators.delete(key);
    }
  }
  /**
   * Hydrate accumulators from persisted thread messages after a page reload or refetch.
   * Without this, subsequent message_delta events have no base message to apply onto.
   */
  hydrateMessages(messages) {
    for (const message of messages) {
      this.hydrateMessage(message);
    }
  }
  hydrateMessage(message) {
    if (this.accumulators.has(message.id)) {
      this.syncMessage(message);
    } else {
      this.initMessage(message);
    }
  }
  /**
   * Check if a message is being accumulated
   */
  hasMessage(messageId) {
    return this.accumulators.has(messageId);
  }
  /**
   * Apply deltas to the accumulated message and return a cloned updated message.
   * Clone is necessary for React to detect state changes.
   */
  applyDeltas(payload) {
    const { messageId, deltas } = payload;
    const acc = this.accumulators.get(messageId);
    if (!acc) {
      for (const delta of deltas) {
        if (delta.type === "tool_output_streaming") {
          let messageBuffer = this.earlyStreamingDeltas.get(messageId);
          if (!messageBuffer) {
            messageBuffer = /* @__PURE__ */ new Map();
            this.earlyStreamingDeltas.set(messageId, messageBuffer);
          }
          const pending = messageBuffer.get(delta.toolCallId) || { stdout: "", stderr: "" };
          if (delta.stream.stdout) pending.stdout = appendStreamTail(pending.stdout, delta.stream.stdout);
          if (delta.stream.stderr) pending.stderr = appendStreamTail(pending.stderr, delta.stream.stderr);
          messageBuffer.set(delta.toolCallId, pending);
        }
      }
      return null;
    }
    const sorted = [...deltas].sort((a, b) => a.seq - b.seq);
    let hasChanges = false;
    for (const delta of sorted) {
      if (delta.seq <= acc.lastSeq && delta.type !== "tool_output_streaming") {
        continue;
      }
      if (acc.lastSeq > 0 && delta.seq > acc.lastSeq + 1 && delta.type !== "tool_output_streaming") {
        acc.pendingDeltas.push(delta);
        continue;
      }
      this.applyDelta(acc.message, delta);
      if (delta.type !== "tool_output_streaming") {
        acc.lastSeq = delta.seq;
      }
      hasChanges = true;
      this.processPendingDeltas(acc);
    }
    if (hasChanges) {
      const reactParts = (acc.message.message.parts || []).map((part) => this.clonePartForAccumulator(part));
      return {
        ...acc.message,
        message: {
          ...acc.message.message,
          parts: reactParts
        }
      };
    }
    return null;
  }
  /**
   * Full sync for recovery - replaces accumulated state with full message.
   *
   * IMPORTANT: During active streaming, the DB version (from message_updated) can be
   * stale because DB writes are throttled (~1s). If the accumulated text is ahead of
   * the sync message, we preserve accumulated text/reasoning parts and only merge
   * metadata + structural changes (new tool parts, tool state updates).
   * This prevents the "text disappears then reappears" bug.
   */
  syncMessage(message) {
    const acc = this.accumulators.get(message.id);
    if (acc) {
      const accTextLen = this.getTextContentLength(acc.message);
      const syncTextLen = this.getTextContentLength(message);
      const accPartsCount = (acc.message.message.parts || []).length;
      const syncPartsCount = (message.message.parts || []).length;
      const accIsCurrent = accTextLen >= syncTextLen && accPartsCount >= syncPartsCount;
      if (acc.lastSeq > 0 && accIsCurrent) {
        acc.message = {
          ...acc.message,
          metadata: { ...acc.message.metadata, ...message.metadata }
        };
        const accParts = acc.message.message.parts || [];
        const syncParts = message.message.parts || [];
        if (syncParts.length > accParts.length) {
          const newParts = syncParts.slice(accParts.length);
          acc.message.message.parts = [...accParts, ...newParts.map((p) => this.clonePartForAccumulator(p))];
        }
        for (const syncPart of syncParts) {
          const sp = syncPart;
          if (!sp.toolCallId) continue;
          const accPart = accParts.find((p) => p.toolCallId === sp.toolCallId);
          if (!accPart) continue;
          if (sp.state && sp.state !== accPart.state) {
            accPart.state = sp.state;
            if (sp.output !== void 0) accPart.output = sp.output;
            if (sp.errorText !== void 0) accPart.errorText = sp.errorText;
          }
          if (sp.input && typeof sp.input === "object") {
            accPart.input = { ...accPart.input, ...sp.input };
          }
        }
      } else {
        acc.message = this.cloneMessageForAccumulator(message);
      }
      acc.pendingDeltas = [];
    } else {
      this.initMessage(message);
    }
  }
  /**
   * Calculate total text content length for text and reasoning parts
   */
  getTextContentLength(message) {
    return (message.message.parts || []).filter((p) => {
      const type = p.type;
      return type === "text" || type === "reasoning";
    }).reduce((sum, p) => sum + (p.text || "").length, 0);
  }
  /**
   * Get the current accumulated message
   */
  getMessage(messageId) {
    return this.accumulators.get(messageId)?.message ?? null;
  }
  getSnapshot(messageId) {
    const message = this.getMessage(messageId);
    return message ? this.cloneMessageForAccumulator(message) : null;
  }
  /**
   * Clean up accumulator for a completed message
   */
  cleanup(messageId) {
    this.accumulators.delete(messageId);
  }
  cleanupThread(threadId) {
    for (const [messageId, acc] of this.accumulators) {
      if (acc.message.threadId === threadId) {
        this.accumulators.delete(messageId);
      }
    }
  }
  /**
   * Apply a single delta to the message
   */
  applyDelta(message, delta) {
    const parts = message.message.parts || [];
    switch (delta.type) {
      case "text_append": {
        const part = parts[delta.partIndex];
        if (part && (part.type === "text" || part.type === "reasoning")) {
          part.text = (part.text || "") + delta.text;
        }
        break;
      }
      case "text_done": {
        const part = parts[delta.partIndex];
        if (part) {
          part.state = "done";
        }
        break;
      }
      case "part_add": {
        const newPart = this.clonePartForAccumulator(delta.part);
        parts.push(newPart);
        if ("toolCallId" in newPart && typeof newPart.toolCallId === "string") {
          const acc = this.accumulators.get(message.id);
          const pendingStreaming = acc?.pendingStreamingDeltas.get(newPart.toolCallId);
          if (pendingStreaming && (pendingStreaming.stdout || pendingStreaming.stderr)) {
            newPart.streamingOutput = {
              stdout: pendingStreaming.stdout,
              stderr: pendingStreaming.stderr
            };
            acc?.pendingStreamingDeltas.delete(newPart.toolCallId);
          }
        }
        break;
      }
      case "part_update": {
        let partIndex = delta.partIndex;
        if (partIndex === -1 && delta.toolCallId) {
          partIndex = parts.findIndex(
            (p) => p && typeof p === "object" && "toolCallId" in p && p.toolCallId === delta.toolCallId
          );
        }
        if (partIndex === -1) {
          break;
        }
        const part = parts[partIndex];
        if (part) {
          Object.assign(part, delta.updates);
        }
        break;
      }
      case "tool_input_append": {
        const part = parts[delta.partIndex];
        if (part && part.type?.startsWith("tool-")) {
          if (!part.input) part.input = {};
          part.input[delta.inputKey] = (part.input[delta.inputKey] || "") + delta.text;
        }
        break;
      }
      case "tool_output_set": {
        const part = parts[delta.partIndex];
        if (part && part.type?.startsWith("tool-")) {
          part.output = delta.output;
          part.state = delta.state;
          if (delta.input && typeof delta.input === "object") {
            part.input = { ...part.input, ...delta.input };
          }
          if (delta.errorText) {
            part.errorText = delta.errorText;
          }
          if (delta.parentToolCallId && !part.parentToolCallId) {
            part.parentToolCallId = delta.parentToolCallId;
          }
          if (delta.asyncAgentLaunched) {
            part.asyncAgentLaunched = true;
          }
        }
        break;
      }
      case "tool_output_streaming": {
        let partIndex = delta.partIndex;
        if (partIndex === -1 && delta.toolCallId) {
          partIndex = parts.findIndex(
            (p) => p && typeof p === "object" && "toolCallId" in p && p.toolCallId === delta.toolCallId
          );
        }
        if (partIndex === -1) {
          const acc = this.accumulators.get(message.id);
          if (acc) {
            const pending = acc.pendingStreamingDeltas.get(delta.toolCallId) || { stdout: "", stderr: "" };
            if (delta.stream.stdout) pending.stdout = appendStreamTail(pending.stdout, delta.stream.stdout);
            if (delta.stream.stderr) pending.stderr = appendStreamTail(pending.stderr, delta.stream.stderr);
            acc.pendingStreamingDeltas.set(delta.toolCallId, pending);
          }
          break;
        }
        const part = parts[partIndex];
        if (part && part.type?.startsWith("tool-")) {
          if (!part.streamingOutput) {
            part.streamingOutput = { stdout: "", stderr: "" };
          }
          if (delta.stream.stdout) {
            part.streamingOutput.stdout = appendStreamTail(part.streamingOutput.stdout, delta.stream.stdout);
          }
          if (delta.stream.stderr) {
            part.streamingOutput.stderr = appendStreamTail(part.streamingOutput.stderr, delta.stream.stderr);
          }
        }
        break;
      }
      case "metadata_update": {
        message.metadata = { ...message.metadata, ...delta.metadata };
        break;
      }
    }
    message.message.parts = parts;
  }
  cloneMessageForAccumulator(message) {
    return {
      ...message,
      metadata: message.metadata ? { ...message.metadata } : message.metadata,
      message: {
        ...message.message,
        parts: (message.message.parts || []).map((part) => this.clonePartForAccumulator(part))
      }
    };
  }
  clonePartForAccumulator(part) {
    const cloned = { ...part };
    const partWithInput = part;
    if (partWithInput.input && typeof partWithInput.input === "object") {
      cloned.input = Array.isArray(partWithInput.input) ? [...partWithInput.input] : { ...partWithInput.input };
    }
    const partWithStreaming = part;
    if (partWithStreaming.streamingOutput && typeof partWithStreaming.streamingOutput === "object") {
      cloned.streamingOutput = { ...partWithStreaming.streamingOutput };
    }
    const partWithApproval = part;
    if (partWithApproval.approvalDecision && typeof partWithApproval.approvalDecision === "object") {
      cloned.approvalDecision = Array.isArray(partWithApproval.approvalDecision) ? [...partWithApproval.approvalDecision] : { ...partWithApproval.approvalDecision };
    }
    return cloned;
  }
  /**
   * Process pending out-of-order deltas
   */
  processPendingDeltas(acc) {
    let processed = true;
    while (processed) {
      processed = false;
      const idx = acc.pendingDeltas.findIndex((d) => d.seq === acc.lastSeq + 1);
      if (idx !== -1) {
        const delta = acc.pendingDeltas.splice(idx, 1)[0];
        this.applyDelta(acc.message, delta);
        acc.lastSeq = delta.seq;
        processed = true;
      }
    }
  }
}
const deltaAccumulator = new DeltaAccumulatorClass();
class PromptAppsAPIClient {
  baseURL = null;
  async initialize() {
    if (typeof window !== "undefined" && window.apiServer) {
      const info = await window.apiServer.getInfo();
      this.baseURL = info.baseURL;
    }
  }
  async request(endpoint, options = {}) {
    if (!this.baseURL) {
      await this.initialize();
    }
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType?.includes("application/json")) {
      return null;
    }
    return response.json();
  }
  // Prompt Apps CRUD
  async getPromptApps() {
    return this.request("/api/prompt-apps");
  }
  async getPromptApp(id) {
    return this.request(`/api/prompt-apps/${id}`);
  }
  async createPromptApp(data) {
    return this.request("/api/prompt-apps", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async updatePromptApp(id, data) {
    return this.request(`/api/prompt-apps/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  async deletePromptApp(id) {
    await this.request(`/api/prompt-apps/${id}`, {
      method: "DELETE"
    });
  }
  async reorderPromptApps(orderedIds) {
    await this.request("/api/prompt-apps/reorder", {
      method: "PUT",
      body: JSON.stringify({ orderedIds })
    });
  }
  // Prompt App Executions
  async getPromptAppExecutions(promptAppId, limit) {
    const params = limit ? `?limit=${limit}` : "";
    return this.request(`/api/prompt-apps/${promptAppId}/executions${params}`);
  }
  async executePromptApp(id, data) {
    return this.request(`/api/prompt-apps/${id}/execute`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  async getPromptAppExecution(id) {
    return this.request(`/api/prompt-app-executions/${id}`);
  }
  async deletePromptAppExecution(id) {
    await this.request(`/api/prompt-app-executions/${id}`, {
      method: "DELETE"
    });
  }
}
const promptAppsApiClient = new PromptAppsAPIClient();
function useSafeNavigate() {
  const navContext = reactExports.useContext(NavigationContext);
  return navContext?.navigator ? useNavigate() : null;
}
function usePromptAppExecutions(promptAppId, limit) {
  const { data, error, isLoading, mutate } = useSWR(
    promptAppId ? `/api/prompt-apps/${promptAppId}/executions` : null,
    () => promptAppId ? promptAppsApiClient.getPromptAppExecutions(promptAppId, limit) : Promise.reject(),
    {
      revalidateOnFocus: false
    }
  );
  const executePromptApp = reactExports.useCallback(
    async (input) => {
      if (!promptAppId) {
        throw new Error("No prompt app ID");
      }
      const result = await promptAppsApiClient.executePromptApp(promptAppId, input);
      mutate((current) => current ? [result.execution, ...current] : [result.execution], false);
      return result;
    },
    [promptAppId, mutate]
  );
  const deleteExecution = reactExports.useCallback(
    async (executionId) => {
      await promptAppsApiClient.deletePromptAppExecution(executionId);
      mutate((current) => current?.filter((exec) => exec.id !== executionId), false);
    },
    [mutate]
  );
  return {
    executions: data ?? [],
    isLoading,
    error,
    mutate,
    executePromptApp,
    deleteExecution
  };
}
function ExecutionHistory({ open, onOpenChange, promptApp, onRerun, onNavigateToChat }) {
  const { t } = useI18n();
  const navigate = useSafeNavigate();
  const { executions, isLoading, deleteExecution } = usePromptAppExecutions(promptApp?.id);
  const handleOpenThread = reactExports.useCallback(
    (threadId) => {
      if (window.promptAppRunner?.navigateToThread) {
        window.promptAppRunner.navigateToThread(threadId);
      } else {
        onOpenChange(false);
        onNavigateToChat?.();
        if (navigate) {
          navigate(`/chat/${threadId}`);
        }
      }
    },
    [navigate, onOpenChange, onNavigateToChat]
  );
  const handleRerun = reactExports.useCallback(
    (execution) => {
      if (onRerun) {
        onRerun(execution.inputValues);
      }
    },
    [onRerun]
  );
  const handleDelete = reactExports.useCallback(
    async (executionId) => {
      if (!confirm(t("promptApps.history.deleteConfirm") || "Delete this execution record?")) {
        return;
      }
      await deleteExecution(executionId);
    },
    [deleteExecution, t]
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatInputValues = (values) => {
    const entries = Object.entries(values).filter(([, v]) => v !== "" && v !== null && v !== void 0);
    if (entries.length === 0) return "";
    return entries.map(([key, value]) => {
      const displayValue = typeof value === "boolean" ? value ? "Yes" : "No" : String(value);
      const truncated = displayValue.length > 30 ? displayValue.slice(0, 30) + "..." : displayValue;
      return `${key}: ${truncated}`;
    }).join(", ");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl max-h-[80vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: promptApp?.icon || "📝" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        promptApp?.name,
        " - ",
        t("promptApps.history.title") || "History"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "flex-1 min-h-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8 text-muted-foreground", children: t("common.loading") || "Loading..." }) : executions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("promptApps.history.empty") || "No execution history yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: t("promptApps.history.emptyHint") || "Run this app to create history" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-1", children: executions.map((execution) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-3 space-y-2 hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: formatDate(execution.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: formatInputValues(execution.inputValues) }),
          execution.attachmentCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              execution.attachmentCount,
              " ",
              t("promptApps.history.attachments") || "attachments"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          execution.threadId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => handleOpenThread(execution.threadId),
              title: t("promptApps.history.openChat") || "Open Chat",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", disabled: true, title: t("promptApps.history.threadDeleted") || "Thread deleted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14, className: "opacity-30" }) }),
          onRerun && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => handleRerun(execution),
              title: t("promptApps.history.rerun") || "Re-run with these values",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => handleDelete(execution.id),
              className: "text-destructive hover:text-destructive",
              title: t("common.delete") || "Delete",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-muted-foreground hover:text-foreground", children: t("promptApps.history.showPrompt") || "Show generated prompt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-muted/50 rounded text-xs font-mono whitespace-pre-wrap max-h-[100px] overflow-y-auto", children: execution.generatedPrompt })
      ] })
    ] }, execution.id)) }) })
  ] }) });
}
export {
  AUTO_TOOL_SELECTION as A,
  CircleStop as C,
  ExecutionHistory as E,
  History as H,
  TOOL_GROUPS as T,
  ALL_TOOL_KEYS as a,
  appendStreamTail as b,
  deltaAccumulator as d,
  mcpServersOfTools as m,
  promptAppsApiClient as p,
  sortToolKeys as s
};
