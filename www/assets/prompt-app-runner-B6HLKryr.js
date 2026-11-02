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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "63598c1c-238a-4bd8-aa9e-a08211c29401", e._sentryDebugIdIdentifier = "sentry-dbid-63598c1c-238a-4bd8-aa9e-a08211c29401");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { a as useI18n, u as useSettings, l as useAnalytics, A as AnalyticsEvents, n as newChatThreadManager, w as writeTextToClipboard, f as copyImageFromUrlToClipboard, C as Copy, E as ExternalLink, m as Save, B as Button, c as cn, i as initObservability, S as SWRConfig, s as swrConfig, T as ThemeProvider, b as usePostHog } from "./ThemeContext-Ac9lDiNd.js";
import "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { C as ConditionalPostHogProvider } from "./ConditionalPostHogProvider-Cgb2BAQg.js";
import { X } from "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { r as reactDomExports } from "./index-CZUfqr00.js";
import { b as Label, F as File$1, I as Input, C as Checkbox } from "./label-CF1Fh03r.js";
import { R as RefreshCw, S as Sparkles, U as Upload, T as Textarea, a as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem, f as TwemojiIcon } from "./TwemojiIcon-qeDCXH7q.js";
import { d as deltaAccumulator, p as promptAppsApiClient, A as AUTO_TOOL_SELECTION, C as CircleStop, H as History, E as ExecutionHistory } from "./ExecutionHistory-CJxOXAbK.js";
import { R as Response } from "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import { C as Check } from "./wand-sparkles-D4aHx43i.js";
import { I as Image } from "./image-C_h5oH_f.js";
import "./overflow-container-CXkfjaRd.js";
import "./index-pfi9S7gc.js";
import "./trash-2-DTP27QMN.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./loader-circle-BsCo_wlW.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
function getDefaultValue(placeholder) {
  if (placeholder.defaultValue !== void 0) {
    return placeholder.defaultValue;
  }
  switch (placeholder.type) {
    case "checkbox":
      return false;
    case "number":
      return placeholder.min ?? 0;
    default:
      return "";
  }
}
async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function extractTextFromParts(parts) {
  return parts.filter((p) => p.type === "text").map((p) => p.text).join("\n");
}
function extractFileParts(parts) {
  return parts.filter((p) => p.type === "file");
}
function extractUniqueFileParts(parts) {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  let reasoningIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === "reasoning") {
      reasoningIndex = i;
      break;
    }
  }
  let imagesAfterReasoning = 0;
  if (reasoningIndex !== -1) {
    for (let i = reasoningIndex + 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.type === "file" && part.mediaType?.startsWith("image/")) {
        imagesAfterReasoning++;
      }
    }
  }
  const shouldSkipFirstImageAfterReasoning = imagesAfterReasoning > 1;
  let skippedFirstImage = false;
  for (const part of parts) {
    if (part.type === "file") {
      const isImage = part.mediaType?.startsWith("image/");
      if (isImage && shouldSkipFirstImageAfterReasoning && !skippedFirstImage && reasoningIndex !== -1) {
        const partIndex = parts.indexOf(part);
        if (partIndex > reasoningIndex) {
          skippedFirstImage = true;
          continue;
        }
      }
      if (!seen.has(part.url)) {
        seen.add(part.url);
        result.push(part);
      }
    }
  }
  return result;
}
function dataUrlToBlob(dataUrl) {
  try {
    const [header, base64Data] = dataUrl.split(",");
    if (!header || !base64Data) return null;
    const mimeMatch = header.match(/data:([^;]+)/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  } catch {
    return null;
  }
}
const OptimizedImage = ({
  src,
  alt,
  className,
  onClick,
  onContextMenu
}) => {
  const [blobUrl, setBlobUrl] = reactExports.useState(null);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  const blobUrlRef = reactExports.useRef(null);
  const isDataUrl = src.startsWith("data:");
  reactExports.useEffect(() => {
    if (!isDataUrl) {
      setBlobUrl(null);
      return;
    }
    const blob = dataUrlToBlob(src);
    if (blob) {
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      setBlobUrl(url);
    }
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src, isDataUrl]);
  const displaySrc = blobUrl || src;
  const prevDisplaySrcRef = reactExports.useRef(displaySrc);
  reactExports.useEffect(() => {
    if (prevDisplaySrcRef.current !== displaySrc) {
      setIsLoaded(false);
      prevDisplaySrcRef.current = displaySrc;
    }
  }, [displaySrc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: displaySrc,
      alt,
      className: `${className || ""} ${isLoaded ? "" : "invisible"}`,
      onClick,
      onContextMenu,
      onLoad: () => setIsLoaded(true)
    }
  );
};
function PromptAppRunnerContent({ promptApp, onClose }) {
  const { t } = useI18n();
  const { settings } = useSettings();
  const { track } = useAnalytics();
  const [inputValues, setInputValues] = reactExports.useState({});
  const [imageFilesMap, setImageFilesMap] = reactExports.useState({});
  const [fileFilesMap, setFileFilesMap] = reactExports.useState({});
  const [isHistoryOpen, setIsHistoryOpen] = reactExports.useState(false);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [generatedThreadId, setGeneratedThreadId] = reactExports.useState(null);
  const [resultMessage, setResultMessage] = reactExports.useState(null);
  const [generationError, setGenerationError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [retryCount, setRetryCount] = reactExports.useState(0);
  const MAX_IMAGE_RETRIES = 10;
  const [imageMenuState, setImageMenuState] = reactExports.useState(null);
  const imageMenuRef = reactExports.useRef(null);
  const triggerRegenerationRef = reactExports.useRef(null);
  const resultMessageRef = reactExports.useRef(null);
  const imageFoundRef = reactExports.useRef(false);
  const retryCountRef = reactExports.useRef(0);
  const hasResult = resultMessage || generationError;
  reactExports.useEffect(() => {
    const initialValues = {};
    const initialImageFilesMap = {};
    const initialFileFilesMap = {};
    for (const placeholder of promptApp.placeholders) {
      initialValues[placeholder.name] = getDefaultValue(placeholder);
      if (placeholder.type === "image") {
        initialImageFilesMap[placeholder.id] = [];
      }
      if (placeholder.type === "file") {
        initialFileFilesMap[placeholder.id] = [];
      }
    }
    setInputValues(initialValues);
    setImageFilesMap(initialImageFilesMap);
    setFileFilesMap(initialFileFilesMap);
    track(AnalyticsEvents.PROMPT_APP_RUNNER_OPENED, {
      promptAppId: promptApp.id,
      promptAppName: promptApp.name
    });
  }, [promptApp, track]);
  reactExports.useEffect(() => {
    if (!generatedThreadId) return;
    const unsubscribe = newChatThreadManager.addListener((message) => {
      const threadId = message.data?.threadId || message.data?.id;
      if (threadId !== generatedThreadId && message.data?.threadId !== generatedThreadId) return;
      if (message.type === "message_added") {
        const chatMessage = message.data;
        deltaAccumulator.initMessage(chatMessage);
        if (chatMessage.message.role === "assistant") {
          resultMessageRef.current = chatMessage;
          setResultMessage(chatMessage);
          if (promptApp.expectsImageResult && !imageFoundRef.current) {
            const fileParts = extractFileParts(chatMessage.message.parts);
            if (fileParts.some((part) => part.mediaType?.startsWith("image/"))) {
              imageFoundRef.current = true;
            }
          }
        }
      } else if (message.type === "message_delta") {
        const deltaPayload = message.data;
        const updatedMessage = deltaAccumulator.applyDeltas(deltaPayload);
        if (updatedMessage && updatedMessage.message.role === "assistant") {
          resultMessageRef.current = updatedMessage;
          setResultMessage(updatedMessage);
          if (promptApp.expectsImageResult && !imageFoundRef.current) {
            const fileParts = extractFileParts(updatedMessage.message.parts);
            if (fileParts.some((part) => part.mediaType?.startsWith("image/"))) {
              imageFoundRef.current = true;
            }
          }
        }
      } else if (message.type === "message_updated" || message.type === "message_streaming") {
        const chatMessage = message.data;
        deltaAccumulator.syncMessage(chatMessage);
        if (chatMessage.message.role === "assistant") {
          resultMessageRef.current = chatMessage;
          setResultMessage(chatMessage);
          if (promptApp.expectsImageResult && !imageFoundRef.current) {
            const fileParts = extractFileParts(chatMessage.message.parts);
            if (fileParts.some((part) => part.mediaType?.startsWith("image/"))) {
              imageFoundRef.current = true;
            }
          }
        }
      } else if (message.type === "thread_generating") {
        const threadData = message.data;
        if (!threadData.isGenerating) {
          setIsGenerating(false);
        }
      } else if (message.type === "generation_error" || message.type === "error") {
        const errorData = message.data;
        if (errorData.error?.includes("aborted") || errorData.error?.includes("AbortError")) {
          setIsGenerating(false);
          return;
        }
        setGenerationError(errorData.error || t("errors.generationError") || "Generation failed");
        setIsGenerating(false);
      } else if (message.type === "generation_completed") {
        if (!promptApp.expectsImageResult) {
          setIsGenerating(false);
          return;
        }
        const checkResultAndRetry = async () => {
          try {
            const thread = await newChatThreadManager.getThread(generatedThreadId);
            const assistantMessages = thread?.messages.filter((m) => m.message.role === "assistant") || [];
            const assistantMessage = assistantMessages[assistantMessages.length - 1];
            if (assistantMessage) {
              resultMessageRef.current = assistantMessage;
              setResultMessage(assistantMessage);
              const fileParts = extractFileParts(assistantMessage.message.parts);
              const hasImageInResult = fileParts.some((part) => part.mediaType?.startsWith("image/"));
              if (hasImageInResult) {
                imageFoundRef.current = true;
                setIsGenerating(false);
                return;
              }
            }
            const newCount = retryCountRef.current + 1;
            retryCountRef.current = newCount;
            setRetryCount(newCount);
            if (newCount <= MAX_IMAGE_RETRIES) {
              setTimeout(() => {
                triggerRegenerationRef.current?.();
              }, 100);
            } else {
              setIsGenerating(false);
              const fallbackError = `No image generated after ${MAX_IMAGE_RETRIES} attempts`;
              setGenerationError(t("promptApps.runner.maxRetriesReached") || fallbackError);
            }
          } catch (error) {
            console.error("Failed to check result:", error);
            setIsGenerating(false);
          }
        };
        checkResultAndRetry();
      }
    });
    return () => unsubscribe();
  }, [generatedThreadId, t, promptApp.expectsImageResult]);
  const imagePlaceholders = reactExports.useMemo(() => {
    return promptApp.placeholders.filter((p) => p.type === "image");
  }, [promptApp.placeholders]);
  reactExports.useEffect(() => {
    if (imagePlaceholders.length === 0) return;
    const handlePaste = (e) => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
        return;
      }
      const items = e.clipboardData?.items;
      if (!items) return;
      const pastedImages = [];
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
            const extension = file.type.split("/")[1] || "png";
            const namedFile = new File([file], `pasted-image-${timestamp}.${extension}`, { type: file.type });
            pastedImages.push(namedFile);
          }
        }
      }
      if (pastedImages.length > 0) {
        e.preventDefault();
        setImageFilesMap((prev) => {
          let targetPlaceholder = imagePlaceholders.find((p) => (prev[p.id] || []).length === 0);
          if (!targetPlaceholder) {
            targetPlaceholder = imagePlaceholders.find((p) => p.multiple);
          }
          if (!targetPlaceholder) {
            targetPlaceholder = imagePlaceholders[0];
          }
          const placeholderId = targetPlaceholder.id;
          const isMultiple = targetPlaceholder.multiple;
          return {
            ...prev,
            [placeholderId]: isMultiple ? [...prev[placeholderId] || [], ...pastedImages] : pastedImages.slice(0, 1)
          };
        });
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [imagePlaceholders]);
  const handleValueChange = reactExports.useCallback((name, value) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  const isValid = reactExports.useMemo(() => {
    for (const placeholder of promptApp.placeholders) {
      if (placeholder.required) {
        if (placeholder.type === "image") {
          const files = imageFilesMap[placeholder.id] || [];
          if (files.length === 0) return false;
        } else if (placeholder.type === "file") {
          const files = fileFilesMap[placeholder.id] || [];
          if (files.length === 0) return false;
        } else {
          const value = inputValues[placeholder.name];
          if (value === void 0 || value === null || value === "") return false;
        }
      }
    }
    return true;
  }, [promptApp.placeholders, inputValues, imageFilesMap, fileFilesMap]);
  const handleGenerate = reactExports.useCallback(async () => {
    if (!isValid) return;
    track(AnalyticsEvents.PROMPT_APP_GENERATE_CLICKED, {
      promptAppId: promptApp.id,
      promptAppName: promptApp.name
    });
    setIsGenerating(true);
    setGenerationError(null);
    setResultMessage(null);
    resultMessageRef.current = null;
    imageFoundRef.current = false;
    retryCountRef.current = 0;
    setRetryCount(0);
    const allImageFiles = Object.values(imageFilesMap).flat();
    const allFileFiles = Object.values(fileFilesMap).flat();
    const allAttachments = [...allImageFiles, ...allFileFiles];
    try {
      const executeInput = {
        inputValues,
        attachmentCount: allAttachments.length
      };
      const result = await promptAppsApiClient.executePromptApp(promptApp.id, executeInput);
      const threadId = result.thread.id;
      setGeneratedThreadId(threadId);
      const parts = [{ type: "text", text: result.generatedPrompt }];
      for (const file of allAttachments) {
        const dataUrl = await fileToDataUrl(file);
        const mediaType = file.type || "application/octet-stream";
        parts.push({
          type: "file",
          mediaType: mediaType === "application/json" || mediaType.startsWith("text/") ? "text/plain" : mediaType,
          url: dataUrl,
          filename: file.name
        });
      }
      const updatedThread = await newChatThreadManager.getThread(threadId);
      const model = promptApp.model || updatedThread?.model || settings?.chat?.defaultModel;
      if (model) {
        const toolsForApi = promptApp.tools ? promptApp.tools === AUTO_TOOL_SELECTION ? [AUTO_TOOL_SELECTION] : promptApp.tools : void 0;
        await newChatThreadManager.generateResponse(
          threadId,
          model,
          { role: "user", parts },
          {
            tools: toolsForApi,
            reasoningEffort: promptApp.reasoningEffort || void 0
          }
        );
      } else {
        setGenerationError("No model available for AI generation");
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Failed to generate:", error);
      setGenerationError(error instanceof Error ? error.message : "Generation failed");
      setIsGenerating(false);
    }
  }, [isValid, inputValues, imageFilesMap, fileFilesMap, promptApp, settings, track]);
  const handleStop = reactExports.useCallback(async () => {
    if (!generatedThreadId) return;
    try {
      await newChatThreadManager.stopGeneration(generatedThreadId);
    } catch (error) {
      console.error("Failed to stop generation:", error);
    }
  }, [generatedThreadId]);
  const triggerRegeneration = reactExports.useCallback(async () => {
    if (!generatedThreadId) return;
    setIsGenerating(true);
    try {
      const updatedThread = await newChatThreadManager.getThread(generatedThreadId);
      const model = promptApp.model || updatedThread?.model || settings?.chat?.defaultModel;
      if (model && updatedThread) {
        const toolsForApi = promptApp.tools ? promptApp.tools === AUTO_TOOL_SELECTION ? [AUTO_TOOL_SELECTION] : promptApp.tools : void 0;
        const messageToRetry = resultMessageRef.current;
        if (messageToRetry) {
          await newChatThreadManager.generateResponse(generatedThreadId, model, null, {
            tools: toolsForApi,
            reasoningEffort: promptApp.reasoningEffort || void 0,
            retryOfMessageId: messageToRetry.id
          });
        } else {
          const userMessage = updatedThread.messages.find((m) => m.message.role === "user");
          if (userMessage) {
            await newChatThreadManager.generateResponse(generatedThreadId, model, null, {
              tools: toolsForApi,
              reasoningEffort: promptApp.reasoningEffort || void 0
            });
          }
        }
      } else {
        setGenerationError("No model available for AI generation");
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Failed to regenerate:", error);
      setGenerationError(error instanceof Error ? error.message : "Regeneration failed");
      setIsGenerating(false);
    }
  }, [generatedThreadId, promptApp, settings]);
  reactExports.useEffect(() => {
    triggerRegenerationRef.current = triggerRegeneration;
  }, [triggerRegeneration]);
  const handleCopy = reactExports.useCallback(async () => {
    if (!resultMessage) return;
    const text = extractTextFromParts(resultMessage.message.parts);
    await writeTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, [resultMessage]);
  const handleRerun = reactExports.useCallback((values) => {
    setInputValues(values);
    setIsHistoryOpen(false);
  }, []);
  const handleClear = reactExports.useCallback(() => {
    setGeneratedThreadId(null);
    setResultMessage(null);
    setGenerationError(null);
  }, []);
  const handleOpenThread = reactExports.useCallback(() => {
    if (!generatedThreadId) return;
    if (window.promptAppRunner?.navigateToThread) {
      window.promptAppRunner.navigateToThread(generatedThreadId);
    }
  }, [generatedThreadId]);
  const hideImageMenu = reactExports.useCallback(() => {
    setImageMenuState(null);
  }, []);
  const handleImageContextMenu = reactExports.useCallback((event, url, filename) => {
    event.preventDefault();
    event.stopPropagation();
    setImageMenuState({ url, filename, left: event.clientX, top: event.clientY + 8 });
  }, []);
  const openImageInLightbox = reactExports.useCallback(async (url, filename) => {
    if (typeof window === "undefined" || !window.lightboxWindow?.open) return;
    try {
      await window.lightboxWindow.open({
        images: [
          {
            id: url,
            mediaType: "image/png",
            filename,
            url
          }
        ],
        currentIndex: 0
      });
    } catch (error) {
      console.error("Failed to open image in lightbox:", error);
    }
  }, []);
  const copyImageToClipboard = reactExports.useCallback(async (url) => {
    try {
      await copyImageFromUrlToClipboard(url);
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  }, []);
  const saveImageToDisk = reactExports.useCallback(async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const ext = blob.type.split("/")[1] || "png";
      const downloadName = filename || `image-${Date.now()}.${ext}`;
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  }, []);
  const handleImageMenuAction = reactExports.useCallback(
    async (action) => {
      if (!imageMenuState) return;
      const { url, filename } = imageMenuState;
      try {
        if (action === "copy") await copyImageToClipboard(url);
        else if (action === "open") await openImageInLightbox(url, filename);
        else if (action === "save") await saveImageToDisk(url, filename);
      } catch (error) {
        console.error("Image action failed:", error);
      } finally {
        hideImageMenu();
      }
    },
    [imageMenuState, copyImageToClipboard, openImageInLightbox, saveImageToDisk, hideImageMenu]
  );
  reactExports.useEffect(() => {
    if (!imageMenuState) return;
    const handleMouseDown = (event) => {
      if (imageMenuRef.current && !imageMenuRef.current.contains(event.target)) {
        hideImageMenu();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") hideImageMenu();
    };
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageMenuState, hideImageMenu]);
  const imageMenuPortal = imageMenuState && typeof document !== "undefined" ? reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: imageMenuRef,
        role: "menu",
        style: { top: imageMenuState.top, left: imageMenuState.left },
        className: "fixed z-[2050] min-w-[200px] overflow-hidden select-none rounded-xl border bg-popover/95 p-1 supports-[backdrop-filter]:backdrop-blur-xl shadow-md text-ui-sm text-popover-foreground [&>button]:rounded-md [&>button]:mb-0.5 [&>button:last-child]:mb-0",
        onClick: (event) => event.stopPropagation(),
        onContextMenu: (event) => event.preventDefault(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "w-full text-left px-3 h-9 leading-9 hover:bg-muted/50 transition-all duration-200 flex items-center gap-2",
              onClick: () => handleImageMenuAction("copy"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                t("chat.imageMenu.copyImage") || "Copy Image"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "w-full text-left px-3 h-9 leading-9 hover:bg-muted/50 transition-all duration-200 flex items-center gap-2",
              onClick: () => handleImageMenuAction("open"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                t("chat.imageMenu.openImage") || "Open in Preview"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "w-full text-left px-3 h-9 leading-9 hover:bg-muted/50 transition-all duration-200 flex items-center gap-2",
              onClick: () => handleImageMenuAction("save"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                t("chat.imageMenu.saveImage") || "Save Image"
              ]
            }
          )
        ]
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-4", children: promptApp.placeholders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground text-center py-4", children: t("promptApps.runner.noPlaceholders") || "This prompt app has no input fields." }) : promptApp.placeholders.map(
          (placeholder) => placeholder.type === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1", children: [
              placeholder.label || placeholder.name,
              placeholder.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageUploader,
              {
                files: imageFilesMap[placeholder.id] || [],
                onChange: (files) => setImageFilesMap((prev) => ({
                  ...prev,
                  [placeholder.id]: files
                })),
                multiple: placeholder.multiple,
                t
              }
            )
          ] }, placeholder.id) : placeholder.type === "file" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1", children: [
              placeholder.label || placeholder.name,
              placeholder.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileUploader,
              {
                files: fileFilesMap[placeholder.id] || [],
                onChange: (files) => setFileFilesMap((prev) => ({
                  ...prev,
                  [placeholder.id]: files
                })),
                multiple: placeholder.multiple,
                accept: placeholder.accept,
                t
              }
            )
          ] }, placeholder.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlaceholderInput,
            {
              placeholder,
              value: inputValues[placeholder.name],
              onChange: (value) => handleValueChange(placeholder.name, value),
              t
            },
            placeholder.id
          )
        ) }),
        (isGenerating || hasResult) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium flex items-center gap-2", children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: retryCount > 0 ? t("promptApps.runner.retrying", { count: retryCount, max: MAX_IMAGE_RETRIES }) || `Retrying for image (${retryCount}/${MAX_IMAGE_RETRIES})...` : t("promptApps.runner.generating") || "Generating..." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("promptApps.runner.result") || "Result" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
            isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleStop, className: "gap-1 h-7 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleStop, { size: 12 }),
              t("common.stop") || "Stop"
            ] }) : resultMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleCopy, className: "gap-1 h-7 text-xs", children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
                copied ? t("common.copied") || "Copied" : t("common.copy") || "Copy"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleOpenThread, className: "gap-1 h-7 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 12 }),
                t("promptApps.runner.openThread") || "Open"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: handleClear, className: "gap-1 h-7 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-lg p-4", children: generationError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive", children: generationError }) : resultMessage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            extractTextFromParts(resultMessage.message.parts) && /* @__PURE__ */ jsxRuntimeExports.jsx(Response, { className: "text-sm", children: extractTextFromParts(resultMessage.message.parts) }),
            extractUniqueFileParts(resultMessage.message.parts).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: extractUniqueFileParts(resultMessage.message.parts).map(
              (filePart, index) => filePart.mediaType?.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                OptimizedImage,
                {
                  src: filePart.url,
                  alt: filePart.filename || "Generated image",
                  className: "max-h-48 w-auto rounded-lg border border-black/10 dark:border-white/10 object-contain cursor-pointer hover:opacity-90 transition-opacity",
                  onClick: () => openImageInLightbox(filePart.url, filePart.filename),
                  onContextMenu: (event) => handleImageContextMenu(event, filePart.url, filePart.filename)
                },
                index
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-md border border-dashed border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-3 py-2 text-xs text-muted-foreground",
                  children: [
                    filePart.filename || "attachment",
                    " (",
                    filePart.mediaType || "file",
                    ")"
                  ]
                },
                index
              )
            ) })
          ] }) : isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: t("promptApps.runner.pleaseWait") || "Please wait while AI processes your request..." }) : null })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-4 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsHistoryOpen(true), title: t("promptApps.history.title") || "History", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: t("common.cancel") || "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleGenerate, disabled: !isValid || isGenerating, className: "gap-1", children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-current animate-bounce" })
            ] }),
            t("promptApps.runner.generating") || "Generating..."
          ] }) : hasResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 }),
            t("promptApps.runner.regenerate") || "Regenerate"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
            t("promptApps.runner.generate") || "Generate"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutionHistory, { open: isHistoryOpen, onOpenChange: setIsHistoryOpen, promptApp, onRerun: handleRerun, onNavigateToChat: onClose }),
    imageMenuPortal
  ] });
}
function ImageUploader({ files, onChange, multiple = false, t }) {
  const inputRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [previews, setPreviews] = reactExports.useState(/* @__PURE__ */ new Map());
  reactExports.useEffect(() => {
    const newPreviews = /* @__PURE__ */ new Map();
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPreviews.set(file.name + file.size, URL.createObjectURL(file));
      }
    });
    setPreviews(newPreviews);
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);
  const handleClick = () => inputRef.current?.click();
  const handleFiles = (newFiles) => {
    if (multiple) {
      onChange([...files, ...newFiles]);
    } else {
      onChange(newFiles.slice(0, 1));
    }
  };
  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  const handleRemove = (index) => onChange(files.filter((_, i) => i !== index));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: "image/*", multiple, onChange: handleInputChange, className: "hidden" }),
    files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: handleClick,
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: (e) => {
          e.preventDefault();
          setIsDragging(false);
        },
        onDrop: handleDrop,
        className: cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          "flex flex-col items-center justify-center gap-2 text-center",
          "hover:border-primary/50 hover:bg-muted/50",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: t("promptApps.runner.clickToUpload") || "Click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              " ",
              t("promptApps.runner.orDragDrop") || "or drag and drop"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("promptApps.runner.pasteHint") || "PNG, JPG, GIF, WebP • Paste from clipboard supported" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid gap-2", multiple ? "grid-cols-3" : "grid-cols-1"), children: [
        files.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative group rounded-lg overflow-hidden bg-muted border",
              multiple ? "aspect-square" : "max-h-48",
              !multiple && "cursor-pointer"
            ),
            onClick: !multiple ? handleClick : void 0,
            children: [
              previews.get(file.name + file.size) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: previews.get(file.name + file.size),
                  alt: file.name,
                  className: cn("w-full h-full", multiple ? "object-cover" : "object-contain")
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "icon",
                  className: "absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white truncate", children: file.name }) })
            ]
          },
          file.name + file.size + index
        )),
        multiple && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: handleClick,
            onDragOver: (e) => {
              e.preventDefault();
              setIsDragging(true);
            },
            onDragLeave: (e) => {
              e.preventDefault();
              setIsDragging(false);
            },
            onDrop: handleDrop,
            className: cn(
              "aspect-square rounded-lg border-2 border-dashed cursor-pointer transition-colors",
              "flex flex-col items-center justify-center gap-1",
              "hover:border-primary/50 hover:bg-muted/50",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t("promptApps.runner.addMore") || "Add" })
            ]
          }
        )
      ] }),
      multiple && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: t("promptApps.runner.pasteToAdd") || "Paste from clipboard to add more images" }),
      !multiple && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: t("promptApps.runner.clickToReplace") || "Click image to replace" })
    ] })
  ] });
}
function PlaceholderInput({ placeholder, value, onChange, t }) {
  const label = placeholder.label || placeholder.name;
  const isRequired = placeholder.required;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1", children: [
      label,
      isRequired && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "*" })
    ] }),
    placeholder.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: String(value || ""), onChange: (e) => onChange(e.target.value), placeholder: placeholder.placeholder }),
    placeholder.type === "textarea" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value: String(value || ""),
        onChange: (e) => onChange(e.target.value),
        placeholder: placeholder.placeholder,
        className: "min-h-[100px]"
      }
    ),
    placeholder.type === "select" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(value || ""), onValueChange: onChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: placeholder.placeholder || t("promptApps.runner.selectOption") || "Select an option" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (placeholder.options || []).map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option, children: option }, option)) })
    ] }),
    placeholder.type === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "number",
        value,
        onChange: (e) => onChange(e.target.value ? Number(e.target.value) : ""),
        placeholder: placeholder.placeholder,
        min: placeholder.min,
        max: placeholder.max
      }
    ),
    placeholder.type === "checkbox" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: value, onCheckedChange: (checked) => onChange(checked) }),
      placeholder.placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: placeholder.placeholder })
    ] }),
    placeholder.type === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: String(value || ""), onChange: (e) => onChange(e.target.value) })
  ] });
}
function FileUploader({ files, onChange, multiple = false, accept, t }) {
  const inputRef = reactExports.useRef(null);
  const handleClick = () => inputRef.current?.click();
  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      if (multiple) {
        onChange([...files, ...Array.from(e.target.files)]);
      } else {
        onChange(Array.from(e.target.files));
      }
      e.target.value = "";
    }
  };
  const handleRemove = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: accept || "*/*", multiple, onChange: handleInputChange, className: "hidden" }),
    files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: handleClick,
        className: cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          "flex flex-col items-center justify-center gap-2 text-center",
          "hover:border-primary/50 hover:bg-muted/50",
          "border-muted-foreground/25"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: t("promptApps.runner.clickToUpload") || "Click to upload" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("promptApps.runner.anyFile") || "Any file type" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      files.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded-md bg-muted/50 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(File$1, { className: "w-4 h-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            (file.size / 1024).toFixed(1),
            " KB"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "opacity-0 group-hover:opacity-100 h-6 w-6 p-0",
            onClick: () => handleRemove(index),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }, index)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: handleClick, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
        t("promptApps.runner.addMore") || "Add more"
      ] })
    ] })
  ] });
}
function getTwemojiUrl(emoji) {
  const codePoints = [...emoji].map((char) => char.codePointAt(0)?.toString(16)).filter(Boolean).join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codePoints}.svg`;
}
function setFavicon(url) {
  let link = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}
function PromptAppRunnerWindow() {
  const { t } = useI18n();
  const [promptApp, setPromptApp] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const initialize = async () => {
      try {
        if (window.promptAppRunner?.getPromptApp) {
          const app = await window.promptAppRunner.getPromptApp();
          if (app && typeof app === "object" && "id" in app) {
            setPromptApp(app);
          } else {
            setError("Prompt app not found");
          }
        } else {
          setError("IPC not available");
        }
      } catch (err) {
        console.error("Failed to fetch prompt app:", err);
        setError("Failed to load prompt app");
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, []);
  reactExports.useEffect(() => {
    if (promptApp) {
      const emoji = promptApp.icon || "📝";
      document.title = `${emoji} ${promptApp.name} - Alma`;
      setFavicon(getTwemojiUrl(emoji));
    }
  }, [promptApp]);
  const resizeTimeoutRef = reactExports.useRef(null);
  const saveWindowSize = reactExports.useCallback(
    (width, height) => {
      if (promptApp && window.promptAppRunner?.saveWindowSize) {
        window.promptAppRunner.saveWindowSize(promptApp.id, width, height);
      }
    },
    [promptApp]
  );
  reactExports.useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        saveWindowSize(window.innerWidth, window.innerHeight);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [saveWindowSize]);
  const handleClose = () => {
    if (window.promptAppRunner?.close) {
      window.promptAppRunner.close();
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-bounce" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: t("common.loading") || "Loading..." })
    ] }) });
  }
  if (error || !promptApp) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col items-center justify-center gap-4 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: error || "Unknown error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: handleClose, children: t("common.close") || "Close" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 items-center justify-between px-4 shrink-0", style: { WebkitAppRegion: "drag" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TwemojiIcon, { emoji: promptApp.icon || "📝", className: "text-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-sm font-medium tracking-tight text-foreground/80", children: promptApp.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 font-light", children: "Alma" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: handleClose,
          className: "h-7 w-7 text-muted-foreground/60 hover:text-foreground",
          style: { WebkitAppRegion: "no-drag" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", style: promptApp.fontSize ? { fontSize: `${promptApp.fontSize}px` } : void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromptAppRunnerContent, { promptApp, onClose: handleClose }) })
  ] });
}
initObservability();
function PromptAppRunnerPageView() {
  const posthog = usePostHog();
  reactExports.useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: "/prompt-app-runner"
      });
    }
  }, [posthog]);
  return null;
}
function PromptAppRunnerApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SWRConfig, { value: swrConfig, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalPostHogProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptAppRunnerPageView, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptAppRunnerWindow, {})
  ] }) }) });
}
function Root() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PromptAppRunnerApp, {});
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {}) })
);
window.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
