"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";

interface InlineImageUploaderProps {
  currentImage: string;
  onImageUploaded: (url: string) => void;
  uploadType: "blog" | "product" | "category" | "application" | "pages";
  slug: string;
  label?: string;
  heightClass?: string;
  category?: string;
}

export default function InlineImageUploader({
  currentImage,
  onImageUploaded,
  uploadType,
  slug,
  label = "Image",
  heightClass = "aspect-video",
  category,
}: InlineImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", uploadType);
      formData.append("slug", slug);
      
      if (category) {
        formData.append("category", category);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        onImageUploaded(json.url);
      } else {
        alert("Upload failed: " + (json.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload failed:", error);
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
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative group w-full ${heightClass} rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
          currentImage
            ? "border-[#3B9ACB]/30 bg-[#3B9ACB]/5"
            : "border-gray-200 hover:border-[#3B9ACB] hover:bg-gray-50"
        } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {uploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
            <Loader2 className="w-8 h-8 text-[#3B9ACB] animate-spin mb-2" />
            <p className="text-sm font-medium text-gray-600">Uploading...</p>
          </div>
        ) : currentImage ? (
          <>
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
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
            <p className="text-sm font-bold text-gray-600">
              Click to upload image
            </p>
            <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
}
