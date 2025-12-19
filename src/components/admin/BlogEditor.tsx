"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Link2Off,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings,
  X,
  Save,
  Globe,
  Layout,
  Maximize,
  Minimize,
  ChevronDown,
  Palette,
  Scaling,
  ChevronUp,
  Link2,
  Minus,
  Plus,
  Type,
  Text,
  MessageSquare,
  CaseSensitive,
  ArrowUpDown,
  Check,
} from "lucide-react";

// --- Constants ---
const BRAND_COLOR = "#3B9ACB";

const FONT_FAMILIES = [
  { name: "Arial (Sans)", value: "Arial" },
  { name: "Georgia (Serif)", value: "Georgia" },
  { name: "Verdana", value: "Verdana" },
  { name: "Tahoma", value: "Tahoma" },
  { name: "Trebuchet MS", value: "'Trebuchet MS'" },
  { name: "Times New Roman", value: "'Times New Roman'" },
  { name: "Courier New", value: "'Courier New'" },
  { name: "Garamond", value: "Garamond" },
  { name: "Brush Script", value: "'Brush Script MT'" },
  { name: "Arial Black", value: "'Arial Black'" },
  { name: "Impact", value: "Impact" },
  { name: "Comic Sans", value: "'Comic Sans MS'" },
];

// --- Types ---

type Mode = "create" | "edit";

interface InitialPost {
  _id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  coverImageAlt?: string;
  published?: boolean;
  publishedAt?: string | Date | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonical?: string;
  author?: string;
  h1?: string;
}

interface Props {
  mode?: Mode;
  initial?: InitialPost;
  postId?: string;
  onSaved?: (post: any) => void;
  className?: string;
}

// --- Utility Functions ---

function generateSlugFromTitle(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLocalISOString(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}

// Extract the first H1 text from HTML content (if any)
function getContentH1(html: string) {
  try {
    const m = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (m && m[1]) {
      return m[1].replace(/<[^>]*>/g, "").trim();
    }
  } catch (e) {}
  return undefined;
}

// --- Components ---

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  icon: Icon,
  tooltip,
  className = "",
}: {
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ElementType;
  tooltip: string;
  className?: string;
}) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    disabled={disabled}
    title={tooltip}
    style={{
      color: isActive ? BRAND_COLOR : undefined,
      backgroundColor: isActive ? "#f0f9ff" : undefined,
    }}
    className={`
      p-1.5 rounded-md transition-all duration-200 flex items-center justify-center
      ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-slate-100 cursor-pointer"
      }
      ${!isActive ? "text-slate-600" : ""}
      ${className}
    `}
  >
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
  </button>
);

/**
 * The Main Toolbar
 */
const EditorToolbar = ({
  execCommand,
  queryCommandState,
  queryCommandValue,
  saveSelection,
  restoreSelection,
  selectedImage,
  activeImage,
  isImageHover = false,
  isResizing = false,
  isAltModalOpen = false,
  updateImageWidth,
  openLinkModal,
  openAltModal,
  changeFontSizeBy,
  getFontSizePx,
  applyFontSize,
  toggleCase,
  cycleLineHeight,
  editorRef,
  fontInput,
  setFontInput,
  applyAndSyncFontSize,
}: {
  execCommand: (command: string, value?: string) => void;
  queryCommandState: (command: string) => boolean;
  queryCommandValue: (command: string) => string;
  saveSelection: () => void;
  restoreSelection: () => void;
  selectedImage: HTMLImageElement | null;
  activeImage: HTMLImageElement | null;
  isImageHover: boolean;
  isResizing: boolean;
  isAltModalOpen: boolean;
  updateImageWidth: (width: string) => void;
  openLinkModal: () => void;
  openAltModal: () => void;
  changeFontSizeBy: (delta: number) => void;
  getFontSizePx: () => number;
  applyFontSize: (size: number) => void;
  toggleCase: () => void;
  cycleLineHeight: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
  fontInput: string;
  setFontInput: (value: string) => void;
  applyAndSyncFontSize: (size: number) => void;
}) => {
  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    restoreSelection();
    execCommand("formatBlock", val);

    // Remove any inline font-size on the resulting block (prevents previous font-size from overriding heading styles)
    setTimeout(() => {
      try {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const node = sel.anchorNode as Node;
          const block =
            node && (node as HTMLElement).parentElement
              ? (node as HTMLElement).parentElement?.closest(
                  "p, h1, h2, h3, h4, h5, h6, div, li"
                )
              : null;
          if (block && editorRef.current?.contains(block)) {
            (block as HTMLElement).style.removeProperty("font-size");
            // Also remove font-size inline styles from direct children spans
            const spans = block.querySelectorAll("[style]");
            spans.forEach((el) => {
              (el as HTMLElement).style.removeProperty("font-size");
            });
          }
        }
      } catch (err) {}

      // Force focus back to editor to ensure user can keep typing
      editorRef.current?.focus();
    }, 10);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    restoreSelection();
    execCommand("fontName", e.target.value);
  };

  const toggleBlockquote = (e: React.MouseEvent) => {
    const currentFormat = document.queryCommandValue("formatBlock");
    if (currentFormat && currentFormat.toLowerCase() === "blockquote") {
      execCommand("formatBlock", "p");
    } else {
      execCommand("formatBlock", "blockquote");
    }
  };

  const getCurrentBlock = () => {
    const val = queryCommandValue("formatBlock");
    if (!val) return "p";
    return val.toLowerCase();
  };

  const currentBlock = getCurrentBlock();

  const handleManualFontSize = () => {
    const val = parseInt(fontInput, 10);

    if (!isNaN(val) && val > 0) {
      // If no selection, expand to current word so manual set applies immediately
      try {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && sel.isCollapsed) {
          try {
            if (sel.modify) {
              sel.modify("move", "backward", "word");
              sel.modify("extend", "forward", "word");
            }
          } catch (e) {}
        }
      } catch (e) {}

      applyAndSyncFontSize(val);
      editorRef.current?.focus();
    } else {
      setFontInput(String(getFontSizePx()));
    }
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-[#edf2fa] border-b border-slate-300 px-4 py-2 flex items-center gap-1 flex-wrap shadow-sm">
      {/* History */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-300 mr-2">
        <ToolbarButton
          onClick={() => execCommand("undo")}
          icon={Undo}
          tooltip="Undo"
        />
        <ToolbarButton
          onClick={() => execCommand("redo")}
          icon={Redo}
          tooltip="Redo"
        />
      </div>

      {/* Font & Headings */}
      <div className="flex items-center gap-2 pr-2 border-r border-slate-300 mr-2">
        <div className="relative group">
          <select
            onChange={handleHeadingChange}
            value={currentBlock}
            // MouseDown prevents focus loss issues in some browsers
            onMouseDown={(e) => {
              e.stopPropagation();
              saveSelection();
            }}
            className="appearance-none bg-transparent hover:bg-slate-200 text-slate-700 font-medium py-1.5 pl-2 pr-6 rounded-md cursor-pointer focus:outline-none text-sm border-none ring-0 w-32"
            title="Heading Format"
          >
            <option value="p">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>

        <div className="relative group">
          <select
            onChange={handleFontChange}
            onMouseDown={(e) => {
              e.stopPropagation();
              saveSelection();
            }}
            className="appearance-none bg-transparent hover:bg-slate-200 text-slate-700 font-medium py-1.5 pl-2 pr-6 rounded-md cursor-pointer focus:outline-none text-sm border-none ring-0 w-32"
            defaultValue="Arial"
            title="Font Family"
          >
            {FONT_FAMILIES.map((font) => (
              <option
                key={font.name}
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>

        {/* Font Size Controls */}
        <div className="flex items-center bg-white border border-slate-300 rounded-md shadow-sm h-8">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
            onClick={() => changeFontSizeBy(-1)}
            className="w-8 h-full hover:bg-slate-100 rounded-l-md text-slate-600 flex items-center justify-center border-r border-slate-200 active:bg-slate-200"
          >
            <Minus size={12} />
          </button>

          <div className="relative w-12 h-full">
            <input
              type="text"
              value={fontInput}
              onChange={(e) => setFontInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleManualFontSize();
              }}
              onBlur={handleManualFontSize}
              className="w-full h-full text-center bg-transparent outline-none text-xs font-bold font-mono focus:bg-blue-50"
            />
          </div>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
            onClick={() => changeFontSizeBy(1)}
            className="w-8 h-full hover:bg-slate-100 rounded-r-md text-slate-600 flex items-center justify-center border-l border-slate-200 active:bg-slate-200"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Text Style */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-300 mr-2">
        <ToolbarButton
          onClick={() => execCommand("bold")}
          isActive={queryCommandState("bold")}
          icon={Bold}
          tooltip="Bold"
        />
        <ToolbarButton
          onClick={() => execCommand("italic")}
          isActive={queryCommandState("italic")}
          icon={Italic}
          tooltip="Italic"
        />
        <ToolbarButton
          onClick={() => execCommand("underline")}
          isActive={queryCommandState("underline")}
          icon={UnderlineIcon}
          tooltip="Underline"
        />

        <div
          className="relative flex items-center justify-center w-8 h-8 hover:bg-slate-200 rounded-md ml-1"
          title="Text Color"
        >
          <label
            htmlFor="colorPicker"
            className="cursor-pointer flex items-center justify-center w-full h-full"
          >
            <Palette size={18} className="text-slate-600" />
            <div
              className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white"
              style={{
                backgroundColor: queryCommandValue("foreColor") || "#000",
              }}
            />
          </label>
          <input
            id="colorPicker"
            type="color"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => execCommand("foreColor", e.target.value)}
          />
        </div>
      </div>

      {/* Lists, Alignment & Spacing */}
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-300 mr-2">
        <ToolbarButton
          onClick={() => execCommand("insertUnorderedList")}
          isActive={queryCommandState("insertUnorderedList")}
          icon={List}
          tooltip="Bullet List"
        />
        <ToolbarButton
          onClick={() => execCommand("insertOrderedList")}
          isActive={queryCommandState("insertOrderedList")}
          icon={ListOrdered}
          tooltip="Numbered List"
        />

        <ToolbarButton
          onClick={() => execCommand("justifyLeft")}
          isActive={queryCommandState("justifyLeft")}
          icon={AlignLeft}
          tooltip="Left Align"
        />
        <ToolbarButton
          onClick={() => execCommand("justifyCenter")}
          isActive={queryCommandState("justifyCenter")}
          icon={AlignCenter}
          tooltip="Center Align"
        />
        <ToolbarButton
          onClick={() => execCommand("justifyRight")}
          isActive={queryCommandState("justifyRight")}
          icon={AlignRight}
          tooltip="Right Align"
        />

        {/* Toggle Case & Line Height */}
        <ToolbarButton
          onClick={toggleCase}
          icon={CaseSensitive}
          tooltip="Toggle Case (Upper/Lower)"
        />
        <ToolbarButton
          onClick={cycleLineHeight}
          icon={ArrowUpDown}
          tooltip="Cycle Line Spacing (1.0 - 1.5 - 2.0)"
        />
      </div>

      {/* Inserts & Image Controls */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={toggleBlockquote}
          isActive={false}
          icon={Quote}
          tooltip="Quote (Toggle)"
        />

        <div className="flex items-center gap-0.5 bg-slate-100 rounded-md p-0.5 mx-1">
          <ToolbarButton
            onClick={openLinkModal}
            isActive={false}
            icon={LinkIcon}
            tooltip="Insert Link"
          />
          <ToolbarButton
            onClick={() => execCommand("unlink")}
            isActive={false}
            icon={Link2Off}
            tooltip="Remove Link"
          />
        </div>

        <label
          className="cursor-pointer p-1.5 rounded-md hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
          title="Upload Image"
          onMouseDown={() => saveSelection()}
        >
          <ImageIcon size={18} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                restoreSelection();
                execCommand("insertImage", url);
              }
              e.target.value = "";
            }}
          />
        </label>
      </div>

      {/* Floating Image Toolbar (visible while image is selected, resizing, hovered, or ALT modal open) */}
      {(() => {
        const img = activeImage || selectedImage;
        if (!img) return null;
        return (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 pl-2 pr-1 py-1.5 bg-white border border-slate-200 shadow-xl rounded-full animate-in fade-in slide-in-from-bottom-4">
            <Scaling size={16} style={{ color: BRAND_COLOR }} className="ml-2" />
            <span className="text-xs font-bold text-slate-500 w-20 text-center border-r border-slate-200 pr-2">
              {parseInt(img.style.width || "0") || img.width}
              px
            </span>

            <div className="flex items-center gap-1 px-2 border-r border-slate-200">
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  const current =
                    parseInt(img.style.width || `${img.width}`) || img.width;
                  const next = Math.max(50, current - 20);
                  updateImageWidth(`${next}px`);
                }}
                className="p-1 hover:bg-slate-100 rounded text-slate-600"
                title="Decrease Width"
              >
              <Minus size={14} />
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                const current =
                  parseInt(img.style.width || `${img.width}`) || img.width;
                const next = Math.min(2000, current + 20);
                updateImageWidth(`${next}px`);
              }}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Increase Width"
            >
              <Plus size={14} />
            </button>

            <button
              onClick={() => execCommand("justifyLeft")}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              onClick={() => execCommand("justifyCenter")}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              onClick={() => execCommand("justifyRight")}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
          </div>

          <button
            onMouseDown={(e) => {
              e.preventDefault();
              openAltModal();
            }}
            className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors ml-1"
            title="Edit Alt Text"
          >
            <MessageSquare size={12} /> ALT TEXT
          </button>
        </div>
      );
      })()}
    </div>
  );
};

// --- Main Editor Component ---

export default function BlogEditor({
  mode = "create",
  initial,
  postId,
  onSaved,
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );
  // Incremented to force re-render when DOM-only image changes (width/alt) are applied
  const [selectedImageVersion, setSelectedImageVersion] = useState(0);

  // Image helpers moved above JSX so they are available when rendering the image toolbar
  function updateImageWidth(width: string) {
    const img = getActiveImage();
    if (img) {
      console.debug("updateImageWidth ->", { width, src: img.src });
      // Allow growing beyond responsive max-width by clearing it when user explicitly resizes
      try {
        img.style.maxWidth = "none";
        img.style.display = "block";
        img.style.width = width;
        img.style.height = "auto";
      } catch (e) {}

      // Also try to find the corresponding <img> inside editor and update it
      try {
        const imgs = Array.from(
          editorRef.current?.querySelectorAll("img") || []
        ) as HTMLImageElement[];
        imgs.forEach((other) => {
          if (other === img || (img.src && other.getAttribute("src") === img.src)) {
            other.style.maxWidth = "none";
            other.style.display = "block";
            other.style.width = width;
            other.style.height = "auto";
          }
        });
      } catch (e) {}

      updateCounts();
      // Force React to re-render UI that depends on selectedImage and allow ResizeObserver to update the overlay
      setSelectedImageVersion((v) => v + 1);
    } else {
      console.debug("updateImageWidth called but no active image", { width });
    }
  }

  function changeImageWidthBy(delta: number) {
    if (!selectedImage) return;
    // Use the rendered layout width (in pixels) instead of parsing style strings like "100%"
    const rect = selectedImage.getBoundingClientRect();
    const current = Math.round(rect.width) || selectedImage.width || 100;
    const next = Math.max(30, Math.min(4000, current + delta));
    updateImageWidth(`${next}px`);
  }

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const [isAltModalOpen, setIsAltModalOpen] = useState(false);
  const [altText, setAltText] = useState("");

  const [isMetaOpen, setIsMetaOpen] = useState(true);

  const [publishedAtState, setPublishedAtState] = useState<string | null>(
    () => {
      if (initial?.publishedAt) {
        return toLocalISOString(new Date(initial.publishedAt));
      }
      return null;
    }
  );

  const [isSiteSettingsOpen, setIsSiteSettingsOpen] = useState(false);
  const [siteAnalyticsId, setSiteAnalyticsId] = useState("");
  const [siteRobots, setSiteRobots] = useState("");
  // Analytics input is locked by default in the editor; enable editing explicitly
  const [analyticsEditable, setAnalyticsEditable] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});
  // Track the last image the user explicitly clicked — used as a robust fallback when selection is lost
  const lastClickedImageRef = useRef<HTMLImageElement | null>(null);

  // Helper: resolve the most likely active image for ALT/resize operations
  const getActiveImage = () => {
    if (lastClickedImageRef.current) return lastClickedImageRef.current;
    if (selectedImage) return selectedImage;
    try {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return null;
      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer as HTMLElement | null;
      if (container) {
        const imgInRange = container.querySelector && (container.querySelector('img') as HTMLImageElement | null);
        if (imgInRange) return imgInRange;
      }
    } catch (e) {}
    return null;
  };

  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    startX: number;
    startY?: number;
    startWidth: number;
    startHeight?: number;
    freeAspect?: boolean;
  } | null>(null);
  const [currentFontSize, setCurrentFontSize] = React.useState<number>(16);
  const [fontInput, setFontInput] = React.useState<string>("16");

  const [isImageHover, setIsImageHover] = useState(false); // track hover state for selected image
  const imageHoverCleanupRef = useRef<() => void | null>(null); // cleanup listeners when image changes

  const paperRef = useRef<HTMLDivElement>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const updateOverlay = () => {
      if (selectedImage && paperRef.current) {
        const imageRect = selectedImage.getBoundingClientRect();
        const paperRect = paperRef.current.getBoundingClientRect();

        setOverlayStyle({
          position: "absolute",
          top: imageRect.top - paperRect.top,
          left: imageRect.left - paperRect.left,
          width: imageRect.width,
          height: imageRect.height,
        });
      }
    };

    if (selectedImage) {
      if (!selectedImage.complete) {
        selectedImage.onload = updateOverlay;
      } else {
        updateOverlay();
      }

      const scrollContainer = containerRef.current;
      window.addEventListener("resize", updateOverlay);
      if (scrollContainer)
        scrollContainer.addEventListener("scroll", updateOverlay);

      const resizeObserver = new ResizeObserver(updateOverlay);
      resizeObserver.observe(selectedImage);
      if (selectedImage.parentElement)
        resizeObserver.observe(selectedImage.parentElement);

      // Attach hover listeners to control overlay visibility
      const onEnter = () => setIsImageHover(true);
      const onLeave = () => setIsImageHover(false);
      selectedImage.addEventListener("mouseenter", onEnter);
      selectedImage.addEventListener("mouseleave", onLeave);

      // Store cleanup so we can remove when selection changes
      imageHoverCleanupRef.current = () => {
        try {
          selectedImage.removeEventListener("mouseenter", onEnter);
          selectedImage.removeEventListener("mouseleave", onLeave);
        } catch (e) {}
      };

      return () => {
        selectedImage.onload = null;
        window.removeEventListener("resize", updateOverlay);
        if (scrollContainer)
          scrollContainer.removeEventListener("scroll", updateOverlay);
        resizeObserver.disconnect();
        if (imageHoverCleanupRef.current) {
          imageHoverCleanupRef.current();
          imageHoverCleanupRef.current = null;
        }
      };
    } else {
      setOverlayStyle({});
      setIsImageHover(false);
      if (imageHoverCleanupRef.current) {
        imageHoverCleanupRef.current();
        imageHoverCleanupRef.current = null;
      }
    }
  }, [selectedImage, containerRef]);

  useEffect(() => {
    if (!isSiteSettingsOpen) return;
    (async () => {
      try {
        const res = await fetch("/api/admin/site-settings");
        if (!res.ok) return;
        const json = await res.json();
        setSiteAnalyticsId(json.settings?.analyticsId || "");

        // Compute a friendly default sitemap: prefer NEXT_PUBLIC_SITE_URL if available,
        // otherwise use a relative path so we don't force a specific domain.
        const envSite = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
        const defaultSitemap = envSite ? `${envSite}/sitemap.xml` : "/sitemap.xml";

        setSiteRobots(
          json.settings?.robotsTxt ||
            `User-agent: *\nAllow: /\nSitemap: ${defaultSitemap}`
        );
      } catch (err) {
        console.warn("Failed to load site settings", err);
      }
    })();
  }, [isSiteSettingsOpen]);

  const [title, setTitle] = useState(initial?.title ?? "Untitled Post");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    initial?.coverImage
  );
  const [coverAlt, setCoverAlt] = useState(initial?.coverImageAlt ?? "");

  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDesc, setSeoDesc] = useState(initial?.seoDescription ?? "");
  const [seoKeywords, setSeoKeywords] = useState<string[]>(
    initial?.seoKeywords ?? []
  );
  const [canonical, setCanonical] = useState(initial?.canonical ?? "");
  const [keywordInput, setKeywordInput] = useState("");
  const [author, setAuthor] = useState(initial?.author ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      // Only save if selection is inside editor
      if (editorRef.current && editorRef.current.contains(sel.anchorNode)) {
        savedRange.current = sel.getRangeAt(0).cloneRange();
      }
    }
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      if (savedRange.current) {
        sel.addRange(savedRange.current);
      } else {
        // If no saved range, focus editor at end
        editorRef.current?.focus();
        if (editorRef.current) {
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.addRange(range);
        }
      }
    }
  }, []);

  const execCommand = useCallback((command: string, value: string = "") => {
    if (document) {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      checkActiveStates();
      updateCounts();
    }
  }, []);

  const queryCommandState = (command: string) => {
    return !!activeStates[command];
  };

  const queryCommandValue = (command: string) => {
    return document.queryCommandValue(command) || "";
  };

  const checkActiveStates = useCallback(() => {
    if (!document) return;
    try {
      const states: any = {};
      [
        "bold",
        "italic",
        "underline",
        "insertUnorderedList",
        "insertOrderedList",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
      ].forEach((cmd) => {
        states[cmd] = document.queryCommandState(cmd);
      });
      setActiveStates(states);
    } catch (e) {}
  }, []);

  const updateCounts = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setCharCount(text.length);
      setWordCount(
        text
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length
      );
    }
  }, []);

  // --- IMPROVED FONT SIZE LOGIC ---

  const getFontSizePx = useCallback(() => {
    try {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return 16;
      let node = sel.anchorNode;

      // If text node, start from parent
      if (node && node.nodeType === Node.TEXT_NODE) {
        node = node.parentElement;
      }
      if (node && editorRef.current?.contains(node)) {
        const fs = window.getComputedStyle(node as Element).fontSize;
        return parseInt(fs) || 16;
      }
    } catch (e) {}
    return 16;
  }, []);

  const applyFontSize = (size: number) => {
    const cleanSize = Math.max(1, Math.min(120, size));

    const sel = window.getSelection();
    if (
      !sel ||
      sel.rangeCount === 0 ||
      (editorRef.current && !editorRef.current.contains(sel.anchorNode))
    ) {
      restoreSelection();
    }

    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("fontSize", false, "7");

    const fontElements = editorRef.current?.querySelectorAll(
      'font[size="7"], span[style*="font-size: xxx-large"]'
    );

    fontElements?.forEach((el) => {
      el.removeAttribute("size");
      (el as HTMLElement).style.fontSize = `${cleanSize}px`;
      (el as HTMLElement).style.removeProperty("font-size-adjust");
    });

    const spans = editorRef.current?.querySelectorAll(
      'span[style*="font-size: -webkit-xxx-large"]'
    );
    spans?.forEach((el) => {
      (el as HTMLElement).style.fontSize = `${cleanSize}px`;
    });

    editorRef.current?.focus();
    updateCounts();
  };

  // Apply font size and sync component state/UI inputs
  const applyAndSyncFontSize = (size: number) => {
    try {
      applyFontSize(size);
    } catch (e) {
      console.warn("applyFontSize failed", e);
    }
    const clean = Math.max(1, Math.min(120, Math.round(size || 16)));
    setCurrentFontSize(clean);
    setFontInput(String(clean));
    saveSelection();

    // Move caret into resized area if no selection exists so further +/- operate predictably
    requestAnimationFrame(() => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount === 0 && editorRef.current) {
        // place caret at end of editor to avoid focus loss
        editorRef.current.focus();
      }
    });
  };

  // Helper: increase or decrease font size in a robust way
  const increaseFontBy = (delta: number) => {
    // prefer selection-based changes where possible; otherwise act on currentFontSize
    restoreSelection();
    requestAnimationFrame(() => {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) {
        const current = currentFontSize || getFontSizePx();
        applyAndSyncFontSize(current + delta);
        return;
      }

      const range = sel.getRangeAt(0);
      if (range.collapsed) {
        // try to expand to a word
        try {
          if (sel.modify) {
            sel.modify("move", "backward", "word");
            sel.modify("extend", "forward", "word");
          }
        } catch (e) {}
        const newRange = sel && sel.rangeCount ? sel.getRangeAt(0) : range;
        const text = newRange.toString();
        if (!text) {
          const current = currentFontSize || getFontSizePx();
          applyAndSyncFontSize(current + delta);
          return;
        }
      }

      // Use the more complex selection-based path for ranges
      changeFontSizeBy(delta);
    });
  };

  const changeFontSizeBy = (delta: number) => {
    // Simple and direct: use UI state as the source of truth
    saveSelection();
    restoreSelection();
    const newSize = (currentFontSize || 16) + delta;
    applyAndSyncFontSize(Math.max(1, Math.min(120, newSize)));
  };

  // Sync state with selection for Display purposes
  React.useEffect(() => {
    const handler = () => {
      try {
        const s = getFontSizePx();
        // Only update input if user isn't actively typing in it (checked via focus)
        if (document.activeElement?.id !== "fontSizeInput") {
          setCurrentFontSize(s);
          setFontInput(String(s));
        }
      } catch (e) {}
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, [getFontSizePx]);

  // ---

  const toggleCase = () => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // CRITICAL FIX: If no selection (collapsed), select the word under cursor
    if (sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      // Heuristic: Expand to word. This is basic and might vary by browser, but better than nothing.
      // We can't easily use modify() in all contexts safely, but let's try standard behavior
      if (sel.modify) {
        sel.modify("move", "backward", "word");
        sel.modify("extend", "forward", "word");
      }
    }

    const range = sel.getRangeAt(0);
    const text = range.toString();
    if (!text) return;

    // Check if mostly upper to decide direction
    const isUpper = text === text.toUpperCase() && text !== text.toLowerCase();
    const newText = isUpper ? text.toLowerCase() : text.toUpperCase();

    document.execCommand("insertText", false, newText);
    updateCounts();
  };

  const cycleLineHeight = () => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // Find the block element (p, div, h1-h6)
    const block = sel.anchorNode?.parentElement?.closest(
      "p, h1, h2, h3, h4, h5, h6, div, li"
    ) as HTMLElement;

    if (block && editorRef.current?.contains(block)) {
      const currentLH = block.style.lineHeight;
      let nextLH = "1.5";

      if (currentLH === "1.5") nextLH = "2.0";
      else if (currentLH === "2.0") nextLH = "1.0"; // tight
      else nextLH = "1.5"; // default

      block.style.lineHeight = nextLH;
    } else {
      // Fallback: try to format block then apply
      document.execCommand("formatBlock", false, "p");
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      let finalUrl = linkUrl;
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("/")) {
        finalUrl = "https://" + finalUrl;
      }
      restoreSelection();
      execCommand("createLink", finalUrl);
      setLinkUrl("");
      setIsLinkModalOpen(false);
    }
  };

  // Find an image either from the currently selectedImage or from the DOM selection
  const findImageFromSelectionOrCurrent = () => {
    if (selectedImage) return selectedImage;
    try {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return null;
      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer as HTMLElement | null;
      if (container) {
        const imgInRange = container.querySelector && (container.querySelector('img') as HTMLImageElement | null);
        if (imgInRange) return imgInRange;
      }

      const startNode = range.startContainer;
      const elNode = startNode && (startNode.nodeType === Node.TEXT_NODE ? (startNode.parentElement as HTMLElement | null) : (startNode as HTMLElement | null));
      if (!elNode) return null;

      const direct = elNode.tagName === 'IMG' ? (elNode as HTMLImageElement) : (elNode.closest ? (elNode.closest('img') as HTMLImageElement | null) : null);
      if (direct) return direct;
    } catch (e) {}
    return null;
  };

  const updateAltText = () => {
    // Prefer the last-clicked image, then selected image, then selection-inspection
    const img = getActiveImage();
    if (!img || !editorRef.current) {
      // Nothing to update
      setIsAltModalOpen(false);
      return;
    }

    try {
      console.debug("updateAltText ->", { src: img.src, alt: altText });
      img.alt = altText;
      img.setAttribute("alt", altText);
    } catch (e) {}

    // Also sync to all image elements in the editor that match the src (covers duplicates)
    try {
      const imgs = Array.from(editorRef.current.querySelectorAll("img")) as HTMLImageElement[];
      for (const other of imgs) {
        if (other === img || (img.src && other.getAttribute("src") === img.src)) {
          other.alt = altText;
          other.setAttribute("alt", altText);
        }
      }
    } catch (e) {}

    // Force a small DOM refresh to ensure contentEditable reflects the attribute change
    try {
      // Re-assign innerHTML to itself to force a reflow without changing content
      editorRef.current.innerHTML = editorRef.current.innerHTML;
    } catch (e) {}

    // Update UI and close modal
    setSelectedImageVersion((v) => v + 1);
    setAltText("");
    setIsAltModalOpen(false);
    updateCounts();
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.toLowerCase().replace(/[^a-z0-9\s-]/g, "");
    setSlug(clean);
  };

  useEffect(() => {
    if (
      mode === "create" &&
      (!slug || slug === generateSlugFromTitle(initial?.title || ""))
    ) {
      setSlug(generateSlugFromTitle(title));
    }
  }, [title, mode]);

  // --- MAIN SELECTION TRACKING EFFECT ---
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const handleSelectionChange = () => {
      checkActiveStates();
      saveSelection();
    };

    // Detect an <img> from a DOM node or selection range
    const detectImageFromNodeOrRange = (node: Node | null) => {
      try {
        if (!node) return null;
        // If node is text, consider its parent element
        const elNode = node.nodeType === Node.TEXT_NODE ? (node.parentElement as HTMLElement | null) : (node as HTMLElement | null);
        if (!elNode) return null;

        // 1) If node is or is inside an <img>
        const direct = elNode.tagName === 'IMG' ? (elNode as HTMLImageElement) : (elNode.closest ? (elNode.closest('img') as HTMLImageElement | null) : null);
        if (direct) return direct;

        return null;
      } catch (e) {
        return null;
      }
    };

    const detectImageFromSelection = () => {
      try {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;
        const range = sel.getRangeAt(0);

        // If selection contains an IMG element directly
        const container = range.commonAncestorContainer as HTMLElement | null;
        if (container) {
          const imgInRange = container.querySelector && (container.querySelector('img') as HTMLImageElement | null);
          if (imgInRange) return imgInRange;
        }

        // Check startContainer or endContainer for images
        const startImg = detectImageFromNodeOrRange(range.startContainer);
        if (startImg) return startImg;
        const endImg = detectImageFromNodeOrRange(range.endContainer);
        if (endImg) return endImg;

        return null;
      } catch (e) {
        return null;
      }
    };

    const handleSelectionEvent = (e: Event) => {
      const target = e.target as HTMLElement | null;
      let img: HTMLImageElement | null = null;

      // Prefer direct target/closest
      try {
        if (target) {
          img = target.tagName === 'IMG' ? (target as HTMLImageElement) : (target.closest ? (target.closest('img') as HTMLImageElement | null) : null);
        }
      } catch (err) {
        img = null;
      }

      // If nothing found, inspect selection
      if (!img) img = detectImageFromSelection();

      if (img && el.contains(img)) {
        // If user pressed the mouse (mousedown/click/pointerdown), make sure caret/selection is set to the image node
        try {
          const range = document.createRange();
          range.selectNode(img);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          // Save selection explicitly so restoreSelection and editor toolbar logic works
          saveSelection();
        } catch (err) {
          // noop
        }

        // When selecting the image via click/mousedown/pointerdown, ensure hover state is set so the toolbar appears immediately
        // and re-assert selection in the next tick to avoid accidental clearing by other selection events.
        setSelectedImage(img);
        setIsImageHover(true);
        // Remember this as the last clicked image (robust fallback)
        lastClickedImageRef.current = img;
        setTimeout(() => {
          try {
            if (editorRef.current && editorRef.current.contains(img)) {
              setSelectedImage(img);
              setIsImageHover(true);
              saveSelection();
            }
          } catch (e) {}
        }, 0);
      } else {
        setSelectedImage(null);
        setIsImageHover(false);
        // Do not clear lastClickedImageRef here — we want explicit clicks to persist as a fallback
      }

      handleSelectionChange();
      updateCounts();
    };

    const handleSelectionImageChange = () => {
      try {
        const img = detectImageFromSelection();
        // If selection no longer points at an image, clear the selection state but keep lastClickedImageRef
        if (!img || !el.contains(img)) {
          setSelectedImage(null);
          setIsImageHover(false);
        }
      } catch (e) {
        setSelectedImage(null);
        setIsImageHover(false);
      }
      handleSelectionChange();
      updateCounts();
    };

    // Listen on pointerdown/mousedown (early), click and keyboard navigation
    el.addEventListener('pointerdown', handleSelectionEvent);
    el.addEventListener('mousedown', handleSelectionEvent);
    el.addEventListener('click', handleSelectionEvent);
    el.addEventListener('keyup', handleSelectionEvent);
    document.addEventListener('selectionchange', handleSelectionImageChange);

    return () => {
      el.removeEventListener('mousedown', handleSelectionEvent);
      el.removeEventListener('click', handleSelectionEvent);
      el.removeEventListener('keyup', handleSelectionEvent);
      document.removeEventListener('selectionchange', handleSelectionImageChange);
    };
  }, [checkActiveStates, updateCounts, saveSelection]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current || !selectedImage) return;

      const { startX, startY, startWidth, startHeight, freeAspect } =
        resizeRef.current as any;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Compute tentative new sizes based on cursor movement
      const tentativeWidth = Math.max(30, Math.round(startWidth + deltaX));
      const tentativeHeight = Math.max(30, Math.round(startHeight + deltaY));

      if (freeAspect) {
        // Free aspect: apply both width and height directly
        selectedImage.style.width = `${tentativeWidth}px`;
        selectedImage.style.height = `${tentativeHeight}px`;
      } else {
        // Preserve original aspect ratio
        const aspect =
          startWidth && startHeight
            ? startWidth / startHeight
            : tentativeWidth / tentativeHeight;
        // Determine scale by the larger relative change so user sees responsive resize
        const scaleX = tentativeWidth / startWidth;
        const scaleY = tentativeHeight / startHeight;
        const scale = Math.max(scaleX || 1, scaleY || 1);
        const newW = Math.max(30, Math.round(startWidth * scale));
        const newH = Math.max(30, Math.round(newW / aspect));
        selectedImage.style.width = `${newW}px`;
        selectedImage.style.height = `${newH}px`;
      }

      // Clear responsive caps so image can grow beyond container
      try {
        selectedImage.style.maxWidth = "none";
        selectedImage.style.display = "block";
      } catch (e) {}

      // Keep overlay in sync (ResizeObserver / scroll handlers will also update)
      updateCounts();
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      document.body.style.cursor = "default";
      if (selectedImage) {
        // Trigger any additional sync (update overlay and state)
        setSelectedImageVersion((v) => v + 1);
        updateCounts();
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "nwse-resize";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, selectedImage, updateCounts]);

  useEffect(() => {
    if (mounted && editorRef.current && initial?.content) {
      if (editorRef.current.innerHTML !== initial.content) {
        editorRef.current.innerHTML = initial.content;
        updateCounts();
      }
    }
  }, [mounted, initial?.content, updateCounts]);

  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  const uploadFile = async (file: File, slug?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (slug) formData.append("slug", slug);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Upload failed");
    }
    const data = await res.json();
    return data.webp || data.url;
  };

  const processContentImages = async (html: string, slugForUpload?: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgs = Array.from(doc.querySelectorAll("img")) as HTMLImageElement[];

    for (const img of imgs) {
      const src = img.getAttribute("src") || "";

      if (
        src.startsWith("/uploads/") ||
        src.startsWith("http://") ||
        src.startsWith("https://")
      ) {
        continue;
      }

      if (!src.startsWith("blob:")) continue;

      try {
        const res = await fetch(src);
        const blob = await res.blob();

        const file = new File([blob], "editor-image.png", {
          type: blob.type || "image/png",
        });

        const url = await uploadFile(file, slugForUpload);

        img.setAttribute("src", url);
      } catch (err) {
        console.warn("Inline image upload failed:", src, err);
      }
    }

    return doc.body.innerHTML;
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    setErrorMsg(null);
    const contentHtml = editorRef.current?.innerHTML || "";
    const finalSlug = generateSlugFromTitle(slug || title);

    // For drafts, use a simple save. We will still upload the cover image for preview convenience,
    // but content images with blob: URLs will be saved as-is, to be processed on publish.
    if (!publish) {
      try {
        let coverUrl = initial?.coverImage || "";
        if (coverFile) {
          try {
            coverUrl = await uploadFile(coverFile, finalSlug);
          } catch (err) {
            console.warn("Draft cover upload failed, will retry on publish", err);
          }
        }

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = contentHtml;
        const imagesPayload = Array.from(tempDiv.querySelectorAll("img")).map(
          (i) => ({ url: i.src, alt: i.alt || "" })
        );
        const publishedAtPayload = publishedAtState
          ? new Date(publishedAtState).toISOString()
          : null;

        // Choose h1: prefer content H1, otherwise use the post title (ensures Untitled Post becomes H1)
        const contentH1 = getContentH1(contentHtml);
        const finalH1 = contentH1 || title.trim();

        // For drafts, set metaImage to cover if available (so UI that prefers metaImage shows it)
        const metaImage = coverUrl || imagesPayload[0]?.url || "";

        const payload = {
          title: title.trim(),
          slug: finalSlug,
          excerpt: excerpt || "",
          content: contentHtml,
          coverImage: coverUrl,
          coverImageAlt: coverAlt,
          metaImage,
          h1: finalH1,
          published: false,
          publishedAt: publishedAtPayload,
          seoTitle: seoTitle || title,
          seoDescription: seoDesc || excerpt,
          seoKeywords,
          canonical,
          author,
          images: imagesPayload,
        };

        const url =
          mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${postId}`;
        const method = mode === "create" ? "POST" : "PUT";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to save draft");

        setLastSaved(new Date());
        if (onSaved) onSaved(data.post || data);
      } catch (err: any) {
        console.error("Draft Save Error:", err);
        setErrorMsg(err.message || "Error saving draft");
      } finally {
        setSaving(false);
      }
      return;
    }

    // --- New Multi-Step Publish Flow ---
    let currentPostId = postId;
    try {
      // --- Step 1 & 2: Save Post Data First (without new images) ---
      const publishedAtPayload = publishedAtState
        ? new Date(publishedAtState).toISOString()
        : null;

      // Determine an h1 value to send on initial publish save (prefer content H1 otherwise title)
      const publishContentH1 = getContentH1(contentHtml);
      const publishH1 = publishContentH1 || title.trim();

      const initialPayload = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt || "",
        content: contentHtml, // Contains blob: URLs
        coverImage: initial?.coverImage || "", // Use existing cover URL
        coverImageAlt: coverAlt,
        h1: publishH1,
        published: true,
        publishedAt: publishedAtPayload,
        seoTitle: seoTitle || title,
        seoDescription: seoDesc || excerpt,
        seoKeywords,
        canonical,
        author,
        images: [], // Images array will be updated in the final step
      };

      const initialUrl =
        mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${postId}`;
      const initialMethod = mode === "create" ? "POST" : "PUT";

      const initialRes = await fetch(initialUrl, {
        method: initialMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialPayload),
      });

      const savedJson = await initialRes.json();
      if (!initialRes.ok)
        throw new Error(savedJson.message || "Initial save failed");

      // API returns { success:true, post } — accept either wrapper or direct object
      let savedPostObj = savedJson.post || savedJson;
      currentPostId = savedPostObj._id || (savedPostObj.id as string) || currentPostId;

      // Fallback: if API didn't return an ID, try to find the post by slug (some environments may not return the object)
      if (!currentPostId) {
        try {
          const searchRes = await fetch(`/api/admin/posts?search=${encodeURIComponent(finalSlug)}&limit=1`);
          if (searchRes.ok) {
            const listJson = await searchRes.json();
            const found = (listJson.posts && listJson.posts[0]) || (Array.isArray(listJson) && listJson[0]);
            if (found && (found._id || found.id)) {
              currentPostId = found._id || found.id;
              savedPostObj = savedPostObj || found;
            }
          }
        } catch (e) {
          console.warn('Could not find post by slug fallback', e);
        }
      }

      if (!currentPostId)
        throw new Error("Could not get post ID after initial save.");

      if (mode === "create" && onSaved) onSaved(savedPostObj);


      // --- Step 3: Upload Images ---
      let finalCoverUrl = (savedPostObj && (savedPostObj.coverImage || "")) || "";
      if (coverFile) {
        finalCoverUrl = await uploadFile(coverFile, finalSlug);
      }

      const finalContentHtml = await processContentImages(contentHtml, finalSlug);

      // If there was no explicit cover image, pick the first image from the final content (auto cover)
      if (!finalCoverUrl) {
        try {
          const doc = new DOMParser().parseFromString(finalContentHtml, "text/html");
          const firstImg = doc.querySelector("img");
          if (firstImg && firstImg.getAttribute("src")) {
            finalCoverUrl = firstImg.getAttribute("src") || "";
          } else if (savedPostObj && (savedPostObj.metaImage || savedPostObj.coverImage)) {
            finalCoverUrl = savedPostObj.metaImage || savedPostObj.coverImage || "";
          }
        } catch (e) {
          // ignore
        }
      }

      // --- Step 4: Update Post with Final Image URLs ---
      const hasContentChanged = finalContentHtml !== contentHtml;
      const hasCoverChanged = finalCoverUrl !== (savedPostObj.coverImage || "");
      
      if (hasContentChanged || hasCoverChanged) {
        const finalImagesPayload = Array.from(
          (
            new DOMParser().parseFromString(finalContentHtml, "text/html")
          ).body.querySelectorAll("img")
        ).map((img) => ({ url: img.src, alt: img.alt }));

        // Compute final H1 after image processing (prefer content H1 if present)
        const finalContentH1 = getContentH1(finalContentHtml);
        const finalH1 = finalContentH1 || title.trim();

        const finalPayload = {
          content: finalContentHtml,
          coverImage: finalCoverUrl,
          // Also set metaImage so site UI (which prefers metaImage) shows the chosen cover
          metaImage: finalCoverUrl || savedPostObj?.metaImage || savedPostObj?.coverImage || "",
          h1: finalH1,
          images: finalImagesPayload,
        };

        const finalUrl = `/api/admin/posts/${currentPostId}`;
        const finalRes = await fetch(finalUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });

        const finalData = await finalRes.json();
        if (!finalRes.ok)
          throw new Error(finalData.message || "Failed to update post with images");

        // finalData may be wrapped — pass the actual post object when available
        if (onSaved) onSaved(finalData.post || finalData);
      }

      setLastSaved(new Date());

    } catch (err: any) {
      console.error("Publish Error:", err);
      setErrorMsg(err.message || "Error publishing post");
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !seoKeywords.includes(keywordInput.trim())) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    setSeoKeywords(seoKeywords.filter((_, i) => i !== index));
  };

  if (!mounted)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-400">
        Loading Editor...
      </div>
    );

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden bg-[#F9FBFD] text-slate-900 font-sans ${
        isFullscreen ? "fixed inset-0 z-50" : "relative"
      } ${className}`}
    >
      {/* --- Top Navigation Bar --- */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-40 relative shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div
            className="p-2 rounded-lg shadow-lg shadow-blue-100"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            <Layout className="text-white h-5 w-5" />
          </div>
          <div className="flex flex-col w-full max-w-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-bold text-slate-800 placeholder-slate-400 border-none focus:ring-0 p-0 hover:bg-slate-100 rounded px-2 transition-colors bg-transparent"
              placeholder="Untitled Post"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 mr-2 font-medium">
            {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : "Unsaved"}
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            style={{ color: BRAND_COLOR, borderColor: BRAND_COLOR }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border-2 font-bold hover:bg-blue-50 transition-all text-sm disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Draft"}
          </button>

          <button
            onClick={() => handleSave(true)}
            style={{ backgroundColor: BRAND_COLOR }}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm"
          >
            <Globe size={16} />
            Publish
          </button>
        </div>
      </header>

      {/* --- Main Workspace --- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Editor Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <EditorToolbar
            execCommand={execCommand}
            queryCommandState={queryCommandState}
            queryCommandValue={queryCommandValue}
            saveSelection={saveSelection}
            restoreSelection={restoreSelection}
            selectedImage={selectedImage}
            activeImage={getActiveImage()}
            isImageHover={isImageHover}
            isResizing={isResizing}
            isAltModalOpen={isAltModalOpen}
            updateImageWidth={updateImageWidth}
            openLinkModal={() => {
              saveSelection();
              setIsLinkModalOpen(true);
            }}
            openAltModal={() => {
              // Use the most likely active image when opening the ALT modal
              const img = getActiveImage();
              if (img) {
                setAltText(img.alt || "");
                setIsAltModalOpen(true);
              }
            }}
            changeFontSizeBy={changeFontSizeBy}
            getFontSizePx={getFontSizePx}
            applyFontSize={applyFontSize}
            toggleCase={toggleCase}
            cycleLineHeight={cycleLineHeight}
            editorRef={editorRef}
            fontInput={fontInput}
            setFontInput={setFontInput}
            applyAndSyncFontSize={applyAndSyncFontSize}
          />

          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto bg-[#F0F2F5] scroll-smooth p-8 cursor-text relative"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                editorRef.current?.focus();
              }
            }}
          >
            {/* Error Message */}
            {errorMsg && (
              <div className="max-w-212.5 mx-auto mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm flex items-center gap-3 shadow-sm">
                <X size={18} /> {errorMsg}
              </div>
            )}

            {/* --- Post Configuration Section --- */}
            <div className="max-w-225 mx-auto mb-8 mt-10 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
              <button
                onClick={() => setIsMetaOpen(!isMetaOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
                  <Settings size={16} style={{ color: BRAND_COLOR }} />
                  Post Configuration & SEO
                </div>
                {isMetaOpen ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </button>

              {isMetaOpen && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-2 bg-slate-50/30">
                  {/* Column 1 */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Slug (URL)
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-lg px-3 bg-white hover:border-blue-400 transition-colors focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
                        <span className="text-slate-400 text-sm font-medium">
                          /blog/
                        </span>
                        <input
                          value={slug}
                          onChange={handleSlugChange}
                          onBlur={() => setSlug(generateSlugFromTitle(slug))} // Final clean on blur
                          placeholder="post-url-slug"
                          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 text-slate-700 font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Canonical Link
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-lg px-3 bg-white">
                        <Link2 size={16} className="text-slate-400 mr-2" />
                        <input
                          value={canonical}
                          onChange={(e) => setCanonical(e.target.value)}
                          placeholder="https://example.com/canonical"
                          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Scheduling */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Publish Schedule
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="datetime-local"
                          value={publishedAtState ?? ""}
                          onChange={(e) =>
                            setPublishedAtState(e.target.value || null)
                          }
                          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full"
                        />
                        <button
                          onClick={() => {
                            setPublishedAtState(toLocalISOString(new Date()));
                          }}
                          className="px-3 py-2 bg-white border rounded text-sm hover:bg-slate-50"
                          title="Set to Now"
                        >
                          Now
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Set a future date/time to schedule publishing
                        (server-side worker required to auto-publish).
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Keywords
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                          placeholder="Add tag..."
                          className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                        />
                        <button
                          onClick={addKeyword}
                          style={{ backgroundColor: BRAND_COLOR }}
                          className="px-4 text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {seoKeywords.map((k, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-600 shadow-sm"
                          >
                            {k}{" "}
                            <button
                              onClick={() => removeKeyword(i)}
                              className="ml-2 hover:text-red-500 text-slate-400 font-bold text-lg leading-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                          Meta Title
                        </label>
                        <span
                          className={`text-xs font-bold ${
                            seoTitle.length > 70
                              ? "text-red-500"
                              : "text-slate-400"
                          }`}
                        >
                          {seoTitle.length}/70
                        </span>
                      </div>
                      <input
                        value={seoTitle}
                        maxLength={70}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder={title}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                          Meta Description
                        </label>
                        <span
                          className={`text-xs font-bold ${
                            seoDesc.length > 170
                              ? "text-red-500"
                              : "text-slate-400"
                          }`}
                        >
                          {seoDesc.length}/170
                        </span>
                      </div>
                      <textarea
                        value={seoDesc}
                        maxLength={170}
                        onChange={(e) => setSeoDesc(e.target.value)}
                        rows={2}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Cover Image
                      </label>
                      <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-300">
                        {coverPreview ? (
                          <img
                            src={coverPreview}
                            alt={coverAlt || "Cover image preview"}
                            className="h-14 w-14 object-cover rounded-md border border-slate-200 shadow-sm"
                          />
                        ) : (
                          <div className="h-14 w-14 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center text-slate-400">
                            <ImageIcon size={24} />
                          </div>
                        )}
                        <label className="cursor-pointer px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                          Upload Image
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              setCoverFile(e.target.files[0])
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        Cover Image Alt Text
                      </label>
                      <input
                        value={coverAlt}
                        onChange={(e) => setCoverAlt(e.target.value)}
                        placeholder="Descriptive alt text for cover image"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsSiteSettingsOpen(true)}
                        className="text-sm underline"
                      >
                        Edit Site SEO
                      </button>
                      <div className="text-xs text-slate-400">
                        Site-wide SEO (robots, analytics, sitemap)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* The "Paper" */}
            <div
              ref={paperRef}
              className="max-w-225 mx-auto bg-white min-h-250 shadow-lg shadow-slate-200/50 border border-slate-100 mb-24 relative rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Styles injected specifically for contentEditable area. */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .prose-editor ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin: 1em 0; }
                    .prose-editor ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin: 1em 0; }
                    .prose-editor blockquote { border-left: 4px solid ${BRAND_COLOR}; padding-left: 1rem; font-style: italic; background: #f8fafc; border-radius: 0 4px 4px 0; margin: 1.5em 0; color: #475569; }
                    
                    /* Clean Headings */
                    .prose-editor h1 { font-size: 2.5em; font-weight: 800; margin-bottom: 0.02em; line-height: 1.1; color: #1e293b; margin-top: 0.05em; display: block; }
                    .prose-editor h2 { font-size: 2em; font-weight: 700; margin-bottom: 0.02em; margin-top: 0.04em; color: #334155; display: block; }
                    .prose-editor h3 { font-size: 1.75em; font-weight: 600; margin-bottom: 0.01em; margin-top: 0.03em; color: #334155; display: block; }
                    .prose-editor h4 { font-size: 1.5em; font-weight: 600; margin-bottom: 0.01em; margin-top: 0.03em; color: #334155; display: block; }
                    .prose-editor h5 { font-size: 1.25em; font-weight: 600; margin-bottom: 0em; margin-top: 0.02em; color: #334155; display: block; }
                    .prose-editor h6 { font-size: 1em; font-weight: 600; letter-spacing: 0.05em; color: #334155; margin-top: 0.02em; margin-bottom: 0em; display: block; }
                    .prose-editor p { margin-bottom: 1em; display: block; min-height: 1em; }

                    .prose-editor img { max-width: 100%; border-radius: 8px; cursor: pointer; transition: all 0.2s; margin: 1em 0; display: inline-block; }
                    .prose-editor img:hover { opacity: 0.95; }
                    .prose-editor a { color: ${BRAND_COLOR}; text-decoration: underline; font-weight: 500; cursor: pointer; }
                    .prose-editor:empty:before { content: attr(data-placeholder); color: #cbd5e1; pointer-events: none; font-size: 1.125rem; }
                 `,
                }}
              />

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="prose-editor outline-none min-h-250 py-16 px-16 font-serif text-lg leading-relaxed text-slate-800"
                data-placeholder="Start writing your amazing story..."
                style={{ outline: "none" }}
                onBlur={() => {
                  saveSelection();
                }}
              />

              {/* Custom Image Resizer Overlay (show only when hovering or resizing/alt modal open) */}
              {(selectedImage && (isImageHover || isResizing || isAltModalOpen)) && (
                <div
                  style={{
                    ...overlayStyle,
                    pointerEvents: "none",
                    border: `2px solid ${BRAND_COLOR}`,
                    zIndex: 10,
                    boxShadow: "0 0 0 4px rgba(59, 154, 203, 0.2)",
                  }}
                >
                  {/* Drag Handle */}
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsResizing(true);
                      // Capture start positions and sizes to allow proportional scaling
                      resizeRef.current = {
                        startX: e.clientX,
                        startY: e.clientY,
                        startWidth: selectedImage.offsetWidth,
                        startHeight: selectedImage.offsetHeight,
                        freeAspect: !!e.shiftKey, // hold Shift to allow free aspect ratio while dragging
                      };
                    }}
                    className="absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-nwse-resize flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform"
                    style={{ transform: "translate(50%, 50%)" }}
                  >
                    <Scaling size={12} className="text-blue-500" />
                  </div>

                  {/* Display Size Tag */}
                  <div className="absolute top-2 right-2 bg-black/75 text-white text-[10px] px-2 py-1 rounded font-mono pointer-events-none">
                    {selectedImage.offsetWidth}px
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="h-8 bg-white border-t border-slate-200 flex items-center justify-between px-6 text-[11px] font-medium text-slate-500 shrink-0 uppercase tracking-wider">
            <div className="flex gap-6">
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
            </div>
            <span>{saving ? "Syncing..." : "Saved locally"}</span>
          </div>
        </main>
      </div>

      {/* --- Link Modal --- */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 transform transition-all scale-100 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Link2 style={{ color: BRAND_COLOR }} size={20} />
                Insert Link
              </h3>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  URL Address
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && insertLink()}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={insertLink}
                style={{ backgroundColor: BRAND_COLOR }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Alt Text Modal --- */}
      {isAltModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 transform transition-all scale-100 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare style={{ color: BRAND_COLOR }} size={20} />
                Image Alt Text
              </h3>
              <button
                onClick={() => setIsAltModalOpen(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  Description (SEO)
                </label>
                <textarea
                  autoFocus
                  rows={3}
                  placeholder="Describe this image for SEO and screen readers..."
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                onClick={updateAltText}
                style={{ backgroundColor: BRAND_COLOR }}
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                Save Alt Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Site Settings Modal --- */}
      {isSiteSettingsOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-170 transform transition-all scale-100 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Settings style={{ color: BRAND_COLOR }} size={20} />
                Site SEO Settings
              </h3>
              <button
                onClick={() => setIsSiteSettingsOpen(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Google Analytics ID
                  </label>
                  <button
                    onClick={() => setAnalyticsEditable((v) => !v)}
                    className="text-xs px-2 py-1 border rounded text-slate-600 hover:bg-slate-50"
                    title={analyticsEditable ? "Lock analytics ID" : "Edit analytics ID"}
                  >
                    {analyticsEditable ? "Lock" : "Edit"}
                  </button>
                </div>

                <input
                  value={siteAnalyticsId}
                  onChange={(e) => setSiteAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXX or UA-XXXXXXXX"
                  disabled={!analyticsEditable}
                  className={`w-full border-2 rounded-lg px-4 py-2.5 transition-colors ${
                    analyticsEditable
                      ? "border-slate-200 focus:border-blue-400 focus:outline-none"
                      : "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                />

              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                  robots.txt
                </label>
                <textarea
                  rows={6}
                  value={siteRobots}
                  onChange={(e) => setSiteRobots(e.target.value)}
                  placeholder={`User-agent: *\nAllow: /\nSitemap: ${process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}/sitemap.xml` : '/sitemap.xml'}`}
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Sitemap line is optional — it will default to your configured site URL or a relative <code>/sitemap.xml</code> so you don't have to edit it.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/admin/site-settings", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          analyticsId: siteAnalyticsId,
                          robotsTxt: siteRobots,
                        }),
                      });
                      const json = await res.json();
                      if (res.ok) {
                        setIsSiteSettingsOpen(false);
                      } else {
                        alert(json.message || "Failed to save");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Failed to save settings");
                    }
                  }}
                  style={{ backgroundColor: BRAND_COLOR }}
                  className="px-4 py-2 rounded text-white font-bold"
                >
                  Save Settings
                </button>

                <button
                  onClick={async () => {
                    try {
                      await fetch("/sitemap.xml");
                      alert("Sitemap refreshed (cached for 1 hour).");
                    } catch (err) {
                      alert("Failed to refresh sitemap");
                    }
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Refresh Sitemap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
