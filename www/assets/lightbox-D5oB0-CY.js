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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "41d8dd15-67ee-498c-bc9d-ca0091319e80", e._sentryDebugIdIdentifier = "sentry-dbid-41d8dd15-67ee-498c-bc9d-ca0091319e80");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-B0zE39VE.js";
import { a as client } from "./client-DCFZpNwr.js";
import { a as useI18n, E as ExternalLink, B as Button, C as Copy, e as Square, f as copyImageFromUrlToClipboard, i as initObservability, S as SWRConfig, s as swrConfig, T as ThemeProvider } from "./ThemeContext-Ac9lDiNd.js";
import "./createLucideIcon-sFEqYeet.js";
import "./clipboard-polyfill-B3oH85Ao.js";
import { C as ConditionalPostHogProvider } from "./ConditionalPostHogProvider-Cgb2BAQg.js";
import { X } from "./x-BzMxEGBY.js";
import "./preload-helper-D_8ag_Pp.js";
import { u as usePlatformContext, W as WindowControls, P as PlatformProvider } from "./PlatformContext-BWz3dz-T.js";
import { a as annotationDraft, M as MousePointer2, U as Undo2, R as Redo2, I as ImageAnnotator } from "./ImageAnnotator-CcNrU1f9.js";
import { W as WandSparkles, C as Check, D as Download, A as ArrowUpRight } from "./wand-sparkles-D4aHx43i.js";
import { a as ChevronLeft, C as ChevronRight, b as Circle, P as Pencil } from "./pencil-BtEsZPL8.js";
import { T as Trash2 } from "./trash-2-DTP27QMN.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import "./index-CZUfqr00.js";
const ANNO_COLORS = ["#ef4444", "#f59e0b", "#84cc16", "#06b6d4", "#d946ef", "#ffffff"];
const ANNO_TOOLS = [
  { tool: "select", Icon: MousePointer2, labelKey: "select" },
  { tool: "rect", Icon: Square, labelKey: "rect" },
  { tool: "ellipse", Icon: Circle, labelKey: "ellipse" },
  { tool: "brush", Icon: Pencil, labelKey: "brush" },
  { tool: "arrow", Icon: ArrowUpRight, labelKey: "arrow" }
];
const circledNumber = (n) => n >= 1 && n <= 20 ? "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳"[n - 1] : `${n}.`;
function buildEditInstruction(regions, overallNote, sourcePath, L) {
  const lines = regions.filter((r) => r.label.trim()).map((r) => `${circledNumber(r.index)} ${r.label.trim()}`);
  const visible = [];
  if (lines.length) visible.push(`**${L.visibleHeader}**

${lines.join("  \n")}`);
  const note = overallNote.trim();
  if (note) visible.push(`${L.overallLabel}${note}`);
  const cardData = JSON.stringify({
    r: regions.filter((r) => r.label.trim()).map((r) => ({ i: r.index, c: r.color, l: r.label.trim() })),
    n: overallNote.trim() || void 0
  });
  const reminder = [`alma-image-edit:${cardData}`, L.directive];
  if (sourcePath) reminder.push(`${L.sourcePathLabel}${sourcePath}`);
  return `${visible.join("\n\n")}

<system-reminder>
${reminder.join("\n")}
</system-reminder>`;
}
function buildMermaidEditInstruction(regions, overallNote, mermaidSource, L) {
  const lines = regions.filter((r) => r.label.trim()).map((r) => `${circledNumber(r.index)} ${r.label.trim()}`);
  const visible = [];
  if (lines.length) visible.push(`**${L.visibleHeader}**

${lines.join("  \n")}`);
  const note = overallNote.trim();
  if (note) visible.push(`${L.overallLabel}${note}`);
  const cardData = JSON.stringify({
    r: regions.filter((r) => r.label.trim()).map((r) => ({ i: r.index, c: r.color, l: r.label.trim() })),
    n: note || void 0
  });
  const reminder = [`alma-mermaid-edit:${cardData}`, L.directive, `${L.sourceLabel}
\`\`\`mermaid
${mermaidSource}
\`\`\``];
  return `${visible.join("\n\n")}

<system-reminder>
${reminder.join("\n")}
</system-reminder>`;
}
const PAGE_SIZE = 30;
async function fetchImageUrl(baseURL, imageId) {
  try {
    const response = await fetch(`${baseURL}/api/gallery/images/${imageId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.url ?? null;
  } catch {
    return null;
  }
}
function LightboxWindow() {
  const { t } = useI18n();
  const [images, setImages] = reactExports.useState([]);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [totalCount, setTotalCount] = reactExports.useState(0);
  const [hasMore, setHasMore] = reactExports.useState(false);
  const [imageUrl, setImageUrl] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [loadError, setLoadError] = reactExports.useState(null);
  const [isLoadingMore, setIsLoadingMore] = reactExports.useState(false);
  const [copySuccess, setCopySuccess] = reactExports.useState(false);
  const [baseURL, setBaseURL] = reactExports.useState("");
  const isLoadingMoreRef = reactExports.useRef(false);
  const pendingAdvanceRef = reactExports.useRef(false);
  const prevImagesLengthRef = reactExports.useRef(0);
  const { isMac } = usePlatformContext();
  const imageMetadata = images[currentIndex] || null;
  const annotatorRef = reactExports.useRef(null);
  const [annotateMode, setAnnotateMode] = reactExports.useState(false);
  const [annoTool, setAnnoTool] = reactExports.useState("rect");
  const [annoColor, setAnnoColor] = reactExports.useState(ANNO_COLORS[0]);
  const [overallNote, setOverallNote] = reactExports.useState("");
  const [annoState, setAnnoState] = reactExports.useState({ canUndo: false, canRedo: false, regions: [] });
  const [isApplying, setIsApplying] = reactExports.useState(false);
  const canAnnotate = !!(imageMetadata?.threadId || imageMetadata?.herdrChat) && !!imageUrl && !loadError;
  const labeledCount = annoState.regions.filter((r) => r.label.trim()).length;
  const exitAnnotate = reactExports.useCallback(() => {
    setAnnotateMode(false);
    setOverallNote("");
    setAnnoState({ canUndo: false, canRedo: false, regions: [] });
  }, []);
  const annotateNavInitRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!annotateNavInitRef.current) {
      annotateNavInitRef.current = true;
      return;
    }
    setAnnotateMode(false);
    setOverallNote("");
  }, [currentIndex]);
  const handleApplyEdit = reactExports.useCallback(async () => {
    if (!annotatorRef.current || !(imageMetadata?.threadId || imageMetadata?.herdrChat) || isApplying) return;
    if (labeledCount === 0 && !overallNote.trim()) return;
    setIsApplying(true);
    try {
      const dataUrl = annotatorRef.current.flatten();
      if (!dataUrl) throw new Error("Failed to flatten annotations");
      if (imageMetadata.herdrChat) {
        await window.lightboxWindow?.annotateForHerdr?.({
          chat: imageMetadata.herdrChat,
          image: dataUrl,
          draft: annotationDraft(t("herdr.annotate.header"), annoState.regions, overallNote)
        });
        window.lightboxWindow?.close?.();
        return;
      }
      if (!imageMetadata.threadId) return;
      const blob = await (await fetch(dataUrl)).blob();
      const resp = await fetch(`${baseURL}/api/attachments/image`, {
        method: "POST",
        headers: { "Content-Type": blob.type || "image/png" },
        body: blob
      });
      if (!resp.ok) throw new Error(`upload failed: HTTP ${resp.status}`);
      const { url, mediaType, filePath } = await resp.json();
      const instruction = imageMetadata.mermaidSource ? buildMermaidEditInstruction(annoState.regions, overallNote, imageMetadata.mermaidSource, {
        directive: t("chat.mermaidAnnotate.prompt.directive"),
        sourceLabel: t("chat.mermaidAnnotate.prompt.sourceLabel"),
        visibleHeader: t("chat.mermaidAnnotate.prompt.visibleHeader"),
        overallLabel: t("chat.imageAnnotate.prompt.overallLabel")
      }) : buildEditInstruction(annoState.regions, overallNote, filePath, {
        directive: t("chat.imageAnnotate.prompt.directive"),
        sourcePathLabel: t("chat.imageAnnotate.prompt.sourcePathLabel"),
        visibleHeader: t("chat.imageAnnotate.prompt.visibleHeader"),
        overallLabel: t("chat.imageAnnotate.prompt.overallLabel")
      });
      await window.lightboxWindow?.editImageInThread?.({
        threadId: imageMetadata.threadId,
        imageUrl: url,
        mediaType: mediaType || "image/png",
        instruction
      });
      window.lightboxWindow?.close?.();
    } catch (error) {
      console.error("Failed to apply annotated edit:", error);
      setIsApplying(false);
    }
  }, [annoState.regions, overallNote, labeledCount, imageMetadata, baseURL, isApplying, t]);
  const [transform, setTransform] = reactExports.useState({ scale: 1, x: 0, y: 0 });
  const [isDraggingState, setIsDraggingState] = reactExports.useState(false);
  const imageContainerRef = reactExports.useRef(null);
  const lastTouchDistance = reactExports.useRef(null);
  const lastTouchCenter = reactExports.useRef(null);
  const isDragging = reactExports.useRef(false);
  const lastDragPosition = reactExports.useRef(null);
  const isPinching = reactExports.useRef(false);
  const scale = transform.scale;
  const position = { x: transform.x, y: transform.y };
  reactExports.useEffect(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [currentIndex]);
  reactExports.useEffect(() => {
    const init = async () => {
      const info = await window.apiServer.getInfo();
      if (info.baseURL) {
        setBaseURL(info.baseURL);
      }
    };
    init();
  }, []);
  const applyLightboxParams = reactExports.useCallback((params) => {
    setImages(params.images);
    setCurrentIndex(Math.min(Math.max(params.currentIndex, 0), Math.max(params.images.length - 1, 0)));
    setImageUrl(null);
    setLoadError(null);
    setIsLoading(params.images.length > 0);
    setTotalCount(params.totalCount ?? params.images.length);
    setHasMore(params.hasMore ?? false);
    if (params.annotate) setAnnotateMode(true);
  }, []);
  reactExports.useEffect(() => {
    if (!window.lightboxWindow?.onUpdate) return;
    let cancelled = false;
    const unsubscribe = window.lightboxWindow.onUpdate(applyLightboxParams);
    window.lightboxWindow.getInitialParams().then((params) => {
      if (!cancelled && params) {
        applyLightboxParams(params);
      }
    }).catch((error) => {
      console.error("Failed to load initial lightbox params:", error);
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [applyLightboxParams]);
  reactExports.useEffect(() => {
    if (images.length === 0) {
      setImageUrl(null);
      setLoadError(null);
      setIsLoading(false);
      return;
    }
    const currentImage = images[currentIndex];
    if (!currentImage) {
      setImageUrl(null);
      setLoadError("Image not found");
      setIsLoading(false);
      return;
    }
    setImageUrl(null);
    setLoadError(null);
    if (currentImage.url) {
      setImageUrl(currentImage.url);
      setIsLoading(false);
      return;
    }
    if (!baseURL) {
      setIsLoading(true);
      return;
    }
    const currentImageId = currentImage.id;
    let cancelled = false;
    setIsLoading(true);
    fetchImageUrl(baseURL, currentImageId).then((url) => {
      if (cancelled) return;
      if (url) {
        setImageUrl(url);
        setLoadError(null);
      } else {
        setImageUrl(null);
        setLoadError("Failed to load image");
      }
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [baseURL, images, currentIndex]);
  const loadMoreImages = reactExports.useCallback(async () => {
    if (!baseURL || !hasMore || isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    try {
      const response = await fetch(`${baseURL}/api/gallery/images?limit=${PAGE_SIZE}&offset=${images.length}`);
      if (!response.ok) return;
      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setImages((prev) => [...prev, ...data.images]);
        setHasMore(data.hasMore ?? false);
        if (typeof data.total === "number") {
          setTotalCount(data.total);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more images:", err);
    } finally {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [baseURL, hasMore, images.length]);
  reactExports.useEffect(() => {
    if (hasMore && currentIndex >= images.length - 5) {
      loadMoreImages();
    }
  }, [currentIndex, images.length, hasMore, loadMoreImages]);
  reactExports.useEffect(() => {
    if (pendingAdvanceRef.current && images.length > prevImagesLengthRef.current) {
      pendingAdvanceRef.current = false;
      setCurrentIndex(prevImagesLengthRef.current);
    }
    prevImagesLengthRef.current = images.length;
  }, [images.length]);
  const handleClose = reactExports.useCallback(() => {
    if (window.lightboxWindow?.close) {
      window.lightboxWindow.close();
    } else {
      window.close();
    }
  }, []);
  const handlePrev = reactExports.useCallback(() => {
    setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  }, [images.length]);
  const handleNext = reactExports.useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === images.length - 1) {
        if (hasMore) {
          pendingAdvanceRef.current = true;
          loadMoreImages();
          return prev;
        }
        return 0;
      }
      return prev + 1;
    });
  }, [images.length, hasMore, loadMoreImages]);
  const handleWheel = reactExports.useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale * delta, 0.5), 5)
    }));
  }, []);
  const handleTouchStart = reactExports.useCallback((e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      isPinching.current = true;
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      lastTouchDistance.current = distance;
      lastTouchCenter.current = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };
    } else if (e.touches.length === 1) {
      isDragging.current = true;
      lastDragPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);
  const handleTouchMove = reactExports.useCallback((e) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null && lastTouchCenter.current !== null) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const currentCenter = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };
      const scaleRatio = distance / lastTouchDistance.current;
      const panDeltaX = currentCenter.x - lastTouchCenter.current.x;
      const panDeltaY = currentCenter.y - lastTouchCenter.current.y;
      const container = imageContainerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;
        const pinchX = currentCenter.x - containerCenterX;
        const pinchY = currentCenter.y - containerCenterY;
        setTransform((prev) => {
          const newScale = Math.min(Math.max(prev.scale * scaleRatio, 0.5), 5);
          const actualRatio = newScale / prev.scale;
          return {
            scale: newScale,
            x: pinchX * (1 - actualRatio) + prev.x * actualRatio + panDeltaX,
            y: pinchY * (1 - actualRatio) + prev.y * actualRatio + panDeltaY
          };
        });
      }
      lastTouchDistance.current = distance;
      lastTouchCenter.current = currentCenter;
    } else if (e.touches.length === 1 && isDragging.current && lastDragPosition.current) {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - lastDragPosition.current.x;
      const deltaY = e.touches[0].clientY - lastDragPosition.current.y;
      lastDragPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setTransform((prev) => ({ ...prev, x: prev.x + deltaX, y: prev.y + deltaY }));
    }
  }, []);
  const handleTouchEnd = reactExports.useCallback(() => {
    lastTouchDistance.current = null;
    lastTouchCenter.current = null;
    isDragging.current = false;
    lastDragPosition.current = null;
    isPinching.current = false;
  }, []);
  const handleMouseDown = reactExports.useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    setIsDraggingState(true);
    lastDragPosition.current = { x: e.clientX, y: e.clientY };
  }, []);
  const handleMouseMove = reactExports.useCallback((e) => {
    if (isDragging.current && lastDragPosition.current) {
      const deltaX = e.clientX - lastDragPosition.current.x;
      const deltaY = e.clientY - lastDragPosition.current.y;
      lastDragPosition.current = { x: e.clientX, y: e.clientY };
      setTransform((prev) => ({ ...prev, x: prev.x + deltaX, y: prev.y + deltaY }));
    }
  }, []);
  const handleMouseUp = reactExports.useCallback(() => {
    isDragging.current = false;
    setIsDraggingState(false);
    lastDragPosition.current = null;
  }, []);
  const lastTapTime = reactExports.useRef(0);
  const handleDoubleTap = reactExports.useCallback(() => {
    if (isPinching.current) return;
    const now = Date.now();
    if (now - lastTapTime.current < 300) {
      if (scale > 1) {
        setTransform({ scale: 1, x: 0, y: 0 });
      } else {
        setTransform((prev) => ({ ...prev, scale: 2 }));
      }
    }
    lastTapTime.current = now;
  }, [scale]);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, handlePrev, handleNext]);
  const handleNavigateToThread = reactExports.useCallback(() => {
    if (imageMetadata?.threadId && window.lightboxWindow?.navigateToThread) {
      window.lightboxWindow.navigateToThread(imageMetadata.threadId);
    }
  }, [imageMetadata]);
  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const extension = blob.type.split("/")[1]?.split("+")[0] || "png";
      const filename = imageMetadata?.filename || `image-${Date.now()}.${extension}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const handleCopy = async () => {
    if (!imageUrl) return;
    try {
      const success = await copyImageFromUrlToClipboard(imageUrl);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1500);
      }
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `lightbox-shell h-screen bg-transparent flex flex-col relative overflow-hidden ${isMac ? "rounded-[var(--window-radius)]" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-black/95 ${isMac ? "rounded-[var(--window-radius)]" : ""}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-black/50 relative z-10", style: { WebkitAppRegion: "drag" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", style: { WebkitAppRegion: "no-drag" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/70 text-sm", children: [
          images.length > 0 ? `${currentIndex + 1} / ${totalCount || images.length}` : "-",
          isLoadingMore && " ..."
        ] }),
        imageMetadata?.threadTitle && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors", onClick: handleNavigateToThread, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
          imageMetadata.threadTitle
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", style: { WebkitAppRegion: "no-drag" }, children: [
        canAnnotate && !annotateMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "text-white/80 hover:text-white hover:bg-white/10 gap-1.5 h-8",
            onClick: () => setAnnotateMode(true),
            title: imageMetadata?.herdrChat ? t("herdr.annotate.title") : t("chat.imageAnnotate.buttonTitle"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: imageMetadata?.herdrChat ? t("herdr.annotate.action") : t("chat.imageAnnotate.button") })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "text-white/70 hover:text-white hover:bg-white/10",
            onClick: handleCopy,
            disabled: !imageUrl,
            title: t("chat.imageMenu.copyImage"),
            children: copySuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "text-white/70 hover:text-white hover:bg-white/10",
            onClick: handleDownload,
            disabled: !imageUrl,
            title: t("chat.imageMenu.saveImage"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
          }
        ),
        isMac ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "text-white/70 hover:text-white hover:bg-white/10", onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WindowControls, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: imageContainerRef,
        className: "flex-1 min-h-0 flex items-center justify-center p-4 relative z-10 overflow-hidden",
        style: { touchAction: "none" },
        onWheel: handleWheel,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onClick: handleDoubleTap,
        children: [
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "absolute left-4 z-10 text-white/70 hover:text-white hover:bg-white/10 w-12 h-12",
              onClick: (e) => {
                e.stopPropagation();
                handlePrev();
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-8 h-8" })
            }
          ),
          loadError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-white/60 text-sm", children: loadError }) : isLoading || !imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-white" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: imageMetadata?.filename || "Image",
              className: "max-w-[calc(100%-120px)] max-h-full object-contain rounded-lg select-none",
              style: {
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: scale === 1 ? "transform 0.2s ease-out" : "none",
                cursor: isDraggingState ? "grabbing" : "grab",
                willChange: "transform"
              },
              draggable: false,
              onError: () => {
                setImageUrl(null);
                setLoadError("Failed to load image");
              }
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "absolute right-4 z-10 text-white/70 hover:text-white hover:bg-white/10 w-12 h-12",
              onClick: (e) => {
                e.stopPropagation();
                handleNext();
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-8 h-8" })
            }
          )
        ]
      }
    ),
    annotateMode && imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-40 flex flex-col bg-black/95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 bg-black/60 flex-wrap", style: { WebkitAppRegion: "drag" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", style: { WebkitAppRegion: "no-drag" }, children: [
          ANNO_TOOLS.map(({ tool, Icon, labelKey }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setAnnoTool(tool),
              title: t(`chat.imageAnnotate.tool.${labelKey}`),
              className: `flex items-center justify-center w-8 h-8 rounded-md transition-colors ${annoTool === tool ? "bg-white/90 text-black" : "text-white/70 hover:text-white hover:bg-white/10"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
            },
            tool
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/20 mx-1" }),
          ANNO_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setAnnoColor(c),
              title: t("chat.imageAnnotate.color"),
              className: `w-6 h-6 rounded-full border-2 transition-transform ${annoColor === c ? "scale-110 border-white" : "border-white/30 hover:scale-105"}`,
              style: { backgroundColor: c }
            },
            c
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/20 mx-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => annotatorRef.current?.undo(),
              disabled: !annoState.canUndo,
              title: t("chat.imageAnnotate.undo"),
              className: "flex items-center justify-center w-8 h-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => annotatorRef.current?.redo(),
              disabled: !annoState.canRedo,
              title: t("chat.imageAnnotate.redo"),
              className: "flex items-center justify-center w-8 h-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => annotatorRef.current?.clear(),
              disabled: annoState.regions.length === 0,
              title: t("chat.imageAnnotate.clearAll"),
              className: "flex items-center justify-center w-8 h-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: exitAnnotate,
            className: "text-white/70 hover:text-white text-sm px-2 py-1 rounded-md hover:bg-white/10",
            style: { WebkitAppRegion: "no-drag" },
            children: t("chat.imageAnnotate.exit")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-h-0 flex items-center justify-center p-4 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ImageAnnotator,
          {
            ref: annotatorRef,
            imageUrl,
            tool: annoTool,
            color: annoColor,
            onChange: setAnnoState,
            className: "max-w-full max-h-full",
            regionPlaceholder: t("chat.imageAnnotate.regionPlaceholder"),
            removeRegionLabel: t("chat.imageAnnotate.removeRegion")
          }
        ),
        annoState.regions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur-sm", children: t("chat.imageAnnotate.canvasHint") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-black/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: overallNote,
            onChange: (e) => setOverallNote(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleApplyEdit();
              }
            },
            placeholder: t("chat.imageAnnotate.overallNotePlaceholder"),
            className: "flex-1 rounded-lg bg-white/8 text-white placeholder:text-white/35 text-sm px-3 py-2 outline-none focus:bg-white/12 border border-white/10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleApplyEdit,
            disabled: isApplying || labeledCount === 0 && !overallNote.trim(),
            className: "h-10 gap-1.5 bg-white text-black hover:bg-white/90 disabled:opacity-40",
            title: labeledCount === 0 && !overallNote.trim() ? t("chat.imageAnnotate.applyDisabledHint") : t("chat.imageAnnotate.applyShortcut"),
            children: [
              isApplying ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4" }),
              imageMetadata?.herdrChat ? t("herdr.annotate.add") : t("chat.imageAnnotate.apply"),
              labeledCount > 0 ? ` (${labeledCount})` : ""
            ]
          }
        )
      ] }) })
    ] }),
    imageMetadata?.createdAt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-black/50 text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs", children: new Date(imageMetadata.createdAt).toLocaleString() }) })
  ] });
}
initObservability();
function LightboxApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SWRConfig, { value: swrConfig, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalPostHogProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LightboxWindow, {}) }) }) }) });
}
function Root() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LightboxApp, {});
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, {}) })
);
window.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
