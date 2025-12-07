
export type BreadcrumbItem = { label: string; href?: string };

export type HeroData = {
  title: string;
  tagline: string;
  image: string; 
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
  id?: string; 
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
// SLED (Super Luminescent LED) category data
// ---------------------------------------------------------------------------

export const sledLightData: CategoryData = {
  url: "/products/sled-light-sources",

  metaTitle:
    "Super luminescent LED (SLED) Light Source Solutions | Techwin China",
  metaDescription:
    "Super luminescent LED (SLED) solutions by Techwin in Hangzhou City. Call +86-13958180450 for stable, accurate and high-performance optical SLED light source systems for professional use.",

  hero: {
    title: "Super Luminescent LED (SLED) Solutions – High-Stability SLED Light Source",
    tagline:
      "Stable broadband illumination and low-coherence SLED modules for OCT, sensing and precision photonics.",
    image: "/category/Point-Light-Source-Solutions.jpg",
    imageAlt: "Super luminescent LED (SLED) light source module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "SLED Light Sources", href: "/sled-light-sources" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download SLED Brochure", href: "/downloads/sled-brochure.pdf" },
  },

  intro: {
    heading: "Super Luminescent LED (SLED) Solutions – High-Stability SLED Light Source",
    description:
      "Super luminescent LED (SLED) technology provides broadband, low-coherence illumination ideal for interferometry, fiber sensing and OCT imaging. Techwin supplies stable SLED modules across 1.0 µm, 1.5 µm and 2.0 µm bands with integrated drive electronics and thermal control for professional research and industrial use. This page is managed and supported by techwin – single frequency fiber laser, well-known for optical manufacturing quality in Hangzhou City.",
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
      id: "point-light-source-1um",
      name: "1.0 µm Point Light Source",
      shortDescription:
        "Broadband 1.0 µm SLED modules for fiber sensing, OCT and lab testing with high output and stable spectral profile.",
      details:
        "1.0 µm SLED systems deliver wide spectral bandwidth, strong output power and integrated thermal control. Ideal for precision metrology, sensor networks and component inspection where low coherence and stable illumination are required.",
    },
    {
      id: "point-light-source-1-5um",
      name: "1.5 µm Point Light Source",
      shortDescription:
        "Telecom-compatible 1.5 µm SLED modules optimized for fiber-based systems, distributed sensing and long-distance testing.",
      details:
        "1.5 µm SLED models offer optimal performance for fiber-optic environments, with low attenuation in fiber, stable spectral distribution and narrow power fluctuations—used widely in DAS/DTS, FBG interrogation and telecom research.",
    },
    {
      id: "point-light-source-2-0um",
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
        id: "sled-1um",
        name: "1.0 µm SLED Module",
        features: {
          stability: "Exceptional spectral stability with integrated thermal control",
          noise: "Ultra-low speckle and noise for clean imaging",
          coherence: "Very low coherence length enabling OCT applications",
          integration: "Compact fiber-coupled package with standard interfaces",
          bonus5: "High output power with stable beam profile",
          bonus6: "Extended lifetime exceeding 50,000 operational hours",
        },
      },
      {
        id: "sled-1.5um",
        name: "1.5 µm SLED Module",
        features: {
          stability: "Telecom-grade stability optimized for fiber networks",
          noise: "Low noise characteristics for sensitive measurements",
          coherence: "Controlled coherence for distributed sensing systems",
          integration: "Seamless compatibility with standard telecom infrastructure",
          bonus5: "Ideal for distributed acoustic and temperature sensing",
          bonus6: "Robust performance in field deployments",
        },
      },
      {
        id: "sled-2um",
        name: "2.0 µm SLED Module",
        features: {
          stability: "Mid-infrared stable emission with robust thermal design",
          noise: "Optimized noise characteristics for mid-IR applications",
          coherence: "Low coherence for specialized imaging and sensing",
          integration: "Compact module suitable for mid-IR platforms",
          bonus5: "Excellent for gas detection and material analysis",
          bonus6: "Advanced thermal management for long-term reliability",
        },
      },
      {
        id: "sled-imaging",
        name: "High-Performance Imaging SLED",
        features: {
          stability: "Ultra-stable spectral output for consistent image quality",
          noise: "Extremely low speckle for medical and industrial imaging",
          coherence: "Precision coherence control for resolution optimization",
          integration: "Purpose-designed for OCT and endoscopy systems",
          bonus5: "Customizable bandwidth for specific imaging needs",
          bonus6: "FDA-grade reliability for medical device integration",
        },
      },
      {
        id: "sled-sensing",
        name: "Distributed Sensing SLED",
        features: {
          stability: "Optimized for DAS/DTS sensing network applications",
          noise: "Low noise enabling high-sensitivity distributed measurements",
          coherence: "Precisely controlled for optimal sensor interrogation",
          integration: "Seamless integration with sensing network infrastructure",
          bonus5: "Advanced thermal compensation for field stability",
          bonus6: "Calibrated performance for long-distance deployments",
        },
      },
    ],
  },
};
