// pointLightSourceData.ts
// Full type definitions + CategoryData object for the Point Light Source category.
// Place under src/data/categories/ or import into your pages as needed.

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

// ---------------------------------------------------------------------------
// Point Light Source category data
// ---------------------------------------------------------------------------

export const pointLightSourceData: CategoryData = {
  url: "/sled",

  metaTitle:
    "Point Light Source Solutions | Techwin China",
  metaDescription:
    "Point Light Source solutions by Techwin in Hangzhou City. Call +86-13958180450 for stable, accurate and high-performance optical light source systems for professional use.",

  hero: {
    title: "Point Light Source Solutions – High-Stability Light Source",
    tagline:
      "Stable broadband illumination and low-coherence modules for OCT, sensing and precision photonics.",
    image: "/category/Point-Light-Source-Solutions.jpg",
    imageAlt: "Point light source module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Point Light Sources", href: "/point-light-sources" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Brochure", href: "/downloads/point-light-source-brochure.pdf" },
  },

  intro: {
    heading: "Point Light Source Solutions – High-Stability Light Source",
    description:
      "Point light source technology provides broadband, low-coherence illumination ideal for interferometry, fiber sensing and OCT imaging. Techwin supplies stable modules across 1.0 µm, 1.5 µm and 2.0 µm bands with integrated drive electronics and thermal control for professional research and industrial use. This page is managed and supported by techwin – single frequency fiber laser, well-known for optical manufacturing quality in Hangzhou City.",
  },

  keyFeatures: [
    "Broad spectral emission with stable spectral shape",
    "Low coherence length and reduced speckle noise",
    "High output stability over extended operation",
    "Compact, fiber-coupled packages for easy integration",
    "Advanced thermal and current control for spectral stability",
    "Long operational lifetime and low maintenance",
  ],

  subCategories: [
    {
      id: "1um-point",
      name: "1.0 µm Point Light Source",
      shortDescription:
        "Broadband 1.0 µm SLED modules for fiber sensing, OCT and lab testing with high output and stable spectral profile.",
      details:
        "1.0 µm SLED systems deliver wide spectral bandwidth, strong output power and integrated thermal control. Ideal for precision metrology, sensor networks and component inspection where low coherence and stable illumination are required.",
    },
    {
<<<<<<< HEAD
      id: "1-5um-point",
=======
      id: "point-light-source-1-5um",
>>>>>>> origin/main
      name: "1.5 µm Point Light Source",
      shortDescription:
        "Telecom-compatible 1.5 µm SLED modules optimized for fiber-based systems, distributed sensing and long-distance testing.",
      details:
        "1.5 µm SLED models offer optimal performance for fiber-optic environments, with low attenuation in fiber, stable spectral distribution and narrow power fluctuations—used widely in DAS/DTS, FBG interrogation and telecom research.",
    },
    {
<<<<<<< HEAD
      id: "2um-point",
=======
      id: "point-light-source-2-0um",
>>>>>>> origin/main
      name: "2.0 µm Point Light Source",
      shortDescription:
        "Mid-IR 2.0 µm SLED solutions for specialized sensing, gas detection and material analysis with controlled noise and stable broadband output.",
      details:
        "2.0 µm SLED devices target mid-IR sensing and specialized industrial applications. They provide wide bandwidth, stable emission and robust thermal management for long-term operational reliability in research and industrial settings.",
    },
  ],

  technicalBenefits: [
    "Low coherence length minimizing interference artifacts",
    "Stable spectral profile with integrated temperature/current control",
    "Low speckle and predictable noise behavior for imaging",
    "Compact, fiber-coupled packages with multiple connector options",
    "Long lifetime diode architecture with high reliability",
    "Custom wavelength and bandwidth tuning available on request",
  ],

  applications: [
    "Optical coherence tomography (OCT) and biomedical imaging",
    "Fiber Bragg grating (FBG) interrogation and distributed sensing",
    "Interferometric testing and high-resolution measurement",
    "Optical spectrum testing and component characterization",
    "Material inspection and spectral analysis",
    "R&D and academic photonics experiments",
  ],

  cta: {
    heading: "Need a reliable SLED light source for imaging, sensing or testing?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",

  notes:
    "SLED products include integrated drive electronics and thermal control. Custom options: fiber connector type, bandwidth trimming, output power levels and calibrated spectral reports. All units are tested for spectral stability and long-term reliability.",

  featureMatrix: {
    categories: [
      {
        id: "pls-1um",
        name: "1.0 µm Point Light Source",
        features: {
          stability: "Highly stable spectral shape with excellent long-term consistency",
          noise: "Low speckle noise for high-quality imaging applications",
          coherence: "Very low coherence length ideal for OCT and interferometry",
          integration: "Compact fiber-coupled module with standard connectors",
          bonus5: "Integrated thermal and current control for stable operation",
          bonus6: "Long operational lifetime with minimal maintenance",
        },
      },
      {
        id: "pls-1.5um",
        name: "1.5 µm Point Light Source",
        features: {
          stability: "Telecom-grade stability optimized for fiber-based systems",
          noise: "Ultra-low noise characteristics for distributed sensing",
          coherence: "Low coherence length perfect for DAS/DTS applications",
          integration: "Direct compatibility with standard telecom fiber infrastructure",
          bonus5: "Optimized for FBG interrogation and fiber sensor networks",
          bonus6: "Robust design for field and laboratory deployments",
        },
      },
      {
        id: "pls-2um",
        name: "2.0 µm Point Light Source",
        features: {
          stability: "Mid-infrared stable operation with advanced thermal management",
          noise: "Controlled noise characteristics for mid-IR sensing",
          coherence: "Low coherence for specialized mid-IR imaging systems",
          integration: "Compact module for mid-IR sensing platforms",
          bonus5: "Ideal for gas detection and material analysis",
          bonus6: "Robust packaging for continuous operational reliability",
        },
      },
      {
        id: "pls-oct",
        name: "OCT-Optimized SLED",
        features: {
          stability: "Spectral stability optimized for OCT imaging systems",
          noise: "Extremely low speckle for high-resolution medical imaging",
          coherence: "Precision low-coherence characteristics for depth resolution",
          integration: "Seamless integration with OCT instrument designs",
          bonus5: "Customizable bandwidth for specific penetration depth",
          bonus6: "Long lifetime exceeding 50,000 operational hours",
        },
      },
      {
        id: "pls-fiber-sensing",
        name: "Fiber Sensing Optimized",
        features: {
          stability: "Optimized for distributed fiber sensing applications",
          noise: "Low noise enabling high-sensitivity sensor networks",
          coherence: "Precisely controlled coherence for sensor interrogation",
          integration: "Purpose-built for DAS and DTS deployments",
          bonus5: "Advanced thermal control for field stability",
          bonus6: "Calibrated spectral performance for accurate sensing",
        },
      },
    ],
  },
};
