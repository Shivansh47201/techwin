// Timestamp: 2025-11-25T12:00:00Z - Forcing a re-compile to fix cache issue.
import Hero from "@/components/hero/Hero";
import CompanyProfile from "@/components/company/CompanyProfile";
import ProductFamilies from "../components/products/ProductFamilies";
import Applications from "@/components/home/Applications";
import TrustStrip from "@/components/trust/TrustStrip";
import TechHighlights from "../components/specs/TechHighlights";
import RequestQuoteButton from "@/components/quote/RequestQuoteButton";
import { applications } from "@/data/Application/applications";
import type { AppCard } from "@/components/home/Applications";
import type { HeroSlide } from "@/components/hero/Hero";
import type { Metadata } from "next";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch home page data from MongoDB
async function getHomePageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/admin/pages/home`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch home page data");
    }
    
    const data = await res.json();
    console.log("Fetched trustStrip data:", data.trustStrip);
    return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
}

// Generate dynamic metadata from MongoDB
export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePageData();
  const seo = homeData?.seo;

  console.log("🔍 SEO Metadata Generation:", {
    hasSeoData: !!seo,
    title: seo?.title,
    description: seo?.description?.substring(0, 50) + "...",
    canonical: seo?.canonical,
  });

  const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!seo) {
    console.warn("⚠️ No SEO data found, using defaults");
    return {
      title: "Techwin",
      description: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
      metadataBase: new URL(baseUrl),
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: seo.canonical || baseUrl,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: 'website',
      url: seo.canonical || baseUrl,
      siteName: 'Techwin',
    },
    twitter: {
      card: (seo.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
      title: seo.twitterTitle || seo.ogTitle || seo.title,
      description: seo.twitterDescription || seo.ogDescription || seo.description,
      images: seo.twitterImage || seo.ogImage ? [seo.twitterImage || seo.ogImage || ""] : undefined,
      site: '@techwin',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

const adaptedApplications: AppCard[] = applications.map((app) => ({
  id: app.slug,
  name: app.name,
  icon: app.image,
  short: app.short,
  ctaHref: `/application/${app.slug}`,
}));

export default async function HomePage() {
  const homeData = await getHomePageData();
  
  // Convert MongoDB hero slides to Hero component format
  const heroSlides: HeroSlide[] = homeData?.heroSlides?.map((slide: any) => ({
    id: slide.id,
    image: slide.image,
    headline: slide.headline,
    sub: slide.sub,
    ctaSecondary: slide.ctaLink ? {
      type: "custom" as const,
      href: slide.ctaLink,
      label: slide.ctaLabel,
    } : undefined,
  })) || [];

  // Company profile data
  const companyProfile = homeData?.companyProfile || {
    image: "/techwin-company/techwin-building.jpg",
    headline: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
    text: "Techwin is a high-tech enterprise specializing in advanced fiber laser technology.",
    highlights: [
      { label: "Years", value: "20+" },
      { label: "Countries", value: "30+" },
      { label: "Focus", value: "SF Lasers" },
    ],
  };

  // Technical highlights data
  const techHighlights = homeData?.technicalHighlights || {
    heading: "Technical Highlights",
    subheading: "Key specifications that define Techwin's high-performance laser excellence.",
    specs: [],
  };

  // Trust Strip data
  const trustStripData = homeData?.trustStrip || {
    heading: "Why Techwin — Trusted Worldwide",
    bullets: [
      "20+ Years of Experience",
      "Independent IP & Patents",
      "Exported to 30+ Countries",
      "ISO / QC Certified",
    ],
    counters: [
      { id: "years", label: "Years", value: "20+" },
      { id: "countries", label: "Countries", value: "30+" },
      { id: "clients", label: "Major Clients", value: "200+" },
    ],
    logos: [
      { id: "logo-1", src: "/logos/client-a.png", alt: "Client A" },
      { id: "logo-2", src: "/logos/client-b.png", alt: "Client B" },
      { id: "logo-3", src: "/logos/client-c.png", alt: "Client C" },
      { id: "logo-4", src: "/logos/client-d.png", alt: "Client D" },
    ],
    ctaLabel: "Request a Quote",
  };

  // Heading Levels
  const headingLevels = homeData?.headingLevels || {
    hero: 'h1',
    companyProfile: 'h2',
    productFamilies: 'h2',
    applications: 'h2',
    trustStrip: 'h3',
    techHighlights: 'h2',
  };


  // Convert icon strings to React components
  const iconMap: Record<string, any> = {
    Waves: "Waves",
    Activity: "Activity",
    Radio: "Radio",
    Zap: "Zap",
    Ruler: "Ruler",
    Sparkles: "Sparkles",
    Settings: "Settings",
    Cpu: "Cpu",
  };

  // Schema.org structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const seoData = homeData?.seo;
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Techwin",
    "url": baseUrl,
    "logo": `${baseUrl}/techwin-logo-rectangle.png`,
    "description": seoData?.description || "Leading manufacturer of single-frequency fiber lasers with 20+ years of experience",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "techwinchina@gmail.com",
      "telephone": "+86-57188284299"
    },
    "sameAs": [
      "https://www.linkedin.com/company/techwin",
      "https://twitter.com/techwin"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Techwin",
    "url": baseUrl,
    "description": seoData?.description || "Single-frequency fiber laser solutions",
    "publisher": {
      "@type": "Organization",
      "name": "Techwin"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  return (
    <>
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <Hero slides={heroSlides} headingLevel={headingLevels.hero} />
      <CompanyProfile
        image={companyProfile.image}
        headline={companyProfile.headline}
        text={companyProfile.text}
        highlights={companyProfile.highlights}
        headingLevel={headingLevels.companyProfile}
      />
      <ProductFamilies
        heading="Product Families"
        subheading="Explore our main product lines — single-frequency lasers, seed lasers, high-power sources and more."
        showSeeAllButton={false}
        headingLevel={headingLevels.productFamilies}
        autoLoad={true}
        category="single-frequency"
      />
      <Applications cards={adaptedApplications} headingLevel={headingLevels.applications} />
      <TrustStrip 
        heading={trustStripData.heading}
        bullets={trustStripData.bullets}
        counters={trustStripData.counters}
        logos={trustStripData.logos}
        cta={{ label: trustStripData.ctaLabel, href: "/request-quote" }}
        headingLevel={headingLevels.trustStrip}
      />
      <TechHighlights 
        heading={techHighlights.heading}
        subheading={techHighlights.subheading}
        specs={techHighlights.specs.map((spec: any) => ({
          id: spec.id,
          title: spec.title,
          desc: spec.desc,
          icon: spec.icon,
        }))}
        headingLevel={headingLevels.techHighlights}
      />
      <RequestQuoteButton />
    </>
  );
}
