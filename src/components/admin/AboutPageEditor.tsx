"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InlineImageUploader from "./InlineImageUploader";
import InlineVideoUploader from "./InlineVideoUploader";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Video,
  BookOpen,
  Users,
  Eye,
  CheckCircle2,
  Info,
  Award,
  Globe,
  MessageSquare,
  Package,
} from "lucide-react";

export default function AboutPageEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "intro" | "who" | "expertise" | "commitment" | "why" | "sustainability" | "seo" | "headings">("hero");

  // Hero
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroVideo, setHeroVideo] = useState("");

  // Intro
  const [introTitle, setIntroTitle] = useState("");
  const [introSubtitle, setIntroSubtitle] = useState("");
  const [introLead, setIntroLead] = useState("");
  const [introImage, setIntroImage] = useState("");
  const [introSections, setIntroSections] = useState<Array<{ heading: string; content: string }>>([]);
  const [introQuote, setIntroQuote] = useState("");

  // Who We Are
  const [whoImage, setWhoImage] = useState("");
  const [whoImageAlt, setWhoImageAlt] = useState("");
  const [whoContent, setWhoContent] = useState("");

  // Expertise
  const [expertiseTitle, setExpertiseTitle] = useState("");
  const [expertiseDesc, setExpertiseDesc] = useState<string[]>([]);
  const [expertiseHighlights, setExpertiseHighlights] = useState<string[]>([]);

  // Product Lines
  const [productLines, setProductLines] = useState<Array<{ id: string; title: string; description: string; icon: string }>>([]);

  // Commitment Sections
  const [commitmentSections, setCommitmentSections] = useState<Array<{ id: string; title: string; body: string; image: string }>>([]);

  // Why Choose
  const [whyTitle, setWhyTitle] = useState("");
  const [whyDesc, setWhyDesc] = useState("");
  const [whyPoints, setWhyPoints] = useState<Array<{ title: string; desc: string; icon: string }>>([]);

  // Final Statement
  const [finalTitle, setFinalTitle] = useState("");
  const [finalContent, setFinalContent] = useState("");

  // Sustainability Tabs
  const [sustainabilityTabs, setSustainabilityTabs] = useState<Array<{
    id: number;
    label: string;
    heading: string;
    body: string;
    rightCardTitle: string;
    rightCardItems: Array<{ title: string; description: string }>;
  }>>([]);

  // SEO
  const [seo, setSeo] = useState({
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
    aboutHero: 'h1',
    techwinIntro: 'h2',
    whoWeAre: 'h2',
    expertiseProducts: 'h2',
    commitment: 'h2',
    whyChoose: 'h2',
    sustainability: 'h2',
    finalStatement: 'h3',
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const res = await fetch("/api/admin/pages/about");
      const data = await res.json();

      setHeroTitle(data.hero?.title || "");
      setHeroSubtitle(data.hero?.subtitle || "");
      setHeroDescription(data.hero?.description || "");
      setHeroImage(data.hero?.backgroundImage || "");
      setHeroVideo(data.hero?.backgroundVideo || "");

      setIntroTitle(data.intro?.title || "");
      setIntroSubtitle(data.intro?.subtitle || "");
      setIntroLead(data.intro?.leadText || "");
      setIntroImage(data.intro?.image || "");
      setIntroSections(data.intro?.sections || []);
      setIntroQuote(data.intro?.quote || "");

      setWhoImage(data.whoWeAre?.image || "");
      setWhoImageAlt(data.whoWeAre?.imageAlt || "");
      setWhoContent(data.whoWeAre?.content || "");

      setExpertiseTitle(data.expertise?.title || "");
      setExpertiseDesc(data.expertise?.description || []);
      setExpertiseHighlights(data.expertise?.highlights || []);

      setProductLines(data.productLines || []);
      setCommitmentSections(data.commitmentSections || []);

      setWhyTitle(data.whyChoose?.title || "");
      setWhyDesc(data.whyChoose?.description || "");
      setWhyPoints(data.whyChoose?.points || []);

      setFinalTitle(data.finalStatement?.title || "");
      setFinalContent(data.finalStatement?.content || "");

      setSustainabilityTabs(data.sustainabilityTabs || []);

      if (data.seo) setSeo(data.seo);
      if (data.headingLevels) setHeadingLevels(data.headingLevels);

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
        hero: {
          title: heroTitle,
          subtitle: heroSubtitle,
          description: heroDescription,
          backgroundImage: heroImage,
          backgroundVideo: heroVideo,
        },
        intro: {
          title: introTitle,
          subtitle: introSubtitle,
          leadText: introLead,
          image: introImage,
          sections: introSections,
          quote: introQuote,
        },
        whoWeAre: {
          image: whoImage,
          imageAlt: whoImageAlt,
          content: whoContent,
        },
        expertise: {
          title: expertiseTitle,
          description: expertiseDesc,
          highlights: expertiseHighlights,
        },
        productLines,
        commitmentSections,
        whyChoose: {
          title: whyTitle,
          description: whyDesc,
          points: whyPoints,
        },
        finalStatement: {
          title: finalTitle,
          content: finalContent,
        },
        sustainabilityTabs,
        seo,
        headingLevels,
      };

      console.log("💾 Sending update request with data:", pageData);
      
      const res = await fetch("/api/admin/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      console.log("📡 Response status:", res.status);

      if (res.ok) {
        const result = await res.json();
        console.log("✅ Save successful:", result);
        toast.success("About page updated successfully!", {
          duration: 3000,
          position: "top-center",
        });
        
        // Force a hard refresh to bypass cache
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const error = await res.json();
        console.error("❌ Save error:", error);
        toast.error(`Error: ${error.error || "Failed to update page"}`, {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("❌ Error saving page:", error);
      toast.error("Failed to save page. Check console for details.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#3B9ACB]" />
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero Section", icon: <Video className="w-4 h-4" />, desc: "Main header" },
    { id: "intro", label: "Introduction", icon: <BookOpen className="w-4 h-4" />, desc: "Welcome message" },
    { id: "who", label: "Who We Are", icon: <Users className="w-4 h-4" />, desc: "Company identity" },
    { id: "expertise", label: "Expertise", icon: <Award className="w-4 h-4" />, desc: "Skills & products" },
    { id: "commitment", label: "Commitment", icon: <Globe className="w-4 h-4" />, desc: "Values & reach" },
    { id: "why", label: "Why Choose", icon: <MessageSquare className="w-4 h-4" />, desc: "Key advantages" },
    { id: "sustainability", label: "Sustainability", icon: <Package className="w-4 h-4" />, desc: "Vision & service" },
    { id: "seo", label: "SEO", icon: <Info className="w-4 h-4" />, desc: "Meta tags" },
    { id: "headings", label: "Heading Levels", icon: <CheckCircle2 className="w-4 h-4" />, desc: "H1-H6 tags" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <Toaster />
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b shadow-lg">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B9ACB] to-[#2A7DA8] bg-clip-text text-transparent">
              About Page Editor
            </h1>
            <p className="text-sm text-gray-600 mt-1">Manage your company story</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('/about', '_blank')}
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3B9ACB] to-[#2A7DA8] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 font-bold"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                type="button"
                className={`flex items-center gap-2 px-5 py-3 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "text-[#3B9ACB]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.icon}
                <div className="text-left">
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-xs text-gray-500">{tab.desc}</div>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9ACB] to-[#2A7DA8] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="container mx-auto p-6 max-w-6xl">
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
                  <p className="text-sm text-gray-600 mt-1">First impression with powerful visuals</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Main Title</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all text-lg font-semibold"
                    placeholder="e.g., About Techwin Optoelectronics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Subtitle</label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all"
                    placeholder="e.g., Leading Innovation in Fiber Laser Technology"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Description</label>
                  <textarea
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all resize-none"
                    placeholder="Brief description about your company..."
                  />
                </div>

                <InlineImageUploader
                  label="Background Image"
                  currentImage={heroImage}
                  onImageUploaded={setHeroImage}
                  uploadType="pages"
                  slug="about-hero"
                  heightClass="aspect-[21/9]"
                />

                <InlineVideoUploader
                  label="Background Video (Optional)"
                  currentVideo={heroVideo}
                  onVideoUploaded={setHeroVideo}
                  uploadType="pages"
                  slug="about-hero-video"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "intro" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Introduction Section</h2>
                  <p className="text-sm text-gray-600 mt-1">Welcome visitors with your story</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={introTitle}
                    onChange={(e) => setIntroTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={introSubtitle}
                    onChange={(e) => setIntroSubtitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Lead Text</label>
                <textarea
                  value={introLead}
                  onChange={(e) => setIntroLead(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                  rows={3}
                  required
                />
              </div>

              <InlineImageUploader
                label="Section Image"
                currentImage={introImage}
                onImageUploaded={setIntroImage}
                uploadType="pages"
                slug="about-intro"
              />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quote</label>
                <textarea
                  value={introQuote}
                  onChange={(e) => setIntroQuote(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                  rows={2}
                  required
                />
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Content Sections</h3>
                  <button
                    type="button"
                    onClick={() => setIntroSections([...introSections, { heading: "", content: "" }])}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add Section
                  </button>
                </div>

                {introSections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="flex justify-end mb-2">
                      <button
                        type="button"
                        onClick={() => setIntroSections(introSections.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => {
                          const updated = [...introSections];
                          updated[index].heading = e.target.value;
                          setIntroSections(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        placeholder="Section heading"
                        required
                      />
                      <textarea
                        value={section.content}
                        onChange={(e) => {
                          const updated = [...introSections];
                          updated[index].content = e.target.value;
                          setIntroSections(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none"
                        rows={3}
                        placeholder="Section content"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "who" && (
          <div>
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Who We Are Section</h2>
                  <p className="text-sm text-gray-600 mt-1">Define your company identity</p>
                </div>
              </div>

              <InlineImageUploader
                label="Section Image"
                currentImage={whoImage}
                onImageUploaded={setWhoImage}
                uploadType="pages"
                slug="about-who"
              />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Image Alt Text</label>
                <input
                  type="text"
                  value={whoImageAlt}
                  onChange={(e) => setWhoImageAlt(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all"
                  placeholder="e.g., Techwin team collaborating"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Content</label>
                <textarea
                  value={whoContent}
                  onChange={(e) => setWhoContent(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3B9ACB] outline-none transition-all resize-none"
                  rows={6}
                  placeholder="Describe who you are..."
                  required
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "expertise" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Expertise & Products</h2>
                  <p className="text-sm text-gray-600 mt-1">Showcase your capabilities</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={expertiseTitle}
                  onChange={(e) => setExpertiseTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                  placeholder="e.g., Our Expertise"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-gray-900">Description Paragraphs</label>
                  <button
                    type="button"
                    onClick={() => setExpertiseDesc([...expertiseDesc, ""])}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Paragraph
                  </button>
                </div>
                {expertiseDesc.map((para, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <textarea
                      value={para}
                      onChange={(e) => {
                        const updated = [...expertiseDesc];
                        updated[index] = e.target.value;
                        setExpertiseDesc(updated);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none"
                      rows={2}
                      placeholder="Description paragraph"
                    />
                    <button
                      type="button"
                      onClick={() => setExpertiseDesc(expertiseDesc.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-bold text-gray-900">Highlight Points</label>
                  <button
                    type="button"
                    onClick={() => setExpertiseHighlights([...expertiseHighlights, ""])}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Highlight
                  </button>
                </div>
                {expertiseHighlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const updated = [...expertiseHighlights];
                        updated[index] = e.target.value;
                        setExpertiseHighlights(updated);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      placeholder="Highlight point"
                    />
                    <button
                      type="button"
                      onClick={() => setExpertiseHighlights(expertiseHighlights.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Product Lines</h3>
                  <button
                    type="button"
                    onClick={() => setProductLines([...productLines, { id: `product-${Date.now()}`, title: "", description: "", icon: "Package" }])}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add Product Line
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productLines.map((product, index) => (
                    <div key={product.id} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 hover:border-[#3B9ACB] transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-500">Product {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => setProductLines(productLines.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={product.title}
                          onChange={(e) => {
                            const updated = [...productLines];
                            updated[index].title = e.target.value;
                            setProductLines(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
                          placeholder="Product title"
                        />
                        <textarea
                          value={product.description}
                          onChange={(e) => {
                            const updated = [...productLines];
                            updated[index].description = e.target.value;
                            setProductLines(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none"
                          rows={2}
                          placeholder="Product description"
                        />
                        <input
                          type="text"
                          value={product.icon}
                          onChange={(e) => {
                            const updated = [...productLines];
                            updated[index].icon = e.target.value;
                            setProductLines(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                          placeholder="Icon: Zap, Activity, Package"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "commitment" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Commitment Sections</h2>
                  <p className="text-sm text-gray-600 mt-1">Your values, global reach, and innovation</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Manage scrolling sections with images</p>
                <button
                  type="button"
                  onClick={() => setCommitmentSections([...commitmentSections, { id: `commitment-${Date.now()}`, title: "", body: "", image: "" }])}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Section
                </button>
              </div>

              {commitmentSections.map((section, index) => (
                <div key={section.id} className="border-2 border-gray-200 rounded-xl p-6 bg-white hover:border-[#3B9ACB] transition-all space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3B9ACB] text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-gray-900">Section {index + 1}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommitmentSections(commitmentSections.filter((_, i) => i !== index))}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...commitmentSections];
                      updated[index].title = e.target.value;
                      setCommitmentSections(updated);
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none font-semibold"
                    placeholder="Section title"
                  />

                  <textarea
                    value={section.body}
                    onChange={(e) => {
                      const updated = [...commitmentSections];
                      updated[index].body = e.target.value;
                      setCommitmentSections(updated);
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                    rows={4}
                    placeholder="Section content"
                  />

                  <InlineImageUploader
                    label="Section Image"
                    currentImage={section.image}
                    onImageUploaded={(url) => {
                      const updated = [...commitmentSections];
                      updated[index].image = url;
                      setCommitmentSections(updated);
                    }}
                    uploadType="pages"
                    slug={`about-commitment-${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "why" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Why Choose Techwin</h2>
                  <p className="text-sm text-gray-600 mt-1">Your competitive advantages</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={whyTitle}
                  onChange={(e) => setWhyTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                  placeholder="e.g., Why Choose Techwin"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={whyDesc}
                  onChange={(e) => setWhyDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Key Points</h3>
                  <button
                    type="button"
                    onClick={() => setWhyPoints([...whyPoints, { title: "", desc: "", icon: "CheckCircle" }])}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add Point
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyPoints.map((point, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 hover:border-[#3B9ACB] transition-all space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">Point {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => setWhyPoints(whyPoints.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => {
                          const updated = [...whyPoints];
                          updated[index].title = e.target.value;
                          setWhyPoints(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
                        placeholder="Point title"
                      />
                      <textarea
                        value={point.desc}
                        onChange={(e) => {
                          const updated = [...whyPoints];
                          updated[index].desc = e.target.value;
                          setWhyPoints(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none"
                        rows={2}
                        placeholder="Point description"
                      />
                      <input
                        type="text"
                        value={point.icon}
                        onChange={(e) => {
                          const updated = [...whyPoints];
                          updated[index].icon = e.target.value;
                          setWhyPoints(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        placeholder="Icon: CheckCircle, Star, Award"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-dashed">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Final Statement</h3>
                    <p className="text-sm text-gray-600">Closing message</p>
                  </div>
                </div>
                <div className="space-y-4 bg-amber-50/50 rounded-xl p-5 border-2 border-amber-200">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Statement Title</label>
                    <input
                      type="text"
                      value={finalTitle}
                      onChange={(e) => setFinalTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 outline-none font-semibold"
                      placeholder="e.g., Partner with Excellence"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Statement Content</label>
                    <textarea
                      value={finalContent}
                      onChange={(e) => setFinalContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 outline-none resize-none"
                      rows={3}
                      placeholder="Your final compelling message..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sustainability" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-8 space-y-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-[#3B9ACB] to-[#2A7DA8] rounded-xl text-white">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sustainability, Service & Vision</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage the three-tab section</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">3 tabs: Sustainability, Client Support, Vision & Mission</p>
                <button
                  type="button"
                  onClick={() => setSustainabilityTabs([...sustainabilityTabs, { 
                    id: sustainabilityTabs.length + 1, 
                    label: "", 
                    heading: "", 
                    body: "", 
                    rightCardTitle: "", 
                    rightCardItems: [] 
                  }])}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Tab
                </button>
              </div>

              {sustainabilityTabs.map((tab, tabIndex) => (
                <div key={tab.id} className="border-2 border-gray-200 rounded-xl p-6 bg-white hover:border-[#3B9ACB] transition-all space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3B9ACB] text-white font-bold text-sm">
                        {tab.id}
                      </div>
                      <h3 className="font-bold text-gray-900">Tab {tab.id}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSustainabilityTabs(sustainabilityTabs.filter((_, i) => i !== tabIndex))}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tab Label</label>
                      <input
                        type="text"
                        value={tab.label}
                        onChange={(e) => {
                          const updated = [...sustainabilityTabs];
                          updated[tabIndex].label = e.target.value;
                          setSustainabilityTabs(updated);
                        }}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                        placeholder="e.g., Sustainability & Responsibility"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Heading</label>
                      <input
                        type="text"
                        value={tab.heading}
                        onChange={(e) => {
                          const updated = [...sustainabilityTabs];
                          updated[tabIndex].heading = e.target.value;
                          setSustainabilityTabs(updated);
                        }}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                        placeholder="e.g., Sustainability & Responsibility"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Body Text</label>
                    <textarea
                      value={tab.body}
                      onChange={(e) => {
                        const updated = [...sustainabilityTabs];
                        updated[tabIndex].body = e.target.value;
                        setSustainabilityTabs(updated);
                      }}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                      rows={4}
                      placeholder="Main content for this tab"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Right Card Title</label>
                    <input
                      type="text"
                      value={tab.rightCardTitle}
                      onChange={(e) => {
                        const updated = [...sustainabilityTabs];
                        updated[tabIndex].rightCardTitle = e.target.value;
                        setSustainabilityTabs(updated);
                      }}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                      placeholder="e.g., Sustainability Focus"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <label className="font-bold text-gray-900">Right Card Items</label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...sustainabilityTabs];
                          updated[tabIndex].rightCardItems.push({ title: "", description: "" });
                          setSustainabilityTabs(updated);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#3B9ACB] text-white rounded-lg hover:bg-[#2A7DA8] text-sm font-bold"
                      >
                        <Plus className="w-3 h-3" /> Add Item
                      </button>
                    </div>
                    
                    {tab.rightCardItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...sustainabilityTabs];
                              updated[tabIndex].rightCardItems[itemIndex].title = e.target.value;
                              setSustainabilityTabs(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
                            placeholder="Item title"
                          />
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...sustainabilityTabs];
                              updated[tabIndex].rightCardItems[itemIndex].description = e.target.value;
                              setSustainabilityTabs(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                            placeholder="Item description"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...sustainabilityTabs];
                            updated[tabIndex].rightCardItems = updated[tabIndex].rightCardItems.filter((_, i) => i !== itemIndex);
                            setSustainabilityTabs(updated);
                          }}
                          className="text-red-600 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO & Meta Tags</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={seo.title}
                    onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    placeholder="About Techwin | Premium Fiber Laser Manufacturer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description *
                  </label>
                  <textarea
                    value={seo.description}
                    onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                    placeholder="Learn about Techwin, a leading fiber laser manufacturer..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={seo.canonical || ""}
                    onChange={(e) => setSeo({ ...seo, canonical: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    placeholder="https://www.techwin.com/about"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Title
                    </label>
                    <input
                      type="text"
                      value={seo.ogTitle || ""}
                      onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                      placeholder="About Techwin — World-class Solutions"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Image URL
                    </label>
                    <input
                      type="text"
                      value={seo.ogImage || ""}
                      onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                      placeholder="/techwin-company/techwin-building.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={seo.ogDescription || ""}
                    onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                    placeholder="Leading manufacturer of single-frequency fiber lasers..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Card Type
                    </label>
                    <select
                      value={seo.twitterCard || "summary_large_image"}
                      onChange={(e) => setSeo({ ...seo, twitterCard: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Title
                    </label>
                    <input
                      type="text"
                      value={seo.twitterTitle || ""}
                      onChange={(e) => setSeo({ ...seo, twitterTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                      placeholder="About Techwin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter Image URL
                    </label>
                    <input
                      type="text"
                      value={seo.twitterImage || ""}
                      onChange={(e) => setSeo({ ...seo, twitterImage: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                      placeholder="/techwin-company/techwin-building.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter Description
                  </label>
                  <textarea
                    value={seo.twitterDescription || ""}
                    onChange={(e) => setSeo({ ...seo, twitterDescription: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none resize-none"
                    placeholder="20+ years of expertise in fiber lasers..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Heading Levels Tab */}
        {activeTab === "headings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Heading Levels (SEO)</h2>
              <p className="text-sm text-gray-600 mb-6">
                Control the HTML heading tags (H1-H6) for each section. Use H1 only once per page (typically the hero).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(headingLevels).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setHeadingLevels({ ...headingLevels, [key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#3B9ACB] outline-none"
                    >
                      <option value="h1">H1</option>
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                      <option value="h4">H4</option>
                      <option value="h5">H5</option>
                      <option value="h6">H6</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
