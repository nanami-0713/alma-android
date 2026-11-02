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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "cf3e6547-c019-4e6e-ab38-f95d236e4dfa", e._sentryDebugIdIdentifier = "sentry-dbid-cf3e6547-c019-4e6e-ab38-f95d236e4dfa");
    })();
  } catch (e) {
  }
}
;
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { a as useI18n, B as Button, c as cn } from "./ThemeContext-Ac9lDiNd.js";
import "./x-BzMxEGBY.js";
import "./createLucideIcon-sFEqYeet.js";
import "./preload-helper-D_8ag_Pp.js";
import { A as ArtifactWorkspaceContext } from "./artifactWorkspaceContextDef-Y91jRAgg.js";
import { Z as ZoomOut, b as ZoomIn } from "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import { R as RotateCcw } from "./label-CF1Fh03r.js";
import { W as WandSparkles } from "./wand-sparkles-D4aHx43i.js";
import { M as Move } from "./move-Dt7KieRI.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import "./index-CZUfqr00.js";
import "./overflow-container-CXkfjaRd.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
const ImagePreview = reactExports.memo(function ImagePreview2({ src, filePath }) {
  const [scale, setScale] = reactExports.useState(1);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const imageRef = reactExports.useRef(null);
  const dragStartRef = reactExports.useRef({ x: 0, y: 0 });
  const positionStartRef = reactExports.useRef({ x: 0, y: 0 });
  const { t } = useI18n();
  const workspaceCtx = reactExports.useContext(ArtifactWorkspaceContext);
  const canAnnotate = !!workspaceCtx?.threadId && typeof window !== "undefined" && !!window.lightboxWindow?.open;
  const openAnnotate = reactExports.useCallback(() => {
    const threadId = workspaceCtx?.threadId;
    if (!threadId || !window.lightboxWindow?.open) return;
    const filename = filePath.split(/[/\\]/).pop() || "image";
    const extMatch = filename.toLowerCase().match(/\.(png|jpe?g|gif|webp|bmp|svg)$/);
    const mediaType = extMatch ? `image/${extMatch[1] === "jpg" ? "jpeg" : extMatch[1]}` : "image/png";
    window.lightboxWindow.open({ images: [{ id: filePath, url: src, threadId, mediaType, filename }], currentIndex: 0, annotate: true }).catch(() => {
    });
  }, [workspaceCtx, src, filePath]);
  const calculateFitScale = reactExports.useCallback(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return 1;
    const containerRect = container.getBoundingClientRect();
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    if (imageWidth === 0 || imageHeight === 0) return 1;
    const availableWidth = containerRect.width - 20;
    const availableHeight = containerRect.height - 20;
    const scaleX = availableWidth / imageWidth;
    const scaleY = availableHeight / imageHeight;
    return Math.min(scaleX, scaleY, 1);
  }, []);
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 10));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.1));
  const handleReset = reactExports.useCallback(() => {
    setScale(calculateFitScale());
    setPosition({ x: 0, y: 0 });
  }, [calculateFitScale]);
  reactExports.useEffect(() => {
    setIsReady(false);
    setError(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);
  const handleWheel = reactExports.useCallback(
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const delta = -e.deltaY * 0.01;
        const newScale = Math.min(Math.max(scale + delta * scale, 0.1), 10);
        const scaleFactor = newScale / scale;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = mouseX - centerX - position.x;
        const offsetY = mouseY - centerY - position.y;
        const newX = position.x - offsetX * (scaleFactor - 1);
        const newY = position.y - offsetY * (scaleFactor - 1);
        setScale(newScale);
        setPosition({ x: newX, y: newY });
      }
    },
    [scale, position]
  );
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);
  const handleMouseDown = reactExports.useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      positionStartRef.current = { x: position.x, y: position.y };
    },
    [position]
  );
  const handleMouseMove = reactExports.useCallback(
    (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPosition({
        x: positionStartRef.current.x + dx,
        y: positionStartRef.current.y + dy
      });
    },
    [isDragging]
  );
  const handleMouseUp = reactExports.useCallback(() => {
    setIsDragging(false);
  }, []);
  reactExports.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  const touchesRef = reactExports.useRef(null);
  const getTouchDistance = (touches) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const getTouchCenter = (touches) => {
    if (touches.length < 2)
      return {
        x: touches[0]?.clientX || 0,
        y: touches[0]?.clientY || 0
      };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    };
  };
  const handleTouchStart = reactExports.useCallback(
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        touchesRef.current = {
          distance: getTouchDistance(e.touches),
          scale,
          center: getTouchCenter(e.touches)
        };
      } else if (e.touches.length === 1) {
        dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        positionStartRef.current = { x: position.x, y: position.y };
        setIsDragging(true);
      }
    },
    [scale, position]
  );
  const handleTouchMove = reactExports.useCallback(
    (e) => {
      if (e.touches.length === 2 && touchesRef.current) {
        e.preventDefault();
        const newDistance = getTouchDistance(e.touches);
        const scaleFactor = newDistance / touchesRef.current.distance;
        const newScale = Math.min(Math.max(touchesRef.current.scale * scaleFactor, 0.1), 10);
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const newCenter = getTouchCenter(e.touches);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const oldCenter = touchesRef.current.center;
        const panX = newCenter.x - oldCenter.x;
        const panY = newCenter.y - oldCenter.y;
        const offsetX = oldCenter.x - rect.left - centerX - position.x;
        const offsetY = oldCenter.y - rect.top - centerY - position.y;
        const actualScaleFactor = newScale / scale;
        setScale(newScale);
        setPosition({
          x: position.x - offsetX * (actualScaleFactor - 1) + panX,
          y: position.y - offsetY * (actualScaleFactor - 1) + panY
        });
      } else if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStartRef.current.x;
        const dy = e.touches[0].clientY - dragStartRef.current.y;
        setPosition({
          x: positionStartRef.current.x + dx,
          y: positionStartRef.current.y + dy
        });
      }
    },
    [isDragging, position, scale]
  );
  const handleTouchEnd = reactExports.useCallback(() => {
    touchesRef.current = null;
    setIsDragging(false);
  }, []);
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Failed to load image: ",
      error
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 p-2 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: handleZoomOut, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "size-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-12 text-center", children: [
        Math.round(scale * 100),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: handleZoomIn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "size-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: handleReset, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3.5" }) }),
      canAnnotate && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 h-4 w-px bg-border/50", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-7 gap-1.5 px-2", onClick: openAnnotate, title: t("chat.imageAnnotate.buttonTitle"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "size-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: t("chat.imageAnnotate.button") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/50 ml-2 hidden sm:flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Move, { className: "size-3" }),
        "Drag to pan"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: containerRef,
        className: cn("flex-1 overflow-hidden relative", isDragging ? "cursor-grabbing" : "cursor-grab"),
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center", children: [
          !isReady && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              ref: imageRef,
              src,
              alt: filePath,
              draggable: false,
              style: {
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                opacity: isReady ? 1 : 0,
                transition: isDragging ? "none" : "opacity 0.2s",
                userSelect: "none"
              },
              className: "max-w-none",
              onLoad: () => {
                requestAnimationFrame(() => {
                  setScale(calculateFitScale());
                  requestAnimationFrame(() => {
                    setIsReady(true);
                  });
                });
              },
              onError: () => {
                setError("Could not load image");
              }
            }
          )
        ] })
      }
    )
  ] });
});
export {
  ImagePreview
};
