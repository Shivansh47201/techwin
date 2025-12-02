// Timestamp: 2025-11-25T12:00:00Z - Forcing a re-compile to fix cache issue.
import Hero from "@/components/hero/Hero";
import CompanyProfile from "@/components/company/CompanyProfile";
import { HERO_SLIDES } from "@/data/heroSlides";
import ProductFamilies from "../components/products/ProductFamilies";
import Applications from "./Applications";
import TrustStrip from "@/components/trust/TrustStrip";
import TechHighlights from "../components/specs/TechHighlights";
import RequestQuoteButton from "@/components/quote/RequestQuoteButton";

import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { highPowerData } from "@/data/categories/highPowerData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { sledLightData } from "@/data/categories/sledLightData";

import { applications as originalApplications } from "@/data/applications";
import type { ProductCard } from "../components/products/ProductFamilies";
import type { AppCard } from "./Applications";

const categoryData = [
  singleFrequencyData,
  seedFiberData,
  highPowerData,
  wavelengthConversionData,
  broadbandAseData,
  fiberAmplifierData,
  laserTestingData,
  sledLightData,
];

const productFamilies: ProductCard[] = categoryData.map((cat) => ({
  id: cat.url,
  title: (cat.intro && cat.intro.heading) || cat.title || "Product Category",
  short: (cat.hero && cat.hero.tagline) || cat.tagline || "",
  img: (cat.hero && cat.hero.image) || cat.image || "",
  href: cat.url,
}));

const adaptedApplications: AppCard[] = originalApplications.map((app: any) => {
  // support multiple shapes: heroImage {src}, image string, or fallback
  const rawIcon = (app.heroImage && (typeof app.heroImage === "string" ? app.heroImage : app.heroImage.src)) || app.image || `/applications/${app.slug}.jpg`;
  const iconSrc = rawIcon;
  return {
    id: app.slug,
    name: app.name || app.title || app.heroTitle || app.slug,
    icon: iconSrc,
    short: app.heading || app.tagline || app.heroIntro || "",
    ctaHref: `/application/${app.slug}`,
  } as AppCard;
});


export default function HomePage() {
  return (
    <>
      <Hero slides={HERO_SLIDES} /* + companyInfo if you want */ />
      <CompanyProfile
        image="/techwin-company/techwin-building.jpg"
        headline="Techwin — World-class Single-Frequency Fiber Laser Solutions"
        text="Techwin is a high-tech enterprise..."
        highlights={[
          { label: "Years", value: "20+" },
          { label: "Countries", value: "30+" },
          { label: "Focus", value: "SF Lasers" },
        ]}
      />
      <ProductFamilies
        products={productFamilies}
        heading="Product Families"
        subheading="Explore our main product lines — single-frequency lasers, seed lasers, high-power sources and more."
        showSeeAllButton={false}
      />
      <Applications cards={adaptedApplications} />
      <TrustStrip />
      <TechHighlights />
      <RequestQuoteButton />
    </>
  );
}
