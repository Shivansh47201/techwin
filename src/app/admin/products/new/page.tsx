"use client";

import { useState, useRef } from "react";
import ProductImageManager from "@/components/admin/ProductImageManager";
import CategorySelector from "@/components/admin/CategorySelector";
import {
  Save,
  ArrowLeft,
  Layout,
  Type,
  List,
  Globe,
  Tag,
  FileText,
  Plus,
  Trash2,
  Settings,
  ChevronRight,
  X,
  Image as ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";

// --- MOCK ROUTER (Replace with 'next/navigation' in real app) ---
const useRouter = () => {
  return {
    push: (url: string) => {
      console.log("Navigating to:", url);
      // Simulating navigation for preview
      window.location.href = url;
    },
    back: () => window.history.back(),
  };
};

// --- TYPES ---
type ImageItem = { src: string; alt?: string };
type Section =
  | { type: "text"; heading: string; content: string; image?: ImageItem }
  | { type: "features"; heading: string; bullets: string[] };

/* Using shared ProductImageManager component */

export default function NewProductPage() {
  const router = useRouter();

  // --- FORM STATE ---
  const [form, setForm] = useState<any>({
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    meta: { title: "", description: "" },

    // Media
    heroImage: null,
    galleryImages: [],
    previewImageSrc: null,
    datasheetImageSrc: null,
    graphImageURL: null,
    tableImageURL: null,

    // Content
    features: [],
    applicationAreas: [],
    sections: [],

    // Settings
    status: "draft", // Default status
    featured: false,

    // SEO
    canonical: "",
  });

  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // --- HELPERS ---
  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  }

  // Detect uploads in progress (client-side check for blob/data URLs)
  function hasPendingUploads() {
    const isBlob = (u: any) =>
      typeof u === "string" && (u.startsWith("blob:") || u.startsWith("data:"));

    if (isBlob(form.heroImage?.src)) return true;
    if ((form.galleryImages || []).some((g: any) => isBlob(g?.src)))
      return true;
    if (isBlob(form.previewImageSrc)) return true;
    if (isBlob(form.datasheetImageSrc)) return true;
    if (isBlob(form.graphImageURL)) return true;
    if (isBlob(form.tableImageURL)) return true;

    return false;
  }

  // --- ACTIONS ---

  const handleCancel = () => {
    // Immediate redirect
    router.push("/admin/products");
  };

  const handleSave = async (e: any) => {
    if (e) e.preventDefault();

    // Prevent save while uploads may still be in progress
    if (hasPendingUploads()) {
      alert(
        "Image uploads are still in progress. Please wait for uploads to finish before saving."
      );
      return;
    }

    setSaving(true);

    // Validation (match server-side strict checks)
    const missing: string[] = [];
    if (!form.title) missing.push("Title");
    if (!form.category) missing.push("Category");
    if (!form.meta?.title) missing.push("Meta Title");
    if (!form.meta?.description) missing.push("Meta Description");
    if (!form.heroImage?.src) missing.push("Hero Image");
    if (!form.shortDescription) missing.push("Short Description");

    if (missing.length > 0) {
      alert(`Please fill: ${missing.join(", ")}`);
      setSaving(false);
      return;
    }

    try {
      // 1. Prepare payload
      const payload = { ...form };

      // 2. SAVE PRODUCT (WAIT for DB to confirm)
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        alert(json?.message || "Failed to save product");
        setSaving(false);
        return;
      }

      router.push("/admin/products");
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong while saving product");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 font-sans pb-20">
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Product</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Products</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">New</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || hasPendingUploads()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#3B9ACB] rounded-xl hover:bg-[#2A7DA8] transition-all disabled:opacity-50 shadow-lg shadow-[#3B9ACB]/20 active:scale-95 transform"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Product"}
          </button>

          {hasPendingUploads() && (
            <div className="text-xs text-amber-600 font-medium ml-3">
              Uploads in progress — wait to save
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Basic Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Core product details and description
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Product Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] transition-all outline-none font-medium"
                      placeholder="e.g. High Power Laser"
                      value={form.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        update("title", title);
                        // Only auto-generate slug when user hasn't manually edited it
                        if (!slugManuallyEdited) update("slug", slugify(title));
                        update("meta", { ...form.meta, title });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div>
                      <CategorySelector value={form.category} onChange={(v) => update("category", v)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Slug
                  </label>
                  <div className="flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-sm">
                    <span className="select-none text-gray-400 mr-1">/products/</span>

                    <input
                      className="bg-transparent border-none outline-none w-full text-gray-600 font-mono font-medium"
                      value={form.slug}
                      onChange={(e) => { setSlugManuallyEdited(true); update("slug", e.target.value); }}
                      onBlur={(e) => update("slug", slugify(e.target.value))}
                      placeholder="my-product-slug"
                    />

                    <button type="button" onClick={() => { update("slug", slugify(form.title)); setSlugManuallyEdited(false); }} className="ml-3 text-xs text-gray-500 hover:text-blue-600">Reset</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] transition-all outline-none min-h-30 resize-y text-sm"
                    placeholder="Brief overview for hero section and SEO..."
                    value={form.shortDescription}
                    onChange={(e) => update("shortDescription", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 2. MEDIA MANAGER (Using Component) */}
            <ProductImageManager product={form} onChange={setForm} />

            {/* 3. PAGE SECTIONS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Layout className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Page Sections
                    </h2>
                    <p className="text-sm text-gray-500">
                      Modular content blocks
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {form.sections.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/30">
                    <Layout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No sections added yet
                    </p>
                    <p className="text-sm text-gray-400">
                      Add a content block below to start building
                    </p>
                  </div>
                )}

                {form.sections.map((s: Section, i: number) => (
                  <div
                    key={i}
                    className="group relative border border-gray-200 rounded-xl p-5 bg-white hover:border-[#3B9ACB]/50 hover:shadow-md transition-all"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          "sections",
                          form.sections.filter((_: any, x: number) => x !== i)
                        )
                      }
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {s.type} Section
                      </span>
                    </div>

                    <div className="space-y-4">
                      <input
                        className="w-full text-lg font-bold placeholder-gray-300 border-none p-0 focus:ring-0 text-gray-900 bg-transparent outline-none"
                        placeholder="Section Heading"
                        value={s.heading}
                        onChange={(e) => {
                          const copy = [...form.sections];
                          copy[i].heading = e.target.value;
                          update("sections", copy);
                        }}
                      />

                      {s.type === "text" && (
                        <textarea
                          className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none min-h-25 text-sm"
                          placeholder="Write section content here..."
                          value={s.content}
                          onChange={(e) => {
                            const copy = [...form.sections];
                            copy[i].content = e.target.value;
                            update("sections", copy);
                          }}
                        />
                      )}

                      {s.type === "features" && (
                        <TagEditor
                          values={s.bullets}
                          onChange={(v) => {
                            const copy = [...form.sections];
                            copy[i].bullets = v;
                            update("sections", copy);
                          }}
                          placeholder="Add bullet point..."
                          icon={<List className="w-4 h-4" />}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    className="py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-[#3B9ACB] hover:bg-[#3B9ACB]/5 hover:text-[#3B9ACB] transition-all flex items-center justify-center gap-2"
                    onClick={() =>
                      update("sections", [
                        ...form.sections,
                        { type: "text", heading: "", content: "" },
                      ])
                    }
                  >
                    <Type className="w-4 h-4" /> Add Text Block
                  </button>
                  <button
                    type="button"
                    className="py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-[#3B9ACB] hover:bg-[#3B9ACB]/5 hover:text-[#3B9ACB] transition-all flex items-center justify-center gap-2"
                    onClick={() =>
                      update("sections", [
                        ...form.sections,
                        { type: "features", heading: "", bullets: [] },
                      ])
                    }
                  >
                    <List className="w-4 h-4" /> Add Feature List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (SIDEBAR) --- */}
          <div className="space-y-6">
            {/* 1. Publishing Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 z-50">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                Publishing Settings
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Status
                  </label>
                  <select
                    className="w-full bg-white border border-gray-200 text-sm font-bold rounded-lg px-3 py-2 focus:border-[#3B9ACB] outline-none"
                    value={form.status}
                    onChange={(e) => update("status", e.target.value)}
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-[#3B9ACB] rounded focus:ring-[#3B9ACB] border-gray-300"
                    checked={form.featured}
                    onChange={(e) => update("featured", e.target.checked)}
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Mark as Featured
                  </span>
                </label>
              </div>
            </div>

            {/* 2. SEO */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                Search Engine Optimization
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Meta Title
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                    placeholder="SEO Title"
                    value={form.meta?.title || ""}
                    onChange={(e) =>
                      update("meta", { ...form.meta, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Meta Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none min-h-20 resize-none"
                    placeholder="Description for search results..."
                    value={form.meta?.description || ""}
                    onChange={(e) =>
                      update("meta", {
                        ...form.meta,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">Canonical Link</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" placeholder="https://example.com/products/my-product" value={form.canonical || ""} onChange={(e) => update("canonical", e.target.value)} />
                  <p className="text-xs text-gray-400">Optional — absolute URL or site-relative path (e.g., /products/other)</p>
                </div>
              </div>
            </div>

            {/* 3. Features */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                Key Features
              </h3>
              <TagEditor
                values={form.features}
                onChange={(v) => update("features", v)}
                placeholder="Add feature..."
              />
            </div>

            {/* 4. Application Areas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4 text-indigo-500" />
                Application Areas
              </h3>
              <TagEditor
                values={form.applicationAreas}
                onChange={(v) => update("applicationAreas", v)}
                placeholder="Add application..."
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   HELPER: TagEditor
-------------------------------------------------------------------------------- */
function TagEditor({
  values,
  onChange,
  placeholder,
  icon,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onChange([...values, input.trim()]);
    setInput("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            className={`w-full ${
              icon ? "pl-9" : "pl-3"
            } pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none transition-all`}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAdd())
            }
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {values.length === 0 && (
          <span className="text-xs text-gray-400 italic pl-1">
            No items added yet
          </span>
        )}
        {values.map((v, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B9ACB]/10 text-[#3B9ACB] text-xs font-bold border border-[#3B9ACB]/20 group cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
            onClick={() => onChange(values.filter((_, x) => x !== i))}
          >
            {v}
            <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </span>
        ))}
      </div>
    </div>
  );
}
