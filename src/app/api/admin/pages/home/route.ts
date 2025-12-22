// src/app/api/admin/pages/home/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HomePage from "@/models/HomePage";

export async function GET() {
  try {
    await connectDB();
    
    let homePage = await HomePage.findOne();
    
    const defaultTrustStrip = {
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

    const defaultSEO = {
      title: "Techwin — Single-Frequency Fiber Lasers | Ultra-narrow Linewidth Solutions",
      description: "Techwin specializes in single-frequency fiber lasers with ultra-narrow linewidth and high stability. 20+ years of experience serving LiDAR, quantum technology, sensing, and communications industries worldwide.",
      canonical: "https://www.techwin.com",
      ogTitle: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
      ogDescription: "Leading manufacturer of single-frequency fiber lasers, high-power sources, and seed lasers. Trusted by customers in 30+ countries for LiDAR, quantum tech, and precision sensing applications.",
      ogImage: "/techwin-company/techwin-building.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: "Techwin — Single-Frequency Fiber Lasers",
      twitterDescription: "Ultra-narrow linewidth fiber lasers for LiDAR, quantum, sensing & communications. 20+ years of expertise.",
      twitterImage: "/techwin-company/techwin-building.jpg",
    };

    const defaultHeadingLevels = {
      hero: 'h1',
      companyProfile: 'h2',
      productFamilies: 'h2',
      applications: 'h2',
      trustStrip: 'h3',
      techHighlights: 'h2',
    };
    
    // If no homepage exists, create a default one
    if (!homePage) {
      homePage = await HomePage.create({
        heroSlides: [
          {
            id: "s1",
            image: "/hero/laser-1.jpg",
            headline: "Single-Frequency Fiber Lasers — Ultra-narrow linewidth, high stability",
            sub: "Custom solutions for LiDAR, sensing, quantum and communications.",
            ctaLabel: "View Products",
            ctaLink: "/products",
          },
          {
            id: "s2",
            image: "/hero/laser-2.jpg",
            headline: "High-power & low-noise lasers for long-range LiDAR",
            sub: "Reliable, high-power sources with industry-leading stability.",
            ctaLabel: "View Applications",
            ctaLink: "/application",
          },
          {
            id: "s3",
            image: "/hero/laser-3.jpg",
            headline: "Frequency-stabilized seed lasers for precision sensing",
            sub: "Optimized for fiber sensing and quantum experiments.",
            ctaLabel: "Contact Us",
            ctaLink: "/contact",
          },
        ],
        companyProfile: {
          image: "/techwin-company/techwin-building.jpg",
          headline: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
          text: "Techwin is a high-tech enterprise specializing in advanced fiber laser technology. With over 20 years of experience, we provide cutting-edge solutions to customers worldwide.",
          highlights: [
            { label: "Years", value: "20+" },
            { label: "Countries", value: "30+" },
            { label: "Focus", value: "SF Lasers" },
          ],
        },
        technicalHighlights: {
          heading: "Technical Highlights",
          subheading: "Key specifications that define Techwin's high-performance laser excellence.",
          specs: [
            {
              id: "linewidth",
              title: "Ultra-narrow Linewidth",
              desc: "Sub-kHz spectral purity for precision optical coherence measurements.",
              icon: "Waves",
            },
            {
              id: "noise",
              title: "Low Phase & Intensity Noise",
              desc: "Advanced design ensures industry-leading noise suppression.",
              icon: "Activity",
            },
            {
              id: "bands",
              title: "Wavelength Bands",
              desc: "Available in 1.0 µm, 1.5 µm and 2.0 µm spectral regions.",
              icon: "Radio",
            },
            {
              id: "power",
              title: "Power Range",
              desc: "Configurable output: mW to multi-Watt systems (0.05 – 500 W).",
              icon: "Zap",
            },
            {
              id: "stability",
              title: "High Stability",
              desc: "Thermally controlled design for 24/7 operation in critical environments.",
              icon: "Ruler",
            },
            {
              id: "innovation",
              title: "Continuous Innovation",
              desc: "20+ years of R&D in single-frequency fiber laser technology.",
              icon: "Sparkles",
            },
          ],
        },
        trustStrip: defaultTrustStrip,
        seo: defaultSEO,
        headingLevels: defaultHeadingLevels,
      });
    }
    
    // No longer auto-adding fields - use migration script if needed
    // Data should already exist from migration
    
    // Verify SEO data exists before returning
    if (homePage) {
      console.log("📊 Returning homepage data:", {
        hasSeo: !!homePage.seo,
        seoTitle: homePage.seo?.title,
        hasTrustStrip: !!homePage.trustStrip,
        hasHeadingLevels: !!homePage.headingLevels,
      });
    }
    
    return NextResponse.json(homePage);
  } catch (error) {
    console.error("Error fetching home page:", error);
    return NextResponse.json(
      { error: "Failed to fetch home page" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log("📝 Updating homepage with data:", {
      hasSeo: !!data.seo,
      seoTitle: data.seo?.title?.substring(0, 50),
      hasHeadingLevels: !!data.headingLevels,
      heroLevel: data.headingLevels?.hero,
    });
    
    let homePage = await HomePage.findOne();
    
    if (!homePage) {
      const newPage = await HomePage.create(data);
      homePage = Array.isArray(newPage) ? newPage[0] : newPage;
      console.log("✅ Created new homepage document");
    } else {
      // Use findOneAndUpdate for proper nested object updates
      homePage = await HomePage.findOneAndUpdate(
        {},
        { $set: data },
        { new: true, runValidators: true }
      );
      console.log("✅ Updated existing homepage document");
    }
    
    return NextResponse.json(homePage);
  } catch (error) {
    console.error("❌ Error updating home page:", error);
    return NextResponse.json(
      { error: "Failed to update home page" },
      { status: 500 }
    );
  }
}
