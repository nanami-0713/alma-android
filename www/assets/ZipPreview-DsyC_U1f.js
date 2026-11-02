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
      n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "a3aaf292-3869-49af-a6b6-45b1847f2280", e._sentryDebugIdIdentifier = "sentry-dbid-a3aaf292-3869-49af-a6b6-45b1847f2280");
    })();
  } catch (e) {
  }
}
;
import { _ as __vitePreload } from "./preload-helper-D_8ag_Pp.js";
import { r as reactExports, j as jsxRuntimeExports } from "./index-B0zE39VE.js";
import { i as instance } from "./createLucideIcon-sFEqYeet.js";
import { O as OverflowContainer, u as useTheme } from "./overflow-container-CXkfjaRd.js";
import { c as cn, h as highlightCode } from "./ThemeContext-Ac9lDiNd.js";
import { F as FileArchive, g as getFileTypeInfo } from "./App-CJD1Pyfa.js";
import "./x-BzMxEGBY.js";
import { L as LoaderCircle } from "./loader-circle-BsCo_wlW.js";
import { A as ArrowLeft, F as Folder } from "./PluginNotificationListener-DQz_TGb2.js";
import { F as FileQuestionMark } from "./file-question-mark-fwidY3ON.js";
import { F as File } from "./label-CF1Fh03r.js";
import { C as ChevronDown } from "./TwemojiIcon-qeDCXH7q.js";
import { C as ChevronRight } from "./pencil-BtEsZPL8.js";
import "./index-CZUfqr00.js";
import "./mermaid-NA5CF7SZ-Cgt6mXZw.js";
import "./wand-sparkles-D4aHx43i.js";
import "./image-C_h5oH_f.js";
import "./useLiveCoding-DqcVzuV6.js";
import "./artifactWorkspaceContextDef-Y91jRAgg.js";
import "./trash-2-DTP27QMN.js";
import "./slider-CpZgBHCs.js";
import "./index-pfi9S7gc.js";
import "./ExecutionHistory-CJxOXAbK.js";
import "./alma-icon-BzHspoaH.js";
import "./apiClient-DmP45vUN.js";
import "./generative-ui-block-1Rj38gNW.js";
import "./en-US-CZvvliM3.js";
import "./addLeadingZeros-DCGuLiwe.js";
import "./PlatformContext-BWz3dz-T.js";
/* empty css                   */
import "./ImageAnnotator-CcNrU1f9.js";
import "./v4-D_ZMSocT.js";
import "./ConditionalPostHogProvider-Cgb2BAQg.js";
const MAX_PREVIEW_SIZE = 5 * 1024 * 1024;
function buildTree(entries) {
  const root = {
    name: "",
    fullPath: "",
    isDir: true,
    size: 0,
    compressedSize: 0,
    date: /* @__PURE__ */ new Date(),
    children: /* @__PURE__ */ new Map()
  };
  for (const entry of entries) {
    const parts = entry.name.split("/").filter(Boolean);
    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      if (!current.children.has(part)) {
        current.children.set(part, {
          name: part,
          fullPath: parts.slice(0, i + 1).join("/"),
          isDir: isLast ? entry.dir : true,
          size: isLast ? entry.size : 0,
          compressedSize: isLast ? entry.compressedSize : 0,
          date: isLast ? entry.date : /* @__PURE__ */ new Date(),
          children: /* @__PURE__ */ new Map()
        });
      }
      current = current.children.get(part);
    }
  }
  return root;
}
function formatSize(bytes) {
  if (bytes === 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
function getLanguageFromPath(filePath) {
  const ext = filePath.split(".").pop()?.toLowerCase() || "";
  const langMap = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    py: "python",
    rb: "ruby",
    go: "go",
    rs: "rust",
    java: "java",
    kt: "kotlin",
    swift: "swift",
    c: "c",
    cpp: "cpp",
    h: "c",
    hpp: "cpp",
    cs: "csharp",
    php: "php",
    html: "html",
    css: "css",
    scss: "scss",
    less: "less",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    sql: "sql",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
    xml: "xml",
    toml: "toml",
    ini: "ini",
    vue: "vue",
    svelte: "svelte"
  };
  return langMap[ext] || "plaintext";
}
const IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "bmp", "avif"]);
function isImageFile(name) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return IMAGE_EXTENSIONS.has(ext);
}
function getImageMimeType(name) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const mimeMap = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    bmp: "image/bmp",
    avif: "image/avif"
  };
  return mimeMap[ext] || "application/octet-stream";
}
function TreeItem({ node, depth, selectedPath, onFileClick }) {
  const [expanded, setExpanded] = reactExports.useState(depth < 1);
  const sortedChildren = reactExports.useMemo(() => {
    const children = Array.from(node.children.values());
    return children.sort((a, b) => {
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [node.children]);
  if (!node.isDir) {
    const isSelected = selectedPath === node.fullPath;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onFileClick(node.fullPath),
        className: cn(
          "flex items-center gap-1.5 py-0.5 px-2 rounded text-sm font-mono w-full text-left",
          isSelected ? "bg-primary/15 text-primary" : "hover:bg-muted/50"
        ),
        style: { paddingLeft: `${depth * 20 + 8}px` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: node.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatSize(node.size) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded(!expanded),
        className: "flex items-center gap-1.5 py-0.5 px-2 hover:bg-muted/50 rounded text-sm font-mono w-full text-left",
        style: { paddingLeft: `${depth * 20 + 8}px` },
        children: [
          expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "size-3.5 shrink-0 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: node.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: instance.t("artifactsUi.itemsCount", { n: node.children.size }) })
        ]
      }
    ),
    expanded && sortedChildren.map((child) => /* @__PURE__ */ jsxRuntimeExports.jsx(TreeItem, { node: child, depth: depth + 1, selectedPath, onFileClick }, child.fullPath))
  ] });
}
function FileContentPreview({ filePath, zip }) {
  const [content, setContent] = reactExports.useState(null);
  const [imageUrl, setImageUrl] = reactExports.useState(null);
  const [highlightedHtml, setHighlightedHtml] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const objectUrlRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let mounted = true;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setContent(null);
        setImageUrl(null);
        setHighlightedHtml(null);
        const file = zip.file(filePath);
        if (!file) {
          throw new Error("File not found in archive");
        }
        const fileInfo = getFileTypeInfo(filePath);
        if (isImageFile(filePath)) {
          const blob = await file.async("blob");
          const mimeType = getImageMimeType(filePath);
          const typedBlob = new Blob([blob], { type: mimeType });
          const url = URL.createObjectURL(typedBlob);
          objectUrlRef.current = url;
          if (mounted) {
            setImageUrl(url);
            setIsLoading(false);
          }
          return;
        }
        if (fileInfo.type === "text") {
          const internal = file;
          const size = internal._data?.uncompressedSize ?? 0;
          if (size > MAX_PREVIEW_SIZE) {
            if (mounted) {
              setError(instance.t("artifactsUi.fileTooLargePreview", { size: formatSize(size) }));
              setIsLoading(false);
            }
            return;
          }
          const text = await file.async("string");
          if (mounted) {
            setContent(text);
            const lang = getLanguageFromPath(filePath);
            try {
              const html = await highlightCode(text, lang, isDark);
              if (mounted) {
                setHighlightedHtml(html);
              }
            } catch {
            }
            setIsLoading(false);
          }
        } else {
          if (mounted) {
            setError(instance.t("artifactsUi.binaryFileInArchive", { type: fileInfo.extension.toUpperCase() }));
            setIsLoading(false);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to extract file");
          setIsLoading(false);
        }
      }
    };
    loadContent();
    return () => {
      mounted = false;
    };
  }, [filePath, zip, isDark]);
  reactExports.useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestionMark, { className: "size-10 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })
    ] });
  }
  if (imageUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, alt: filePath, className: "max-w-full max-h-full object-contain" }) });
  }
  if (content !== null) {
    const bgColor = isDark ? "color-mix(in srgb, var(--muted) 30%, var(--background))" : "color-mix(in srgb, var(--muted) 80%, var(--background))";
    const lines = content.split("\n");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[0.8125rem] leading-[1.5] whitespace-pre", style: { backgroundColor: bgColor }, children: highlightedHtml ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", dangerouslySetInnerHTML: { __html: highlightedHtml } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sticky left-0 z-10 shrink-0 min-w-[3rem] pr-4 pl-2 text-right text-muted-foreground/40 select-none", children: i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 pl-2 pr-4", children: line })
    ] }, i)) }) }) });
  }
  return null;
}
const ZipPreview = reactExports.memo(function ZipPreview2({ src }) {
  const [entries, setEntries] = reactExports.useState([]);
  const [zip, setZip] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let mounted = true;
    const loadZip = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to fetch archive");
        const arrayBuffer = await response.arrayBuffer();
        const JSZip = (await __vitePreload(async () => {
          const { default: __vite_default__ } = await import("./PluginNotificationListener-DQz_TGb2.js").then((n) => n.j);
          return { default: __vite_default__ };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]) : void 0, import.meta.url)).default;
        const zipInstance = await JSZip.loadAsync(arrayBuffer);
        const zipEntries = [];
        zipInstance.forEach((relativePath, file) => {
          const internal = file;
          zipEntries.push({
            name: relativePath,
            dir: file.dir,
            size: internal._data?.uncompressedSize ?? 0,
            compressedSize: internal._data?.compressedSize ?? 0,
            date: file.date
          });
        });
        if (mounted) {
          setZip(zipInstance);
          setEntries(zipEntries);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load archive");
          setIsLoading(false);
        }
      }
    };
    loadZip();
    return () => {
      mounted = false;
    };
  }, [src]);
  const tree = reactExports.useMemo(() => buildTree(entries), [entries]);
  const totalSize = reactExports.useMemo(() => entries.reduce((sum, e) => sum + e.size, 0), [entries]);
  const fileCount = reactExports.useMemo(() => entries.filter((e) => !e.dir).length, [entries]);
  const dirCount = reactExports.useMemo(() => entries.filter((e) => e.dir).length, [entries]);
  const sortedDisplayChildren = reactExports.useMemo(() => {
    const children = Array.from(tree.children.values());
    return children.sort((a, b) => {
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [tree]);
  const handleFileClick = reactExports.useCallback((path) => {
    setSelectedFile(path);
  }, []);
  const handleBack = reactExports.useCallback(() => {
    setSelectedFile(null);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-muted-foreground" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      instance.t("artifactsUi.failedLoadArchive"),
      ": ",
      error
    ] }) });
  }
  if (selectedFile && zip) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 border-b border-border/50 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleBack,
            className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: instance.t("common.back") })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground truncate", children: selectedFile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileContentPreview, { filePath: selectedFile, zip }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2 border-b border-border/50 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileArchive, { className: "size-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: instance.t("artifactsUi.filesCount", { n: fileCount }) })
      ] }),
      dirCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "size-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: instance.t("artifactsUi.foldersCount", { n: dirCount }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: instance.t("artifactsUi.totalSize", { size: formatSize(totalSize) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowContainer, { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("py-2"), children: sortedDisplayChildren.map((child) => /* @__PURE__ */ jsxRuntimeExports.jsx(TreeItem, { node: child, depth: 0, selectedPath: selectedFile, onFileClick: handleFileClick }, child.fullPath)) }) })
  ] });
});
export {
  ZipPreview
};
