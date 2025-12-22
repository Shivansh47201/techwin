"use client";

import { useState, useEffect, useRef } from "react";

// Real imports — use live Next.js router & params
import { useParams, useRouter } from "next/navigation";

import { 
  Save, ArrowLeft, Layout, Type, List, Globe, Tag, FileText, 
  Plus, Trash2, Settings, ChevronRight, X, Image as ImageIcon, 
  Upload, Loader2, AlertCircle
} from "lucide-react";

import ProductImageManager from "@/components/admin/ProductImageManager";
import CategorySelector from "@/components/admin/CategorySelector";

// --- TYPES ---
type ImageItem = { src: string; alt?: string };
type Section =
  | { type: "text"; heading: string; content: string; image?: ImageItem }
  | { type: "features"; heading: string; bullets: string[] };

// Using shared `ProductImageManager` component from `/components/admin`
// (Inline preview-only implementation removed to use centralized logic and all 6 media targets) 

/* --------------------------------------------------------------------------------
   HELPER: TagEditor
-------------------------------------------------------------------------------- */
function TagEditor({ values, onChange, placeholder, icon }: { values: string[]; onChange: (v: string[]) => void; placeholder: string; icon?: React.ReactNode; }) {
  const [input, setInput] = useState("");
  const handleAdd = () => { if (!input.trim()) return; onChange([...values, input.trim()]); setInput(""); };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
          <input className={`w-full ${icon ? 'pl-9' : 'pl-3'} pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none transition-all`} placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())} />
        </div>
        <button type="button" onClick={handleAdd} className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors shadow-sm"><Plus className="w-4 h-4" /></button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.length === 0 && <span className="text-xs text-gray-400 italic pl-1">No items added yet</span>}
        {values.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B9ACB]/10 text-[#3B9ACB] text-xs font-bold border border-[#3B9ACB]/20 group cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all" onClick={() => onChange(values.filter((_, x) => x !== i))}>
            {v} <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   MAIN PAGE: EditProductPage
-------------------------------------------------------------------------------- */
export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // URL se ID le raha hai
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [form, setForm] = useState<any>({
    title: "", slug: "", category: "", shortDescription: "",
    meta: { title: "", description: "" },

    // Media
    heroImage: null, galleryImages: [],
    previewImageSrc: null, datasheetImageSrc: null, graphImageURL: null, tableImageURL: null,

    // Content
    features: [], applicationAreas: [], sections: [],

    // Settings
    status: "draft", featured: false,
  });

  // --- FETCH DATA LOGIC ---
  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
      const json = await res.json();
      const data = json.data || {};
      setForm((prev) => ({ ...prev, ...data }));
    } catch (err: any) {
      console.error("Failed to fetch product:", err);
      setError(err?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  }

  // Slug helper — normalize to lower-case hyphenated value
  function slugify(value: string) {
    return (value || "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  // Detect uploads in progress (client-side check for blob/data URLs)
  function hasPendingUploads() {
    const isBlob = (u: any) =>
      typeof u === "string" && (u.startsWith("blob:") || u.startsWith("data:"));

    if (isBlob(form.heroImage?.src)) return true;
    if ((form.galleryImages || []).some((g: any) => isBlob(g?.src))) return true;
    if (isBlob(form.previewImageSrc)) return true;
    if (isBlob(form.datasheetImageSrc)) return true;
    if (isBlob(form.graphImageURL)) return true;
    if (isBlob(form.tableImageURL)) return true;

    return false;
  }

  const handleSave = async (e: any) => {
    e?.preventDefault();

    // Prevent save while uploads may still be in progress
    if (hasPendingUploads()) {
      alert("Image uploads are still in progress. Please wait for uploads to finish before saving.");
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
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        alert(json?.message || "Failed to update product");
        setSaving(false);
        return;
      }

      // Fast feedback and redirect
      setTimeout(() => router.push("/admin/products?updated=true"), 500);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Save failed");
      setSaving(false);
    }
  }; 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#3B9ACB]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-medium text-slate-500">Loading product editor...</p>
        </div>
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#3B9ACB]">
        <div className="max-w-md text-center p-6 bg-white rounded-xl shadow">
          <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
          <h3 className="mt-4 text-lg font-bold">Failed to load product</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <div className="mt-4 flex justify-center gap-3">
            <button type="button" onClick={() => fetchProduct()} className="px-4 py-2 bg-[#3B9ACB] text-white rounded-xl">Retry</button>
            <button type="button" onClick={() => router.push("/admin/products")} className="px-4 py-2 bg-white border rounded-xl">Back to list</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 font-sans pb-20">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Products</span> <ChevronRight className="w-3 h-3" />
              <span className="text-[#3B9ACB] font-medium">{form.title || "Loading..."}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/products")} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all">Cancel</button>
          <button onClick={handleSave} disabled={saving || hasPendingUploads()} className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#3B9ACB] rounded-xl hover:bg-[#2A7DA8] transition-all disabled:opacity-50 shadow-lg shadow-[#3B9ACB]/20 active:scale-95 transform">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Updating..." : "Update Product"}
          </button>
          {hasPendingUploads() && <div className="text-xs text-amber-600 font-medium ml-3">Uploads in progress — wait to save</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
                <div><h2 className="text-base font-semibold text-gray-900">Basic Information</h2><p className="text-sm text-gray-500">Core details</p></div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Title <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none font-medium" placeholder="Title" value={form.title} onChange={(e) => update("title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <CategorySelector value={form.category} onChange={(v) => update("category", v)} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Slug</label>
                  <div className="flex items-center">
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 font-mono text-sm" value={form.slug} onChange={(e) => { setSlugManuallyEdited(true); update("slug", e.target.value); }} onBlur={(e) => update("slug", slugify(e.target.value))} />
                    <button type="button" onClick={() => { update("slug", slugify(form.title)); setSlugManuallyEdited(false); }} className="ml-3 text-xs text-gray-500 hover:text-blue-600">Reset</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none min-h-30 text-sm" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Media Manager */}
            <ProductImageManager product={form} onChange={setForm} />

            {/* Page Sections */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><Layout className="w-5 h-5 text-purple-600" /></div>
                  <div><h2 className="text-base font-semibold text-gray-900">Sections</h2><p className="text-sm text-gray-500">Modular blocks</p></div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {form.sections?.map((s: Section, i: number) => (
                  <div key={i} className="group relative border border-gray-200 rounded-xl p-5 bg-white hover:border-[#3B9ACB]/50 shadow-sm">
                    <button type="button" onClick={() => update("sections", form.sections.filter((_: any, x: number) => x !== i))} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                    <div className="space-y-4">
                      <input className="w-full text-lg font-bold placeholder-gray-300 border-none p-0 focus:ring-0 text-gray-900 bg-transparent outline-none" value={s.heading} onChange={(e) => { const c = [...form.sections]; c[i].heading = e.target.value; update("sections", c); }} />
                      {s.type === "text" && <textarea className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none min-h-20 text-sm" value={s.content} onChange={(e) => { const c = [...form.sections]; c[i].content = e.target.value; update("sections", c); }} />}
                      {s.type === "features" && <TagEditor values={s.bullets} onChange={(v) => { const c = [...form.sections]; c[i].bullets = v; update("sections", c); }} placeholder="Add bullet..." icon={<List className="w-4 h-4" />} />}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-[#3B9ACB] hover:bg-[#3B9ACB]/5 hover:text-[#3B9ACB] transition-all flex items-center justify-center gap-2" onClick={() => update("sections", [...(form.sections || []), { type: "text", heading: "", content: "" }])}><Type className="w-4 h-4" /> Add Text</button>
                  <button type="button" className="py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-[#3B9ACB] hover:bg-[#3B9ACB]/5 hover:text-[#3B9ACB] transition-all flex items-center justify-center gap-2" onClick={() => update("sections", [...(form.sections || []), { type: "features", heading: "", bullets: [] }])}><List className="w-4 h-4" /> Add List</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24 z-50">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-gray-500" /> Publishing</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
                  <select className="w-full bg-white border border-gray-200 text-sm font-bold rounded-lg px-3 py-2 focus:border-[#3B9ACB] outline-none" value={form.status} onChange={(e) => update("status", e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100"><input type="checkbox" className="w-5 h-5 text-[#3B9ACB] rounded focus:ring-[#3B9ACB] border-gray-300" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /><span className="text-sm font-bold text-gray-700">Mark as Featured</span></label>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-green-500" /> SEO</h3>
              <div className="space-y-4">
                <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Meta Title</label><input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" value={form.meta?.title || ""} onChange={(e) => update("meta", { ...form.meta, title: e.target.value })} /></div>
                <div className="space-y-1"><label className="text-xs font-bold text-gray-500">Meta Description</label><textarea className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none min-h-20" value={form.meta?.description || ""} onChange={(e) => update("meta", { ...form.meta, description: e.target.value })} /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-gray-500">Canonical Link</label><input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" placeholder="https://example.com/products/my-product" value={form.canonical || ""} onChange={(e) => update("canonical", e.target.value)} /><p className="text-xs text-gray-400">Optional — absolute URL or site-relative path (e.g., /products/other)</p></div>
                
                {/* Open Graph */}
                <div className="pt-3 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-600 mb-2 block">Open Graph</label>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">OG Type</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" value={form.ogType || "product"} onChange={(e) => update("ogType", e.target.value)}>
                        <option value="product">Product</option>
                        <option value="website">Website</option>
                        <option value="article">Article</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">OG Image URL</label>
                      <input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" placeholder="https://example.com/image.jpg" value={form.ogImage || ""} onChange={(e) => update("ogImage", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">OG Image Alt Text</label>
                      <input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" placeholder="Description of image" value={form.ogImageAlt || ""} onChange={(e) => update("ogImageAlt", e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Schema.org */}
                <div className="pt-3 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-600 mb-2 block">Schema.org</label>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Schema Type</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none" value={form.schemaType || "Product"} onChange={(e) => update("schemaType", e.target.value)}>
                        <option value="Product">Product</option>
                        <option value="Thing">Thing</option>
                        <option value="CreativeWork">Creative Work</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Schema Data (JSON)</label>
                      <textarea className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none font-mono min-h-32" placeholder='{"brand": "Techwin", "model": "XYZ"...}' value={typeof form.schemaData === "string" ? form.schemaData : JSON.stringify(form.schemaData || {}, null, 2)} onChange={(e) => update("schemaData", e.target.value)} />
                      <p className="text-xs text-gray-400">Additional Schema.org properties in JSON format</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-amber-500" /> Features</h3>
              <TagEditor values={form.features || []} onChange={(v) => update("features", v)} placeholder="Add feature..." />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Layout className="w-4 h-4 text-indigo-500" /> Applications</h3>
              <TagEditor values={form.applicationAreas || []} onChange={(v) => update("applicationAreas", v)} placeholder="Add application..." />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}