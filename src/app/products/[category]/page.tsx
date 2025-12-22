// src/app/products/[category]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CategoryHero from "@/components/category/CategoryHero";
import CategoryIntro from "@/components/category/CategoryIntro";
import KeyFeatures from "@/components/category/KeyFeatures";
import SubCategoryGrid from "@/components/category/SubCategoryGrid";
import TechnicalBenefits from "@/components/category/TechnicalBenefits";
import ApplicationsSection from "@/components/category/ApplicationsSection";
import SpecsTable from "@/components/category/SpecsTable";
import FAQ from "@/components/common/FAQ";
import CategoryCTA from "@/components/category/CategoryCTA";

import type { CategoryData } from "@/types/categories";
import Category from "@/models/Category";
import { connectDB } from "@/lib/db";

/* ---------------------------
   STATIC LEGACY DATA (keep)
   --------------------------- */
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { highPowerData } from "@/data/categories/highPowerData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";
import { seedFiberData } from "@/data/categories/seedFiberData";

/* ---------------------------
   Helpers
   --------------------------- */
async function getCategoryFromDB(slug: string) {
  try {
    await connectDB();
    return await Category.findOne({
      slug,
      status: "published",
    }).lean();
  } catch (e) {
    // swallow DB errors — fallback to static
    console.error("getCategoryFromDB error:", e);
    return null;
  }
}

/* ---------------------------
   Static map (legacy)
   --------------------------- */
const CATEGORY_MAP: Record<string, CategoryData> = {
  "single-frequency": singleFrequencyData,
  "high-power": highPowerData,
  "ase-sources": broadbandAseData,
  "wavelength-conversion": wavelengthConversionData,
  "fiber-amplifiers": fiberAmplifierData,
  testing: laserTestingData,
  sled: sledLightData,
  "seed-lasers": seedFiberData,
};

type Props = { params: Promise<{ category: string }> | { category: string } };

/* ---------------------------
   generateStaticParams
   - include static slugs
   - merge published DB slugs (if DB available)
   --------------------------- */
export async function generateStaticParams() {
  const staticSlugs = Object.keys(CATEGORY_MAP).map((k) => ({ category: k }));

  try {
    await connectDB();
    const dbCats = await Category.find({ status: "published" })
      .select("slug")
      .lean();
    const dbSlugs = (dbCats || []).map((c: any) => ({ category: c.slug }));

    // merge unique
    const merged = [...staticSlugs, ...dbSlugs];
    const unique = Array.from(
      new Map(merged.map((i) => [i.category, i])).values()
    );
    return unique;
  } catch (e) {
    // DB not available — fall back to static list
    return staticSlugs;
  }
}

/* ---------------------------
   generateMetadata (hybrid)
   - prefer DB (published)
   - fallback to static
   --------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.category;

  if (!slug) return { title: "Products | Techwin" };

  // Try DB first
  const dbCategory = await getCategoryFromDB(slug);

  if (dbCategory) {
    const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/g, "");
    const canonicalUrl = dbCategory.canonicalUrl || `${siteBase}/products/${slug}`;
    
    return {
      title: dbCategory.metaTitle || "Products | Techwin",
      description: dbCategory.metaDescription || "",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: dbCategory.metaTitle || undefined,
        description: dbCategory.metaDescription || undefined,
        type: (dbCategory.ogType === "article" ? "article" : "website") as "website" | "article",
        images: (dbCategory.ogImage || dbCategory.hero?.image)
          ? [
              {
                url: dbCategory.ogImage || dbCategory.hero.image,
                alt: dbCategory.ogImageAlt || dbCategory.hero.imageAlt || dbCategory.metaTitle,
              },
            ]
          : undefined,
      },
    };
  }

  // Fallback to static
  const staticData = CATEGORY_MAP[slug];
  if (staticData) {
    return {
      title: staticData.metaTitle || "Products | Techwin",
      description: staticData.metaDescription || "",
      openGraph: {
        title: staticData.metaTitle || undefined,
        description: staticData.metaDescription || undefined,
        images: staticData.hero?.image
          ? [
              {
                url: staticData.hero.image,
                alt: staticData.hero.imageAlt ?? staticData.metaTitle,
              },
            ]
          : undefined,
      },
    };
  }

  // default
  return { title: "Products | Techwin" };
}

/* ---------------------------
   Page component (hybrid)
   - DB first (published)
   - static fallback
   --------------------------- */
export default async function CategoryPage({ params }: Props) {
  const resolved = await params;
  const slug = resolved?.category;

  if (!slug) return notFound();

  // Try DB
  const dbCategory = await getCategoryFromDB(slug);

  // Normalize DB -> frontend CategoryData shape
  const data: CategoryData | null = dbCategory
    ? {
        url: dbCategory.url ?? `/products/${dbCategory.slug}`,
        metaTitle: dbCategory.metaTitle ?? "",
        metaDescription: dbCategory.metaDescription ?? "",
        hero: dbCategory.hero || {
          title: dbCategory.metaTitle || "",
          tagline: "",
          image: "",
          imageAlt: "",
        },
        intro: dbCategory.intro || { heading: "", description: "" },
        keyFeatures: dbCategory.keyFeatures ?? [],
        subCategories: dbCategory.subCategories ?? [],
        technicalBenefits: dbCategory.technicalBenefits ?? [],
        applications: dbCategory.applications ?? [],
        cta: dbCategory.cta || {
          primary: { label: "Request a Quote", href: "/contact" },
        },
        contactPhone: dbCategory.contactPhone,
        notes: dbCategory.notes,
        featureMatrix: dbCategory.featureMatrix,
        faqs: [],
        downloads: [],
        trustLogos: undefined,
        counters: undefined,
      }
    : CATEGORY_MAP[slug] ?? null;

  if (!data) return notFound();

  // destructure for UI (typesafe defaults)
  const {
    hero,
    intro,
    keyFeatures = [],
    subCategories = [],
    technicalBenefits = [],
    applications = [],
    cta = { primary: { label: "Request a Quote", href: "/contact" } },
    downloads = [],
    contactPhone,
    faqs = [],
    counters,
    trustLogos,
    specGroups,
    featureMatrix,
  } = data as CategoryData;

  // Get heading levels from DB or use defaults
  const headingLevels = dbCategory?.headingLevels || {
    hero: "h1",
    intro: "h2",
    keyFeatures: "h2",
    subCategories: "h2",
    technicalBenefits: "h2",
    applications: "h2",
    cta: "h2",
  };

  // Generate Schema.org JSON-LD
  const schemaData = dbCategory?.schemaData || {
    "@context": "https://schema.org",
    "@type": dbCategory?.schemaType || "Product",
    "name": hero.title || data.metaTitle,
    "description": intro.description || data.metaDescription,
    "image": hero.image,
  };

  return (
    <main>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      
      <CategoryHero hero={hero} headingLevel={headingLevels.hero} />
      <CategoryIntro
        intro={intro}
        keyFeaturesPreview={keyFeatures?.slice(0, 3)}
        headingLevel={headingLevels.intro}
      />

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <KeyFeatures
            items={keyFeatures}
            featureMatrix={featureMatrix}
            subCategories={subCategories}
            headingLevel={headingLevels.keyFeatures}
          />
        </div>
      </section>

      <SubCategoryGrid 
        items={subCategories} 
        categorySlug={slug} 
        autoLoad={!subCategories || subCategories.length === 0}
      />

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TechnicalBenefits items={technicalBenefits} headingLevel={headingLevels.technicalBenefits} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <ApplicationsSection hero={hero} applications={applications} headingLevel={headingLevels.applications} />
        </div>
      </section>

      {specGroups && specGroups.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SpecsTable specGroups={specGroups} />
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <FAQ faqs={faqs} />
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <CategoryCTA cta={cta} contactPhone={contactPhone} headingLevel={headingLevels.cta} />
        </div>
      </section>
    </main>
  );
}
