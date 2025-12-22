"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
  Save, ArrowLeft, Layout, List, Globe, Tag, FileText, 
  Plus, Trash2, Settings, ChevronRight, X, 
  Loader2, AlertCircle, Layers, CheckCircle2, Link as LinkIcon,
  Zap, Briefcase, TrendingUp, Building2
} from "lucide-react";

import type { Application } from "@/types/application";
import InlineImageUploader from "./InlineImageUploader";

interface ApplicationFormState {
  slug: string;
  title: string;
  shortDescription?: string;
  hero: { title: string; image: string; subtitle?: string };
  whiteHeroTitle?: string;
  whiteHeroDescription?: string;
  status: "draft" | "published";
  overview?: string;
  keyFeatures?: string[];
  useCases?: string[];
  benefits?: string[];
  industries?: string[];
  galleryImages?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  
  // Open Graph
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  
  // Schema.org
  schemaType?: string;
  schemaData?: string; // JSON string
  
  headingLevels?: {
    hero?: string;
    whiteHero?: string;
    overview?: string;
    features?: string;
    useCases?: string;
    benefits?: string;
    cta?: string;
  };
}

/* --------------------------------------------------------------------------------
   HELPER: List Editor
-------------------------------------------------------------------------------- */
function ListEditor({
  title,
  values,
  onChange,
  icon,
  placeholder = "Add item..."
}: {
  title: string;
  values: string[];
  onChange: (v: string[]) => void;
  icon: React.ReactNode;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onChange([...values, input.trim()]);
    setInput("");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
        {icon} {title}
      </label>
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none transition-all"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.length === 0 && <span className="text-xs text-gray-400 italic">No items added yet.</span>}
        {values.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3B9ACB]/10 text-[#3B9ACB] text-sm font-bold border border-[#3B9ACB]/20 group">
            {v}
            <button onClick={() => onChange(values.filter((_, x) => x !== i))} className="text-[#3B9ACB]/50 hover:text-red-500 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------------
   MAIN COMPONENT: Application Editor
-------------------------------------------------------------------------------- */
export default function ApplicationEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = Boolean(id);

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState<ApplicationFormState>({
    slug: "",
    title: "",
    shortDescription: "",
    hero: { title: "", image: "", subtitle: "" },
    whiteHeroTitle: "",
    whiteHeroDescription: "",
    status: "draft",
    overview: "",
    keyFeatures: [],
    useCases: [],
    benefits: [],
    industries: [],
    galleryImages: [],
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    headingLevels: {
      hero: "h1",
      whiteHero: "h2",
      overview: "h2",
      features: "h2",
      useCases: "h2",
      benefits: "h2",
      cta: "h2",
    },
  });

  // Set slug in window for upload handler
  useEffect(() => {
    if (form.slug) {
      (window as any).__applicationSlug = form.slug;
    }
  }, [form.slug]);

  // --- FETCH DATA ---
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`/api/admin/applications/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const data = d.data;
          setForm({
            ...data,
            headingLevels: data.headingLevels || {
              hero: "h1",
              whiteHero: "h2",
              overview: "h2",
              features: "h2",
              useCases: "h2",
              benefits: "h2",
              cta: "h2",
            },
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load application");
        setLoading(false);
      });
  }, [id]);

  // --- HANDLERS ---
  async function save() {
    setSaving(true);
    setError("");
    
    try {
      await new Promise(r => setTimeout(r, 800)); 
      
      const res = await fetch(`/api/admin/applications${isEdit ? `/${id}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(e => console.error(e));

      router.push("/admin/applications");
    } catch (err) {
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
            <p className="font-medium text-slate-600">Loading application...</p>
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
            <h1 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit Application" : "New Application"}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Applications</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#3B9ACB] font-medium">{form.title || "Untitled"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/applications")}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#3B9ACB] rounded-xl hover:bg-[#2A7DA8] transition-all disabled:opacity-50 shadow-lg shadow-[#3B9ACB]/20 active:scale-95 transform"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Application"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. BASIC INFO */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>
                  <p className="text-sm text-gray-500">Application details & description</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Application Title <span className="text-red-500">*</span></label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none font-medium transition-all"
                      placeholder="e.g. LiDAR Systems"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Slug <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">/application/</span>
                      <input 
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none font-mono text-sm"
                        placeholder="lidar-systems"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Short Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none min-h-25 text-sm resize-y"
                    placeholder="Brief description for the listing page..."
                    value={form.shortDescription || ""}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 2. HERO SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg"><Layout className="w-5 h-5 text-indigo-600" /></div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Hero Section</h2>
                  <p className="text-sm text-gray-500">Banner content and visual</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Hero Title <span className="text-red-500">*</span></label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none font-medium"
                      placeholder="Main banner title"
                      value={form.hero.title}
                      onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subtitle</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none font-medium"
                      placeholder="Optional banner subtitle"
                      value={form.hero.subtitle || ""}
                      onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle: e.target.value } })}
                    />
                  </div>
                </div>
                
                <InlineImageUploader
                  label="Hero Background Image"
                  currentImage={form.hero.image}
                  onImageUploaded={(url) => setForm({ ...form, hero: { ...form.hero, image: url } })}
                  uploadType="application"
                  slug={form.slug || "uncategorized"}
                  heightClass="aspect-[21/9]"
                />
              </div>
            </div>

            {/* 2.5. WHITE HERO SECTION (Overview Section) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg"><FileText className="w-5 h-5 text-cyan-600" /></div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Overview Section</h2>
                  <p className="text-sm text-gray-500">Why this application? (appears after hero)</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Section Title</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none font-medium"
                    placeholder="e.g., Why Gravitational Wave Detection?"
                    value={form.whiteHeroTitle || ""}
                    onChange={(e) => setForm({ ...form, whiteHeroTitle: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate: "Why [Application Title]"</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none min-h-32 text-sm resize-y"
                    placeholder="Explain why this application is important and what problems it solves..."
                    value={form.whiteHeroDescription || ""}
                    onChange={(e) => setForm({ ...form, whiteHeroDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 3. DETAILED CONTENT & LISTS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg"><Layers className="w-5 h-5 text-amber-600" /></div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Page Content</h2>
                  <p className="text-sm text-gray-500">Detailed overview and lists</p>
                </div>
              </div>
              <div className="p-6 space-y-8">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Overview Text</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#3B9ACB] outline-none min-h-[150px] text-sm resize-y"
                    placeholder="Comprehensive overview of the application..."
                    value={form.overview || ""}
                    onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                  <ListEditor
                    title="Key Features"
                    icon={<Tag className="w-4 h-4 text-blue-500" />}
                    values={form.keyFeatures || []}
                    onChange={(v) => setForm({ ...form, keyFeatures: v })}
                    placeholder="Add feature (Enter)"
                  />
                  <ListEditor
                    title="Use Cases"
                    icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
                    values={form.useCases || []}
                    onChange={(v) => setForm({ ...form, useCases: v })}
                    placeholder="Add use case (Enter)"
                  />
                  <ListEditor
                    title="Benefits"
                    icon={<Zap className="w-4 h-4 text-purple-500" />}
                    values={form.benefits || []}
                    onChange={(v) => setForm({ ...form, benefits: v })}
                    placeholder="Add benefit (Enter)"
                  />
                  <ListEditor
                    title="Industries"
                    icon={<Building2 className="w-4 h-4 text-orange-500" />}
                    values={form.industries || []}
                    onChange={(v) => setForm({ ...form, industries: v })}
                    placeholder="Add industry (Enter)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (SIDEBAR) --- */}
          <div className="space-y-6">
            
            {/* 1. SEO (Moved Up) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" /> Search Engine Optimization
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Meta Title</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                    placeholder="SEO Title"
                    value={form.metaTitle || ""}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Meta Description</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none min-h-20 resize-none"
                    placeholder="Description for search results..."
                    value={form.metaDescription || ""}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> Canonical URL
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none font-mono"
                    placeholder="https://example.com/application/your-slug"
                    value={form.canonicalUrl || ""}
                    onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                  />
                </div>

                {/* Open Graph & Schema */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h4 className="text-xs font-bold text-gray-600">Advanced SEO</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Open Graph Type</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                      value={form.ogType || "article"}
                      onChange={(e) => setForm({ ...form, ogType: e.target.value })}
                    >
                      <option value="article">Article</option>
                      <option value="website">Website</option>
                      <option value="product">Product</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Schema.org Type</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                      value={form.schemaType || "Service"}
                      onChange={(e) => setForm({ ...form, schemaType: e.target.value })}
                    >
                      <option value="Service">Service</option>
                      <option value="Product">Product</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Schema.org JSON-LD</label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-xs focus:bg-white focus:border-[#3B9ACB] outline-none min-h-24 resize-none font-mono"
                      placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Service"\n}'
                      value={form.schemaData || ""}
                      onChange={(e) => setForm({ ...form, schemaData: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PUBLISHING (Moved Down) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" /> Publishing Settings
              </h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
                <select
                  className="w-full bg-white border border-gray-200 text-sm font-bold rounded-lg px-3 py-2 focus:border-[#3B9ACB] outline-none"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Live)</option>
                </select>
              </div>
            </div>

            {/* 4. HEADING LEVELS (SEO) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-500" /> Heading Levels (SEO)
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Hero Heading</label>
                  <select
                    value={form.headingLevels?.hero || "h1"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, hero: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1 (Page Title)</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">White Hero</label>
                  <select
                    value={form.headingLevels?.whiteHero || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, whiteHero: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Key Features</label>
                  <select
                    value={form.headingLevels?.features || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, features: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2 (Section)</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Overview</label>
                  <select
                    value={form.headingLevels?.overview || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, overview: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Use Cases</label>
                  <select
                    value={form.headingLevels?.useCases || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, useCases: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Benefits</label>
                  <select
                    value={form.headingLevels?.benefits || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, benefits: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">CTA Section</label>
                  <select
                    value={form.headingLevels?.cta || "h2"}
                    onChange={(e) => setForm({ ...form, headingLevels: { ...form.headingLevels, cta: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#3B9ACB] outline-none"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700">
                <strong>Tip:</strong> H1 for page title, H2 for sections
              </div>
            </div>

            {/* 3. TIPS */}
            <div className="bg-[#3B9ACB]/5 rounded-2xl border border-[#3B9ACB]/20 p-6">
               <h4 className="text-[#3B9ACB] font-bold text-sm mb-2 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> Tips
               </h4>
               <ul className="text-xs text-[#3B9ACB]/80 space-y-2 list-disc pl-4">
                 <li>Use high-quality images for the hero section (1920x600 recommended).</li>
                 <li>Keep the slug simple and URL-friendly.</li>
                 <li>Add at least 3 key features for better visibility.</li>
               </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}