// src/components/products/ProductFamilies.tsx
"use client";

import React, { useState, useEffect } from "react";
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
import { sledLightData } from "@/data/categories/sledLightData";
import { PRODUCT_MAP } from "@/data/products";

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
  // Optional: when provided, show products from this category (category folder slug)
  category?: string;
  headingLevel?: string;
  autoLoad?: boolean; // NEW: automatically load products from products.json
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
            <span className="inline-block bg-primary text-white font-medium text-xs sm:text-sm px-3 py-1.5 rounded">
              Learn More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProductFamilies({
  products,
  heading = "Product Families",
  subheading = "Explore our complete range of high-performance laser systems and optical sources.",
  showSeeAllButton = true,
  category,
  headingLevel = "h2",
  autoLoad = false,
}: Props) {
  const [autoLoadedProducts, setAutoLoadedProducts] = useState<ProductCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-load products from products.json if autoLoad is enabled
  useEffect(() => {
    if (autoLoad && category) {
      setIsLoading(true);
      fetch(`/api/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.products) {
            // Convert API response to ProductCard format
            const cards: ProductCard[] = data.products.map((p: any) => ({
              id: p.id || p.slug,
              title: p.name || p.title,
              short: p.shortDescription || p.details || "",
              img: p.image,
              href: `/products/${category}/${p.id || p.slug}`,
            }));
            setAutoLoadedProducts(cards);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error auto-loading products:", error);
          setIsLoading(false);
        });
    }
  }, [autoLoad, category]);

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

  // If a category slug is provided and no explicit `products` were passed,
  // build a products list from the product catalogue that belong to the same
  // category. This makes the component usable on product pages to show
  // "more products" from the same category.
  const buildFromCategory = (cat?: string): ProductCard[] => {
    if (!cat) return [];
    try {
      const all = Object.values(PRODUCT_MAP) as any[];
      const filtered = all.filter((p) => {
        if (!p) return false;
        // Prefer explicit `category` field on product entries
        if (p.category && typeof p.category === "string") return p.category === cat;
        // Fallback: try to infer from hero/preview image path
        const src = (p.previewImageSrc || (p.heroImage && (typeof p.heroImage === "string" ? p.heroImage : p.heroImage.src)) || "") as string;
        return src.includes(`/${cat.replace(/^\//, "")}`) || src.includes(`/products/${cat}`) || src.includes(`/${cat.replace(/-/g, " ")}`);
      });

      return filtered.map((p) => {
        const img = (p.previewImageSrc || (p.heroImage && (typeof p.heroImage === "string" ? p.heroImage : p.heroImage.src)) || undefined) as string | undefined;
        const slug = p.slug || (p.meta && p.meta.title && p.meta.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) || String(Math.random());
        return {
          id: slug,
          title: p.title || (p.meta && p.meta.title) || "Product",
          short: p.shortDescription || (p.meta && p.meta.description) || "",
          img: img || undefined,
          href: `/products/${cat}/${slug}`,
        } as ProductCard;
      });
    } catch (err) {
      return [];
    }
  };

  const categoryProducts = (!products || products.length === 0) && category && !autoLoad ? buildFromCategory(category) : [];
  const displayProducts = autoLoad && autoLoadedProducts.length > 0
    ? autoLoadedProducts
    : products && products.length > 0
    ? products
    : categoryProducts.length > 0
    ? categoryProducts
    : EXAMPLE_PRODUCTS;

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative py-16 text-white" style={gridStyle}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 text-white" style={gridStyle}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-10">
          {React.createElement(
            headingLevel,
            { className: "text-3xl md:text-4xl font-extrabold tracking-tight mb-2" },
            heading
          )}
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">{subheading}</p>
        </div>

        {/* product grid - subtle separators (card borders) + spacing so grid shows through */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((p) => (
            <Card key={p.id} product={p} href={p.href || "/products"} />
          ))}
        </div>

        {/* button bottom center */}
        {showSeeAllButton && (
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-white text-primary font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-white/90 transition"
            >
              See All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
