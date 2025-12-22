"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

import { 
  Save, ArrowLeft, Layout, List, Globe, Tag, FileText, 
  Plus, Trash2, Settings, ChevronRight, X, Image as ImageIcon, 
  Upload, Loader2, AlertCircle, Layers, CheckCircle2, Link as LinkIcon,
  Zap, Briefcase, TrendingUp, Building2, Grid
} from "lucide-react";

interface CategoryFormState {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  
  // Open Graph
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  
  // Schema.org
  schemaType?: string;
  schemaData?: string; // JSON string
  
  hero: {
    title: string;
    tagline: string;
    image: string;
    imageAlt: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  intro: {
    heading: string;
    description: string;
  };
  keyFeatures: string[];
  subCategories: Array<{
    id?: string;
    name: string;
    shortDescription: string;
    details?: string;
  }>;
  technicalBenefits: string[];
  applications: string[];
  cta: {
    heading?: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  contactPhone?: string;
  notes?: string;
  status: "draft" | "published";
  headingLevels?: {
    hero?: string;
    intro?: string;
    keyFeatures?: string;
    subCategories?: string;
    technicalBenefits?: string;
    applications?: string;
    cta?: string;
  };
}

/* --------------------------------------------------------------------------------
   HELPER: Inline Image Uploader
-------------------------------------------------------------------------------- */
function InlineImageUploader({ 
  label, 
  image, 
  onChange, 
  heightClass = "aspect-video" 
}: { 
  label: string; 
  image: string; 
  onChange: (url: string) => void;
  heightClass?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "category");
      
      // Get category slug from parent form state
      const categorySlug = (window as any).__categorySlug || "uncategorized";
      formData.append("slug", categorySlug);

      console.log("🔵 Starting category image upload...", {
        file: file.name,
        size: file.size,
        slug: categorySlug
      });

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      console.log("🔵 Upload response:", json);
      
      if (json.success && json.url) {
        console.log("✅ Image uploaded successfully:", json.url);
        onChange(json.url);
      } else {
        console.error("❌ Upload failed:", json);
        alert("Upload failed: " + (json.message || "Unknown error"));
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-gray-700">{label}</label>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      
      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative group w-full ${heightClass} rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
          image ? "border-[#3B9ACB]/30 bg-[#3B9ACB]/5" : "border-gray-200 hover:border-[#3B9ACB] hover:bg-gray-50"
        } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {uploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
            <Loader2 className="w-8 h-8 text-[#3B9ACB] animate-spin mb-2" />
            <p className="text-sm font-medium text-gray-600">Uploading...</p>
          </div>
        ) : image ? (
          <>
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <p className="text-white font-bold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                 <Upload className="w-4 h-4" /> Change Image
               </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-[#3B9ACB]" />
            </div>
            <p className="text-sm font-bold text-gray-600">Click to upload image</p>
            <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   HELPER: List Editor (Simple Strings)
-------------------------------------------------------------------------------- */
function ListEditor({
  title,
  values,
  onChange,
  icon: Icon,
  placeholder = "Add item"
}: {
  title: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  icon: any;
  placeholder?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#3B9ACB]" />
          {title}
        </label>
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="text-sm font-medium text-[#3B9ACB] hover:text-[#2A7DA8] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((val, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const updated = [...values];
                updated[idx] = e.target.value;
                onChange(updated);
              }}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, i) => i !== idx))}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {values.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">
            No items added yet. Click "Add" to start.
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   HELPER: SubCategory Editor
-------------------------------------------------------------------------------- */
function SubCategoryEditor({
  subCategories,
  onChange
}: {
  subCategories: Array<{ id?: string; name: string; shortDescription: string; details?: string }>;
  onChange: (newSubs: Array<{ id?: string; name: string; shortDescription: string; details?: string }>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <Grid className="w-4 h-4 text-purple-500" />
          Sub-Categories
        </label>
        <button
          type="button"
          onClick={() => onChange([...subCategories, { name: "", shortDescription: "", details: "" }])}
          className="text-sm font-medium text-[#3B9ACB] hover:text-[#2A7DA8] flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Sub-Category
        </button>
      </div>
      <div className="space-y-4">
        {subCategories.map((sub, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500">Sub-Category {idx + 1}</span>
              <button
                type="button"
                onClick={() => onChange(subCategories.filter((_, i) => i !== idx))}
                className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <input
              type="text"
              value={sub.id || ""}
              onChange={(e) => {
                const updated = [...subCategories];
                updated[idx] = { ...updated[idx], id: e.target.value };
                onChange(updated);
              }}
              placeholder="ID (e.g., broadband)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none text-sm"
            />
            
            <input
              type="text"
              value={sub.name}
              onChange={(e) => {
                const updated = [...subCategories];
                updated[idx] = { ...updated[idx], name: e.target.value };
                onChange(updated);
              }}
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none font-medium"
            />
            
            <textarea
              value={sub.shortDescription}
              onChange={(e) => {
                const updated = [...subCategories];
                updated[idx] = { ...updated[idx], shortDescription: e.target.value };
                onChange(updated);
              }}
              placeholder="Short Description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none text-sm"
            />
            
            <textarea
              value={sub.details || ""}
              onChange={(e) => {
                const updated = [...subCategories];
                updated[idx] = { ...updated[idx], details: e.target.value };
                onChange(updated);
              }}
              placeholder="Details (optional)"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none text-sm"
            />
          </div>
        ))}
        {subCategories.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">
            No sub-categories added yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   MAIN COMPONENT: Category Editor
-------------------------------------------------------------------------------- */
export default function CategoryEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = Boolean(id);

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState<CategoryFormState>({
    slug: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogType: "website",
    ogImage: "",
    ogImageAlt: "",
    schemaType: "Product",
    schemaData: "",
    hero: {
      title: "",
      tagline: "",
      image: "",
      imageAlt: "",
      ctaPrimary: { label: "Request Quote", href: "/contact" },
      ctaSecondary: { label: "", href: "" },
    },
    intro: {
      heading: "",
      description: "",
    },
    keyFeatures: [],
    subCategories: [],
    technicalBenefits: [],
    applications: [],
    cta: {
      heading: "Get Started Today",
      primary: { label: "Request Quote", href: "/contact" },
      secondary: { label: "Contact Sales", href: "/contact" },
    },
    contactPhone: "",
    notes: "",
    status: "draft",
    headingLevels: {
      hero: "h1",
      intro: "h2",
      keyFeatures: "h2",
      subCategories: "h2",
      technicalBenefits: "h2",
      applications: "h2",
      cta: "h2",
    },
  });

  // Debug: Log when hero image changes
  useEffect(() => {
    console.log("Hero image updated:", form.hero.image);
  }, [form.hero.image]);

  // Set slug in window for upload handler
  useEffect(() => {
    if (form.slug) {
      (window as any).__categorySlug = form.slug;
    }
  }, [form.slug]);

  // --- FETCH DATA ---
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`/api/admin/categories/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.category) {
          const cat = d.category;
          setForm({
            slug: cat.slug || "",
            metaTitle: cat.metaTitle || "",
            metaDescription: cat.metaDescription || "",
            canonicalUrl: cat.canonicalUrl || "",
            ogType: cat.ogType || "website",
            ogImage: cat.ogImage || "",
            ogImageAlt: cat.ogImageAlt || "",
            schemaType: cat.schemaType || "Product",
            schemaData: cat.schemaData ? JSON.stringify(cat.schemaData, null, 2) : "",
            hero: {
              title: cat.hero?.title || "",
              tagline: cat.hero?.tagline || "",
              image: cat.hero?.image || "",
              imageAlt: cat.hero?.imageAlt || "",
              ctaPrimary: cat.hero?.ctaPrimary || { label: "Request Quote", href: "/contact" },
              ctaSecondary: cat.hero?.ctaSecondary || { label: "", href: "" },
            },
            intro: {
              heading: cat.intro?.heading || "",
              description: cat.intro?.description || "",
            },
            keyFeatures: cat.keyFeatures || [],
            subCategories: cat.subCategories || [],
            technicalBenefits: cat.technicalBenefits || [],
            applications: cat.applications || [],
            cta: {
              heading: cat.cta?.heading || "Get Started Today",
              primary: cat.cta?.primary || { label: "Request Quote", href: "/contact" },
              secondary: cat.cta?.secondary || { label: "Contact Sales", href: "/contact" },
            },
            contactPhone: cat.contactPhone || "",
            notes: cat.notes || "",
            status: cat.status || "draft",
            headingLevels: cat.headingLevels || {
              hero: "h1",
              intro: "h2",
              keyFeatures: "h2",
              subCategories: "h2",
              technicalBenefits: "h2",
              applications: "h2",
              cta: "h2",
            },
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load category");
        setLoading(false);
      });
  }, [id]);

  // --- HANDLERS ---
  async function save() {
    if (!form.metaTitle.trim()) {
      alert("Please enter a Meta Title");
      return;
    }
    if (!form.slug.trim()) {
      alert("Please enter a Slug");
      return;
    }

    setSaving(true);
    setError("");
    
    try {
      // Clean up empty CTA objects
      const cleanedForm = {
        ...form,
        url: `/products/${form.slug}`,
        hero: {
          ...form.hero,
          ctaPrimary: form.hero.ctaPrimary?.label && form.hero.ctaPrimary?.href 
            ? form.hero.ctaPrimary 
            : undefined,
          ctaSecondary: form.hero.ctaSecondary?.label && form.hero.ctaSecondary?.href 
            ? form.hero.ctaSecondary 
            : undefined,
        },
        intro: form.intro.heading || form.intro.description 
          ? form.intro 
          : undefined,
        cta: {
          ...form.cta,
          primary: form.cta.primary?.label && form.cta.primary?.href 
            ? form.cta.primary 
            : undefined,
          secondary: form.cta.secondary?.label && form.cta.secondary?.href 
            ? form.cta.secondary 
            : undefined,
        },
      };

      console.log("Saving category with payload:", cleanedForm);

      const res = await fetch(`/api/admin/categories${isEdit ? `/${id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedForm),
      });

      const json = await res.json();
      console.log("API Response:", json);
      
      if (json.success) {
        alert("Category saved successfully!");
        router.push("/admin/categories");
      } else {
        alert(`Error: ${json.message || "Failed to save category"}`);
        setError(json.message || "Failed to save category");
        setSaving(false);
      }
    } catch (err: any) {
      console.error("Save error:", err);
      alert(`Network error: ${err.message}`);
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  // --- HELPERS ---
  function slugify(text: string) {
    return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 font-sans pb-20">
      {loading && isEdit && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-xl">
            <Loader2 className="w-10 h-10 animate-spin text-[#3B9ACB]" />
            <p className="font-medium text-slate-600">Loading category...</p>
          </div>
        </div>
      )}
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#3B9ACB]" />
              {isEdit ? "Edit Category" : "New Category"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEdit ? `Editing: ${form.metaTitle || "Untitled"}` : "Create a new product category"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2 bg-[#3B9ACB] hover:bg-[#2A7DA8] text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#3B9ACB]/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Category"}
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mt-6 px-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* --- FORM CONTENT --- */}
      <div className="max-w-5xl mx-auto mt-8 px-6 space-y-8">
        
        {/* BASIC INFO */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-[#3B9ACB]/10 rounded-lg">
              <Tag className="w-5 h-5 text-[#3B9ACB]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
              <p className="text-sm text-gray-500">Category title, slug, and metadata</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Meta Title *</label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                placeholder="Broadband & ASE Light Sources"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                placeholder="ase-sources"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all font-mono text-sm"
              />
              <p className="text-xs text-gray-400">URL: /products/{form.slug || "slug"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Meta Description</label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              placeholder="Brief description for SEO..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none transition-all"
            />
          </div>

          {/* SEO FIELDS */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Advanced SEO
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Canonical URL</label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                placeholder="https://techwin.com/products/single-frequency"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all text-sm"
              />
              <p className="text-xs text-gray-400">Leave empty to auto-generate from slug</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Open Graph Type</label>
                <select
                  value={form.ogType}
                  onChange={(e) => setForm({ ...form, ogType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all text-sm"
                >
                  <option value="website">Website</option>
                  <option value="product">Product</option>
                  <option value="article">Article</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Schema.org Type</label>
                <select
                  value={form.schemaType}
                  onChange={(e) => setForm({ ...form, schemaType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none transition-all text-sm"
                >
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Schema.org JSON-LD (Optional)</label>
              <textarea
                value={form.schemaData}
                onChange={(e) => setForm({ ...form, schemaData: e.target.value })}
                placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "Product Name"\n}'
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none transition-all text-sm font-mono"
              />
              <p className="text-xs text-gray-400">Add custom Schema.org structured data (JSON format)</p>
            </div>
          </div>
        </section>

        {/* HERO SECTION */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Layout className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hero Section</h2>
              <p className="text-sm text-gray-500">Main banner content</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Hero Title</label>
            <input
              type="text"
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              placeholder="Broadband & ASE Light Sources – High-Performance Solutions"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Hero Tagline</label>
            <textarea
              value={form.hero.tagline}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, tagline: e.target.value } })}
              placeholder="Stable spectral output and low-noise broadband illumination..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none"
            />
          </div>

          <InlineImageUploader
            label="Hero Image"
            image={form.hero.image}
            onChange={(url) => setForm({ ...form, hero: { ...form.hero, image: url } })}
            heightClass="aspect-[21/9]"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Image Alt Text</label>
            <input
              type="text"
              value={form.hero.imageAlt}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, imageAlt: e.target.value } })}
              placeholder="Broadband ASE light source module"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Primary CTA Label</label>
              <input
                type="text"
                value={form.hero.ctaPrimary?.label || ""}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaPrimary: { ...form.hero.ctaPrimary!, label: e.target.value } } })}
                placeholder="Request Quote"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Primary CTA Link</label>
              <input
                type="text"
                value={form.hero.ctaPrimary?.href || ""}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaPrimary: { ...form.hero.ctaPrimary!, href: e.target.value } } })}
                placeholder="/contact"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              />
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FileText className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Introduction</h2>
              <p className="text-sm text-gray-500">Category overview</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Intro Heading</label>
            <input
              type="text"
              value={form.intro.heading}
              onChange={(e) => setForm({ ...form, intro: { ...form.intro, heading: e.target.value } })}
              placeholder="Broadband and ASE Light Sources"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Intro Description</label>
            <textarea
              value={form.intro.description}
              onChange={(e) => setForm({ ...form, intro: { ...form.intro, description: e.target.value } })}
              placeholder="Detailed introduction about the category..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none"
            />
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Key Features</h2>
              <p className="text-sm text-gray-500">Highlight main features</p>
            </div>
          </div>

          <ListEditor
            title="Features List"
            values={form.keyFeatures}
            onChange={(values) => setForm({ ...form, keyFeatures: values })}
            icon={CheckCircle2}
            placeholder="Wide spectral bandwidth..."
          />
        </section>

        {/* SUB-CATEGORIES */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Grid className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sub-Categories</h2>
              <p className="text-sm text-gray-500">Product sub-categories within this category</p>
            </div>
          </div>

          <SubCategoryEditor
            subCategories={form.subCategories}
            onChange={(values) => setForm({ ...form, subCategories: values })}
          />
        </section>

        {/* TECHNICAL BENEFITS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Technical Benefits</h2>
              <p className="text-sm text-gray-500">Technical advantages</p>
            </div>
          </div>

          <ListEditor
            title="Benefits List"
            values={form.technicalBenefits}
            onChange={(values) => setForm({ ...form, technicalBenefits: values })}
            icon={CheckCircle2}
            placeholder="High precision measurement..."
          />
        </section>

        {/* APPLICATIONS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Building2 className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Applications</h2>
              <p className="text-sm text-gray-500">Industries and use cases</p>
            </div>
          </div>

          <ListEditor
            title="Applications List"
            values={form.applications}
            onChange={(values) => setForm({ ...form, applications: values })}
            icon={Briefcase}
            placeholder="Fiber optic sensing..."
          />
        </section>

        {/* CTA & CONTACT */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <LinkIcon className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Call to Action & Contact</h2>
              <p className="text-sm text-gray-500">Bottom CTA section</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">CTA Heading</label>
            <input
              type="text"
              value={form.cta.heading}
              onChange={(e) => setForm({ ...form, cta: { ...form.cta, heading: e.target.value } })}
              placeholder="Get Started Today"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Primary Button Label</label>
              <input
                type="text"
                value={form.cta.primary.label}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, primary: { ...form.cta.primary, label: e.target.value } } })}
                placeholder="Request Quote"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Primary Button Link</label>
              <input
                type="text"
                value={form.cta.primary.href}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, primary: { ...form.cta.primary, href: e.target.value } } })}
                placeholder="/contact"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Contact Phone</label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              placeholder="+86-13958180450"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Additional notes or instructions..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none resize-none"
            />
          </div>
        </section>

        {/* HEADING LEVELS (SEO) */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Heading Levels (SEO)</h2>
              <p className="text-sm text-gray-500">Control H1-H6 tags for each section</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Hero Heading</label>
              <select
                value={form.headingLevels?.hero || "h1"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, hero: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1 (Page Title)</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Intro Heading</label>
              <select
                value={form.headingLevels?.intro || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, intro: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Key Features Heading</label>
              <select
                value={form.headingLevels?.keyFeatures || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, keyFeatures: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Products Heading</label>
              <select
                value={form.headingLevels?.subCategories || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, subCategories: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Technical Benefits Heading</label>
              <select
                value={form.headingLevels?.technicalBenefits || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, technicalBenefits: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Applications Heading</label>
              <select
                value={form.headingLevels?.applications || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, applications: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">CTA Heading</label>
              <select
                value={form.headingLevels?.cta || "h2"}
                onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, cta: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B9ACB]/20 focus:border-[#3B9ACB] outline-none"
              >
                <option value="h1">H1</option>
                <option value="h2">H2 (Section Title)</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
            <strong>SEO Tip:</strong> Use H1 for main page title, H2 for major sections, H3-H6 for subsections. Proper heading hierarchy improves SEO and accessibility.
          </div>
        </section>

      </div>
    </div>
  );
}
