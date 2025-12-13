"use client";

/**
 * Feature-rich BlogEditor (TipTap) - Advanced & Modern UI
 *
 * - Modern gradient UI with smooth animations
 * - Full toolbar with icons and tooltips
 * - Featured image (cover) upload & preview
 * - Inline image upload + insert
 * - Fullscreen mode with enhanced editing experience
 * - Tags, slug, excerpt, save/publish
 *
 * API: uses /api/admin/upload (file + slug) and /api/admin/posts endpoints (POST/PUT)
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Table, TableHeader } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";

const PRIMARY = "#3B9ACB";
const SECONDARY = "#0f6b8f";
const ACCENT = "#00d4ff";

type Mode = "create" | "edit";
type InitialPost = {
  _id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  coverImageAlt?: string;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonical?: string;
  author?: string;
  h1?: string;
};
type Props = {
  mode?: Mode;
  initial?: InitialPost;
  postId?: string;
  onSaved?: (post: any) => void;
};

function generateSlug(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogEditor({
  mode = "create",
  initial,
  postId,
  onSaved,
}: Props) {
  // general states
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    initial?.coverImage
  );
  const [coverImageAlt, setCoverImageAlt] = useState(initial?.coverImageAlt ?? "");
  const [published, setPublished] = useState<boolean>(!!initial?.published);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // SEO states
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");
  const [seoKeywords, setSeoKeywords] = useState<string[]>(initial?.seoKeywords ?? []);
  const [seoKeywordInput, setSeoKeywordInput] = useState("");
  const [canonical, setCanonical] = useState(initial?.canonical ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [h1, setH1] = useState(initial?.h1 ?? "");

  // UI states
  const [fullscreen, setFullscreen] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  const linkTargetRef = useRef(false);

  // mount guard (avoid SSR errors)
  useEffect(() => setMounted(true), []);

  // TipTap editor (only initialize after mount)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-inside',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-inside',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-blue-500 pl-4 italic',
          },
        },
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      TextStyle,
      Color,
      Link.configure({ openOnClick: true }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initial?.content ?? "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none p-4 min-h-96",
      },
    },
  });

  // sync initial
  useEffect(() => {
    if (!editor) return;
    if (initial?.content) editor.commands.setContent(initial.content);
  }, [editor, initial?.content]);

  // auto slug generation (if user hasn't edited)
  useEffect(() => {
    if (!initial) {
      setSlug((prev) => {
        const generated = generateSlug(title);
        if (!prev || prev === generateSlug(initial?.title ?? "")) return generated;
        return prev;
      });
    }
  }, [title, initial]);

  // cover preview
  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  // SEO keywords helpers
  function addSeoKeyword() {
    const k = seoKeywordInput.trim();
    if (!k) return;
    if (!seoKeywords.includes(k)) setSeoKeywords((s) => [...s, k]);
    setSeoKeywordInput("");
  }
  function removeSeoKeyword(i: number) {
    setSeoKeywords((s) => s.filter((_, idx) => idx !== i));
  }

  // upload helper (returns public url)
  async function uploadFile(file: File) {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slug", slug || generateSlug(title) || "untitled");

      const res = await fetch("/api/admin/upload", { 
        method: "POST", 
        body: form 
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Server returned invalid response format");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");
      return data.url as string;
    } catch (err: any) {
      console.error("Upload error:", err);
      throw new Error(err?.message || "Image upload failed. Please try again.");
    }
  }

  // insert image into editor (after upload)
  async function handleInsertImage(file: File) {
    try {
      setErrorMsg(null);
      const url = await uploadFile(file);
      if (url) {
        editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Image upload failed");
      setTimeout(() => setErrorMsg(null), 5000);
    }
  }

  // cover upload (returns url)
  async function uploadCoverFile(file: File) {
    return uploadFile(file);
  }

  // Link modal handlers: insert or remove link
  function openLinkModal() {
    const sel = editor?.state.selection;
    setLinkText(editor?.state ? editor?.state.doc.textBetween(sel.from, sel.to) : "");
    setLinkUrl("");
    linkTargetRef.current = false;
    setShowLinkModal(true);
  }
  function insertLink() {
    if (!linkUrl) return;
    if (editor) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
      }
    }
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  }
  function removeLink() {
    editor?.chain().focus().unsetLink().run();
  }

  // table helper
  function insertTable() {
    editor?.chain().focus().insertTable({ rows: 2, cols: 3, withHeaderRow: true }).run();
  }

  // full-screen toggle
  function toggleFullscreen() {
    setFullscreen((s) => !s);
    setTimeout(() => editor?.chain().focus().run(), 50);
  }

  // Save (create or update)
  async function handleSave(publish = false) {
    setErrorMsg(null);
    if (!title.trim()) {
      setErrorMsg("Title required");
      return;
    }
    if (!slug.trim()) {
      setErrorMsg("Slug required");
      return;
    }
    const html = editor?.getHTML() ?? "";
    if (!html || html === "<p></p>") {
      setErrorMsg("Content required");
      return;
    }

    setLoading(true);
    try {
      let coverUrl = coverPreview;
      if (coverFile instanceof File) {
        coverUrl = await uploadCoverFile(coverFile);
      }

      const payload = {
        title: title.trim(),
        slug: generateSlug(slug),
        excerpt: excerpt || "",
        content: html,
        coverImage: coverUrl || "",
        coverImageAlt: coverImageAlt || "",
        published: publish,
        // SEO fields
        seoTitle: seoTitle || title.trim(),
        seoDescription: seoDescription || excerpt || "",
        seoKeywords,
        canonical: canonical || "",
        author: author || "",
        h1: h1 || title.trim(),
      };

      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        if (!postId) throw new Error("postId is required for edit");
        res = await fetch(`/api/admin/posts/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Save failed");
      if (onSaved) onSaved(data.post ?? data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Save error");
    } finally {
      setLoading(false);
    }
  }

  // Render toolbar
  function Toolbar() {
    if (!editor) return null;
    return (
      <div className="bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 rounded-xl p-4 mb-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-wrap items-center gap-2">
          {/* Headings Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 1 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="Heading 1"
            >
              H1
            </button>
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading 2"
            >
              H2
            </button>
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Heading 3"
            >
              H3
            </button>
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 4 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              title="Heading 4"
            >
              H4
            </button>
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 5 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              title="Heading 5"
            >
              H5
            </button>
            <button
              className={`px-3 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                editor.isActive("heading", { level: 6 })
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              title="Heading 6"
            >
              H6
            </button>
          </div>

          {/* Text Formatting Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <button
              className={`px-3 py-2 rounded font-bold text-sm transition-all duration-200 ${
                editor.isActive("bold")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold (Ctrl+B)"
            >
              B
            </button>
            <button
              className={`px-3 py-2 rounded italic text-sm transition-all duration-200 ${
                editor.isActive("italic")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic (Ctrl+I)"
            >
              I
            </button>
            <button
              className={`px-3 py-2 rounded underline text-sm transition-all duration-200 ${
                editor.isActive("underline")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline (Ctrl+U)"
            >
              U
            </button>
          </div>

          {/* Lists Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <button
              className={`px-3 py-2 rounded text-sm transition-all duration-200 ${
                editor.isActive("bulletList")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              • List
            </button>
            <button
              className={`px-3 py-2 rounded text-sm transition-all duration-200 ${
                editor.isActive("orderedList")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered List"
            >
              1. List
            </button>
          </div>

          {/* Block Elements Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <button
              className={`px-3 py-2 rounded text-sm transition-all duration-200 ${
                editor.isActive("blockquote")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Quote"
            >
              ❝
            </button>
            <button
              className={`px-3 py-2 rounded text-sm transition-all duration-200 ${
                editor.isActive("codeBlock")
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Code Block"
            >
              &lt;&gt;
            </button>
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => insertTable()}
              title="Insert Table"
            >
              ⊞
            </button>
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              ─
            </button>
          </div>

          {/* Media & Links Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <label className="px-3 py-2 rounded cursor-pointer hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm" title="Insert Image">
              🖼️
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleInsertImage(f);
                  (e.target as HTMLInputElement).value = "";
                }}
              />
            </label>
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => openLinkModal()}
              title="Add Link"
            >
              🔗
            </button>
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => removeLink()}
              title="Remove Link"
            >
              ✕
            </button>
          </div>

          {/* Undo/Redo Group */}
          <div className="flex gap-1 bg-white rounded-lg p-1.5 border border-slate-200 shadow-xs hover:shadow-sm transition-shadow">
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo"
            >
              ↶
            </button>
            <button
              className="px-3 py-2 rounded hover:bg-blue-50 text-slate-700 transition-all duration-200 text-sm"
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo"
            >
              ↷
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            className="ml-auto px-5 py-2 rounded-lg transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            onClick={() => toggleFullscreen()}
            style={{
              background: fullscreen
                ? `linear-gradient(135deg, ${SECONDARY}, ${PRIMARY})`
                : `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
            }}
            title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {fullscreen ? "✕ Exit FS" : "⛶ Fullscreen"}
          </button>
        </div>
      </div>
    );
  }

  // If the editor is not mounted yet (SSR), show placeholder
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Preparing editor…</p>
        </div>
      </div>
    );
  }

  // fullscreen style wrapper
  const editorWrapperClass = fullscreen
    ? "fixed inset-0 z-50 bg-white overflow-auto"
    : "";

  return (
    <>
      {/* Link modal */}
      {showLinkModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-lg mb-4 text-slate-900">Insert Link</h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://example.com"
            />
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Link text (optional)"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLinkModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all font-medium text-slate-700">Cancel</button>
              <button onClick={insertLink} className="px-4 py-2 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105" style={{ background: PRIMARY }}>Insert</button>
            </div>
          </div>
        </div>
      )}

      <div className={editorWrapperClass}>
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {mode === "create" ? "✨ Create New Post" : "📝 Edit Post"}
            </h1>
            <p className="text-slate-500">Write something amazing...</p>
          </div>

          <div className="space-y-6">
            {/* Title / Slug row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Title *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Slug *</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="auto-generated"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                placeholder="Short summary for lists / meta"
              />
            </div>

            {/* SEO Panel Toggle */}
            <div>
              <button
                onClick={() => setShowSeoPanel(!showSeoPanel)}
                className="w-full px-4 py-3 rounded-lg bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300 transition-all text-left font-semibold text-slate-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span>🔍</span> SEO & Meta Settings
                </span>
                <span className={`transform transition-transform ${showSeoPanel ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showSeoPanel && (
                <div className="mt-4 p-5 bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg space-y-4">
                  {/* H1 & Author */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700">H1 Heading</label>
                      <input
                        value={h1}
                        onChange={(e) => setH1(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder={title || "Main heading"}
                      />
                      <p className="text-xs text-slate-500 mt-1">Primary heading for SEO (auto-filled from title)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700">Author</label>
                      <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder="Author name"
                      />
                    </div>
                  </div>

                  {/* Meta Title & Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">
                      Meta Title (SEO) <span className="text-xs text-slate-500 font-normal">({seoTitle.length}/60)</span>
                    </label>
                    <input
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value.slice(0, 60))}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                      placeholder="Title for search engines (60 chars max)"
                    />
                    <p className="text-xs text-slate-500 mt-1">Appears in search results and browser tab</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">
                      Meta Description (SEO) <span className="text-xs text-slate-500 font-normal">({seoDescription.length}/160)</span>
                    </label>
                    <textarea
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value.slice(0, 160))}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 h-16 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="Description for search engines (160 chars max)"
                    />
                    <p className="text-xs text-slate-500 mt-1">Shows below page title in search results</p>
                  </div>

                  {/* SEO Keywords */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">SEO Keywords</label>
                    <div className="flex gap-2 items-center mb-3">
                      <input
                        value={seoKeywordInput}
                        onChange={(e) => setSeoKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSeoKeyword();
                          }
                        }}
                        className="border border-slate-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                        placeholder='Add keyword (max 10) and press Enter'
                      />
                      <button onClick={addSeoKeyword} className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all bg-purple-500 hover:bg-purple-600">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {seoKeywords.slice(0, 10).map((k, i) => (
                        <span key={k + i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 hover:shadow-md transition-all">
                          <span className="text-sm font-medium text-purple-800">{k}</span>
                          <button onClick={() => removeSeoKeyword(i)} className="text-red-500 hover:text-red-700 font-bold text-sm">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">Canonical URL</label>
                    <input
                      value={canonical}
                      onChange={(e) => setCanonical(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                      placeholder="https://example.com/article"
                    />
                    <p className="text-xs text-slate-500 mt-1">Prevents duplicate content issues</p>
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-3 text-slate-700">📸 Featured Image</label>
                <div className="space-y-3 mb-3">
                  <input
                    value={coverImageAlt}
                    onChange={(e) => setCoverImageAlt(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 text-sm"
                    placeholder="Alt text for image (for accessibility & SEO)"
                  />
                </div>
                <div className="bg-linear-to-br from-slate-50 to-blue-50 border-2 border-dashed border-slate-300 rounded-xl p-6">
                  <input
                    id="coverFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      if (f) {
                        if (f.size > 5 * 1024 * 1024) {
                          setErrorMsg("Image size must be less than 5MB");
                          return;
                        }
                        if (!f.type.startsWith("image/")) {
                          setErrorMsg("File must be an image");
                          return;
                        }
                        setCoverFile(f);
                        setErrorMsg(null);
                      }
                    }}
                    className="hidden"
                  />
                  
                  {coverPreview ? (
                    <div className="space-y-3">
                      <div className="relative group">
                        <img src={coverPreview} alt={coverImageAlt || "cover preview"} className="w-full h-48 object-cover rounded-lg border border-slate-300 shadow-lg group-hover:shadow-xl transition-shadow" />
                        <label htmlFor="coverFile" className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg cursor-pointer flex items-center justify-center transition-all">
                          <span className="text-white opacity-0 group-hover:opacity-100 font-medium">Change</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="coverFile" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-center cursor-pointer">
                          Change Image
                        </label>
                        <button onClick={() => { setCoverFile(null); setCoverPreview(undefined); }} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="coverFile" className="cursor-pointer block text-center">
                      <div className="space-y-2">
                        <div className="text-3xl">🖼️</div>
                        <p className="text-sm font-medium text-slate-700">Drag image here or click to upload</p>
                        <p className="text-xs text-slate-500">PNG, JPG, WebP (max 5MB)</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Editor area */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-slate-700">Content *</label>
              <div className="border border-slate-300 rounded-xl p-0 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Toolbar />
                <div className="bg-white border-t border-slate-200">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                  <span className="text-slate-700 font-medium">Publish immediately</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => handleSave(false)} disabled={loading} className="px-6 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all disabled:opacity-50">
                  {loading ? "Saving..." : "💾 Save Draft"}
                </button>

                <button onClick={() => handleSave(true)} disabled={loading} className="px-6 py-2 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 transform hover:scale-105" style={{ background: PRIMARY }}>
                  {loading ? "Publishing..." : "🚀 Publish"}
                </button>
              </div>
            </div>

            {errorMsg && <div className="text-red-600 text-sm font-medium bg-red-50 p-4 rounded-lg border border-red-200">❌ {errorMsg}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
