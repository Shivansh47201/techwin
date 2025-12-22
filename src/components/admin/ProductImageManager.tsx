"use client";

import { useState } from "react";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  Plus, 
  FileBarChart, 
  FileText, 
  Monitor,
  File // Added File icon for datasheet
} from "lucide-react";

type ImageItem = {
  src: string;
  alt?: string;
};

type UploadTarget =
  | "hero"
  | "gallery"
  | "preview"
  | "datasheet"
  | "graph"
  | "table";

export default function ProductImageManager({
  product,
  onChange,
}: {
  product: any;
  onChange: (data: any) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guard clause to prevent crashes if product is not yet loaded
  if (!product) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
        <h3 className="text-gray-900 font-medium">Loading product data...</h3>
        <p className="text-sm text-gray-500 mt-1">Please wait while the media assets are retrieved.</p>
      </div>
    );
  }

  /* ----------------------------------
     UPLOAD HANDLER (Logic Unchanged)
  -----------------------------------*/
  async function uploadImage(file: File, target: UploadTarget) {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "product");
      formData.append("category", product.category || "uncategorized");
      formData.append("slug", product.slug || "temp");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!json?.success || !json?.url) {
        throw new Error(json?.message || "Upload failed");
      }

      const url = json.url;

      // Use safe cloning or fallback to shallow copy if structuredClone fails
      let updated;
      try {
        updated = structuredClone(product);
      } catch (e) {
        updated = { ...product }; // Fallback for environments without structuredClone
      }

      switch (target) {
        case "hero":
          updated.heroImage = { src: url, alt: product.title };
          break;

        case "preview":
          updated.previewImageSrc = url;
          break;

        case "datasheet":
          updated.datasheetImageSrc = url;
          break;

        case "graph":
          updated.graphImageURL = url;
          break;

        case "table":
          updated.tableImageURL = url;
          break;

        case "gallery":
          updated.galleryImages = [
            ...(updated.galleryImages || []),
            { src: url, alt: product.title },
          ];

          // auto-set hero if not present
          if (!updated.heroImage?.src) {
            updated.heroImage = { src: url, alt: product.title };
          }
          break;
      }

      onChange(updated);
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  /* ----------------------------------
     REMOVE GALLERY IMAGE (Logic Unchanged)
  -----------------------------------*/
  function removeGalleryImage(index: number) {
    let updated;
    try {
      updated = structuredClone(product);
    } catch (e) {
      updated = { ...product };
    }

    updated.galleryImages = (updated.galleryImages || []).filter(
      (_: any, i: number) => i !== index
    );

    // if hero was removed, fallback to first gallery image
    if (
      updated.heroImage?.src === product.galleryImages?.[index]?.src
    ) {
      updated.heroImage =
        updated.galleryImages?.[0] || undefined;
    }

    onChange(updated);
  }

  /* ----------------------------------
     UI
  -----------------------------------*/
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Media Assets</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage product visual content</p>
        </div>
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-medium">Uploading...</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-2 border border-red-100">
            <X className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* HERO SECTION */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              Primary Hero Image
            </h3>
          </div>
          <div className="grid grid-cols-1">
            <ImageUploadBlock
              label="Hero Banner"
              helper="This is the main banner displayed on the product page."
              onUpload={(f) => uploadImage(f, "hero")}
              preview={product.heroImage?.src}
              aspect="video"
              icon={<ImageIcon className="w-8 h-8 text-gray-300" />}
            />
          </div>
        </section>

        <div className="h-px bg-gray-100 w-full" />

        {/* GALLERY SECTION */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-500" />
                Product Gallery
              </h3>
              <p className="text-xs text-gray-500 mt-1">Images appearing in the carousel</p>
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              {(product.galleryImages || []).length} items
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Upload Button Card */}
            <label className="group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer bg-gray-50/30">
              <input
                type="file"
                multiple
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  files.forEach((f) => uploadImage(f, "gallery"));
                }}
              />
              <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-600 group-hover:text-blue-700">Add Images</span>
            </label>

            {/* Existing Images */}
            {(product.galleryImages || []).map(
              (img: ImageItem, i: number) => (
                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                  <img
                    src={img.src}
                    alt={img.alt || ""}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600 transform -translate-y-2.5 group-hover:translate-y-0 shadow-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        <div className="h-px bg-gray-100 w-full" />

        {/* TECHNICAL / SUPPORTING IMAGES */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileBarChart className="w-4 h-4 text-orange-500" />
            Technical Details
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImageUploadBlock
              label="Preview Thumbnail"
              helper="Used in card grids & search."
              onUpload={(f) => uploadImage(f, "preview")}
              preview={product.previewImageSrc}
              icon={<Monitor className="w-6 h-6 text-gray-300" />}
            />

            <ImageUploadBlock
              label="Datasheet Preview"
              helper="PDF preview or cover image."
              onUpload={(f) => uploadImage(f, "datasheet")}
              preview={product.datasheetImageSrc}
              icon={<File className="w-6 h-6 text-gray-300" />}
            />

            <ImageUploadBlock
              label="Performance Graph"
              helper="Spectral or performance chart."
              onUpload={(f) => uploadImage(f, "graph")}
              preview={product.graphImageURL}
              icon={<FileBarChart className="w-6 h-6 text-gray-300" />}
            />

            <ImageUploadBlock
              label="Spec Table"
              helper="Technical specification table."
              onUpload={(f) => uploadImage(f, "table")}
              preview={product.tableImageURL}
              icon={<FileText className="w-6 h-6 text-gray-300" />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ----------------------------------
   REUSABLE UPLOAD BLOCK (Redesigned)
-----------------------------------*/
function ImageUploadBlock({
  label,
  helper,
  onUpload,
  preview,
  aspect = "square",
  icon
}: {
  label: string;
  helper?: string;
  preview?: string;
  onUpload: (file: File) => void;
  aspect?: "square" | "video";
  icon?: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-start mb-2">
        <label className="text-sm font-medium text-gray-700 block cursor-pointer group-hover:text-blue-600 transition-colors">
          {label}
        </label>
      </div>
      
      <div className={`relative w-full ${aspect === 'video' ? 'aspect-video' : 'aspect-4/3'} rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 overflow-hidden hover:border-blue-400 hover:bg-blue-50/30 transition-all`}>
        {preview ? (
          <>
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt={label}
            />
            {/* Overlay for replacing image */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <label className="cursor-pointer bg-white/95 hover:bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                Replace Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && onUpload(e.target.files[0])}
                />
              </label>
            </div>
          </>
        ) : (
          /* Empty state */
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4 text-center">
            <div className="mb-3 p-3 rounded-full bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              {icon || <ImageIcon className="w-6 h-6 text-gray-300" />}
            </div>
            <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600">Click to upload</span>
            {helper && (
              <span className="text-[10px] text-gray-400 mt-1 max-w-[90%] leading-tight">
                {helper}
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            />
          </label>
        )}
      </div>
    </div>
  );
}