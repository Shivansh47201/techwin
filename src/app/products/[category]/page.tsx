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
import DatasheetGallery from "@/components/category/DatasheetGallery";
import FAQ from "@/components/common/FAQ";
import WhyChooseUs from "@/components/common/WhyChooseUs";
import CategoryCTA from "@/components/category/CategoryCTA";
 
import type { CategoryData } from "@/types/categories";

import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { highPowerData } from "@/data/categories/highPowerData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { pointLightSourceData } from "@/data/categories/pointLightSourceData";

// Map slug -> data (single source)
const CATEGORY_MAP: Record<string, CategoryData> = {
  "single-frequency-fiber-lasers": singleFrequencyData,
  "high-power-fiber-lasers": highPowerData,
  "broadband-ase-sources": broadbandAseData,
  "wavelength-conversion-lasers": wavelengthConversionData,
  "fiber-amplifiers": fiberAmplifierData,
  "testing-systems": laserTestingData,
  "sled-light-sources": sledLightData,
  "seed-lasers": seedFiberData,
  "point-light-sources": pointLightSourceData,
};

type Props = { params: Promise<{ category: string }> | { category: string } };

// Provide static params for export mode (output: 'export')
export async function generateStaticParams() {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.products)) {
        return data.products.map((c: any) => ({ category: c.categorySlug }));
      }
    }
  } catch (e) {
    // ignore and fallback
  }

  // fallback: use keys from in-file map
  return Object.keys(CATEGORY_MAP).map((k) => ({ category: k }));
}

// NOTE: Next may pass `params` as a Promise — unwrap it with await
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.category;
  const data = slug ? CATEGORY_MAP[slug] : null;

  if (!data) {
    return { title: "Products | Techwin" };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: data.hero?.image ? [{ url: data.hero.image, alt: data.hero?.imageAlt ?? data.metaTitle }] : undefined,
    },
  };
}

// Page component — also async so we can await params safely
export default async function CategoryPage({ params }: Props) {
  const resolved = await params;
  const slug = resolved?.category;
  const data = slug ? CATEGORY_MAP[slug] : null;

  if (!data) return notFound();

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
  } = data as CategoryData;

  return (
    <main>
      <CategoryHero hero={hero} />
      <CategoryIntro intro={intro} keyFeaturesPreview={keyFeatures?.slice(0, 3)} />

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <KeyFeatures items={keyFeatures} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SubCategoryGrid items={subCategories} categorySlug={slug} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TechnicalBenefits items={technicalBenefits} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* FIXED: pass destructured variables, not 'categoryData' */}
          <ApplicationsSection hero={hero} applications={applications} />
        </div>
      </section>

      {specGroups && specGroups.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SpecsTable specGroups={specGroups} />
          </div>
        </section>
      )}

      {/* <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <DatasheetGallery downloads={downloads} />
        </div>
      </section> */}

      {faqs && faqs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <FAQ faqs={faqs} />
          </div>
        </section>
      )}

      {/* <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <WhyChooseUs counters={counters ?? [{ label: "Years", value: "20+" }, { label: "Countries", value: "30+" }]} trustLogos={trustLogos ?? []} />
        </div>
      </section> */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <CategoryCTA cta={cta} contactPhone={contactPhone} />
        </div>
      </section>
    </main>
  );
}