// src/components/products/ProductDetailHero.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export type HeroProps = {
  title?: string;
  description?: string;
  image?:
    | string
    | { src: string; alt?: string }
    | Array<string | { src: string; alt?: string }>;
  heroImage?: { src: string; alt?: string };
  galleryImages?: Array<string | { src: string; alt?: string }>;
  ctas?: { label: string; href: string }[];
  breadcrumbs?: Crumb[];
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  features?: string[];
  applicationAreas?: string[];
};

const normalizeImages = (
  image?:
    | string
    | { src: string; alt?: string }
    | Array<string | { src: string; alt?: string }>
) => {
  if (!image) return [] as { src: string; alt: string }[];
  if (Array.isArray(image))
    return image.map((img) =>
      typeof img === "string" ? { src: img, alt: "" } : img
    );
  return [typeof image === "string" ? { src: image, alt: "" } : image];
};

const PRIMARY = "#06a6d6";
const TRANS_MS = 520;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const useSlider = (itemCount: number, initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const goTo = (newIndex: number, forcedDirection?: "next" | "prev") => {
    if (isAnimating || newIndex === index || itemCount <= 1) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    const newDirection =
      forcedDirection ??
      ((newIndex > index && !(index === itemCount - 1 && newIndex === 0)) ||
      (index === 0 && newIndex === itemCount - 1)
        ? "next"
        : "prev");

    setIsAnimating(true);
    setDirection(newDirection);
    setPrevIndex(index);
    setIndex(newIndex);
    setAnimate(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });

    timeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
      setAnimate(false);
    }, TRANS_MS + 120);
  };

  const goNext = () => {
    if (itemCount <= 1) return;
    goTo((index + 1) % itemCount, "next");
  };
  const goPrev = () => {
    if (itemCount <= 1) return;
    goTo((index - 1 + itemCount) % itemCount, "prev");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { index, prevIndex, direction, isAnimating, animate, goTo, goNext, goPrev };
};

const ProductDetailHero: React.FC<HeroProps> = ({
  title = "1.0 μm Single-Frequency Fiber Laser",
  description = "Precision optics for long-distance sensing, coherent detection and quantum experiments.",
  image,
  heroImage,
  galleryImages,
  ctas = [],
  breadcrumbs = [],
  autoplay = false,
  autoplayInterval = 4500,
  pauseOnHover = true,
  features,
  applicationAreas,
}) => {
  const images = useMemo(() => {
    if (image) return normalizeImages(image);
    if (galleryImages && galleryImages.length) return normalizeImages(galleryImages);
    if (heroImage) return normalizeImages(heroImage);
    return [];
  }, [image, galleryImages, heroImage]);

  const { index, prevIndex, direction, isAnimating, animate, goTo, goNext, goPrev } =
    useSlider(images.length);

  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // trigger entrance animations
    const id = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!autoplay || images.length <= 1 || (pauseOnHover && isHovering)) return;
    const id = window.setInterval(goNext, autoplayInterval);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayInterval, images.length, isHovering, pauseOnHover, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const primaryCta = ctas.length > 0 ? ctas[0] : null;

  return (
    <>

      <section className="relative w-full bg-white overflow-hidden" aria-labelledby="product-hero-title">
        <div className="py-15 md:py-18">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* LEFT: Title + Description + lists */}
              <div className="space-y-8 mt-6 lg:mt-0">
                <h1 id="product-hero-title" className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "#3B9ACB" }}>
                  {title}
                </h1>

                {(() => {
                  const sentencesPerParagraph = 2;
                  const raw = description?.toString?.() ?? "";
                  const sentenceParts = raw
                    .replace(/\n+/g, " ")
                    .split(/(?<=[.?!])\s+(?=[A-Z0-9"“‘’']|$)/g)
                    .map((s) => s.trim())
                    .filter(Boolean);

                  const paragraphs: string[] = [];
                  for (let i = 0; i < sentenceParts.length; i += sentencesPerParagraph) {
                    paragraphs.push(sentenceParts.slice(i, i + sentencesPerParagraph).join(" "));
                  }

                  const toRender = paragraphs.length > 0 ? paragraphs : [raw];

                  return (
                    <div className={`text-slate-700 text-base md:text-lg leading-relaxed max-w-xl transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`} style={{ transformOrigin: "top" }}>
                      {toRender.map((para, idx) => (
                        <p key={idx} className="opacity-95 mb-6 wrap-break-word" style={{ marginTop: 0 }}>{para}</p>
                      ))}
                    </div>
                  );
                })()}

                {(features && features.length > 0) || (applicationAreas && applicationAreas.length > 0) ? (
                  <div className="mt-2 max-w-xl">
                    {features && features.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2" style={{ color: PRIMARY }}>Key Features</h3>
                        <ul className="list-disc pl-5 text-slate-700">
                          {features.map((f: string, i: number) => (
                            <li key={i} className="mb-1">{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {applicationAreas && applicationAreas.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: PRIMARY }}>Application Areas</h3>
                        <ul className="list-disc pl-5 text-slate-700">
                          {applicationAreas.map((a: string, i: number) => (
                            <li key={i} className="mb-1">{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}

                {primaryCta && (
                  <div>
                    <Link href={primaryCta.href} className="inline-flex items-center gap-3 px-5 py-3 rounded-md font-semibold transition-all duration-200" style={{ background: PRIMARY, color: "#fff" }} aria-label={primaryCta.label}>
                      {primaryCta.label}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>

              {/* RIGHT: Image card / slider */}
              <div
                className="relative flex flex-col items-center justify-center w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{
                    background: "#fff",
                    border: `2px solid ${PRIMARY}`,
                    boxShadow: "0 10px 30px rgba(6,166,214,0.05)",
                    padding: 18,
                  }}
                >
                  {/* Viewport: shorter, centered */}
                  <div
                    className="relative w-full max-w-[900px] mx-auto"
                    style={{ height: 520 }}
                    onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                      if (!touchStartX.current) return;
                      const diff = e.changedTouches[0].clientX - touchStartX.current;
                      if (Math.abs(diff) > 40) diff > 0 ? goPrev() : goNext();
                      touchStartX.current = null;
                    }}
                  >
                    {/* decorative background glows */}
                    <div className="pointer-events-none absolute -top-12 -left-16 w-60 h-60 rounded-full blur-3xl bg-linear-to-tr from-[#2aa7d6]/30 to-[#216a9b]/10 opacity-90 transform -rotate-12" />
                    <div className="pointer-events-none absolute -bottom-12 -right-16 w-72 h-72 rounded-full blur-3xl bg-linear-to-br from-[#00a9e0]/20 to-[#3b82f6]/10 opacity-80" />
                    {/* slides */}
                    {images.length > 0 ? (
                      images.map((img, i) => {
                        const isActive = i === index;
                        const isPrev = i === prevIndex;

                        // simple fade/translate handled by inline styles (keeps previous animation code)
                        let transform = "translateX(120%)";
                        let opacity = 0;
                        if (!isAnimating) {
                          transform = isActive ? "translateX(0)" : "translateX(120%)";
                          opacity = isActive ? 1 : 0;
                        } else {
                          if (isActive) {
                            transform = animate ? "translateX(0)" : direction === "next" ? "translateX(120%)" : "translateX(-120%)";
                            opacity = animate ? 1 : 0;
                          } else if (isPrev) {
                            transform = animate ? (direction === "next" ? "translateX(-110%)" : "translateX(110%)") : "translateX(0)";
                            opacity = animate ? 0 : 1;
                          }
                        }

                        return (
                          <div
                            key={img.src + "-" + i}
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transform,
                              opacity,
                              zIndex: isActive ? 40 : isPrev ? 30 : 10,
                              transition: `transform ${TRANS_MS}ms ${EASING}, opacity ${TRANS_MS * 0.85}ms ease, filter ${TRANS_MS}ms ease`,
                              willChange: "transform, opacity, filter",
                              pointerEvents: isActive ? "auto" : "none",
                            }}
                          >
                            <div className="relative w-full h-full flex items-center justify-center">
                              {/* larger fixed height area; Image uses fill + object-contain to scale nicely */}
                              <div
                                className="relative w-full max-w-[720px] h-[420px] rounded-2xl overflow-hidden bg-white/80 shadow-2xl"
                                style={{ transform: isActive ? "translateZ(0) scale(1)" : "scale(0.98)", transition: `transform ${TRANS_MS}ms ${EASING}` }}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt || `Image ${i + 1}`}
                                  fill
                                  className={`object-contain transition-transform duration-700 ${isActive ? "hover:scale-105" : ""}`}
                                  priority={isActive || isPrev}
                                />
                                {/* subtle overlay and depth */}
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/5 opacity-60 mix-blend-overlay" />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">No image available</div>
                    )}

                    {/* arrows (subtle) */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={goPrev}
                          aria-label="Previous image"
                          className="absolute top-1/2 left-4 -translate-y-1/2 z-40 rounded-full p-2 bg-white/95 shadow"
                          style={{ opacity: isHovering ? 1 : 0.1, transition: "opacity 220ms ease", border: `1px solid ${PRIMARY}`, color: PRIMARY }}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          onClick={goNext}
                          aria-label="Next image"
                          className="absolute top-1/2 right-4 -translate-y-1/2 z-40 rounded-full p-2 bg-white/95 shadow"
                          style={{ opacity: isHovering ? 1 : 0.1, transition: "opacity 220ms ease", border: `1px solid ${PRIMARY}`, color: PRIMARY }}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* indicator */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#e6eef4" }} aria-hidden title={`Image ${index + 1} of ${images.length}`}>
                    <div className="rounded-full transition-all" style={{ width: images.length > 0 ? 10 : 0, height: images.length > 0 ? 10 : 0, background: PRIMARY }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-100" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailHero;
