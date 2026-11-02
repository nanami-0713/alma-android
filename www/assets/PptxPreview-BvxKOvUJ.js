const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PluginNotificationListener-DQz_TGb2.js","./index-B0zE39VE.js","./index--fUMxuuf.css","./createLucideIcon-sFEqYeet.js","./ThemeContext-Ac9lDiNd.js","./x-BzMxEGBY.js","./index-CZUfqr00.js","./preload-helper-D_8ag_Pp.js","./label-CF1Fh03r.js","./wand-sparkles-D4aHx43i.js","./overflow-container-CXkfjaRd.js","./PlatformContext-BWz3dz-T.js","./TwemojiIcon-qeDCXH7q.js","./index-pfi9S7gc.js","./apiClient-DmP45vUN.js","./loader-circle-BsCo_wlW.js","./slider-CpZgBHCs.js","./pencil-BtEsZPL8.js","./trash-2-DTP27QMN.js","./image-C_h5oH_f.js","./alma-icon-BzHspoaH.js","./addLeadingZeros-DCGuLiwe.js","./PluginNotificationListener-DrKknvT7.css"])))=>i.map(i=>d[i]);
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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "2a411058-6154-47d0-9842-66ecbb91c8c2", e._sentryDebugIdIdentifier = "sentry-dbid-2a411058-6154-47d0-9842-66ecbb91c8c2");
    })();
  } catch (e) {
  }
}
;
import { _ as __vitePreload } from "./preload-helper-D_8ag_Pp.js";
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { c as cn, M as Maximize2 } from "./ThemeContext-Ac9lDiNd.js";
import { X } from "./x-BzMxEGBY.js";
import { d as FileText, e as Send, w as workspaceApiClient } from "./PluginNotificationListener-DQz_TGb2.js";
import "./createLucideIcon-sFEqYeet.js";
import { u as useTheme } from "./overflow-container-CXkfjaRd.js";
import { p as pendingElementPickAtom, b as previewHighlightAtom, m as makePendingElementPick } from "./App-CJD1Pyfa.js";
import { u as useSetAtom, a as useAtomValue, L as Layers } from "./label-CF1Fh03r.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import { M as MousePointer2 } from "./ImageAnnotator-CcNrU1f9.js";
import { Z as ZoomOut, b as ZoomIn } from "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import { a as ChevronLeft, C as ChevronRight } from "./pencil-BtEsZPL8.js";
import "./index-CZUfqr00.js";
import "./PlatformContext-BWz3dz-T.js";
import "./TwemojiIcon-qeDCXH7q.js";
import "./index-pfi9S7gc.js";
import "./wand-sparkles-D4aHx43i.js";
import "./apiClient-DmP45vUN.js";
import "./slider-CpZgBHCs.js";
import "./trash-2-DTP27QMN.js";
import "./image-C_h5oH_f.js";
import "./alma-icon-BzHspoaH.js";
import "./addLeadingZeros-DCGuLiwe.js";
import "./ExecutionHistory-CJxOXAbK.js";
import "./generative-ui-block-1Rj38gNW.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
import "./en-US-CZvvliM3.js";
/* empty css                   */
import "./v4-D_ZMSocT.js";
import "./ConditionalPostHogProvider-Cgb2BAQg.js";
import "./useLiveCoding-DqcVzuV6.js";
function presentationRegionFromClientPoints(bounds, start, end, slideWidth, slideHeight) {
  const normalizedX = (clientX) => Math.min(1, Math.max(0, (clientX - bounds.left) / Math.max(1, bounds.width)));
  const normalizedY = (clientY) => Math.min(1, Math.max(0, (clientY - bounds.top) / Math.max(1, bounds.height)));
  const startX = normalizedX(start.x) * slideWidth;
  const endX = normalizedX(end.x) * slideWidth;
  const startY = normalizedY(start.y) * slideHeight;
  const endY = normalizedY(end.y) * slideHeight;
  return {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY)
  };
}
const MAX_PPTX_FALLBACK_BYTES = 4 * 1024 * 1024;
const MAX_PPTX_FALLBACK_SLIDES = 200;
const MAX_PPTX_FALLBACK_XML_CHARS = 2 * 1024 * 1024;
const MAX_PPTX_FALLBACK_MEDIA_BYTES = 32 * 1024 * 1024;
const PPTX_FALLBACK_TIMEOUT_MS = 15e3;
const PPTX_FALLBACK_FETCH_TIMEOUT_MS = 3e4;
function assertSafePptxFallbackArchive(byteLength) {
  if (!Number.isFinite(byteLength) || byteLength < 0 || byteLength > MAX_PPTX_FALLBACK_BYTES) {
    throw new Error(
      `Presentation is too large for the lightweight preview (${Math.ceil(byteLength / 1024 / 1024)} MB; limit ${MAX_PPTX_FALLBACK_BYTES / 1024 / 1024} MB)`
    );
  }
}
function assertSafePptxXml(xml, label) {
  if (xml.length > MAX_PPTX_FALLBACK_XML_CHARS) {
    throw new Error(`${label} is too complex for the lightweight preview`);
  }
}
function assertPptxFallbackActive(startedAt, cancelled, now = Date.now()) {
  if (cancelled) throw new Error("Presentation preview was cancelled");
  if (now - startedAt > PPTX_FALLBACK_TIMEOUT_MS) {
    throw new Error(`Presentation lightweight preview timed out after ${PPTX_FALLBACK_TIMEOUT_MS / 1e3}s`);
  }
}
const VIRTUAL_WIDTH = 960;
const VIRTUAL_HEIGHT = 540;
const REGION_DRAG_THRESHOLD_PX = 4;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.1;
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const yieldToRenderer = () => new Promise((resolve) => setTimeout(resolve, 0));
function extractParagraphs(txBody) {
  const paragraphs = [];
  const pElements = txBody.getElementsByTagNameNS(NS_A, "p");
  for (let j = 0; j < pElements.length; j++) {
    const p = pElements[j];
    const runs = [];
    const rElements = p.getElementsByTagNameNS(NS_A, "r");
    for (let k = 0; k < rElements.length; k++) {
      const r = rElements[k];
      const t = r.getElementsByTagNameNS(NS_A, "t")[0];
      if (!t) continue;
      const rPr = r.getElementsByTagNameNS(NS_A, "rPr")[0];
      runs.push({
        text: t.textContent || "",
        bold: rPr?.getAttribute("b") === "1",
        italic: rPr?.getAttribute("i") === "1",
        fontSize: rPr?.getAttribute("sz") ? parseInt(rPr.getAttribute("sz")) / 100 : void 0
      });
    }
    const fldElements = p.getElementsByTagNameNS(NS_A, "fld");
    for (let k = 0; k < fldElements.length; k++) {
      const t = fldElements[k].getElementsByTagNameNS(NS_A, "t")[0];
      if (t) runs.push({ text: t.textContent || "" });
    }
    if (runs.length === 0) continue;
    const pPr = Array.from(p.children).find((c) => c.localName === "pPr");
    const alignment = pPr?.getAttribute("algn") || void 0;
    const level = pPr ? parseInt(pPr.getAttribute("lvl") || "0") : 0;
    let isBullet = false;
    if (pPr) {
      const hasBuChar = pPr.getElementsByTagNameNS(NS_A, "buChar").length > 0;
      const hasBuAutoNum = pPr.getElementsByTagNameNS(NS_A, "buAutoNum").length > 0;
      const hasBuNone = pPr.getElementsByTagNameNS(NS_A, "buNone").length > 0;
      isBullet = hasBuChar || hasBuAutoNum || level > 0 && !hasBuNone;
    }
    paragraphs.push({ runs, alignment, isBullet, level });
  }
  return paragraphs;
}
async function parsePptx(arrayBuffer, isCancelled) {
  assertSafePptxFallbackArchive(arrayBuffer.byteLength);
  const startedAt = Date.now();
  const assertActive = () => assertPptxFallbackActive(startedAt, isCancelled());
  assertActive();
  const JSZip = (await __vitePreload(async () => {
    const { default: __vite_default__ } = await import("./PluginNotificationListener-DQz_TGb2.js").then((n) => n.j);
    return { default: __vite_default__ };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]) : void 0, import.meta.url)).default;
  const zip = await JSZip.loadAsync(arrayBuffer);
  assertActive();
  const slideFiles = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort((a, b) => {
    const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
    const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
    return numA - numB;
  });
  if (slideFiles.length === 0) {
    throw new Error("No slides found in presentation");
  }
  if (slideFiles.length > MAX_PPTX_FALLBACK_SLIDES) throw new Error(`Presentation has too many slides (${slideFiles.length})`);
  const mediaCache = /* @__PURE__ */ new Map();
  const objectUrls = [];
  let decompressedMediaBytes = 0;
  const resolveMedia = async (mediaPath) => {
    const normalized = mediaPath.startsWith("ppt/") ? mediaPath : `ppt/${mediaPath}`;
    const cached = mediaCache.get(normalized);
    if (cached) return cached;
    const entry = zip.files[normalized];
    if (!entry) return void 0;
    const blob = await entry.async("blob");
    decompressedMediaBytes += blob.size;
    if (decompressedMediaBytes > MAX_PPTX_FALLBACK_MEDIA_BYTES) {
      throw new Error("Presentation media is too large to preview safely");
    }
    assertActive();
    const objectUrl = URL.createObjectURL(blob);
    objectUrls.push(objectUrl);
    mediaCache.set(normalized, objectUrl);
    return objectUrl;
  };
  const slides = [];
  const domParser = new DOMParser();
  try {
    for (const slideFile of slideFiles) {
      assertActive();
      const xml = await zip.files[slideFile].async("text");
      assertSafePptxXml(xml, slideFile);
      const doc = domParser.parseFromString(xml, "text/xml");
      const slideNum = slideFile.match(/slide(\d+)/)?.[1] || "1";
      const relPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
      const relMap = /* @__PURE__ */ new Map();
      if (zip.files[relPath]) {
        const relXml = await zip.files[relPath].async("text");
        assertSafePptxXml(relXml, relPath);
        const relDoc = domParser.parseFromString(relXml, "text/xml");
        const rels = relDoc.getElementsByTagName("Relationship");
        for (let i = 0; i < rels.length; i++) {
          const id = rels[i].getAttribute("Id") || "";
          let target = rels[i].getAttribute("Target") || "";
          target = target.replace(/^\.\.\//, "");
          relMap.set(id, target);
        }
      }
      const shapes = [];
      const images = [];
      const spElements = doc.getElementsByTagNameNS(NS_P, "sp");
      for (let i = 0; i < spElements.length; i++) {
        const sp = spElements[i];
        const ph = sp.getElementsByTagNameNS(NS_P, "ph")[0];
        const phType = ph?.getAttribute("type") || "";
        const isTitle = phType === "title" || phType === "ctrTitle";
        const isSubtitle = phType === "subTitle";
        const txBody = sp.getElementsByTagNameNS(NS_P, "txBody")[0];
        if (!txBody) continue;
        const paragraphs = extractParagraphs(txBody);
        if (paragraphs.length > 0) {
          shapes.push({ paragraphs, isTitle, isSubtitle });
        }
      }
      const picElements = doc.getElementsByTagNameNS(NS_P, "pic");
      for (let i = 0; i < picElements.length; i++) {
        const blip = picElements[i].getElementsByTagNameNS(NS_A, "blip")[0];
        if (!blip) continue;
        const embedId = blip.getAttributeNS(NS_R, "embed") || blip.getAttribute("r:embed");
        if (!embedId) continue;
        const mediaPath = relMap.get(embedId);
        if (!mediaPath) continue;
        const imageUrl = await resolveMedia(mediaPath);
        if (imageUrl) images.push(imageUrl);
      }
      slides.push({ shapes, images });
      await yieldToRenderer();
      assertActive();
    }
  } catch (error) {
    for (const objectUrl of objectUrls) URL.revokeObjectURL(objectUrl);
    throw error;
  }
  return { slides, objectUrls };
}
const PptxPreview = reactExports.memo(function PptxPreview2({ src, filePath, workspaceId, isExternal, revision, progress, isGenerating }) {
  const previewSessionId = reactExports.useId();
  const [slides, setSlides] = reactExports.useState([]);
  const [renderedSlides, setRenderedSlides] = reactExports.useState([]);
  const [presentationModel, setPresentationModel] = reactExports.useState(null);
  const [currentSlide, setCurrentSlide] = reactExports.useState(0);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isDesignMode, setIsDesignMode] = reactExports.useState(false);
  const [showLayers, setShowLayers] = reactExports.useState(false);
  const [selectedElement, setSelectedElement] = reactExports.useState(null);
  const [selectedRegion, setSelectedRegion] = reactExports.useState(null);
  const [editRequest, setEditRequest] = reactExports.useState("");
  const [zoomFactor, setZoomFactor] = reactExports.useState(1);
  const { effectiveTheme } = useTheme();
  const containerRef = reactExports.useRef(null);
  const marqueeRef = reactExports.useRef(null);
  const regionDragRef = reactExports.useRef(null);
  const suppressNextClickRef = reactExports.useRef(false);
  const renderedSlidesRef = reactExports.useRef([]);
  const fallbackSlidesRef = reactExports.useRef([]);
  const [fitScale, setFitScale] = reactExports.useState(0);
  const setPendingElementPick = useSetAtom(pendingElementPickAtom);
  const previewHighlight = useAtomValue(previewHighlightAtom);
  renderedSlidesRef.current = renderedSlides;
  fallbackSlidesRef.current = slides;
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const padding = 32;
      const availW = width - padding;
      const availH = height - padding;
      if (availW <= 0 || availH <= 0) return;
      setFitScale(Math.min(availW / VIRTUAL_WIDTH, availH / VIRTUAL_HEIGHT, 2));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  reactExports.useEffect(() => {
    let mounted = true;
    let objectUrls = [];
    const controller = new AbortController();
    const load = async () => {
      const hasRenderedPreview = renderedSlidesRef.current.length > 0;
      const hasExistingPreview = hasRenderedPreview || fallbackSlidesRef.current.length > 0;
      const modelPromise = workspaceId ? workspaceApiClient.getPresentationModel({ workspaceId, filePath, isExternal, presentationId: progress?.presentationId }, controller.signal).catch((modelError) => {
        if (controller.signal.aborted) return null;
        console.warn("[PptxPreview] Structured presentation model unavailable", modelError);
        return null;
      }) : Promise.resolve(null);
      try {
        if (hasExistingPreview) setIsRefreshing(true);
        else setIsLoading(true);
        setError(null);
        try {
          const checkpointModel = hasRenderedPreview && progress?.slideId ? await modelPromise : null;
          const checkpointSlideIndex = checkpointModel?.slides.findIndex((item) => item.id === progress?.slideId) ?? -1;
          const targetedSlideIndex = checkpointSlideIndex >= 0 ? checkpointSlideIndex : void 0;
          const preview = await workspaceApiClient.getPresentationPreview(
            {
              workspaceId,
              filePath,
              isExternal,
              slideIndex: targetedSlideIndex,
              previewSessionId
            },
            controller.signal
          );
          if (mounted) {
            const model = checkpointModel ?? await modelPromise;
            setSlides([]);
            if (targetedSlideIndex !== void 0 && preview.slideUrls[0]) {
              setRenderedSlides(
                (previous) => Array.from(
                  { length: preview.slideCount },
                  (_, index) => index === targetedSlideIndex ? preview.slideUrls[0] : previous[index] ?? ""
                )
              );
            } else {
              setRenderedSlides(preview.slideUrls);
            }
            setPresentationModel(model);
            setCurrentSlide((previous) => {
              const changedIndex = targetedSlideIndex ?? (progress?.slideId ? model?.slides.findIndex((item) => item.id === progress.slideId) : -1);
              return changedIndex !== void 0 && changedIndex >= 0 ? changedIndex : Math.min(previous, preview.slideUrls.length - 1);
            });
            setIsLoading(false);
            setIsRefreshing(false);
          }
          return;
        } catch (previewError) {
          const status = previewError?.status;
          const canUseFallback = status === 422 || typeof window === "undefined" || !window.apiServer;
          if (!canUseFallback) throw previewError;
          console.warn("[PptxPreview] Authoritative preview unavailable; using bounded OOXML fallback", previewError);
        }
        const fetchTimer = setTimeout(() => controller.abort("Presentation download timed out"), PPTX_FALLBACK_FETCH_TIMEOUT_MS);
        let arrayBuffer;
        try {
          const response = await fetch(src, { signal: controller.signal });
          if (!response.ok) throw new Error("Failed to fetch presentation");
          arrayBuffer = await response.arrayBuffer();
        } finally {
          clearTimeout(fetchTimer);
        }
        assertSafePptxFallbackArchive(arrayBuffer.byteLength);
        const parsed = await parsePptx(arrayBuffer, () => !mounted || controller.signal.aborted);
        objectUrls = parsed.objectUrls;
        if (mounted) {
          const model = await modelPromise;
          setSlides(parsed.slides);
          setRenderedSlides([]);
          setPresentationModel(model);
          setCurrentSlide((previous) => {
            const changedIndex = progress?.slideId ? model?.slides.findIndex((item) => item.id === progress.slideId) : -1;
            return changedIndex !== void 0 && changedIndex >= 0 ? changedIndex : Math.min(previous, parsed.slides.length - 1);
          });
          setIsLoading(false);
          setIsRefreshing(false);
        }
      } catch (err) {
        if (mounted) {
          if (!hasExistingPreview) setError(err instanceof Error ? err.message : "Failed to load presentation");
          else console.warn("[PptxPreview] Keeping previous preview after refresh failure", err);
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
      controller.abort();
      for (const objectUrl of objectUrls) URL.revokeObjectURL(objectUrl);
    };
  }, [filePath, isExternal, previewSessionId, progress?.presentationId, progress?.slideId, revision, src, workspaceId]);
  const totalSlides = renderedSlides.length || slides.length;
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape" && isDesignMode) {
        setSelectedElement(null);
        setSelectedRegion(null);
        setEditRequest("");
        setIsDesignMode(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    },
    [isDesignMode, totalSlides]
  );
  reactExports.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  reactExports.useEffect(() => {
    setSelectedElement(null);
    setSelectedRegion(null);
    setEditRequest("");
    setShowLayers(false);
  }, [currentSlide]);
  reactExports.useEffect(() => {
    if (!previewHighlight || typeof previewHighlight !== "object" || !("presentation" in previewHighlight)) return;
    if (previewHighlight.presentation.presentationId !== presentationModel?.id) return;
    const slideIndex = presentationModel.slides.findIndex((item) => item.id === previewHighlight.presentation.slideId);
    if (slideIndex >= 0) setCurrentSlide(slideIndex);
  }, [presentationModel, previewHighlight]);
  const currentSlideModel = presentationModel?.slides[currentSlide];
  const slideWidthInches = presentationModel?.layout === "standard" ? 10 : 13.333;
  const slideHeightInches = 7.5;
  const highlightedElementId = previewHighlight && typeof previewHighlight === "object" && "presentation" in previewHighlight && previewHighlight.presentation.presentationId === presentationModel?.id && previewHighlight.presentation.slideId === currentSlideModel?.id ? previewHighlight.presentation.elementId : null;
  const highlightedRegion = previewHighlight && typeof previewHighlight === "object" && "presentation" in previewHighlight && previewHighlight.presentation.presentationId === presentationModel?.id && previewHighlight.presentation.slideId === currentSlideModel?.id ? previewHighlight.presentation.region ?? null : null;
  const submitDesignEdit = reactExports.useCallback(() => {
    const request = editRequest.trim();
    if (!request || !selectedElement && !selectedRegion || !presentationModel || !currentSlideModel) return;
    const item = selectedElement ? {
      message: request,
      element: {
        kind: "presentation",
        selector: `presentation://${presentationModel.id}/${currentSlideModel.id}/${selectedElement.id}`,
        tag: selectedElement.type,
        id: selectedElement.id,
        text: selectedElement.label,
        rect: { x: selectedElement.x, y: selectedElement.y, width: selectedElement.w, height: selectedElement.h },
        presentation: selectedElement.chartPoint ? {
          target: "chart-point",
          presentationId: presentationModel.id,
          statePath: presentationModel.statePath,
          revision: presentationModel.revision,
          slideId: currentSlideModel.id,
          slideNumber: currentSlide + 1,
          pointId: selectedElement.id,
          ...selectedElement.chartPoint
        } : {
          target: "element",
          presentationId: presentationModel.id,
          statePath: presentationModel.statePath,
          revision: presentationModel.revision,
          slideId: currentSlideModel.id,
          slideNumber: currentSlide + 1,
          elementId: selectedElement.id,
          elementType: selectedElement.type,
          label: selectedElement.label
        }
      }
    } : {
      message: request,
      element: {
        kind: "presentation-region",
        selector: `presentation://${presentationModel.id}/${currentSlideModel.id}/region`,
        tag: "region",
        rect: selectedRegion,
        presentation: {
          target: "region",
          presentationId: presentationModel.id,
          statePath: presentationModel.statePath,
          revision: presentationModel.revision,
          slideId: currentSlideModel.id,
          slideNumber: currentSlide + 1,
          region: selectedRegion,
          intersectingElements: currentSlideModel.elements.filter((element) => !element.chartPoint).filter(
            (element) => element.x < selectedRegion.x + selectedRegion.width && element.x + element.w > selectedRegion.x && element.y < selectedRegion.y + selectedRegion.height && element.y + element.h > selectedRegion.y
          ).map((element) => ({ id: element.id, type: element.type, label: element.label }))
        }
      }
    };
    setPendingElementPick(
      makePendingElementPick({
        workspaceId,
        title: presentationModel.title,
        items: [item]
      })
    );
    setSelectedElement(null);
    setSelectedRegion(null);
    setEditRequest("");
  }, [currentSlide, currentSlideModel, editRequest, presentationModel, selectedElement, selectedRegion, setPendingElementPick, workspaceId]);
  const hideMarquee = reactExports.useCallback(() => {
    if (marqueeRef.current) marqueeRef.current.style.opacity = "0";
  }, []);
  const handleRegionPointerDown = reactExports.useCallback((event) => {
    if (event.button !== 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerId = event.pointerId;
    regionDragRef.current = {
      pointerId,
      bounds: { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height },
      start: { x: event.clientX, y: event.clientY },
      didDrag: false,
      latestRegion: null
    };
  }, []);
  const handleRegionPointerMove = reactExports.useCallback(
    (event) => {
      const drag = regionDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (!drag.didDrag && Math.hypot(event.clientX - drag.start.x, event.clientY - drag.start.y) < REGION_DRAG_THRESHOLD_PX) return;
      if (!drag.didDrag) {
        drag.didDrag = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setSelectedElement(null);
        setSelectedRegion(null);
        setEditRequest("");
        setShowLayers(false);
      }
      const region = presentationRegionFromClientPoints(
        drag.bounds,
        drag.start,
        { x: event.clientX, y: event.clientY },
        slideWidthInches,
        slideHeightInches
      );
      drag.latestRegion = region;
      const marquee = marqueeRef.current;
      if (marquee) {
        marquee.style.left = `${region.x / slideWidthInches * 100}%`;
        marquee.style.top = `${region.y / slideHeightInches * 100}%`;
        marquee.style.width = `${region.width / slideWidthInches * 100}%`;
        marquee.style.height = `${region.height / slideHeightInches * 100}%`;
        marquee.style.opacity = "1";
      }
      event.preventDefault();
    },
    [slideHeightInches, slideWidthInches]
  );
  const finishRegionPointer = reactExports.useCallback(
    (event, cancelled = false) => {
      const drag = regionDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId);
      regionDragRef.current = null;
      hideMarquee();
      if (!cancelled && drag.didDrag && drag.latestRegion && drag.latestRegion.width > 0.02 && drag.latestRegion.height > 0.02) {
        suppressNextClickRef.current = true;
        window.setTimeout(() => {
          suppressNextClickRef.current = false;
        }, 0);
        setSelectedElement(null);
        setSelectedRegion(drag.latestRegion);
        setEditRequest("");
      }
    },
    [hideMarquee]
  );
  const isDark = effectiveTheme === "dark";
  const scale = Math.min(fitScale * zoomFactor, 2.5);
  const renderedSlide = renderedSlides[currentSlide];
  const slide = slides[currentSlide];
  const sortedShapes = [...slide?.shapes ?? []].sort((a, b) => {
    if (a.isTitle && !b.isTitle) return -1;
    if (!a.isTitle && b.isTitle) return 1;
    if (a.isSubtitle && !b.isSubtitle) return -1;
    if (!a.isSubtitle && b.isSubtitle) return 1;
    return 0;
  });
  const scaledW = VIRTUAL_WIDTH * scale;
  const scaledH = VIRTUAL_HEIGHT * scale;
  const presentationName = filePath.split(/[\\/]/).pop() || "Presentation.pptx";
  const zoomPercent = Math.max(1, Math.round(scale * 100));
  const changeZoom = (delta) => {
    setZoomFactor((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((value + delta).toFixed(2)))));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "@container/ppt-workbench relative flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-10 shrink-0 items-center gap-2 border-b border-border/70 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-orange-500/15 text-orange-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-xs font-semibold", title: presentationName, children: presentationName }),
      (isGenerating || isRefreshing) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-primary motion-safe:animate-pulse" }),
        isRefreshing ? `Updating page ${currentSlide + 1}` : `${progress?.slideCount ?? totalSlides} pages ready`
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex w-[104px] shrink-0 flex-col border-r border-border/70 bg-muted/10 @md/ppt-workbench:w-[136px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-10 shrink-0 items-center px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Slides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground", children: totalSlides })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto px-2 pb-2 [scrollbar-width:thin]", children: Array.from({ length: totalSlides }, (_, index) => {
          const thumbnail = renderedSlides[index];
          const fallback = slides[index];
          const fallbackLabel = fallback?.shapes.flatMap((shape) => shape.paragraphs).flatMap((paragraph) => paragraph.runs).map((run) => run.text).join(" ").trim();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCurrentSlide(index),
              "aria-label": `Open slide ${index + 1}`,
              "aria-current": currentSlide === index ? "page" : void 0,
              className: "group mb-2 flex w-full items-start gap-1.5 text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 shrink-0 pt-1 text-right font-mono text-[9px] text-muted-foreground", children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "relative block aspect-video min-w-0 flex-1 overflow-hidden rounded-[4px] border bg-white shadow-sm transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none",
                      currentSlide === index ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]" : "border-border/80 group-hover:border-primary/60 group-hover:shadow-md"
                    ),
                    children: [
                      thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail, alt: `Slide ${index + 1} thumbnail`, className: "size-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-full items-center justify-center overflow-hidden px-1 text-center text-[7px] leading-tight text-zinc-600", children: fallbackLabel || `Slide ${index + 1}` }),
                      isRefreshing && currentSlide === index && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full w-1/2 bg-primary motion-safe:animate-pulse" }) })
                    ]
                  }
                )
              ]
            },
            index
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex min-w-0 flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-10 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/50 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5 truncate text-[10px] text-muted-foreground", children: [
            isRefreshing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3 shrink-0 animate-spin motion-reduce:animate-none" }) : null,
            isGenerating ? `Generating · ${totalSlides} ${totalSlides === 1 ? "page" : "pages"} ready` : `${totalSlides} ${totalSlides === 1 ? "page" : "pages"}`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            currentSlideModel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowLayers((value) => !value),
                "aria-expanded": showLayers,
                title: "Choose any element, including layers hidden behind other elements",
                className: "flex h-7 items-center gap-1 rounded-md border border-border/70 bg-background px-2 text-[10px] text-muted-foreground transition-colors hover:text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-3" }),
                  currentSlideModel.elements.length
                ]
              }
            ) : null,
            presentationModel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setIsDesignMode((value) => !value);
                  setShowLayers(false);
                  setSelectedElement(null);
                  setSelectedRegion(null);
                  setEditRequest("");
                },
                "aria-pressed": isDesignMode,
                title: "Click an element or drag any area, then ask Alma to change it",
                className: cn(
                  "flex h-7 items-center gap-1 rounded-md border px-2 text-[10px] font-medium transition-[color,background-color,border-color] duration-150 motion-reduce:transition-none",
                  isDesignMode ? "border-primary/50 bg-primary text-primary-foreground shadow-sm" : "border-border/70 bg-background text-muted-foreground hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer2, { className: "size-3" }),
                  "Freeform select"
                ]
              }
            ) : null
          ] }),
          showLayers && currentSlideModel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-9 z-40 max-h-72 w-64 overflow-y-auto rounded-xl border border-border bg-background/95 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150 motion-reduce:animate-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: [
              "Slide ",
              currentSlide + 1,
              " layers"
            ] }),
            [...currentSlideModel.elements].sort((a, b) => b.zIndex - a.zIndex).map((element) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setIsDesignMode(true);
                  setSelectedElement(element);
                  setSelectedRegion(null);
                  setEditRequest("");
                  setShowLayers(false);
                },
                className: cn(
                  "flex w-full min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted",
                  selectedElement?.id === element.id && "bg-primary/10 text-primary"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]", children: element.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-xs", title: element.label, children: element.label || element.id })
                ]
              },
              element.id
            ))
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-muted/20", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin motion-reduce:animate-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: "Preparing presentation…" })
        ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-xs text-destructive", children: [
          "Failed to load presentation: ",
          error
        ] }) : renderedSlide || slide ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", style: { width: scaledW, height: scaledH }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "relative overflow-hidden rounded-lg border border-border/50 shadow-lg transition-opacity duration-200 motion-reduce:transition-none",
                isRefreshing && "opacity-90"
              ),
              style: {
                width: VIRTUAL_WIDTH,
                height: VIRTUAL_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                backgroundColor: isDark ? "#1e1e1e" : "#ffffff"
              },
              children: [
                renderedSlide ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: renderedSlide,
                    alt: `Slide ${currentSlide + 1}`,
                    className: "block size-full animate-in bg-white object-contain fade-in duration-200 motion-reduce:animate-none"
                  },
                  renderedSlide
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full p-10 flex flex-col overflow-hidden", children: [
                  sortedShapes.map((shape, si) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mb-3", shape.isTitle && "mb-5"), children: shape.paragraphs.map((para, pi) => {
                    const align = para.alignment === "ctr" ? "center" : para.alignment === "r" ? "right" : void 0;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: cn(
                          "leading-relaxed",
                          shape.isTitle && "text-3xl font-bold mb-1",
                          shape.isSubtitle && "text-xl text-muted-foreground"
                        ),
                        style: {
                          textAlign: align,
                          paddingLeft: (para.level || 0) * 24
                        },
                        children: [
                          para.isBullet && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-5 text-center mr-1", children: "•" }),
                          para.runs.map((run, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(run.bold && "font-bold", run.italic && "italic"),
                              style: {
                                fontSize: run.fontSize ? `${Math.min(run.fontSize, 48)}pt` : void 0
                              },
                              children: run.text
                            },
                            ri
                          ))
                        ]
                      },
                      pi
                    );
                  }) }, si)),
                  slide && slide.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center gap-4 min-h-0 mt-2", children: slide.images.map((dataUrl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: dataUrl, alt: "", className: "max-w-full max-h-full object-contain rounded" }, i)) })
                ] }),
                isDesignMode && currentSlideModel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute inset-0 z-10 touch-none select-none cursor-crosshair",
                    "aria-label": `Editable elements and regions on slide ${currentSlide + 1}`,
                    onPointerDownCapture: handleRegionPointerDown,
                    onPointerMove: handleRegionPointerMove,
                    onPointerUp: (event) => finishRegionPointer(event),
                    onPointerCancel: (event) => finishRegionPointer(event, true),
                    onClickCapture: (event) => {
                      if (!suppressNextClickRef.current) return;
                      suppressNextClickRef.current = false;
                      event.preventDefault();
                      event.stopPropagation();
                    },
                    children: [
                      [...currentSlideModel.elements].sort((a, b) => a.zIndex - b.zIndex).map((element) => {
                        const selected = selectedElement?.id === element.id;
                        const highlighted = highlightedElementId === element.id;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            title: `${element.type}: ${element.label}`,
                            "aria-label": `Select ${element.type} ${element.label}`,
                            onClick: (event) => {
                              event.stopPropagation();
                              setSelectedElement(element);
                              setSelectedRegion(null);
                              setEditRequest("");
                            },
                            className: cn(
                              "absolute border-2 bg-primary/0 transition-[border-color,background-color,box-shadow] duration-150 motion-reduce:transition-none",
                              "border-transparent hover:border-primary/70 hover:bg-primary/10",
                              element.chartPoint && "rounded-sm",
                              (selected || highlighted) && "border-primary bg-primary/10 shadow-[0_0_0_2px_hsl(var(--background)/0.8)]"
                            ),
                            style: {
                              left: `${element.x / slideWidthInches * 100}%`,
                              top: `${element.y / slideHeightInches * 100}%`,
                              width: `${element.w / slideWidthInches * 100}%`,
                              height: `${element.h / slideHeightInches * 100}%`,
                              zIndex: element.chartPoint ? 1e4 + Math.trunc(element.zIndex) : Math.trunc(element.zIndex) + 1
                            }
                          },
                          element.id
                        );
                      }),
                      (selectedRegion || highlightedRegion) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "aria-label": selectedRegion ? "Selected slide region" : "Highlighted slide region",
                          className: "pointer-events-none absolute border-2 border-primary bg-primary/15 shadow-[0_0_0_2px_hsl(var(--background)/0.8)] transition-[left,top,width,height] duration-150 motion-reduce:transition-none",
                          style: {
                            left: `${((selectedRegion || highlightedRegion).x / slideWidthInches * 100).toFixed(4)}%`,
                            top: `${((selectedRegion || highlightedRegion).y / slideHeightInches * 100).toFixed(4)}%`,
                            width: `${((selectedRegion || highlightedRegion).width / slideWidthInches * 100).toFixed(4)}%`,
                            height: `${((selectedRegion || highlightedRegion).height / slideHeightInches * 100).toFixed(4)}%`,
                            zIndex: 10002
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          ref: marqueeRef,
                          "aria-hidden": "true",
                          className: "pointer-events-none absolute border-2 border-primary bg-primary/15 opacity-0 shadow-[0_0_0_1px_hsl(var(--background)/0.65)]",
                          style: { zIndex: 10003 }
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) }),
          (selectedElement || selectedRegion) && currentSlideModel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: (event) => {
                event.preventDefault();
                submitDesignEdit();
              },
              className: "absolute bottom-3 left-1/2 z-30 w-[min(440px,calc(100%-24px))] -translate-x-1/2 rounded-xl border border-border bg-background/95 p-2.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 px-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-xs font-medium text-foreground", children: selectedElement ? selectedElement.chartPoint ? `Slide ${currentSlide + 1} · ${selectedElement.chartPoint.seriesName} · ${selectedElement.chartPoint.category}` : `Slide ${currentSlide + 1} · ${selectedElement.type}#${selectedElement.id}` : `Slide ${currentSlide + 1} · region ${selectedRegion.width.toFixed(1)}×${selectedRegion.height.toFixed(1)} in` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedElement(null);
                        setSelectedRegion(null);
                        setEditRequest("");
                      },
                      "aria-label": "Cancel presentation edit",
                      className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      autoFocus: true,
                      rows: 2,
                      value: editRequest,
                      onChange: (event) => setEditRequest(event.target.value),
                      onKeyDown: (event) => {
                        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                          event.preventDefault();
                          submitDesignEdit();
                        }
                      },
                      placeholder: selectedRegion ? "Describe what to change in this area…" : "Describe what to change…",
                      className: "min-h-16 flex-1 resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: !editRequest.trim(),
                      "aria-label": "Send presentation edit to Alma",
                      className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-35",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
                    }
                  )
                ] })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-7 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: "Waiting for the first page…" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-9 shrink-0 items-center border-t border-border/60 bg-background/60 px-3 text-[10px] text-muted-foreground @md/ppt-workbench:flex", children: "Click the canvas to select an element, or drag any area to ask Alma for a precise change." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-8 shrink-0 items-center border-t border-border/70 bg-background px-2 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-auto font-mono", children: [
        "Page ",
        Math.min(currentSlide + 1, Math.max(totalSlides, 1)),
        " / ",
        Math.max(totalSlides, 1)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setZoomFactor(1),
            title: "Fit slide to workspace",
            "aria-label": "Fit slide to workspace",
            className: "flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "size-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => changeZoom(-ZOOM_STEP),
            disabled: zoomFactor <= MIN_ZOOM,
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: "flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "size-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-9 text-center font-mono", children: [
          zoomPercent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => changeZoom(ZOOM_STEP),
            disabled: zoomFactor >= MAX_ZOOM,
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: "flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "size-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCurrentSlide((prev) => Math.max(0, prev - 1)),
            disabled: currentSlide === 0,
            title: "Previous slide",
            "aria-label": "Previous slide",
            className: "ml-1 flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1)),
            disabled: totalSlides <= 1 || currentSlide === totalSlides - 1,
            title: "Next slide",
            "aria-label": "Next slide",
            className: "flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3.5" })
          }
        )
      ] })
    ] })
  ] });
});
export {
  PptxPreview
};
