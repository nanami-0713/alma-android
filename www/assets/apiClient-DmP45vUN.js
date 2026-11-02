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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "9660ee9e-56f4-49d1-9719-36aa4fadeb60", e._sentryDebugIdIdentifier = "sentry-dbid-9660ee9e-56f4-49d1-9719-36aa4fadeb60");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, f as fetchWithTimeout } from "./index-B0zE39VE.js";
const DEFAULT_STATE = { kind: "local", status: "online", peer: "" };
let state = DEFAULT_STATE;
const listeners = /* @__PURE__ */ new Set();
let reconnectHandler = null;
function getPhoneConnectionState() {
  return state;
}
function setPhoneConnectionState(next) {
  const merged = { ...state, ...next };
  if (merged.status === "online" && state.status !== "online") merged.onlineSince = Date.now();
  if (merged.status !== "error") delete merged.error;
  if (merged.kind === state.kind && merged.status === state.status && merged.peer === state.peer && merged.error === state.error && merged.onlineSince === state.onlineSince) {
    return;
  }
  state = merged;
  for (const l of listeners) l();
}
function subscribePhoneConnection(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function registerPhoneReconnect(handler) {
  reconnectHandler = handler;
}
function requestPhoneReconnect() {
  reconnectHandler?.();
}
function usePhoneConnection() {
  return reactExports.useSyncExternalStore(subscribePhoneConnection, getPhoneConnectionState, getPhoneConnectionState);
}
function parseRemoteHandoffPairing(link) {
  try {
    const url = new URL(link.trim());
    if (url.protocol !== "alma:" || url.hostname !== "connect" || url.searchParams.get("e2e") !== "1") return null;
    const code = url.searchParams.get("k") || "";
    if (!/^[A-Za-z0-9_-]{43}$/.test(code)) return null;
    const origin = new URL(url.searchParams.get("u") || "");
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
    if (origin.protocol !== "https:" && !(origin.protocol === "http:" && loopback)) return null;
    if (origin.username || origin.password || origin.search || origin.hash) return null;
    return { relayOrigin: origin.href.replace(/\/+$/, ""), code };
  } catch {
    return null;
  }
}
function remoteHandoffHash(pairing) {
  return `connect?${new URLSearchParams({ u: pairing.relayOrigin, k: pairing.code, e2e: "1" })}`;
}
const HANDOFF_APPROVAL_PATH = "/api/handoff/tool-approvals";
const HANDOFF_APPROVAL_WS_PATH = "/ws/handoff/tool-approvals";
const HANDOFF_QUESTION_PATH = "/api/handoff/user-questions";
const HANDOFF_QUESTION_WS_PATH = "/ws/handoff/user-questions";
class APIClient {
  baseURL = null;
  getHandoffUserQuestions() {
    return this.request(HANDOFF_QUESTION_PATH);
  }
  respondToHandoffUserQuestion(requestId, response) {
    return this.request(HANDOFF_QUESTION_PATH, { method: "POST", body: JSON.stringify({ requestId, response }) });
  }
  getHandoffToolApprovals() {
    return this.request(HANDOFF_APPROVAL_PATH);
  }
  respondToHandoffToolApproval(requestId, response) {
    return this.request(HANDOFF_APPROVAL_PATH, { method: "POST", body: JSON.stringify({ requestId, response }) });
  }
  async initialize() {
    if (typeof window !== "undefined" && window.apiServer) {
      const info = await window.apiServer.getInfo();
      this.baseURL = info.baseURL;
    }
  }
  async request(endpoint, options = {}, timeoutMs) {
    if (!this.baseURL) {
      await this.initialize();
    }
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        },
        ...options
      },
      timeoutMs
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Network error" }));
      const errorMessage = errorData.error || `HTTP ${response.status}`;
      const error = new Error(errorMessage);
      if (errorData.details) {
        error.details = errorData.details;
      }
      throw error;
    }
    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType?.includes("application/json")) {
      return null;
    }
    return response.json();
  }
  // Provider management
  async getProviders() {
    return this.request("/api/providers");
  }
  async createProvider(provider) {
    return this.request("/api/providers", {
      method: "POST",
      body: JSON.stringify(provider)
    });
  }
  async updateProvider(id, updates) {
    return this.request(`/api/providers/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates)
    });
  }
  async deleteProvider(id) {
    await this.request(`/api/providers/${id}`, {
      method: "DELETE"
    });
  }
  async testProvider(id, modelId) {
    return this.request(`/api/providers/${id}/test`, {
      method: "POST",
      body: JSON.stringify({ modelId })
    });
  }
  // Plugin provider authentication
  async authenticatePluginProvider(id) {
    return this.request(
      `/api/providers/${encodeURIComponent(id)}/authenticate`,
      { method: "POST" },
      6 * 6e4
    );
  }
  // Sign-in links and OAuth callbacks a plugin could not open itself (alma-server)
  async getPluginSignInPrompts() {
    return this.request("/api/plugin-sign-in/prompts");
  }
  async completePluginSignIn(promptId, callbackUrl) {
    return this.request(`/api/plugin-sign-in/prompts/${encodeURIComponent(promptId)}/complete`, {
      method: "POST",
      body: JSON.stringify({ callbackUrl })
    });
  }
  async cancelPluginSignIn(promptId) {
    return this.request(`/api/plugin-sign-in/prompts/${encodeURIComponent(promptId)}/cancel`, {
      method: "POST"
    });
  }
  async logoutPluginProvider(id) {
    return this.request(`/api/providers/${encodeURIComponent(id)}/logout`, {
      method: "POST"
    });
  }
  // Multi-account provider management
  async getProviderAccounts(id) {
    return this.request(`/api/providers/${encodeURIComponent(id)}/accounts`);
  }
  async removeProviderAccount(providerId, accountId) {
    return this.request(`/api/providers/${encodeURIComponent(providerId)}/accounts/${encodeURIComponent(accountId)}`, {
      method: "DELETE"
    });
  }
  async refreshProviderQuotas(providerId) {
    return this.request(`/api/providers/${encodeURIComponent(providerId)}/refresh-quotas`, {
      method: "POST"
    });
  }
  // Models
  async getModels() {
    return this.request("/api/models");
  }
  // Get stored available models from database
  async getProviderModels(providerId) {
    return this.request(`/api/providers/${providerId}/models`);
  }
  // Fetch models from provider API and store in database
  async fetchProviderModels(providerId) {
    return this.request(`/api/providers/${providerId}/models/fetch`, {
      method: "POST"
    });
  }
  async updateProviderModels(providerId, models, availableModels) {
    return this.request(`/api/providers/${providerId}/models`, {
      method: "PUT",
      body: JSON.stringify({ models, availableModels })
    });
  }
  // ACP commands
  async getACPCommands(threadId, providerId) {
    return this.request(`/api/threads/${threadId}/providers/${providerId}/acp-commands`);
  }
  // Chat completions
  async *chatCompletion(request) {
    if (!this.baseURL) {
      await this.initialize();
    }
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const url = `${this.baseURL}/api/chat/completions`;
    const response = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...request, stream: true })
      },
      5 * 6e4
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed === "data: [DONE]") return;
          if (trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              if (data.error) {
                throw new Error(data.error.message || "Streaming error");
              }
              if (data.choices?.[0]?.delta?.content) {
                yield data.choices[0].delta.content;
              }
            } catch (parseError) {
              console.warn("Failed to parse SSE data:", trimmed);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
  // Non-streaming chat completion
  async chatCompletionSync(request) {
    return this.request("/api/chat/completions", {
      method: "POST",
      body: JSON.stringify({ ...request, stream: false })
    });
  }
  // Health check
  async health() {
    return this.request("/api/health");
  }
  // Tool model
  async getToolModel() {
    return this.request("/api/tool-model");
  }
  async getMemoryToolModel() {
    return this.request("/api/tool-model/memory");
  }
  async testToolModel(model, signal) {
    return this.request("/api/tool-model/test", {
      method: "POST",
      body: JSON.stringify({ model }),
      signal
    });
  }
  // Settings
  async updateSettings(settings) {
    return this.request("/api/settings", {
      method: "PUT",
      body: JSON.stringify(settings)
    });
  }
  // Memory embedding management
  async getStoredEmbeddingModel() {
    return this.request("/api/memories/embedding-model");
  }
  async getRebuildProgress() {
    return this.request("/api/memories/rebuild-progress");
  }
  async rebuildMemoryEmbeddings() {
    return this.request("/api/memories/rebuild", {
      method: "POST"
    });
  }
  async cancelRebuild() {
    return this.request("/api/memories/cancel-rebuild", {
      method: "POST"
    });
  }
  // Memory Sleep System
  async getMemorySleepStatus() {
    return this.request("/api/memories/sleep/status");
  }
  async getMemorySleepRuns(limit = 20) {
    return this.request(`/api/memories/sleep/runs?limit=${limit}`);
  }
  async runMemorySleepCycle() {
    return this.request("/api/memories/sleep/run", { method: "POST" });
  }
  async previewMemorySleepCycle() {
    return this.request("/api/memories/sleep/preview", { method: "POST" });
  }
  async cancelMemorySleepCycle() {
    return this.request("/api/memories/sleep/cancel", { method: "POST" });
  }
  async listMemoryArchive(opts) {
    const params = new URLSearchParams();
    if (opts?.limit != null) params.set("limit", String(opts.limit));
    if (opts?.offset != null) params.set("offset", String(opts.offset));
    if (opts?.runId) params.set("runId", opts.runId);
    const qs = params.toString();
    return this.request(`/api/memories/archive${qs ? `?${qs}` : ""}`);
  }
  async restoreMemoryArchive(id) {
    return this.request(`/api/memories/archive/${encodeURIComponent(id)}/restore`, { method: "POST" });
  }
  // WebSocket URL helper
  getWebSocketURL(path) {
    if (!this.baseURL) return null;
    return this.baseURL.replace(/^http/, "ws") + path;
  }
  // Returns the resolved HTTP base URL (e.g. http://127.0.0.1:23001)
  // once the client has been initialized. Use this when you need to
  // build a fetch URL for an endpoint that the typed methods don't
  // wrap (e.g. blob downloads). Returns null pre-init.
  getBaseURL() {
    return this.baseURL;
  }
  async ensureInitialized() {
    if (!this.baseURL) {
      await this.initialize();
    }
  }
  // Uploads a single image attachment as raw bytes; the server stores it under
  // gallery_cache/ (content-hashed) and returns a static HTTP URL we can drop
  // straight into FileUIPart.url. Keeps the renderer from ever holding a
  // multi-MB base64 string for the picked image.
  async uploadAttachmentImage(blob) {
    await this.ensureInitialized();
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const response = await fetchWithTimeout(`${this.baseURL}/api/attachments/image`, {
      method: "POST",
      headers: { "Content-Type": blob.type || "application/octet-stream" },
      body: blob
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }
  /**
   * Persist a binary document through the local API and return its native
   * path. This is the no-base64 fallback when Electron webUtils cannot
   * recover a selected file's path (observed with PPTX on Windows).
   */
  async uploadAttachmentFile(file) {
    await this.ensureInitialized();
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const response = await fetchWithTimeout(`${this.baseURL}/api/attachments/file`, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "X-Alma-Filename": encodeURIComponent(file.name)
      },
      body: file
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }
  async getImageModels() {
    await this.ensureInitialized();
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
    const response = await fetchWithTimeout(`${this.baseURL}/api/image/models`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }
}
async function resolveBaseURL() {
  if (typeof window !== "undefined" && window.apiServer) {
    const info = await window.apiServer.getInfo();
    if (!info.baseURL) throw new Error("API server not available");
    return info.baseURL;
  }
  throw new Error("API server not available");
}
async function getLocalEmbeddingModels() {
  const base = await resolveBaseURL();
  const resp = await fetchWithTimeout(`${base}/api/local-embeddings/models`);
  if (!resp.ok) throw new Error("Failed to fetch local embedding models");
  const data = await resp.json();
  return data.models;
}
async function downloadLocalEmbeddingModel(modelId) {
  const base = await resolveBaseURL();
  const resp = await fetchWithTimeout(
    `${base}/api/local-embeddings/download`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelId })
    },
    10 * 6e4
  );
  if (!resp.ok) throw new Error("Failed to start download");
}
const apiClient = new APIClient();
export {
  HANDOFF_APPROVAL_WS_PATH as H,
  apiClient as a,
  remoteHandoffHash as b,
  HANDOFF_QUESTION_WS_PATH as c,
  downloadLocalEmbeddingModel as d,
  requestPhoneReconnect as e,
  getLocalEmbeddingModels as g,
  parseRemoteHandoffPairing as p,
  registerPhoneReconnect as r,
  setPhoneConnectionState as s,
  usePhoneConnection as u
};
