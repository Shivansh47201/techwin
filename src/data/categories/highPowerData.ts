// types.ts
export type BreadcrumbItem = { label: string; href?: string };

export type HeroData = {
  title: string;
  tagline: string;
  image: string; // path under /public/
  imageAlt?: string;
  breadcrumb?: BreadcrumbItem[];
  ctaPrimary?: { label: string; href: string; external?: boolean } | null;
  ctaSecondary?: { label: string; href: string; external?: boolean } | null;
};

export type IntroData = {
  heading: string;
  description: string;
};

export type SubCategoryItem = {
  id?: string; // optional slug/id for linking
  name: string;
  shortDescription: string;
  details?: string; // longer description (optional)
};

export type CategoryData = {
  // routing & SEO
  url: string;
  metaTitle: string;
  metaDescription: string;

  // page content
  hero: HeroData;
  intro: IntroData;
  keyFeatures: string[]; // short bullets
  subCategories: SubCategoryItem[];
  technicalBenefits: string[]; // deeper bullets
  applications: string[]; // list of application strings
  cta: {
    heading?: string;
    primary: { label: string; href: string; external?: boolean };
    secondary?: { label: string; href: string; external?: boolean } | null;
  };
  // optional: notes, support contact
  contactPhone?: string;
  notes?: string;
  featureMatrix?: {
    categories: {
      id: string;
      name: string;
      features: {
        stability: string;
        noise: string;
        coherence: string;
        integration: string;
        bonus5?: string;
        bonus6?: string;
      };
    }[];
  };
};

// highPowerData.ts
export const highPowerData: CategoryData = {
  url: "/products/high-power",
  metaTitle: "High Power Single-Frequency Fiber Lasers | Techwin Industrial Manufacturer",
  metaDescription:
    "Techwin manufactures high power single-frequency fiber lasers in Hangzhou City. Call +86-13958180450 for reliable industrial laser exporter solutions and global delivery.",

  hero: {
    title: "High Power Single-Frequency Fiber Lasers",
    tagline:
      "High precision, high-power single-frequency fiber lasers engineered for industrial, scientific, and long-range sensing applications.",
    image: "/category/High-Power-Single-Frequency-Fiber-Lasers.jpg",
    imageAlt: "High-power single-frequency fiber laser module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "High-Power Fiber Lasers", href: "/products/high-power" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Datasheet", href: "/downloads/high-power-datasheet.pdf", external: false },
  },

  intro: {
    heading: "High Power Single-Frequency Fiber Lasers",
    description:
      "High precision industries rely on high power fiber laser systems for demanding applications that require exceptional beam quality, stability, and narrow linewidth. The High-Power Single-Frequency Fiber Lasers from Techwin are designed to deliver outstanding optical performance with superior reliability, ideal for industrial, scientific, and research environments.",
  },

  keyFeatures: [
    "Excellent beam quality with single-frequency operation and high spectral purity",
    "High output power suitable for long-distance and high-intensity applications",
    "Low noise and narrow linewidth for high-resolution sensing and measurement",
    "Compact, rack-mountable and reliable industrial design",
    "Available at 1.0 µm, 1.5 µm and 2.0 µm wavelength bands",
    "Efficient thermal management for continuous operation",
  ],

  subCategories: [
    {
      id: "kilowatt",
      name: "Kilowatt-Level Fiber Laser for Combustion Diagnostics",
      shortDescription:
        "High-power CW/kilowatt fiber laser optimized for combustion and plasma diagnostics with stable continuous output for real-time analysis.",
      details:
        "Designed for high-temperature measurement and real-time observation of combustion phenomena. Provides stable continuous power and thermal control to enable precision analysis of dynamic flame characteristics.",
    },
    {
      id: "1um-cw",
      name: "(1.0 µm) High-Power CW Single-Frequency Fiber Laser",
      shortDescription:
        "Versatile high-power 1.0 µm single-frequency system for interferometry, remote sensing, and industrial research.",
      details:
        "Narrow linewidth and low RIN make it suitable for high-resolution interferometry, seeding amplifiers, and long-range sensing platforms.",
    },
    {
      id: "1-5um-cw",
      name: "(1.5 µm) High-Power CW Single-Frequency Fiber Laser",
      shortDescription:
        "High-power 1.5 µm single-frequency source tailored for telecom-grade and distributed sensing systems.",
      details:
        "Optimized for 1550 nm ecosystems: communications research, frequency standards and distributed sensing with robust thermal and spectral stability.",
    },
    {
      id: "2um-cw",
      name: "(2.0 µm) High-Power CW Single-Frequency Fiber Laser",
      shortDescription:
        "Mid-IR single-frequency high-power laser for gas detection, environmental monitoring and specialty industrial use.",
      details:
        "Provides strong absorption characteristics useful in gas sensing, material inspection and defense applications requiring mid-IR wavelengths.",
    },
    {
      id: "lidar",
      name: "Long-Distance High-Resolution LiDAR Fiber Laser",
      shortDescription:
        "High-stability laser source engineered for long-range, high-resolution LiDAR and remote mapping systems.",
      details:
        "Delivers narrow linewidth and excellent power stability to maximize detection range and resolution in geospatial and airborne LiDAR systems.",
    },

    /* ———————————————— NEW HIGH-POWER SUB-SERIES ———————————————— */

    {
      id: "1um-0-2w",
      name: "1.0μm High-Power Single-Frequency Laser (0.2–2W)",
      shortDescription:
        "Low-to-medium power 1.0μm laser for sensing, interferometry and coherent light platforms.",
      details:
        "Engineered for narrow linewidth output and precision operation in interferometry, frequency reference, prototype sensing and laboratory R&D applications.",
    },
    {
      id: "1um-2-20w",
      name: "1.0μm High-Power Single-Frequency Laser (2–20W)",
      shortDescription:
        "Medium-range 1.0μm power class for long-distance detection and high-stability measurement tasks.",
      details:
        "Supports coherent detection, ranging, optical measurement and distributed sensing platforms with stable output and low phase noise.",
    },
    {
      id: "1um-20-500w",
      name: "1.0μm High-Power Single-Frequency Laser (20–500W)",
      shortDescription:
        "High-power 1.0μm class for industrial integration, research-grade processing and precision systems.",
      details:
        "Designed for demanding industrial and scientific environments where long-term single-frequency stability and strong optical efficiency are critical.",
    },

    {
      id: "1-5um-0-2w",
      name: "1.5μm High-Power Single-Frequency Laser (0.2–2W)",
      shortDescription:
        "Eye-safe narrow-linewidth 1.5μm platform for interferometry, lab sensing and telecom-grade optical evaluation.",
      details:
        "Ideal for distributed sensing, coherent communication testing and long-duration laboratory integration with stable mid-IR spectral profiles.",
    },
    {
      id: "1-5um-2-20w",
      name: "1.5μm High-Power Single-Frequency Laser (2–20W)",
      shortDescription:
        "Medium-power 1.5μm design for coherent communication, distributed sensing and atmospheric testing.",
      details:
        "Offers strong wavelength stability for long-range sensing, telecom-grade experiments and photonics research requiring extended stability.",
    },
    {
      id: "1-5um-20-120w",
      name: "1.5μm High-Power Single-Frequency Laser (20–120W)",
      shortDescription:
        "High-power 1.5μm single-frequency laser for industrial, telecom and long-distance field deployments.",
      details:
        "Provides robust thermal performance and clean spectral operation required in precise distributed sensing, lidar and atmospheric study systems.",
    },

    {
      id: "2um-0-05-2w",
      name: "2.0μm High-Power Single-Frequency Laser (0.05–2W)",
      shortDescription:
        "Ultra-stable low-power 2.0μm platform for spectroscopy, environmental gas sensing and controlled R&D.",
      details:
        "Designed for molecular spectroscopy, atmospheric monitoring and precision evaluation needing accurate narrow-linewidth mid-IR wavelengths.",
    },
    {
      id: "2um-2-20w",
      name: "2.0μm High-Power Single-Frequency Laser (2–20W)",
      shortDescription:
        "Medium-power mid-IR source suitable for atmospheric lidar, gas analytics, and precision long-distance optical systems.",
      details:
        "Combines stable spectral output with scalable power for coherent detection, lidar development, environmental analysis and infrared materials research.",
    },
    {
      id: "2um-20-500w",
      name: "2.0μm High-Power Single-Frequency Laser (20–500W)",
      shortDescription:
        "Industrial-grade high-power 2.0μm system for processing, advanced sensing and precision measurement environments.",
      details:
        "Fiber-based architecture ensures efficient delivery, strong beam quality and reliable long-term output for mid-IR research and engineered instrumentation.",
    },
  ],
  technicalBenefits: [
    "Stable single-longitudinal-mode operation for ultra-narrow linewidth performance",
    "Low phase and intensity noise enabling coherent detection and Doppler measurement",
    "Scalable output power from laboratory watt-class to industrial kilowatt-class",
    "Modular architecture for easy integration and serviceability",
    "Advanced thermal management and back-reflection protection",
    "Customizable control interfaces for OEM integration and remote monitoring",
  ],

  applications: [
    "Combustion and plasma diagnostics",
    "Optical communications and coherent detection",
    "Long-range LiDAR and remote sensing",
    "Precision material processing and micro-machining",
    "Laser-based spectroscopy and metrology",
    "Interferometry and coherent detection systems",
  ],

  cta: {
    heading: "Ready to scale your optical system with high-power single-frequency lasers?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Customization available: output power (W → kW), wavelength selection, narrow linewidth tuning, rack/bench configurations and integrated monitoring solutions.",

  featureMatrix: {
    categories: [
      {
        id: "hp-1um",
        name: "High-Power 1.0 µm CW",
        features: {
          stability: "Excellent power stability with minimal output drift for long operations",
          noise: "Low phase and intensity noise enabling coherent detection",
          coherence: "Single-frequency operation with exceptional spectral purity",
          integration: "Scalable from watt-class to multi-kilowatt industrial systems",
          bonus5: "Ideal for industrial laser processing and remote sensing",
          bonus6: "Customizable output power with rack-mountable designs",
        },
      },
      {
        id: "hp-1.5um",
        name: "High-Power 1.5 µm CW",
        features: {
          stability: "Telecommunications-grade power stability at 1550 nm",
          noise: "Ultra-low noise for coherent communication systems",
          coherence: "High spectral purity for long-distance coherent detection",
          integration: "Seamless integration with telecom ecosystem and infrastructure",
          bonus5: "Optimized for distributed sensing and coherent LiDAR",
          bonus6: "Advanced thermal management for continuous kilowatt operation",
        },
      },
      {
        id: "hp-2um",
        name: "High-Power 2.0 µm CW",
        features: {
          stability: "Mid-infrared power stability with robust thermal control",
          noise: "Low noise architecture for precision sensing applications",
          coherence: "High coherence for advanced mid-IR measurement systems",
          integration: "Compact module designs for industrial and research systems",
          bonus5: "Ideal for gas detection and material processing",
          bonus6: "Efficient thermal management ensuring maximum lifetime",
        },
      },
      {
        id: "hp-lidar",
        name: "LiDAR Fiber Laser",
        features: {
          stability: "Exceptional frequency stability for long-range measurements",
          noise: "Ultra-low phase noise enabling precision Doppler detection",
          coherence: "Maximum coherence for extended measurement range",
          integration: "Compact, light-weight design for airborne and mobile systems",
          bonus5: "Optimized for high-resolution geospatial mapping",
          bonus6: "Advanced beam control and modulation capabilities",
        },
      },
      {
        id: "hp-kilowatt",
        name: "Kilowatt-Level",
        features: {
          stability: "Kilowatt-class power with superior long-term stability",
          noise: "Controlled noise characteristics suitable for high-power applications",
          coherence: "Narrow linewidth preserved at maximum power output",
          integration: "Industrial-grade packaging with advanced thermal management",
          bonus5: "Perfect for combustion diagnostics and plasma research",
          bonus6: "Robust protection and monitoring for continuous deployment",
        },
      },
    ],
  },
};
