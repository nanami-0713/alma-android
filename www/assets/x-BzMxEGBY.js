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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "0315331f-f842-4b16-98aa-f0db79f40d4f", e._sentryDebugIdIdentifier = "sentry-dbid-0315331f-f842-4b16-98aa-f0db79f40d4f");
    })();
  } catch (e) {
  }
}
;
import { f as fetchWithTimeout } from "./index-B0zE39VE.js";
import { c as createLucideIcon } from "./createLucideIcon-sFEqYeet.js";
const MANAGED_AGENT_REASONING_EFFORTS = ["off", "low", "medium", "high", "xhigh", "max", "ultra"];
const MANAGED_AGENT_EXECUTION_MODE_META = {
  "general-purpose": {
    label: "Generalist",
    description: "Balanced research and execution across files, shell, and the web."
  },
  "statusline-setup": {
    label: "Statusline Setup",
    description: "Narrow editor configuration specialist for statusline changes."
  },
  Explore: {
    label: "Explore",
    description: "Fast codebase search and structure discovery."
  },
  Plan: {
    label: "Plan",
    description: "Architecture and rollout planning for multi-step work."
  },
  "alma-guide": {
    label: "Alma Guide",
    description: "Documentation-focused helper for Alma usage and capabilities."
  },
  "alma-operator": {
    label: "Operator",
    description: "Runtime configuration and provider operations through Alma APIs."
  },
  coder: {
    label: "Coder",
    description: "Implementation-heavy work: code changes, fixes, verification."
  }
};
const MANAGED_AGENT_CATEGORY_META = {
  design: {
    label: "Design",
    tone: "Interface direction and user-facing polish."
  },
  product: {
    label: "Product",
    tone: "Scope, requirements, and orchestration decisions."
  },
  engineering: {
    label: "Engineering",
    tone: "Implementation, refactors, and technical delivery."
  },
  research: {
    label: "Research",
    tone: "Evidence gathering, synthesis, and comparison work."
  },
  operations: {
    label: "Operations",
    tone: "Configuration, systems hygiene, and runtime actions."
  },
  custom: {
    label: "Custom",
    tone: "Specialist profile defined by the user."
  }
};
const DEFAULT_MANAGED_AGENT_PROFILES = [
  {
    id: "designer",
    name: "Designer",
    category: "design",
    executionMode: "general-purpose",
    enabled: true,
    builtIn: true,
    color: "#c4683b",
    summary: "Shapes flows, interaction details, and visual direction before code lands.",
    focus: ["user journeys", "layout direction", "microcopy", "interaction critique"],
    delegatesTo: ["researcher", "developer"],
    prompt: "Act as Alma's product designer. Produce clear interaction recommendations, UI structure, naming, copy, and visual direction. Challenge weak UX assumptions. When implementation is needed, delegate to Developer instead of writing production code yourself."
  },
  {
    id: "product-manager",
    name: "Product Manager",
    category: "product",
    executionMode: "Plan",
    enabled: true,
    builtIn: true,
    color: "#5675d6",
    summary: "Breaks goals into requirements, rollout slices, and accountable handoffs.",
    focus: ["requirements framing", "scope control", "roadmapping", "acceptance criteria"],
    delegatesTo: ["researcher", "designer", "developer", "operator"],
    prompt: "Act as Alma's product manager. Turn vague asks into precise outcomes, success criteria, edge cases, sequencing, and owner-specific handoffs. Keep the team aligned on what ships now versus later."
  },
  {
    id: "developer",
    name: "Developer",
    category: "engineering",
    executionMode: "coder",
    enabled: true,
    builtIn: true,
    color: "#2f8f74",
    summary: "Implements changes, validates them, and keeps technical debt contained.",
    focus: ["feature delivery", "bug fixing", "refactoring", "verification"],
    delegatesTo: ["researcher", "operator"],
    prompt: "Act as Alma's software engineer. Read the codebase carefully, make targeted changes, verify behavior, and explain concrete tradeoffs. Ask other specialists for input when design, product, or research depth is needed."
  },
  {
    id: "researcher",
    name: "Researcher",
    category: "research",
    executionMode: "general-purpose",
    enabled: true,
    builtIn: true,
    color: "#8d54bf",
    summary: "Finds the facts, compares options, and hands back usable evidence.",
    focus: ["background research", "competitive scans", "codebase reconnaissance", "decision support"],
    delegatesTo: ["product-manager", "designer", "developer"],
    prompt: "Act as Alma's researcher. Gather evidence, compare approaches, and summarize the important constraints and opportunities. Prefer grounded findings over speculation. Delegate implementation or final product decisions when appropriate."
  },
  {
    id: "operator",
    name: "Operator",
    category: "operations",
    executionMode: "alma-operator",
    enabled: true,
    builtIn: true,
    color: "#6a748b",
    summary: "Owns runtime configuration, provider wiring, and operational follow-through.",
    focus: ["settings changes", "provider setup", "environment coordination", "release hygiene"],
    delegatesTo: ["developer", "product-manager"],
    prompt: "Act as Alma's operator. Manage runtime configuration, providers, and environment-level actions safely. Use the documented APIs, preserve working settings, and coordinate with Product Manager or Developer if a requested change requires broader product or code work."
  },
  {
    id: "planner",
    name: "Planner",
    category: "product",
    executionMode: "Plan",
    enabled: true,
    builtIn: true,
    color: "#e5a83b",
    summary: "Expands briefs into detailed product specs with sprint plans.",
    focus: ["product specification", "sprint planning", "acceptance criteria", "technical design"],
    delegatesTo: [],
    prompt: "Act as Alma's strategic planner. Take the user's brief and expand it into a comprehensive product specification. Break work into sprints with clear scope boundaries. Focus on product context and high-level technical design, not implementation details. Output a structured spec with numbered sprints, each with a title, description, and scope boundary."
  },
  {
    id: "evaluator",
    name: "Evaluator",
    category: "engineering",
    executionMode: "general-purpose",
    enabled: true,
    builtIn: true,
    color: "#d94f4f",
    summary: "Tests and grades sprint deliverables against acceptance contracts.",
    focus: ["acceptance testing", "quality verification", "structured grading", "constructive feedback"],
    delegatesTo: [],
    prompt: "Act as Alma's quality evaluator. You receive sprint contracts with concrete acceptance criteria and the generator's deliverables. Test each criterion rigorously using the available tools. Produce structured grades with evidence for each criterion. Be constructively critical — your job is to catch what the generator missed, not to praise. You must run at least one verification command per criterion. Empty evidence means automatic fail."
  }
];
function cloneProfile(profile) {
  return {
    ...profile,
    focus: [...profile.focus],
    delegatesTo: [...profile.delegatesTo]
  };
}
function normalizeString(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
function normalizeOptionalString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  const next = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    next.push(trimmed);
  }
  return next;
}
function stableIdHash(input) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i) >>> 0;
  }
  return hash.toString(36);
}
function normalizeAgentId(input, fallback) {
  const trimmed = input.trim();
  const normalized = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (normalized) return normalized;
  if (trimmed) return `agent-${stableIdHash(trimmed)}`;
  return fallback;
}
function buildDefaultProfileMap() {
  return new Map(DEFAULT_MANAGED_AGENT_PROFILES.map((profile) => [profile.id, profile]));
}
function normalizeProfile(profile, fallbackIndex, defaults) {
  const requestedId = typeof profile.id === "string" ? profile.id : "";
  const matchedDefault = requestedId ? defaults.get(requestedId) : void 0;
  const fallbackId = matchedDefault?.id || `custom-agent-${fallbackIndex + 1}`;
  const id = normalizeAgentId(requestedId || profile.name || fallbackId, fallbackId);
  const defaultProfile = matchedDefault ?? defaults.get(id);
  const mergedFocus = normalizeStringArray(profile.focus);
  const mergedDelegatesTo = normalizeStringArray(profile.delegatesTo).filter((targetId) => targetId !== id);
  return {
    id,
    name: normalizeString(profile.name, defaultProfile?.name || formatManagedAgentName(id)),
    category: profile.category || defaultProfile?.category || "custom",
    executionMode: profile.executionMode || defaultProfile?.executionMode || "general-purpose",
    enabled: typeof profile.enabled === "boolean" ? profile.enabled : defaultProfile?.enabled ?? true,
    builtIn: defaultProfile?.builtIn ?? Boolean(profile.builtIn),
    color: normalizeString(profile.color, defaultProfile?.color || "#6c7a89"),
    summary: normalizeString(profile.summary, defaultProfile?.summary || "Specialist agent managed by Alma."),
    focus: mergedFocus.length > 0 ? mergedFocus : [...defaultProfile?.focus || []],
    delegatesTo: mergedDelegatesTo.length > 0 ? mergedDelegatesTo : [...defaultProfile?.delegatesTo || []],
    prompt: normalizeString(
      profile.prompt,
      defaultProfile?.prompt || "Act as a focused specialist and collaborate with the rest of the crew when the task spans multiple disciplines."
    ),
    model: normalizeOptionalString(profile.model) ?? defaultProfile?.model,
    reasoningEffort: normalizeReasoningEffort(profile.reasoningEffort) ?? defaultProfile?.reasoningEffort,
    fastMode: profile.fastMode === "on" || profile.fastMode === "off" ? profile.fastMode : void 0
  };
}
function normalizeReasoningEffort(value) {
  return typeof value === "string" && MANAGED_AGENT_REASONING_EFFORTS.includes(value) ? value : void 0;
}
function sortProfiles(profiles) {
  const defaultOrder = DEFAULT_MANAGED_AGENT_PROFILES.map((profile) => profile.id);
  const defaultRank = new Map(defaultOrder.map((id, index) => [id, index]));
  return [...profiles].sort((left, right) => {
    const leftRank = defaultRank.get(left.id);
    const rightRank = defaultRank.get(right.id);
    if (leftRank !== void 0 && rightRank !== void 0) {
      return leftRank - rightRank;
    }
    if (leftRank !== void 0) return -1;
    if (rightRank !== void 0) return 1;
    return left.name.localeCompare(right.name);
  });
}
function createDefaultManagedAgentsSettings() {
  return {
    enabled: true,
    allowSubagentDelegation: true,
    subagentFastMode: "inherit",
    profiles: DEFAULT_MANAGED_AGENT_PROFILES.map(cloneProfile)
  };
}
function normalizeManagedAgentsSettings(input) {
  const defaults = buildDefaultProfileMap();
  const rawProfiles = Array.isArray(input?.profiles) && input?.profiles.length > 0 ? input.profiles : DEFAULT_MANAGED_AGENT_PROFILES;
  const normalizedProfiles = rawProfiles.map((profile, index) => normalizeProfile(profile, index, defaults));
  const usedIds = /* @__PURE__ */ new Set();
  for (const profile of normalizedProfiles) {
    if (!usedIds.has(profile.id)) {
      usedIds.add(profile.id);
      continue;
    }
    let suffix = 2;
    while (usedIds.has(`${profile.id}-${suffix}`)) suffix++;
    profile.id = `${profile.id}-${suffix}`;
    usedIds.add(profile.id);
  }
  const existingIds = new Set(normalizedProfiles.map((profile) => profile.id));
  for (const defaultProfile of DEFAULT_MANAGED_AGENT_PROFILES) {
    if (!existingIds.has(defaultProfile.id)) {
      normalizedProfiles.push(cloneProfile(defaultProfile));
    }
  }
  return {
    enabled: typeof input?.enabled === "boolean" ? input.enabled : true,
    allowSubagentDelegation: typeof input?.allowSubagentDelegation === "boolean" ? input.allowSubagentDelegation : true,
    subagentFastMode: input?.subagentFastMode === "on" || input?.subagentFastMode === "off" ? input.subagentFastMode : "inherit",
    profiles: sortProfiles(normalizedProfiles)
  };
}
function createCustomManagedAgentProfile(seed) {
  const normalizedSeed = normalizeAgentId(seed || `custom-${Date.now().toString(36)}`, `custom-${Date.now().toString(36)}`);
  return {
    id: normalizedSeed,
    name: "Custom Agent",
    category: "custom",
    executionMode: "general-purpose",
    enabled: true,
    builtIn: false,
    color: "#7a7f96",
    summary: "Custom specialist profile for a workflow Alma does not ship by default.",
    focus: ["specialized workflow"],
    delegatesTo: [],
    prompt: "Act as a focused specialist for this custom workflow. Clarify your scope, do the work that belongs to your lane, and delegate when a different specialty is a better fit."
  };
}
function getManagedAgentById(settings, agentId) {
  if (!settings) {
    return void 0;
  }
  const exact = settings.profiles.find((profile) => profile.id === agentId);
  if (exact) return exact;
  const canonical = normalizeAgentId(agentId, "");
  if (canonical && canonical !== agentId) {
    return settings.profiles.find((profile) => profile.id === canonical);
  }
  return void 0;
}
function formatManagedAgentName(agentId) {
  const fallback = agentId.split(/[-_]/g).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  return fallback || "Agent";
}
function parseAgentLines(value) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}
function formatAgentLines(values) {
  return values.join("\n");
}
const UI_FONT_SIZE_DEFAULT = 13;
const UI_FONT_SIZE_MIN = 10;
const UI_FONT_SIZE_MAX = 32;
const UI_DENSITY_DEFAULT = "compact";
const UI_SIDEBAR_WIDTH_DEFAULT = 256;
const DENSITY_TOKENS = {
  compact: {
    "--ui-density-line-height": "1.4",
    "--ui-density-card-padding": "1.25rem",
    "--ui-density-card-gap": "1rem",
    "--ui-density-control-height-default": "2.25rem",
    "--ui-density-control-height-sm": "2rem",
    "--ui-density-control-height-lg": "2.5rem",
    "--ui-density-control-padding-x": "0.9rem",
    "--ui-density-control-padding-y": "0.4rem",
    "--ui-density-stack-gap": "0.75rem",
    "--ui-density-control-gap": "0.4rem"
  },
  comfortable: {
    "--ui-density-line-height": "1.5",
    "--ui-density-card-padding": "1.5rem",
    "--ui-density-card-gap": "1.25rem",
    "--ui-density-control-height-default": "2.5rem",
    "--ui-density-control-height-sm": "2.25rem",
    "--ui-density-control-height-lg": "2.75rem",
    "--ui-density-control-padding-x": "1rem",
    "--ui-density-control-padding-y": "0.55rem",
    "--ui-density-stack-gap": "1rem",
    "--ui-density-control-gap": "0.5rem"
  },
  spacious: {
    "--ui-density-line-height": "1.65",
    "--ui-density-card-padding": "1.75rem",
    "--ui-density-card-gap": "1.5rem",
    "--ui-density-control-height-default": "2.75rem",
    "--ui-density-control-height-sm": "2.4rem",
    "--ui-density-control-height-lg": "3rem",
    "--ui-density-control-padding-x": "1.2rem",
    "--ui-density-control-padding-y": "0.75rem",
    "--ui-density-stack-gap": "1.35rem",
    "--ui-density-control-gap": "0.65rem"
  }
};
const DENSITY_TOKEN_VARS = Object.keys(DENSITY_TOKENS[UI_DENSITY_DEFAULT]);
function clampUIFontSize(value) {
  return Math.min(UI_FONT_SIZE_MAX, Math.max(UI_FONT_SIZE_MIN, value));
}
const AUTO_COMPACT_DEFAULTS = {
  enabled: true,
  threshold: 80,
  keepRecentMessages: 4
};
const defaultSettings = {
  general: {
    language: "en",
    theme: "system",
    autoStart: false,
    minimizeToTray: true,
    closeToTray: false,
    startMinimized: false,
    hideDockIcon: false,
    hideTrayIcon: false,
    quickChatHideOnBlur: false,
    quickChatInjectScreenContext: true,
    quickChatClickThroughDefault: false,
    appIcon: "default",
    analyticsEnabled: true
  },
  chat: {
    defaultModel: "",
    temperature: 0.7,
    maxTokens: 2048,
    streamResponse: true,
    autoSaveHistory: true,
    historyRetentionDays: 30,
    showTokenUsage: true,
    enableMarkdown: true,
    singleDollarTextMath: false,
    infographicEnabled: true,
    autoCollapseReasoning: false,
    modelUsageHistory: {},
    defaultToolSelection: "auto",
    defaultSkillSelection: "auto",
    coderAgentProviderId: "__auto__",
    soundEffects: {
      enabled: false,
      volume: 1,
      synthPreset: "classic"
    },
    autoCompact: { ...AUTO_COMPACT_DEFAULTS },
    autoSuggestions: {
      enabled: true
    }
  },
  ui: {
    fontFamily: void 0,
    fontSize: UI_FONT_SIZE_DEFAULT,
    density: UI_DENSITY_DEFAULT,
    sidebarWidth: UI_SIDEBAR_WIDTH_DEFAULT,
    showLineNumbers: false,
    wordWrap: true,
    showMinimap: false,
    useSystemCaret: false,
    sidebarMode: "simple",
    gtdSidebarSections: {
      favorites: false,
      inbox: false,
      todo: false,
      in_progress: false,
      done: false,
      archived: false,
      labels: {}
    },
    projectSidebarSections: {},
    projectSidebarOrder: [],
    toolCardDefaultExpand: "auto",
    haptics: {
      enabled: true,
      style: "edc",
      strength: "strong"
    }
  },
  network: {
    proxy: {
      enabled: false,
      type: "http",
      host: "",
      port: 8080
    },
    timeout: 3e4,
    retryAttempts: 3,
    llmTimeout: 3e5,
    streamIdleTimeout: 0,
    requestLog: false,
    preferIpv4: false
  },
  data: {
    dataPath: "",
    enableBackup: true,
    backupInterval: "daily",
    maxBackups: 7,
    enableSync: false
  },
  tools: {
    hashlineEdit: false
  },
  security: {
    encryptApiKeys: true,
    requirePassword: false,
    sessionTimeout: 60,
    enableLogging: true,
    logLevel: "info",
    autoApproveToolRequests: true
  },
  advanced: {
    enableExperimentalFeatures: false,
    debugMode: false,
    developerMode: false
  },
  keybindings: {
    newChatThread: "Ctrl+N",
    quickChat: "Ctrl+Shift+Space",
    searchThreads: "Ctrl+F",
    sendMessage: "Enter",
    openSettings: "Ctrl+,",
    toggleSidebar: "Ctrl+B",
    toggleWhisper: "Ctrl+Shift+V",
    nextThread: "Ctrl+Tab",
    previousThread: "Ctrl+Shift+Tab",
    goBack: "Ctrl+[",
    goForward: "Ctrl+]"
  },
  memory: {
    enabled: true,
    autoSummarize: true,
    autoRetrieve: true,
    maxRetrievedMemories: 5,
    similarityThreshold: 0.1
  },
  skillExtraction: {
    enabled: true,
    minToolCalls: 5
  },
  toolModel: {},
  visionModel: {},
  onboarding: {
    dismissed: false
  },
  whisper: {
    enabled: false,
    model: "base",
    language: "auto"
  },
  tts: {
    provider: "elevenlabs",
    apiKey: "",
    voiceId: "",
    autoReadReplies: false,
    readNotifications: false
  },
  telegram: {
    enabled: false,
    botToken: "",
    allowedUserIds: []
  },
  mobileRelay: {
    enabled: false,
    serverUrl: "",
    connectCode: "",
    e2eEncryption: true
  },
  team: {
    host: {
      enabled: false,
      port: 23111,
      name: ""
    }
  },
  webSearch: {
    engine: "google"
  },
  imageGen: {
    model: "",
    aspectRatio: "auto"
  },
  terminal: {
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    fontSize: 13,
    persistTerminals: true,
    cursorBlink: true
  },
  themeConfig: {
    darkTheme: null,
    lightTheme: null,
    pluginThemeId: null,
    nvchad: {
      enabled: false,
      configPath: null,
      autoSync: false
    }
  },
  agents: createDefaultManagedAgentsSettings()
};
class SettingsAPIService {
  baseURL = null;
  async initialize() {
    if (typeof window !== "undefined" && window.apiServer) {
      const info = await window.apiServer.getInfo();
      this.baseURL = info.baseURL;
    }
  }
  async ensureInitialized() {
    if (!this.baseURL) {
      await this.initialize();
    }
    if (!this.baseURL) {
      throw new Error("API server not available");
    }
  }
  // Load settings from backend. Retries transient transport failures so the
  // renderer can't race a slow-to-listen API server and silently fall back
  // to defaults — which used to make the app re-play onboarding and hide
  // the sidebar for returning users (see PersistentSidebar + RevealContext).
  // We only return defaults on the *positive* signal that the DB has no
  // saved settings (HTTP 200 with `{}`). Network/HTTP failures throw so the
  // caller can decide what to do (App.tsx treats throw as "returning user").
  async loadSettings() {
    const MAX_ATTEMPTS = 5;
    const RETRY_DELAY_MS = 200;
    let lastError;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        await this.ensureInitialized();
        const response = await fetchWithTimeout(`${this.baseURL}/api/settings`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const settings = await response.json();
        if (Object.keys(settings).length === 0) {
          return this.migrateFromLocalStorage({ ...defaultSettings });
        }
        const mergedSettings = this.applyDefaultsAndNormalize(settings);
        return this.migrateFromLocalStorage(mergedSettings);
      } catch (error) {
        lastError = error;
        if (attempt < MAX_ATTEMPTS - 1) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }
    console.error("Failed to load settings from API after retries:", lastError);
    throw lastError instanceof Error ? lastError : new Error("Failed to load settings");
  }
  async testTelegram(botToken, chatId, autoDiscover) {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/settings/test-telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botToken, chatId, autoDiscover })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async detectTelegramUsers(botToken) {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/settings/detect-telegram-users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botToken })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async getFeishuStatus(brand = "feishu") {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/feishu/status?brand=${brand}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async getFeishuConnectState(brand = "feishu") {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/feishu/connect/state?brand=${brand}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async startFeishuConnect(brand) {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/feishu/connect/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async cancelFeishuConnect(brand = "feishu") {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/feishu/connect/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  async disconnectFeishu(brand = "feishu") {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/feishu/disconnect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  async getWeixinStatus() {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/weixin/status`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async getWeixinQRCode() {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/weixin/qrcode`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  async logoutWeixin() {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/weixin/logout`, { method: "POST" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  async testProxy(proxy) {
    await this.ensureInitialized();
    const response = await fetchWithTimeout(`${this.baseURL}/api/settings/test-proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ proxy })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  // Save settings to backend
  async saveSettings(settings) {
    try {
      await this.ensureInitialized();
      const payload = JSON.parse(JSON.stringify(settings));
      this.normalizeUIFontSize(payload);
      payload.agents = normalizeManagedAgentsSettings(payload.agents);
      const response = await fetchWithTimeout(`${this.baseURL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const savedSettings = await response.json();
      this.normalizeUIFontSize(savedSettings);
      savedSettings.agents = normalizeManagedAgentsSettings(savedSettings.agents);
      return savedSettings;
    } catch (error) {
      console.error("Failed to save settings to API:", error);
      throw error;
    }
  }
  // Reset settings (delete from backend)
  async resetSettings() {
    try {
      await this.ensureInitialized();
      const response = await fetchWithTimeout(`${this.baseURL}/api/settings/reset`, {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { ...defaultSettings, agents: createDefaultManagedAgentsSettings() };
    } catch (error) {
      console.error("Failed to reset settings via API:", error);
      throw error;
    }
  }
  // Deep merge utility method (same as the original SettingsManager)
  /**
   * Apply default settings + normalize the result so every field has its
   * canonical type. This is the single entry point that ALL settings must pass
   * through before reaching the UI — both the GET load path and the WebSocket
   * `settings_updated` broadcast path (which previously bypassed normalization
   * entirely and could deliver corrupted values straight into the renderer,
   * e.g. an object where a number was expected → React error #31 "Objects are
   * not valid as a React child", crashing a settings tab).
   */
  applyDefaultsAndNormalize(rawSettings) {
    const merged = this.deepMerge(defaultSettings, rawSettings ?? {});
    this.normalizeUIFontSize(merged);
    merged.agents = normalizeManagedAgentsSettings(merged.agents);
    const preset = merged.chat?.soundEffects?.synthPreset;
    const allowedPresets = ["classic", "ethereal", "digital", "retro", "off"];
    if (!allowedPresets.includes(preset)) {
      merged.chat.soundEffects.synthPreset = "classic";
    }
    return merged;
  }
  deepMerge(target, source) {
    const result = JSON.parse(JSON.stringify(target));
    const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
    const merge = (obj1, obj2) => {
      for (const key in obj2) {
        const sv = obj2[key];
        const tv = obj1[key];
        if (isPlainObject(sv)) {
          if (isPlainObject(tv)) {
            obj1[key] = merge(tv, sv);
          } else if (tv === void 0 || tv === null) {
            obj1[key] = merge({}, sv);
          }
        } else if (isPlainObject(tv) && sv !== void 0 && sv !== null) ;
        else {
          obj1[key] = sv;
        }
      }
      return obj1;
    };
    return merge(result, source);
  }
  normalizeUIFontSize(settings) {
    if (!settings.ui) {
      settings.ui = { ...defaultSettings.ui };
      return;
    }
    const legacyMap = {
      small: 12,
      medium: 14,
      large: 16
    };
    const rawFontSize = settings.ui.fontSize;
    if (typeof rawFontSize === "number" && Number.isFinite(rawFontSize)) {
      settings.ui.fontSize = this.clampFontSize(rawFontSize);
      return;
    }
    if (typeof rawFontSize === "string") {
      const mappedSize = legacyMap[rawFontSize];
      settings.ui.fontSize = mappedSize ?? defaultSettings.ui.fontSize;
      return;
    }
    settings.ui.fontSize = defaultSettings.ui.fontSize;
  }
  clampFontSize(value) {
    return clampUIFontSize(value);
  }
  // Migrate sound settings from localStorage to AppSettings
  migrateFromLocalStorage(settings) {
    try {
      const storedConfig = localStorage.getItem("typing-sound-config");
      if (storedConfig) {
        const soundConfig = JSON.parse(storedConfig);
        const styleToPresetMap = {
          animalese: "classic",
          soft: "ethereal"
        };
        const migratedPreset = styleToPresetMap[soundConfig.style] || "classic";
        settings.chat.soundEffects = {
          enabled: soundConfig.enabled ?? defaultSettings.chat.soundEffects.enabled,
          volume: soundConfig.volume ?? defaultSettings.chat.soundEffects.volume,
          synthPreset: migratedPreset
        };
        localStorage.removeItem("typing-sound-config");
        console.log("Migrated sound effects settings from localStorage to AppSettings");
      }
    } catch (error) {
      console.warn("Failed to migrate sound settings from localStorage:", error);
    }
    return settings;
  }
}
const settingsApiService = new SettingsAPIService();
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
export {
  DENSITY_TOKENS as D,
  MANAGED_AGENT_EXECUTION_MODE_META as M,
  UI_DENSITY_DEFAULT as U,
  X,
  UI_FONT_SIZE_DEFAULT as a,
  DENSITY_TOKEN_VARS as b,
  clampUIFontSize as c,
  UI_SIDEBAR_WIDTH_DEFAULT as d,
  UI_FONT_SIZE_MAX as e,
  UI_FONT_SIZE_MIN as f,
  getManagedAgentById as g,
  formatAgentLines as h,
  MANAGED_AGENT_CATEGORY_META as i,
  createCustomManagedAgentProfile as j,
  DEFAULT_MANAGED_AGENT_PROFILES as k,
  formatManagedAgentName as l,
  normalizeManagedAgentsSettings as n,
  parseAgentLines as p,
  settingsApiService as s
};
