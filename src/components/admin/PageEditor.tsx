"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InlineImageUploader from "./InlineImageUploader";

interface Section {
  id: string;
  title: string;
  content: string;
  image?: string;
  order: number;
}

interface PageEditorProps {
  pageType: "home" | "about";
}

export default function PageEditor({ pageType }: PageEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Hero section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  
  // Sections
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${pageType}`);
      const data = await res.json();
      
      setHeroTitle(data.hero?.title || "");
      setHeroSubtitle(data.hero?.subtitle || "");
      setHeroImage(data.hero?.backgroundImage || "");
      setCtaLabel(data.hero?.ctaLabel || "");
      setCtaLink(data.hero?.ctaLink || "");
      setSections(data.sections || []);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching page:", error);
      setLoading(false);
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "",
      content: "",
      image: "",
      order: sections.length,
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (index: number, field: keyof Section, value: string | number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const removeSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const updated = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    updated[index].order = index;
    updated[targetIndex].order = targetIndex;
    
    setSections(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const pageData = {
        hero: {
          title: heroTitle,
          subtitle: heroSubtitle,
          backgroundImage: heroImage,
          ...(pageType === "home" && ctaLabel && { ctaLabel, ctaLink }),
        },
        sections: sections.map((section, idx) => ({
          ...section,
          order: idx,
        })),
      };

      const res = await fetch(`/api/admin/pages/${pageType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (res.ok) {
        alert(`${pageType === "home" ? "Home" : "About"} page updated successfully!`);
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || "Failed to update page"}`);
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit {pageType === "home" ? "Home" : "About"} Page
      </h1>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Background Image</label>
              <InlineImageUploader
                currentImage={heroImage}
                onImageUploaded={(url) => setHeroImage(url)}
                uploadType="pages"
                slug={pageType}
              />
            </div>

            {pageType === "home" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">CTA Button Label</label>
                  <input
                    type="text"
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="e.g., Get Started"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CTA Button Link</label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="e.g., /contact"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Content Sections</h2>
            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Section
            </button>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={section.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Section {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => moveSection(index, "up")}
                      disabled={index === 0}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, "down")}
                      disabled={index === sections.length - 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, "title", e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, "content", e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image (Optional)</label>
                    <InlineImageUploader
                      currentImage={section.image || ""}
                      onImageUploaded={(url) => updateSection(index, "image", url)}
                      uploadType="pages"
                      slug={`${pageType}-section-${section.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}

            {sections.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No sections yet. Click &quot;Add Section&quot; to create one.
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Page"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
