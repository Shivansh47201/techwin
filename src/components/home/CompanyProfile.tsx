"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { safeImageSrc } from "@/lib/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/components/company/CompanyIntro";
import { useRequestQuote } from "@/context/RequestQuoteContext"; // Import the hook

type Highlight = { label: string; value: string | number };

type Props = {
  image?: string;
  headline?: string;
  text?: string;
  highlights?: Highlight[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export default function CompanyProfile({
  image = "/techwin-company/techwin-building.jpg",
  headline = "Company Profile",
  text,
  highlights = [
    { label: "Years", value: "20+" },
    { label: "Countries", value: "30+" },
    { label: "Focus", value: "SF Lasers" },
  ],
  ctaPrimary = { label: "Learn More", href: "/about" },
  ctaSecondary = { label: "Request Quote", href: "/request-quote" },
}: Props) {
  const paragraphs = (text || "").split(/\n\s*\n|\r\n\r\n/).filter(Boolean);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const imageSrc = image || "/techwin-company/techwin-building.jpg";
  const defaultText = COMPANY_INFO?.shortText ?? "";
  const providedText = (text || "").trim();
  const thresholdWords = 50;
  function countWords(s: string) {
    return String(s || "").trim().split(/\s+/).filter(Boolean).length;
  }
  function normalizeForCompare(s: string) {
    return String(s || "")
      .replace(/…/g, " ")
      .replace(/\.+$/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }
  function mergeAvoidDup(a: string, b: string) {
    if (!a) return b;
    if (!b) return a;
    const aWords = a.trim().split(/\s+/);
    const bWords = b.trim().split(/\s+/);
    let maxOverlap = 0;
    const maxK = Math.min(aWords.length, bWords.length);
    for (let k = maxK; k > 0; k--) {
      const aTail = aWords.slice(aWords.length - k).join(" ").toLowerCase();
      const bHead = bWords.slice(0, k).join(" ").toLowerCase();
      if (aTail === bHead) {
        maxOverlap = k;
        break;
      }
    }
    if (maxOverlap > 0) {
      return aWords.concat(bWords.slice(maxOverlap)).join(" ");
    }
    return `${a} ${b}`;
  }

  let combinedText = providedText || "";
  const providedWords = countWords(providedText);
  const defaultWords = countWords(defaultText);

  if (!providedText) {
    combinedText = defaultText;
  } else if (providedWords < thresholdWords) {
    const normProvided = normalizeForCompare(providedText);
    const normDefault = normalizeForCompare(defaultText);

    if (normDefault.includes(normProvided)) {
      combinedText = defaultText;
    } else if (normProvided.includes(normDefault)) {
      combinedText = providedText;
    } else {
      combinedText = mergeAvoidDup(providedText, defaultText);
    }
  } else {
    combinedText = providedText;
  }

  function firstNWords(str: string, n = 100) {
    const words = String(str || "").trim().split(/\s+/).filter(Boolean);
    if (words.length <= n) return words.join(" ");
    return words.slice(0, n).join(" ") + "...";
  }
  const previewText = firstNWords(combinedText, 100);

  const [animatedValues, setAnimatedValues] = useState<number[]>(
    highlights.map(() => 0)
  );

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    function runCounters() {
      highlights.forEach((h, idx) => {
        const raw = String(h.value);
        const target = parseInt(raw.replace(/\D/g, ""), 10);
        if (isNaN(target)) return;
        const duration = 1200 + idx * 200;
        const start = performance.now();
        const from = 0;
        const tick = (now: number) => {
          const elapsed = Math.min(1, (now - start) / duration);
          const curr = Math.round(from + (target - from) * (1 - Math.pow(1 - elapsed, 3)));
          setAnimatedValues((prev) => {
            const copy = [...prev];
            copy[idx] = curr;
            return copy;
          });
          if (elapsed < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [highlights]);

  const { openModal } = useRequestQuote(); // Use the hook

  return (
    <>
    <section ref={containerRef} className="relative bg-white">
      <div className="w-full bg-[--color-primary] h-[5px]" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-56 md:h-72 lg:h-[380px]">
                {!imgError ? (
                  <Image
                    src={safeImageSrc(imageSrc)}
                    alt={headline ?? "Company image"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    onLoad={() => setImgLoading(false)}
                    onError={() => {
                      setImgError(true);
                      setImgLoading(false);
                    }}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-[#e6f6ff] to-[#f8fdff]">
                    <div className="text-center p-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-md bg-[--color-primary] text-white font-bold text-lg mb-3">
                        TW
                      </div>
                      <div className="text-sm text-[#0b2f4a]">Techwin</div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-black/25 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              {headline}
            </h2>

            <p className="mt-3 text-gray-700 text-sm md:text-base max-w-3xl">
              {previewText}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {highlights.map((h, idx) => {
                const raw = String(h.value);
                const numeric = parseInt(raw.replace(/\D/g, ""), 10);
                const display = isNaN(numeric) ? h.value : `${animatedValues[idx] || 0}${String(h.value).replace(/\d/g, "")}`;
                return (
                  <div key={idx} className="flex flex-col items-start gap-1 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">
                        {idx + 1}
                      </div>
                      <div className="text-lg font-bold text-primary leading-none">
                        {display}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{h.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Link
                href={ctaPrimary.href}
                className="inline-block rounded-full bg-primary text-white px-5 py-2.5 font-medium shadow hover:brightness-95 transition"
              >
                {ctaPrimary.label}
              </Link>

              <button
                onClick={openModal}
                className="inline-block rounded-full bg-white border border-primary text-primary px-5 py-2.5 font-medium hover:bg-primary/5 transition"
              >
                {ctaSecondary.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
