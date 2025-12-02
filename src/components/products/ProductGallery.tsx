// src/components/products/ProductGallery.tsx
"use client";
import React, { useState, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export type GalleryImage = { src: string; alt?: string };
export type ProductGalleryProps = {
  images?: GalleryImage[];
};

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
  // Only use provided images, no fallback
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <p className="text-slate-500 text-center">No images available</p>
      </div>
    );
  }

  const galleryImages = images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoom({ x, y, scale: 2 });
  };

  const handleMouseLeave = () => {
    setZoom({ x: 0, y: 0, scale: 1 });
  };

  const activeImage = galleryImages[activeIndex];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative w-full h-96 rounded-lg overflow-hidden group cursor-zoom-in bg-white shadow-lg"
        onClick={() => setLightboxOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt ?? "Main product image"}
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              className="object-cover transition-transform duration-300"
              style={{
                transformOrigin: `${zoom.x * 100}% ${zoom.y * 100}%`,
                transform: `scale(${zoom.scale})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Maximize button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white shadow-md"
          >
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Navigation buttons - Only show if more than 1 image */}
        {galleryImages.length > 1 && (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev + 1) % galleryImages.length);
                }}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* Image counter */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {activeIndex + 1} / {galleryImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip - Only show if more than 1 image */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "ring-2 ring-offset-2 ring-white shadow-lg"
                  : "hover:shadow-md opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt ?? `Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative w-full max-w-4xl h-full max-h-[80vh]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt ?? "Lightbox image"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-white bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
