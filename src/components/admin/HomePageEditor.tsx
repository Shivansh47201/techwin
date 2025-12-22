"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InlineImageUploader from "./InlineImageUploader";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, Sparkles, Zap, Building2, Award, CheckCircle2, XCircle } from "lucide-react";

interface HeroSlide {
  id: string;
  image: string;
  headline: string;
  sub: string;
  ctaLabel?: string;
  ctaLink?: string;
}

interface Highlight {
  label: string;
  value: string;
}

interface TechSpec {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

interface SEO {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export default function HomePageEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Toast notification state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };
  
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [companyImage, setCompanyImage] = useState("");
  const [companyHeadline, setCompanyHeadline] = useState("");
  const [companyText, setCompanyText] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  
  // Technical Highlights
  const [techHeading, setTechHeading] = useState("");
  const [techSubheading, setTechSubheading] = useState("");
  const [techSpecs, setTechSpecs] = useState<TechSpec[]>([]);

  // Trust Strip
  const [trustHeading, setTrustHeading] = useState("");
  const [trustBullets, setTrustBullets] = useState<string[]>([]);
  const [trustCounters, setTrustCounters] = useState<Array<{ id: string; label: string; value: string }>>([]);
  const [trustLogos, setTrustLogos] = useState<Array<{ id: string; src: string; alt: string }>>([]);
  const [trustCtaLabel, setTrustCtaLabel] = useState("");

  // SEO
  const [seo, setSeo] = useState<SEO>({
    title: "",
    description: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  });

  // Heading Levels
  const [headingLevels, setHeadingLevels] = useState({
    hero: 'h1',
    companyProfile: 'h2',
    productFamilies: 'h2',
    applications: 'h2',
    trustStrip: 'h3',
    techHighlights: 'h2',
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const res = await fetch("/api/admin/pages/home");
      const data = await res.json();
      
      setHeroSlides(data.heroSlides || []);
      setCompanyImage(data.companyProfile?.image || "");
      setCompanyHeadline(data.companyProfile?.headline || "");
      setCompanyText(data.companyProfile?.text || "");
      setHighlights(data.companyProfile?.highlights || []);
      
      setTechHeading(data.technicalHighlights?.heading || "Technical Highlights");
      setTechSubheading(data.technicalHighlights?.subheading || "Key specifications that define Techwin's high-performance laser excellence.");
      setTechSpecs(data.technicalHighlights?.specs || []);
      
      setTrustHeading(data.trustStrip?.heading || "Why Techwin — Trusted Worldwide");
      setTrustBullets(data.trustStrip?.bullets || []);
      setTrustCounters(data.trustStrip?.counters || []);
      setTrustLogos(data.trustStrip?.logos || []);
      setTrustCtaLabel(data.trustStrip?.ctaLabel || "Request a Quote");
      
      setSeo(data.seo || {
        title: "",
        description: "",
        canonical: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterCard: "summary_large_image",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
      });

      setHeadingLevels(data.headingLevels || {
        hero: 'h1',
        companyProfile: 'h2',
        productFamilies: 'h2',
        applications: 'h2',
        trustStrip: 'h3',
        techHighlights: 'h2',
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching page:", error);
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const pageData = {
        heroSlides,
        companyProfile: {
          image: companyImage,
          headline: companyHeadline,
          text: companyText,
          highlights,
        },
        technicalHighlights: {
          heading: techHeading,
          subheading: techSubheading,
          specs: techSpecs,
        },
        trustStrip: {
          heading: trustHeading,
          bullets: trustBullets,
          counters: trustCounters,
          logos: trustLogos,
          ctaLabel: trustCtaLabel,
        },
        seo,
        headingLevels,
      };

      const res = await fetch("/api/admin/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (res.ok) {
        showToast("✅ Home page updated successfully!", "success");
        router.refresh();
      } else {
        const error = await res.json();
        showToast(`❌ Error: ${error.error || "Failed to update page"}`, "error");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      showToast("❌ Failed to save page. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const addSlide = () => {
    setHeroSlides([
      ...heroSlides,
      {
        id: Date.now().toString(),
        image: "",
        headline: "",
        sub: "",
        ctaLabel: "",
        ctaLink: "",
      },
    ]);
  };

  const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    setHeroSlides(updated);
  };

  const removeSlide = (index: number) => {
    setHeroSlides(heroSlides.filter((_, i) => i !== index));
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const updated = [...heroSlides];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setHeroSlides(updated);
  };

  const addHighlight = () => {
    setHighlights([...highlights, { label: "", value: "" }]);
  };

  const updateHighlight = (index: number, field: "label" | "value", value: string) => {
    const updated = [...highlights];
    updated[index] = { ...updated[index], [field]: value };
    setHighlights(updated);
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addTechSpec = () => {
    setTechSpecs([
      ...techSpecs,
      { id: Date.now().toString(), title: "", desc: "", icon: "Sparkles" },
    ]);
  };

  const updateTechSpec = (index: number, field: keyof TechSpec, value: string) => {
    const updated = [...techSpecs];
    updated[index] = { ...updated[index], [field]: value };
    setTechSpecs(updated);
  };

  const removeTechSpec = (index: number) => {
    setTechSpecs(techSpecs.filter((_, i) => i !== index));
  };

  const moveTechSpec = (index: number, direction: "up" | "down") => {
    const updated = [...techSpecs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setTechSpecs(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#3B9ACB]" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Home Page
              </h1>
              <p className="text-sm text-gray-500">Customize hero slides & company profile</p>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B9ACB] to-[#2A7DA8] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 font-bold"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="container mx-auto p-6 space-y-8 max-w-7xl">
        
        {/* Hero Slides Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#3B9ACB] to-[#2A7DA8] flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> Hero Banner Slides
              </h2>
              <p className="text-blue-100 text-sm mt-1">Main carousel slides on homepage</p>
            </div>
            <button
              type="button"
              onClick={addSlide}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#3B9ACB] rounded-xl hover:bg-blue-50 transition-all font-bold shadow-lg"
            >
              <Plus className="w-5 h-5" /> Add Slide
            </button>
          </div>

          <div className="p-6 space-y-6">
            {heroSlides.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No slides yet. Click "Add Slide" to create one.</p>
              </div>
            )}
            
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/50 hover:border-[#3B9ACB]/30 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Slide {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => moveSlide(index, "up")}
                      disabled={index === 0}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-all"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSlide(index, "down")}
                      disabled={index === heroSlides.length - 1}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-all"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
                      <input
                        type="text"
                        value={slide.headline}
                        onChange={(e) => updateSlide(index, "headline", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all"
                        placeholder="Main headline text"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subheading</label>
                      <textarea
                        value={slide.sub}
                        onChange={(e) => updateSlide(index, "sub", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all resize-none"
                        rows={3}
                        placeholder="Supporting text"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">CTA Button Text</label>
                        <input
                          type="text"
                          value={slide.ctaLabel || ""}
                          onChange={(e) => updateSlide(index, "ctaLabel", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all"
                          placeholder="e.g., Learn More"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">CTA Link</label>
                        <input
                          type="text"
                          value={slide.ctaLink || ""}
                          onChange={(e) => updateSlide(index, "ctaLink", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all"
                          placeholder="/products"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <InlineImageUploader
                      label="Slide Background Image"
                      currentImage={slide.image}
                      onImageUploaded={(url) => updateSlide(index, "image", url)}
                      uploadType="pages"
                      slug={`home-slide-${index + 1}`}
                      heightClass="aspect-[16/9]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6" /> Company Profile Section
            </h2>
            <p className="text-purple-100 text-sm mt-1">About company with highlights</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={companyHeadline}
                onChange={(e) => setCompanyHeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none transition-all"
                placeholder="Company headline"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                value={companyText}
                onChange={(e) => setCompanyText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none transition-all resize-none"
                rows={4}
                placeholder="Company description"
                required
              />
            </div>

            <InlineImageUploader
              label="Company Image"
              currentImage={companyImage}
              onImageUploaded={setCompanyImage}
              uploadType="pages"
              slug="home-company"
              heightClass="aspect-video"
            />

            {/* Highlights */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Highlights</h3>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-end mb-2">
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={highlight.label}
                        onChange={(e) => updateHighlight(index, "label", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        placeholder="Label (e.g., Years)"
                        required
                      />
                      <input
                        type="text"
                        value={highlight.value}
                        onChange={(e) => updateHighlight(index, "value", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-bold"
                        placeholder="Value (e.g., 20+)"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Highlights Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6" /> Technical Highlights
            </h2>
            <p className="text-orange-100 text-sm mt-1">Key specifications & features</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Heading</label>
                <input
                  type="text"
                  value={techHeading}
                  onChange={(e) => setTechHeading(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-all"
                  placeholder="Technical Highlights"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subheading</label>
                <input
                  type="text"
                  value={techSubheading}
                  onChange={(e) => setTechSubheading(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition-all"
                  placeholder="Key specifications..."
                  required
                />
              </div>
            </div>

            {/* Specs */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Specifications</h3>
                <button
                  type="button"
                  onClick={addTechSpec}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Spec
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {techSpecs.map((spec, index) => (
                  <div key={spec.id} className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-600">Spec {index + 1}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveTechSpec(index, "up")}
                          disabled={index === 0}
                          className="p-1.5 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveTechSpec(index, "down")}
                          disabled={index === techSpecs.length - 1}
                          className="p-1.5 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTechSpec(index)}
                          className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Icon</label>
                        <select
                          value={spec.icon}
                          onChange={(e) => updateTechSpec(index, "icon", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                          required
                        >
                          <option value="Waves">Waves</option>
                          <option value="Activity">Activity</option>
                          <option value="Radio">Radio</option>
                          <option value="Zap">Zap</option>
                          <option value="Ruler">Ruler</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Settings">Settings</option>
                          <option value="Cpu">Cpu</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Title</label>
                        <input
                          type="text"
                          value={spec.title}
                          onChange={(e) => updateTechSpec(index, "title", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                          placeholder="e.g., Ultra-narrow Linewidth"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                        <textarea
                          value={spec.desc}
                          onChange={(e) => updateTechSpec(index, "desc", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none"
                          rows={2}
                          placeholder="Brief description..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {techSpecs.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No specs yet. Click "Add Spec" to create one.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Strip Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-600 to-teal-600">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6" /> Trust Strip
            </h2>
            <p className="text-green-100 text-sm mt-1">Trust indicators & client logos</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Section Heading</label>
              <input
                type="text"
                value={trustHeading}
                onChange={(e) => setTrustHeading(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none transition-all"
                placeholder="e.g., Why Techwin — Trusted Worldwide"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={trustCtaLabel}
                onChange={(e) => setTrustCtaLabel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none transition-all"
                placeholder="e.g., Request a Quote"
                required
              />
            </div>

            {/* Trust Bullets */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Trust Bullets</h3>
                <button
                  type="button"
                  onClick={() => setTrustBullets([...trustBullets, ""])}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Bullet
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trustBullets.map((bullet, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const updated = [...trustBullets];
                        updated[index] = e.target.value;
                        setTrustBullets(updated);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      placeholder="e.g., 20+ Years of Experience"
                    />
                    <button
                      type="button"
                      onClick={() => setTrustBullets(trustBullets.filter((_, i) => i !== index))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Counters */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Counters</h3>
                <button
                  type="button"
                  onClick={() => setTrustCounters([...trustCounters, { id: `counter-${Date.now()}`, label: "", value: "" }])}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Counter
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trustCounters.map((counter, index) => (
                  <div key={counter.id} className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-end mb-2">
                      <button
                        type="button"
                        onClick={() => setTrustCounters(trustCounters.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={counter.label}
                        onChange={(e) => {
                          const updated = [...trustCounters];
                          updated[index].label = e.target.value;
                          setTrustCounters(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        placeholder="Label (e.g., Years)"
                      />
                      <input
                        type="text"
                        value={counter.value}
                        onChange={(e) => {
                          const updated = [...trustCounters];
                          updated[index].value = e.target.value;
                          setTrustCounters(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-bold"
                        placeholder="Value (e.g., 20+)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logos */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Client Logos</h3>
                <button
                  type="button"
                  onClick={() => setTrustLogos([...trustLogos, { id: `logo-${Date.now()}`, src: "", alt: "" }])}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Logo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trustLogos.map((logo, index) => (
                  <div key={logo.id} className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold text-gray-700">Logo {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => setTrustLogos(trustLogos.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <InlineImageUploader
                        label="Logo Image"
                        currentImage={logo.src}
                        onImageUploaded={(url) => {
                          const updated = [...trustLogos];
                          updated[index].src = url;
                          setTrustLogos(updated);
                        }}
                        uploadType="pages"
                        slug={`home-trust-logo-${index + 1}`}
                        heightClass="aspect-[3/2]"
                      />
                      <input
                        type="text"
                        value={logo.alt}
                        onChange={(e) => {
                          const updated = [...trustLogos];
                          updated[index].alt = e.target.value;
                          setTrustLogos(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        placeholder="Logo alt text (e.g., Client Name)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-purple-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              SEO Settings
            </h3>
            <p className="text-sm text-gray-600">Meta tags, Open Graph, and Twitter Card settings for homepage</p>
          </div>

          <div className="space-y-6">
            {/* Basic SEO */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
              <h4 className="text-md font-bold text-purple-800 mb-4">Basic SEO</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Title <span className="text-xs text-gray-500">(optimal: 10-70 chars)</span>
                  </label>
                  <input
                    type="text"
                    value={seo.title}
                    onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="Techwin — Single-Frequency Fiber Lasers"
                  />
                  <div className="text-xs text-gray-500 mt-1">{seo.title.length} characters</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description <span className="text-xs text-gray-500">(optimal: 160-300 chars)</span>
                  </label>
                  <textarea
                    value={seo.description}
                    onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    rows={3}
                    placeholder="Techwin specializes in single-frequency fiber lasers..."
                  />
                  <div className="text-xs text-gray-500 mt-1">{seo.description.length} characters</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={seo.canonical}
                    onChange={(e) => setSeo({ ...seo, canonical: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="https://www.techwin.com"
                  />
                </div>
              </div>
            </div>

            {/* Open Graph */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
              <h4 className="text-md font-bold text-blue-800 mb-4">Open Graph (Facebook, LinkedIn)</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">OG Title</label>
                  <input
                    type="text"
                    value={seo.ogTitle}
                    onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="Leave empty to use Meta Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">OG Description</label>
                  <textarea
                    value={seo.ogDescription}
                    onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    rows={2}
                    placeholder="Leave empty to use Meta Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">OG Image</label>
                  <InlineImageUploader
                    label=""
                    currentImage={seo.ogImage || ""}
                    onImageUploaded={(url) => setSeo({ ...seo, ogImage: url })}
                    uploadType="pages"
                    slug="home-og-image"
                    heightClass="aspect-[2/1]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                </div>
              </div>
            </div>

            {/* Twitter Card */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-5 rounded-xl border border-sky-200">
              <h4 className="text-md font-bold text-sky-800 mb-4">Twitter Card</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label>
                  <select
                    value={seo.twitterCard}
                    onChange={(e) => setSeo({ ...seo, twitterCard: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter Title</label>
                  <input
                    type="text"
                    value={seo.twitterTitle}
                    onChange={(e) => setSeo({ ...seo, twitterTitle: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="Leave empty to use OG Title or Meta Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter Description</label>
                  <textarea
                    value={seo.twitterDescription}
                    onChange={(e) => setSeo({ ...seo, twitterDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    rows={2}
                    placeholder="Leave empty to use OG Description or Meta Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter Image</label>
                  <InlineImageUploader
                    label=""
                    currentImage={seo.twitterImage || ""}
                    onImageUploaded={(url) => setSeo({ ...seo, twitterImage: url })}
                    uploadType="pages"
                    slug="home-twitter-image"
                    heightClass="aspect-[2/1]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use OG Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heading Levels Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Heading Levels (H1-H6)
            </h3>
            <p className="text-sm text-gray-600">Control HTML heading tags for SEO optimization. Each section should have appropriate heading hierarchy.</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-xl border border-orange-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Slides Heading
                </label>
                <select
                  value={headingLevels.hero}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, hero: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="h1">H1 (Main Page Title)</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Profile Heading
                </label>
                <select
                  value={headingLevels.companyProfile}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, companyProfile: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2 (Section Title)</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Families Heading
                </label>
                <select
                  value={headingLevels.productFamilies}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, productFamilies: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2 (Section Title)</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Applications Heading
                </label>
                <select
                  value={headingLevels.applications}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, applications: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2 (Section Title)</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trust Strip Heading
                </label>
                <select
                  value={headingLevels.trustStrip}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, trustStrip: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3 (Subsection)</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technical Highlights Heading
                </label>
                <select
                  value={headingLevels.techHighlights}
                  onChange={(e) => setHeadingLevels({ ...headingLevels, techHighlights: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
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

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>SEO Best Practice:</strong> Use one H1 per page (typically Hero), H2 for main sections, and H3+ for subsections. Proper hierarchy improves search engine understanding.
              </p>
            </div>
          </div>
        </div>

      </form>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
            toast.type === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
          }`}
          style={{
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 flex-shrink-0" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
