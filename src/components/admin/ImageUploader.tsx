"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

type Props = {
  label: string;
  // value may be undefined initially
  value?: string | string[];
  onChange: (val: string | string[]) => void;
  multiple?: boolean;
};

export default function ImageUploader({
  label,
  value,
  onChange,
  multiple = false,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
    );

    setUploading(true);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const json = await res.json();
    setUploading(false);

    if (json.secure_url) {
      if (multiple) {
        // Ensure current value is an array
        const current = Array.isArray(value) ? value : [];
        onChange([...(current as string[]), json.secure_url]);
      } else {
        onChange(json.secure_url);
      }
    }
  }

  function removeImage(url: string) {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      onChange(current.filter((i) => i !== url));
    } else {
      onChange("");
    }
  }

  const images: string[] = multiple
    ? (Array.isArray(value) ? (value as string[]) : [])
    : typeof value === "string" && value
    ? [value]
    : [];

  return (
    <div className="space-y-2">
      <label className="block font-medium text-black">{label}</label>

      <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          id={label}
          onChange={(e) => {
            if (!e.target.files) return;
            Array.from(e.target.files).forEach(handleUpload);
          }}
        />

        <label
          htmlFor={label}
          className="cursor-pointer flex flex-col items-center gap-2 text-[#3B9ACB]"
        >
          <Upload />
          <span className="text-sm">
            {uploading ? "Uploading..." : "Click to upload image"}
          </span>
        </label>
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img) => (
            <div key={img} className="relative group">
              <Image
                src={img}
                alt="Uploaded"
                width={120}
                height={80}
                className="rounded-md object-cover"
              />
              <button
                onClick={() => removeImage(img)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
