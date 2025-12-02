// src/components/products/ProductFamilies.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import category data so product cards come from the canonical data source
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { highPowerData } from "@/data/categories/highPowerData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { pointLightSourceData } from "@/data/categories/pointLightSourceData";
import { sledLightData } from "@/data/categories/sledLightData";

export type ProductCard = {
  id: string;
  title: string;
  short: string;
  img?: string;
  href?: string;
};

type Props = {
  products?: ProductCard[];
  heading?: string;
  subheading?: string;
  showSeeAllButton?: boolean;
};

// Build products list from category data so URLs and content remain canonical
const DATA_CATEGORIES = [
  singleFrequencyData,
  seedFiberData,
  highPowerData,
  wavelengthConversionData,
  broadbandAseData,
  fiberAmplifierData,
  laserTestingData,
  pointLightSourceData,
  sledLightData,
];

const EXAMPLE_PRODUCTS: ProductCard[] = DATA_CATEGORIES.map((cat) => ({
  id:
    (cat.url || "")
      .replace(/[^a-z0-9-]/gi, "-")
      .replace(/^-+|-+$/g, "") ||
    (cat.hero?.title || cat.intro?.heading || "product")
      .replace(/\s+/g, "-")
      .toLowerCase(),
  title: cat.intro?.heading || cat.hero?.title || cat.metaTitle || "Product",
  short: (cat.intro?.description || cat.hero?.tagline || "").slice(0, 220),
  img: cat.hero?.image || undefined,
  href: cat.url || "/products",
}));

function normalizeHref(href?: string) {
  if (!href) return "/products";
  return href.startsWith("/products")
    ? href
    : href.startsWith("/")
    ? `/products${href}`
    : `/products/${href}`;
}

function Card({ product, href }: { product: ProductCard; href: string }) {
  const normalizedHref = normalizeHref(href);

  return (
    // wrap the whole card in a Link so clicking anywhere navigates
    <Link
      href={normalizedHref}
      aria-label={`Open ${product.title}`}
      className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 rounded-2xl"
    >
      <article className="bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 flex flex-col h-full border border-white/10">
        <div className="relative h-40 md:h-44 overflow-hidden bg-gray-50">
          {product.img ? (
            <Image
              src={product.img}
              alt={product.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#111827]">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">{product.short}</p>
          </div>

          <div className="mt-auto pt-4">
            {/* Present a visual CTA but it's not a nested link (card itself is the link) */}
            <span className="inline-block bg-[var(--color-primary)] text-white font-medium text-xs sm:text-sm px-3 py-1.5 rounded">
              Learn More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProductFamilies({
  products = EXAMPLE_PRODUCTS,
  heading = "Product Families",
  subheading = "Explore our complete range of high-performance laser systems and optical sources.",
  showSeeAllButton = true,
}: Props) {
  // Grid appearance settings — change gridSize to adjust cell size
  const gridSize = 48; // px (cell size)
  const lineColor = "rgba(255,255,255,0.06)"; // faint line color
  const baseColorVar = "var(--color-primary)"; // existing CSS variable for section blue

  const gridStyle: React.CSSProperties = {
    backgroundColor: baseColorVar,
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent ${gridSize -
      1}px, ${lineColor} ${gridSize - 1}px, ${lineColor} ${gridSize}px),
      repeating-linear-gradient(90deg, transparent, transparent ${gridSize -
      1}px, ${lineColor} ${gridSize - 1}px, ${lineColor} ${gridSize}px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px`,
    // ensure the grid is crisp on low-dpi displays
    backgroundRepeat: "repeat",
  };

  return (
    <section className="relative py-16 text-white" style={gridStyle}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">{heading}</h2>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">{subheading}</p>
        </div>

        {/* product grid - subtle separators (card borders) + spacing so grid shows through */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.id} product={p} href={p.href || "/products"} />
          ))}
        </div>

        {/* button bottom center */}
        {showSeeAllButton && (
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-white text-[var(--color-primary)] font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-white/90 transition"
            >
              See All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
