// fiberAmplifierData.ts
// Full type definitions + CategoryData object for the Fiber Amplifier category
// Drop this file under src/data/categories/ or similar and import into page components.

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
  details?: string;
};

export type CategoryData = {
  url: string;
  metaTitle: string;
  metaDescription: string;

  hero: HeroData;
  intro: IntroData;
  keyFeatures: string[];
  subCategories: SubCategoryItem[];
  technicalBenefits: string[];
  applications: string[];
  cta: {
    heading?: string;
    primary: { label: string; href: string; external?: boolean };
    secondary?: { label: string; href: string; external?: boolean } | null;
  };
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

export const fiberAmplifierData: CategoryData = {
  url: "/products/fiber-amplifiers",

  metaTitle: "Fiber Amplifier Solutions | techwin – single frequency fiber laser",
  metaDescription:
    "High-performance fiber amplifiers by techwin – single frequency fiber laser in Hangzhou City. Contact +86-13958180450 for stable and reliable optical amplification systems.",

  hero: {
    title: "Fiber Amplifier and Optical Amplification",
    tagline:
      "Stable, low-noise, high-efficiency fiber amplifiers engineered for scientific, industrial and communication applications.",
    image: "/category/Fiber-Amplifier.jpg",
    imageAlt: "Fiber amplifier module — Techwin optical amplification system",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Fiber Amplifier", href: "/fiber-amplifier" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Brochure", href: "/downloads/fiber-amplifier-brochure.pdf" },
  },

  intro: {
    heading: "Fiber Amplifier and Optical Amplification",
    description:
      "A fiber amplifier is a core component in modern photonics, enabling stable, low-noise and high-efficiency amplification for scientific, industrial and communication applications. This category provides an overview of Techwin’s advanced optical amplification solutions engineered for precision, long-term reliability and performance stability. Our systems support research labs, instrument manufacturers, LiDAR developers and narrow-linewidth laser setups requiring dependable power scaling while maintaining signal purity and coherence.",
  },

  keyFeatures: [
    "High signal stability for long operational cycles",
    "Low noise design compatible with narrow-linewidth seed lasers",
    "Modular and customizable configurations for OEM integration",
    "Precision fiber architecture to preserve signal integrity",
    "Advanced thermal engineering for continuous operation",
    "Polarization stability options (PM amplifiers) and efficient pump coupling",
  ],

  subCategories: [
    {
      id: "polarization-maintaining-fiber-amplifier",
      name: "Polarization-Maintaining Fiber Amplifier (PM Fiber Amplifier)",
      shortDescription:
        "Amplifier designed to preserve polarization state across amplification — ideal for coherent detection and quantum applications.",
      details:
        "PM amplifiers maintain stable polarization at all output power levels, delivering low phase noise and excellent power stability. Suited for interferometry, coherent LiDAR, quantum communication and single-frequency laser amplification. Fiber-integrated designs are available for OEM and research setups.",
    },
    {
      id: "high-power-fiber-amplifier",
      name: "High-Power Fiber Amplifier",
      shortDescription:
        "Watt- to kilowatt-class fiber amplifiers for demanding lab, industrial and outdoor systems.",
      details:
        "High-power amplifiers provide significant power scaling while ensuring low noise and robust reliability. Features include excellent thermal control, low back-reflection sensitivity and compatibility with narrow-linewidth seed lasers — applicable to free-space communication, remote sensing, LiDAR and industrial beam delivery.",
    },
    {
      id: "fiber-amplifier-modules",
      name: "Fiber Amplifier Modules",
      shortDescription:
        "Compact amplifier modules for OEM integration, labs and instrumentation.",
      details:
        "Modular amplifier units offer compact chassis, efficient fiber coupling, low-noise amplification and optional control interfaces. Designed for instrumentation, sensing systems, optical test equipment and communication setups where compact, integration-ready amplification is required.",
    },
  ],

  technicalBenefits: [
    "Stable gain performance with minimal output drift",
    "Support for multiple wavelength options (1.0 µm / 1.5 µm / 2.0 µm)",
    "Simple integration with standard connectors and electrical interfaces",
    "Reliable power management and protection mechanisms",
    "Low relative intensity noise and phase noise preservation",
    "Modular architectures with pump-coupling and monitoring features",
  ],

  applications: [
    "Interferometry, spectroscopy and narrow-linewidth research",
    "Industrial materials processing and monitoring systems",
    "Defense & aerospace: LiDAR and free-space communication",
    "Telecommunications: signal amplification with low distortion",
    "Quantum and coherent technology systems requiring PM amplification",
    "OEM instrumentation, sensing networks and test equipment",
  ],

  cta: {
    heading: "Looking for reliable fiber amplification for your system?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Amplifier systems can be configured with driver electronics, intelligent control software, pump couplers and advanced monitoring. Custom options include wavelength, power scaling, polarization-maintenance and control interfaces. All units undergo thorough noise and stability testing prior to shipment.",

  featureMatrix: {
    categories: [
      {
        id: "amp-pm",
        name: "Polarization-Maintaining (PM)",
        features: {
          stability: "Stable gain performance with minimal output drift",
          noise: "Low noise design preserving signal integrity through amplification",
          coherence: "Maintains polarization state and coherence throughout amplification",
          integration: "Compatible with PM fiber infrastructure and quantum systems",
          bonus5: "Ideal for coherent detection and quantum applications",
          bonus6: "Advanced pump coupling for efficient power transfer",
        },
      },
      {
        id: "amp-high-power",
        name: "High-Power Amplifier",
        features: {
          stability: "Watt to kilowatt-class power with excellent stability",
          noise: "Ultra-low noise architecture for precision applications",
          coherence: "Preserves narrow-linewidth seed laser characteristics",
          integration: "Modular design for OEM integration and system scalability",
          bonus5: "Suitable for LiDAR, remote sensing and industrial processing",
          bonus6: "Advanced thermal management for continuous operation",
        },
      },
      {
        id: "amp-modules",
        name: "Compact Amplifier Modules",
        features: {
          stability: "Consistent gain performance in compact form factor",
          noise: "Optimized for low-noise amplification in laboratory settings",
          coherence: "High coherence preservation for measurement systems",
          integration: "Easy integration with standard fiber connectors and interfaces",
          bonus5: "Perfect for instrumentation and sensing applications",
          bonus6: "Integrated drive electronics and monitoring capabilities",
        },
      },
      {
        id: "amp-1um",
        name: "1.0 µm Amplifier",
        features: {
          stability: "Stable amplification at 1.0 µm for Yb-doped systems",
          noise: "Low noise enabling high-quality amplification chains",
          coherence: "Exceptional coherence preservation for interferometry",
          integration: "Seamless integration with standard 1.0 µm components",
          bonus5: "Ideal for seeding high-power laser systems",
          bonus6: "Optimized for industrial and scientific applications",
        },
      },
      {
        id: "amp-1.5um",
        name: "1.5 µm Amplifier",
        features: {
          stability: "Telecommunications-grade stability at 1550 nm",
          noise: "Ultra-low noise for coherent communications",
          coherence: "High coherence for distributed sensing systems",
          integration: "Direct compatibility with telecom fiber infrastructure",
          bonus5: "Perfect for DAS and distributed fiber sensing",
          bonus6: "Advanced modulation and control capabilities",
        },
      },
    ],
  },
};
