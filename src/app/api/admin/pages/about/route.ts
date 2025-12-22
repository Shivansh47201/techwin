// src/app/api/admin/pages/about/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AboutPage from "@/models/AboutPage";

export async function GET() {
  try {
    console.log("🔍 GET /api/admin/pages/about - Starting...");
    
    await connectDB();
    console.log("✅ Database connected");
    
    let aboutPage = await AboutPage.findOne();
    console.log("📄 Found about page:", !!aboutPage);
    
    const defaultSEO = {
      title: "About Techwin | Premium Fiber Laser Manufacturer in Hangzhou",
      description: "Learn about Techwin, a leading fiber laser manufacturer in Hangzhou, China. Discover our expertise in ultra-narrow linewidth lasers, high-power systems, and innovative photonic solutions for global markets.",
      canonical: "https://www.techwin.com/about",
      ogTitle: "About Techwin — World-class Fiber Laser Solutions",
      ogDescription: "Leading manufacturer of single-frequency fiber lasers with 20+ years of experience. Serving customers worldwide with innovative photonic solutions.",
      ogImage: "/techwin-company/techwin-building.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: "About Techwin — Fiber Laser Excellence",
      twitterDescription: "20+ years of expertise in single-frequency fiber lasers. Trusted by customers in 30+ countries.",
      twitterImage: "/techwin-company/techwin-building.jpg",
    };

    const defaultHeadingLevels = {
      aboutHero: 'h1',
      techwinIntro: 'h2',
      whoWeAre: 'h2',
      expertiseProducts: 'h2',
      commitment: 'h2',
      whyChoose: 'h2',
      sustainability: 'h2',
      finalStatement: 'h3',
    };
    
    // If no about page exists, create a default one with all sections
    if (!aboutPage) {
      aboutPage = await AboutPage.create({
        hero: {
          title: "About Techwin",
          subtitle: "Leading the Future of Fiber Laser Technology",
          backgroundImage: "/techwin-company/techwin-building.jpg",
          backgroundVideo: "/videos/about-hero-video.webm",
        },
        intro: {
          title: "Welcome to Techwin",
          subtitle: "A Leader in High-Performance Fiber Laser Technology",
          leadText: "As a high-tech enterprise, Techwin is dedicated to the research, development, manufacturing, and global supply of high-performance fiber lasers, fiber amplifiers, and laser sources for both scientific and industrial applications.",
          image: "/images/innovation.jpg",
          sections: [
            {
              heading: "Our Expertise",
              content: "With over 20 years of continuous innovation in single-frequency fiber laser materials and devices, Techwin has become a leading company in the field of single-frequency fiber laser technology. Our main product lines cover single-frequency fiber lasers, pulsed fiber lasers, high-power fiber amplifiers, and frequency-stabilized laser sources, operating in wavelength bands of 1.0 µm, 1.5 µm, and 2.0 µm.",
            },
            {
              heading: "Global Reach and Application",
              content: "Our products have been widely applied in fields such as high-energy laser systems, fiber optic sensing, quantum technology, gravitational wave detection, satellite laser communication, and LiDAR. Today, Techwin's products are exported to more than 30 countries and regions.",
            },
          ],
          quote: "Our mission is to create world-class laser products, empower scientific innovation, and become a global leader in high-performance fiber laser technology.",
        },
        whoWeAre: {
          image: "/images/who-we-are.jpg",
          imageAlt: "Techwin R&D and photonics lab",
          content: "We are a team of passionate engineers and scientists dedicated to pushing the boundaries of fiber laser technology.",
        },
        expertise: {
          title: "Our Expertise in Optoelectronic Technology",
          description: [
            "Techwin is a forward-thinking optoelectronic technology manufacturer integrating research, development, and production into one streamlined process. With advanced optical simulation tools, precision fiber components, and world-class engineering, every system meets international laboratory and industrial standards.",
            "Our engineering team specializes in photonics, optoelectronics, and laser physics. From R&D to testing to after-sales support, every stage is handled with strict quality control — ensuring sub-Hz stability, narrow linewidth, and long-term reliability.",
          ],
          highlights: [
            "Sub-Hz linewidth single-frequency laser engineering",
            "Ultra-stable cavity design & low-noise electronics",
            "Precision fiber component manufacturing & QA",
            "Long-term reliability testing under harsh conditions",
          ],
        },
        productLines: [
          {
            id: "sf-lasers",
            title: "Single-Frequency Lasers",
            description: "Ultra-narrow linewidth for precision applications",
            icon: "Zap",
          },
          {
            id: "seed-lasers",
            title: "Seed Lasers",
            description: "Stable sources for amplification systems",
            icon: "Radio",
          },
          {
            id: "high-power",
            title: "High-Power Amplifiers",
            description: "Multi-watt systems for industrial use",
            icon: "TrendingUp",
          },
        ],
        commitmentSections: [
          {
            id: "commitment",
            title: "Commitment to Quality and Reliability",
            body: "As a responsible Fiber Laser Manufacturer, Techwin follows rigorous production standards and testing protocols to ensure every unit performs consistently under challenging conditions.",
            image: "/images/commitment.jpg",
          },
          {
            id: "global",
            title: "Global Presence as a China Fiber Laser Exporter",
            body: "Techwin has established itself as a dependable china fiber laser exporter, serving customers in more than 30 countries.",
            image: "/images/global-presence.jpg",
          },
          {
            id: "innovation",
            title: "Innovation and Research",
            body: "Research and innovation are the foundation of Techwin's growth. As a leading single frequency laser company, we continuously develop next-generation laser systems.",
            image: "/images/innovation.jpg",
          },
        ],
        whyChoose: {
          title: "Why Choose Techwin",
          description: "Choosing Techwin means partnering with a Fiber Laser Manufacturer that values precision, stability, and reliability.",
          points: [
            {
              title: "Comprehensive R&D Capability",
              desc: "In-house design and development for fiber laser sources and high-precision optical systems.",
              icon: "Cpu",
            },
            {
              title: "Advanced Manufacturing Facilities",
              desc: "State-of-the-art production lines and fiber-laser assembly units in Hangzhou City.",
              icon: "Building",
            },
            {
              title: "Strict Quality Assurance",
              desc: "Multi-step optical testing and performance verification before every shipment.",
              icon: "CheckCircle",
            },
            {
              title: "Global Customer Support",
              desc: "Dedicated assistance for installation, integration, and international client needs.",
              icon: "Globe",
            },
            {
              title: "Customization Options",
              desc: "Tailored fiber-laser solutions designed around specific wavelength, power, and noise requirements.",
              icon: "Settings",
            },
            {
              title: "Competitive Lead Times & Pricing",
              desc: "Optimized production workflows and logistics to offer competitive lead times and pricing.",
              icon: "DollarSign",
            },
          ],
        },
        finalStatement: {
          title: "Partner With Us",
          content: "Join the global community of researchers and enterprises who trust Techwin for their fiber laser needs.",
        },
        sustainabilityTabs: [
          {
            id: 1,
            label: "Sustainability & Responsibility",
            heading: "Sustainability & Responsibility",
            body: "Techwin operates with a strong sense of environmental and corporate responsibility. We adhere to eco-conscious production standards, minimizing waste and promoting energy efficiency across our operations. Our products are designed to reduce power consumption while maintaining performance excellence.",
            rightCardTitle: "Sustainability Focus",
            rightCardItems: [
              {
                title: "Eco-conscious production",
                description: "Minimizing waste and improving energy efficiency.",
              },
              {
                title: "Energy-efficient designs",
                description: "Products engineered for reduced power consumption.",
              },
            ],
          },
          {
            id: 2,
            label: "Client Support & Service",
            heading: "Client Support & Service",
            body: "Techwin's service network ensures clients receive consistent support from consultation to installation. Our experts provide assistance with product selection, customization, and system integration. We offer long-term maintenance plans and technical training to ensure customers maximize system performance.",
            rightCardTitle: "Service Highlights",
            rightCardItems: [
              {
                title: "Global technical support",
                description: "Responsive assistance across 30+ countries.",
              },
              {
                title: "Training & calibration",
                description: "Installation, calibration, and operator training packages.",
              },
            ],
          },
          {
            id: 3,
            label: "Our Vision & Mission",
            heading: "Our Vision — Precision, Integrity, Innovation",
            body: "We aim to be the trusted global partner for high-stability fiber laser solutions — delivering scientific-grade performance, dependable service, and continual innovation to enable breakthroughs across LiDAR, quantum research, and satellite communications.",
            rightCardTitle: "Mission Pillars",
            rightCardItems: [
              {
                title: "Precision Engineering",
                description: "Delivering sub-Hz linewidth and long-term stability.",
              },
              {
                title: "Reliability & QA",
                description: "Rigorous testing, calibration, and lifetime validation.",
              },
              {
                title: "Customer-focused Support",
                description: "Global logistics and responsive technical assistance.",
              },
            ],
          },
        ],
        seo: defaultSEO,
        headingLevels: defaultHeadingLevels,
      });
    }
    
    // Ensure SEO and headingLevels exist
    if (!aboutPage.seo) {
      aboutPage.seo = defaultSEO;
    }
    if (!aboutPage.headingLevels) {
      aboutPage.headingLevels = defaultHeadingLevels;
    }
    
    console.log("✅ Returning about page data:", {
      hasSEO: !!aboutPage.seo,
      hasHeadingLevels: !!aboutPage.headingLevels,
      heroTitle: aboutPage.hero?.title,
    });
    
    return NextResponse.json(aboutPage);
  } catch (error: any) {
    console.error("❌ Error in GET /api/admin/pages/about:", error);
    console.error("   Error message:", error?.message);
    console.error("   Error stack:", error?.stack);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch about page", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log("📝 Updating about page with data:");
    console.log("  Hero title:", data.hero?.title);
    console.log("  Intro title:", data.intro?.title);
    console.log("  Who We Are:", data.whoWeAre?.content?.substring(0, 50));
    
    let aboutPage = await AboutPage.findOne();
    
    if (!aboutPage) {
      // Create new document if none exists
      aboutPage = await AboutPage.create(data);
      console.log("✅ Created new about page document");
    } else {
      // Update existing document using findOneAndUpdate for nested objects
      const updatedPage = await AboutPage.findOneAndUpdate(
        {},
        { $set: data },
        { new: true, runValidators: true }
      );
      if (updatedPage) {
        aboutPage = updatedPage;
      }
      console.log("✅ Updated existing about page document");
      console.log("  Updated Hero title:", aboutPage.hero?.title);
      console.log("  Updated Intro title:", aboutPage.intro?.title);
    }
    
    return NextResponse.json(aboutPage);
  } catch (error: any) {
    console.error("❌ Error updating about page:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update about page" },
      { status: 500 }
    );
  }
}
