"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronsLeft, ChevronsRight, Maximize } from "lucide-react";

export type GalleryItem = {
  id?: string;
  type?: "image" | "video" | "model"; // model is a placeholder for external 3D viewer
  src: string;
  alt?: string;
  poster?: string; // for video
  thumb?: string;
};

type GalleryProps = {
  items: GalleryItem[];
  startIndex?: number;
  background?: "blue" | "white";
  autoplay?: boolean;
  autoplayInterval?: number;
};

export default function ApplicationGalleryCarousel({
  items,
  startIndex = 0,
  background = "white",
  autoplay = false,
  autoplayInterval = 5000,
}: GalleryProps) {
  const isBlue = background === "blue";
  const [index, setIndex] = useState(Math.min(Math.max(0, startIndex), items.length - 1));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % items.length), autoplayInterval);
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); };
  }, [autoplay, autoplayInterval, items.length]);

  useEffect(() => { document.documentElement.style.setProperty("--primary", "#3b9acb"); }, []);

  const openAt = (i: number) => { setIndex(i); setLightboxOpen(true); };
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  // keyboard nav when lightbox open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, items.length]);

  if (!items || items.length === 0) return null;

  return (
    <section className={`w-full ${isBlue ? "bg-[#3B9ACB] text-white" : "bg-white text-slate-900"} py-12 md:py-16`} aria-label="Gallery">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${isBlue ? "text-white/90" : "text-[--primary]"}`}>Gallery</div>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${isBlue ? "text-white" : "text-slate-900"}`}>High-res images & media</h3>
          </div>
          <div className={`text-sm ${isBlue ? "text-white/90" : "text-slate-600"}`}>Drag to explore • Click to open fullscreen</div>
        </div>

        {/* Main carousel area */}
        <div className="relative">
          <motion.div className="overflow-hidden rounded-2xl" initial={false}>
            <motion.div
              key={`viewport-${index}`}
              className="relative h-[420px] md:h-[520px] w-full bg-black/5 rounded-2xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileTap={{ cursor: "grabbing" }}
            >
              {/* central media */}
              <div className="absolute inset-0 flex items-center justify-center">
                {items[index].type === "video" ? (
                  <video
                    src={items[index].src}
                    poster={items[index].poster}
                    controls
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : items[index].type === "model" ? (
                  // Placeholder for model viewer — integrate model viewer like <model-viewer> or three.js externally
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#102b3b] to-[#163f57] rounded-2xl">
                    <div className="text-white/90 text-center p-6">
                      <div className="text-xl font-bold">3D model viewer</div>
                      <div className="text-sm opacity-80 mt-2">Use external viewer (model-viewer / three.js) for interactive 3D preview</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={items[index].src}
                    alt={items[index].alt || "gallery"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={false}
                    className="rounded-2xl"
                  />
                )}

                {/* subtle vignette + gradient overlays */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/30 via-transparent to-transparent mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.06), transparent 20%)' }} />

                {/* quick controls */}
                <div className="absolute right-4 top-4 flex gap-3 z-20">
                  <button
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Open fullscreen"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${isBlue ? "bg-white/10 text-white" : "bg-white text-[--primary] shadow"}`}
                  >
                    <Maximize className="w-4 h-4" />
                    <span className="text-xs font-semibold">Fullscreen</span>
                  </button>
                </div>

                {/* left/right arrows */}
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm"
                >
                  <ChevronsRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* thumbnails */}
          <div className="mt-4 grid grid-cols-6 gap-3 md:grid-cols-8 lg:grid-cols-10">
            {items.map((it, i) => (
              <button
                key={it.id ?? `${i}`}
                onClick={() => setIndex(i)}
                className={`relative rounded-xl overflow-hidden border ${i === index ? "ring-2 ring-offset-2 ring-white/30" : "ring-0"} ${isBlue ? "border-white/10" : "border-gray-100"}`}
                aria-label={`Open ${i + 1}`}
              >
                {it.thumb || it.poster ? (
                  <Image src={it.thumb ?? it.poster!} alt={it.alt ?? `thumb-${i}`} width={160} height={100} style={{ objectFit: "cover" }} />
                ) : (
                  <div className="w-full h-20 md:h-24 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm text-slate-500">No preview</div>
                )}

                {/* gradient frame */}
                <div className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: i === index ? "0 8px 30px rgba(0,0,0,0.35)" : "0 6px 18px rgba(0,0,0,0.12)" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
              <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-1000 flex items-center justify-center p-6"
              role="dialog"
              aria-modal="true"
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setLightboxOpen(false)} />

              <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} transition={{ duration: 0.28 }} className="relative z-10 max-w-[1400px] w-full">
                <div className="rounded-2xl overflow-hidden bg-black p-4">
                  <div className="relative h-[70vh] w-full">
                    {items[index].type === "video" ? (
                      <video src={items[index].src} poster={items[index].poster} controls className="w-full h-full object-cover" />
                    ) : items[index].type === "model" ? (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#08121a] to-[#0f2c3a] text-white/90">3D model viewer placeholder</div>
                    ) : (
                      <Image src={encodeURI(items[index].src)} alt={items[index].alt ?? "lightbox"} fill sizes="100vw" style={{ objectFit: "contain" }} />
                    )}

                    <button onClick={() => setLightboxOpen(false)} aria-label="Close" className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* caption + thumbnails in lightbox */}
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="text-sm text-white/90">{items[index].alt ?? `Image ${index + 1}`}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={prev} className="px-3 py-2 rounded-md bg-white/6 text-white">Prev</button>
                      <button onClick={next} className="px-3 py-2 rounded-md bg-white/6 text-white">Next</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        :root { --primary: #3b9acb; }
      `}</style>
    </section>
  );
}
