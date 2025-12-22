import AboutHero from "./components/CenteredAbout/AboutHero";
import ExpertiseAndProducts from "./components/CenteredAbout/ExpertiseAndProducts";
import WhoWeAre from "./components/CenteredAbout/WhoWeAre";
import CommitmentGlobalInnovation from "./components/CenteredAbout/CommitmentGlobalInnovation";
import WhyChooseTechwin from "./components/CenteredAbout/WhyChooseTechwin";
import SustainabilityServiceVision from "./components/CenteredAbout/SustainabilityServiceVision";
import AboutFinalStatement from "./components/CenteredAbout/AboutFinalStatement";
import TechwinIntro from "@/components/company/TechwinIntro";
import type { Metadata } from "next";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch about page data from MongoDB
async function getAboutPageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/admin/pages/about`;
    
    console.log("🔄 Fetching about page data from:", url);
    
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 }
    });
    
    console.log("📡 Response status:", res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API Error Response:", errorText);
      throw new Error(`Failed to fetch about page data: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("✅ Successfully fetched about page data");
    return data;
  } catch (error) {
    console.error("❌ Error fetching about page data:", error);
    console.error("   Error details:", error instanceof Error ? error.message : String(error));
    return null;
  }
}

// Generate dynamic metadata from MongoDB
export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAboutPageData();
  const seo = aboutData?.seo;

  console.log("🔍 About SEO Metadata Generation:", {
    hasSeoData: !!seo,
    title: seo?.title,
    description: seo?.description?.substring(0, 50) + "...",
    canonical: seo?.canonical,
  });

  const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!seo) {
    console.warn("⚠️ No SEO data found for about page, using defaults");
    return {
      title: "About Techwin | Premium Fiber Laser Manufacturer",
      description: "Learn about Techwin, a leading fiber laser manufacturer in Hangzhou, China.",
      metadataBase: new URL(baseUrl),
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: seo.canonical || `${baseUrl}/about`,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: 'website',
      url: seo.canonical || `${baseUrl}/about`,
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

export default async function AboutPage() {
  const aboutData = await getAboutPageData();
  
  console.log("🏠 About Page Rendering:");
  console.log("  Hero title:", aboutData?.hero?.title);
  console.log("  Intro title:", aboutData?.intro?.title);
  console.log("  Who We Are:", aboutData?.whoWeAre?.content?.substring(0, 50));
  
  const headingLevels = aboutData?.headingLevels || {
    aboutHero: 'h1',
    techwinIntro: 'h2',
    whoWeAre: 'h2',
    expertiseProducts: 'h2',
    commitment: 'h2',
    whyChoose: 'h2',
    sustainability: 'h2',
    finalStatement: 'h3',
  };

  // Schema.org structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const seoData = aboutData?.seo;
  
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Techwin",
      "url": baseUrl,
      "logo": `${baseUrl}/techwin-logo-rectangle.png`,
      "description": seoData?.description || "Leading manufacturer of single-frequency fiber lasers with 20+ years of experience",
      "foundingDate": "2000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hangzhou",
        "addressRegion": "Zhejiang",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "info@techwin.com"
      }
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${baseUrl}/about`
      }
    ]
  };

  return (
    <main>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <AboutHero 
        title={aboutData?.hero?.title}
        subtitle={aboutData?.hero?.subtitle}
        description={aboutData?.hero?.description}
        backgroundImage={aboutData?.hero?.backgroundImage}
        backgroundVideo={aboutData?.hero?.backgroundVideo}
        headingLevel={headingLevels.aboutHero} 
      />
      <TechwinIntro 
        data={aboutData?.intro}
        headingLevel={headingLevels.techwinIntro} 
      />
      <WhoWeAre 
        data={aboutData?.whoWeAre}
        headingLevel={headingLevels.whoWeAre} 
      />
      <ExpertiseAndProducts 
        data={aboutData?.expertise}
        productLines={aboutData?.productLines}
        headingLevel={headingLevels.expertiseProducts} 
      />
      <CommitmentGlobalInnovation 
        sections={aboutData?.commitmentSections}
        headingLevel={headingLevels.commitment} 
      />
      <WhyChooseTechwin 
        data={aboutData?.whyChoose}
        headingLevel={headingLevels.whyChoose} 
      />
      <SustainabilityServiceVision 
        tabs={aboutData?.sustainabilityTabs}
        headingLevel={headingLevels.sustainability} 
      />
      <AboutFinalStatement 
        data={aboutData?.finalStatement}
        headingLevel={headingLevels.finalStatement} 
      />
    </main>
  );
}
