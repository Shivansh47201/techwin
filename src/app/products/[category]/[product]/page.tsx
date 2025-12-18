// @ts-nocheck
/// <reference types="react/jsx-runtime" />
// src/app/products/[category]/[product]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import React from "react";

import {
  getAllProductPaths,
  getProductData,
  getAllProducts,
} from "@/lib/products";

import ProductDetailHero from "@/components/products/ProductDetailHero";
import ProductGallery from "@/components/products/ProductGallery";
import ProductSpecs from "@/components/products/ProductSpecs";
import ProductDescription from "@/components/products/ProductDescription";
import ProductTabs from "@/components/products/ProductTabs";
import DownloadAndDatasheet from "@/components/products/DownloadAndDatasheet";
import RelatedProducts from "@/components/products/RelatedProducts";
import RequestQuote from "@/components/products/RequestQuote";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductComparisonTable from "@/components/products/ProductComparisonTable";
import { Product } from "@/types/categories";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import CompactProductPanel from "@/components/products/CompactProductPanel";
import ProductGraphsAndTableSection from "@/components/products/ProductGraphsAndTableSection";
import ProductGraphsAndTableImageSection from "../../../../components/products/ProductGraphsAndTableImageSection";

export async function generateStaticParams() {
  return getAllProductPaths();
}

export async function generateMetadata({
  params,
}: {
  params:
    | Promise<{ category: string; product: string }>
    | { category: string; product: string };
}): Promise<Metadata> {
  const resolved = await params;
  const { category, product } =
    resolved || ({} as { category?: string; product?: string });

  const productData = await getProductData(category, product);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const p: Product = productData;

  return {
    title: p.title || "Techwin Product",
    description: p.shortDescription || p.meta?.description || "Techwin Laser Product",
    openGraph: {
      title: p.title || "Techwin Product",
      description: p.shortDescription || p.meta?.description || "Techwin Laser Product",
      images: p.heroImage
        ? [
            {
              url: typeof p.heroImage === "string" ? p.heroImage : (p.heroImage as any).url,
              width: 1200,
              height: 630,
              alt: p.title,
            },
          ]
        : [],
    },
  };
}

/**
 * Helper: normalize possible image shapes into a string src.
 * Accepts: string, { src, alt }, undefined, null
 */
function resolveImgSrc(img?: any): string | undefined {
  if (!img) return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.src) return img.src;
  return undefined;
}

export default async function ProductPage({
  params,
}: {
  params:
    | Promise<{ category: string; product: string }>
    | { category: string; product: string };
}) {
  const resolved = await params;
  const { category, product } =
    resolved || ({} as { category?: string; product?: string });

  const productData = await getProductData(category, product);

  if (!productData) {
    notFound();
  }

  const p: Product = productData;

  // --- FIXED: use the loaded product object `p` (not the route `product` string) ---
  const heroProps = {
    title: p.title,
    description: p.shortDescription,
    heroImage: p.heroImage,
    galleryImages: p.galleryImages,
    ctas: [{ label: "Contact Us", href: "/contact" }],
    breadcrumbs: [{ label: "Products", href: "/products" }, { label: p.title }],
    features: p.features ?? [],
    applicationAreas: p.applicationAreas ?? [],
  };
  // ------------------------------------------------------------------------------

  const specSummary = {
    Bandwidth: "Wide-spectrum (multi-λ)",
    Coherence: "Low coherence (OCT-ready)",
    Stability: "Long-term stable output",
    Form: "Compact, integration-ready",
  };

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      href: `/products/${category}`,
    },
    { label: p.title },
  ];

  const specsForTable =
    p.sections
      .find((s) => s.type === "specs")
      ?.specGroups?.[0].rows.reduce(
        (acc: Record<string, any>, row: any) => ({
          ...acc,
          [row.name]: row.value,
        }),
        {}
      ) ?? {};

let allProductsByCategory: Record<string, { slug: string; title: string }[]> =
    {};
  try {
    const allProducts = await getAllProducts();
    
    // Filter to only include products with valid data
    for (const item of allProducts) {
      const validProducts: { slug: string; title: string }[] = [];
      
      for (const prod of item.products) {
        try {
          const productData = await getProductData(item.categorySlug, prod.slug);
          if (productData) {
            validProducts.push(prod);
          }
        } catch (err) {
          // Skip products that fail to load
        }
      }
      
      // Only include categories that have valid products
      if (validProducts.length > 0) {
        allProductsByCategory[item.categorySlug] = validProducts;
      }
    }
  } catch (err) {
    allProductsByCategory = {};
  }

  // Determine a datasheet image source for ProductTabs:
  // Priority:
  // 1) p.datasheetImageSrc
  // 2) p.previewImageSrc
  // 3) p.datasheet?.preview (if your product structure uses nested datasheet preview)
  // 4) p.heroImage (fallback)
  const datasheetImageCandidate =
    resolveImgSrc((p as any).datasheetImageSrc) ||
    resolveImgSrc((p as any).previewImageSrc) ||
    resolveImgSrc((p as any).datasheet?.preview) ||
    resolveImgSrc(p.heroImage);

  // Also prepare a safe hero src for the Downloads tab area
  const safeHeroSrc =
    resolveImgSrc(p.heroImage) ??
    resolveImgSrc(p.previewImageSrc) ??
    "/products/Single-Frequency-Fiber-Lasers/ultra-narrow-linewidth.jpg";
  const safeHeroSrcEncoded = safeHeroSrc ? encodeURI(safeHeroSrc) : safeHeroSrc;

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 pt-40">
        <Breadcrumbs items={crumbs} />
      </div>

      <ProductDetailHero {...heroProps} />

      <ProductGraphsAndTableImageSection
        graphImageURL={p.graphImageURL}
        tableImageURL={p.tableImageURL || (p as any).tableImageUrl}
      />
      {/* 
      <ProductGraphsAndTableSection
        graphImageURL={p.graphImageURL}
        tableCsvUrl={p.tableCsvUrl}
        mergeRowColumns={[0]}
        blankAsContinuation={true}
      /> */}

      <div className="lg:col-span-7">
        <CompactProductPanel
          product={p}
          specSummary={specSummary}
          contactEmail="sales@techwin.example"
        />
      </div>

      {/* Pass all sections to the enhanced ProductDescription component */}
      <ProductDescription
        sections={p.sections}
        previewImageSrc={p.previewImageSrc}
      />

      {/* Data-driven Product Tabs */}
      <ProductTabs
        tabs={(() => {
          const TABS: {
            id: string;
            label: string;
            icon?: string;
            content: any;
          }[] = [];

          // Overview Tab
          TABS.push({
            id: "overview",
            label: "Overview",
            icon: "overview",
            content: (
              <p className="text-lg leading-relaxed text-white">{p.shortDescription}</p>
            ),
          });

          // Specs Tab
          if (Object.keys(specsForTable).length > 0) {
            TABS.push({
              id: "specifications",
              label: "Specifications",
              icon: "specifications",
              content: (
                <ProductSpecs
                  specs={specsForTable}
                  datasheetUrl={p.datasheetUrl}
                />
              ),
            });
          }

          // Comparison Tab
          const comparisonSection = p.sections.find(
            (s) => s.type === "comparison"
          );
          if (comparisonSection) {
            TABS.push({
              id: "comparison",
              label: "Comparison",
              icon: "comparison",
              content: <ProductComparisonTable section={comparisonSection} />,
            });
          }

          // Applications Tab
          const applicationsSection = p.sections.find((s) =>
            (s.heading || "").toLowerCase().includes("application")
          );
          if (applicationsSection) {
            TABS.push({
              id: "applications",
              label: "Applications",
              icon: "applications",
              content: (
                <div className="space-y-4 text-white">
                  <p>{applicationsSection.content}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {applicationsSection.bullets?.map(
                      (b: string, i: number) => (
                        <li key={i}>{b}</li>
                      )
                    )}
                  </ul>
                </div>
              ),
            });
          }

          return TABS;
        })()}
        sidebar={
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              Request a Quote
            </h3>
            <p className="text-gray-300/90 text-sm mb-6">
              Get pricing and technical details for the{" "}
              <span className="font-bold text-white">{p.title}</span>.
            </p>
            <a
              href="#request-quote"
              className="block w-full text-center px-6 py-3 mt-4 rounded-lg font-semibold text-white transition-all duration-300 bg-[#00a9e0] hover:scale-105"
              style={{ boxShadow: `0 4px 15px -5px #00a9e0` }}
            >
              Proceed to Quote Form
            </a>
          </div>
        }
        // pass both datasheetImageSrc and heroImage for maximum compatibility
        datasheetImageSrc={datasheetImageCandidate}
        heroImage={p.heroImage}
      />

      {p.relatedProducts && p.relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 py-8">
          <RelatedProducts
            items={p.relatedProducts}
            title="You may also like"
          />
        </section>
      )}

      {/* All categories/products (sitemap-like) - Excluding SLED/Point Light Sources */}
      {Object.keys(allProductsByCategory).length > 0 && (
        <section className="bg-gray-50/50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-[#3B9ACB] tracking-tight">
                Explore Our Full Product Catalog
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600 max-w-2xl mx-auto">
                From advanced fiber lasers to precision optics, browse our
                comprehensive range of solutions organized by category.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(allProductsByCategory)
                .slice(0, 8)
                .map(([catSlug, prods]) => (
                <div
                  key={catSlug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize">
                      {catSlug.replace(/-/g, " ")}
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      {prods.slice(0, 4).map((prod) => (
                        <li key={prod.slug} className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-[#00a9e0] mr-3 shrink-0" />
                          <a
                            href={`/products/${catSlug}/${prod.slug}`}
                            className="hover:text-[#00a9e0] transition-colors duration-200"
                          >
                            {prod.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto bg-gray-50 p-4 text-center">
                    <a
                      href={`/products/${catSlug}`}
                      className="font-semibold text-[#006bb3] hover:text-[#00a9e0] transition-colors duration-200 group"
                    >
                      View All in {catSlug.replace(/-/g, " ")}
                      <ArrowRight className="inline-block h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reverted RequestQuote to be a standard section */}
      <section id="request-quote" className="py-12 bg-white">
        <RequestQuote productTitle={p.title} productSlug={p.slug} />
      </section>
    </main>
  );
}
