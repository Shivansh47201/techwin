import { Product } from "@/types/categories";

export const ultraLowNoiseFiberLaserSeries: Product = {
  slug: "ultra-low-noise",
  category: "single-frequency",
  tableCsvUrl:
    "https://docs.google.com/spreadsheets/d/1dray0_tpQpYOvnh-88lwq-Ejo1bUlKtECY9qyasZS4o/export?format=csv&gid=105283573",

  meta: {
    title: "Ultra-Low Noise Fiber Laser Series | Techwin Manufacture in China",
    description:
      "Techwin Ultra-Low Noise Fiber Laser Series designed for precision requirements in Hangzhou City. Reliable and stable output for sensitive systems. Contact +86-13958180450 today.",
    keywords:
      "ultra-low noise fiber laser, low RIN fiber laser, high stability fiber laser, Techwin ultra-low noise, narrow linewidth laser",
  },

  title: "Ultra-Low Noise Fiber Laser Series",
  shortDescription:
    "Ultra-Low Noise Fiber Laser Series engineered for applications demanding exceptional stability, minimal RIN, and narrow linewidth performance across multiple wavelengths and configurations.",

  heroImage: {
    src: "/products/single-frequency/ultra-low-noise/hero.jpg",
    alt: "Ultra-Low Noise Fiber Laser Series",
  },
  graphImageURL: "/products/single-frequency/ultra-low-noise/graph.jpg",
  tableImageURL: "/products/single-frequency/ultra-low-noise/table.png",

  // Top-level bullets (from your Key Features / Application Areas)
  features: [
    "Ultra-low intensity noise",
    "High spectral purity",
    "Stable single-frequency output",
    "Excellent power stability",
    "High OSNR and narrow linewidth options",
  ],

  applicationAreas: [
    "Precision measurement and metrology",
    "Coherent optical communication",
    "High-sensitivity fiber sensing",
    "Scientific instrumentation and research",
    "Interferometry and high-precision metrology",
    "Microwave photonics and RF generation",
  ],

  galleryImages: [
    {
      src: "/products/single-frequency/ultra-low-noise/hero.jpg",
      alt: "Ultra-low noise laser module",
    },
    {
      src: "/products/single-frequency/ultra-low-noise/hero.jpg",
      alt: "Ultra-low noise laser in laboratory",
    },
  ],

  datasheetUrl: "/products/single-frequency/ultra-low-noise/datasheet.pdf",
  datasheetImageSrc:
    "/products/single-frequency/ultra-low-noise/datasheet.jpg",
  previewImageSrc:
    "/products/single-frequency/ultra-low-noise/preview.jpg",

  sections: [
    // ✅ Top main section using your new content + /products/single-frequency/ultra-low-noise image path
    {
      type: "text",
      heading: "Ultra-Low Noise Fiber Laser Series",
      image: {
        src: "/products/single-frequency/ultra-low-noise/overview.jpg",
        alt: "Ultra-low noise fiber laser overview",
      },
      content:
        "The ultra-low noise fiber laser series is designed for applications requiring extremely stable, low-noise optical output. Through advanced noise-suppression design—including both passive and active stabilization—these lasers achieve exceptionally low relative intensity noise (RIN) and high signal purity. Their consistent performance and reliability make them well-suited for precision measurement, coherent communication, and high-sensitivity sensing applications.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Ultra-low intensity noise enabling high-precision measurements",
        "High spectral purity and clean emission profile",
        "Stable single-frequency output with narrow linewidth",
        "Excellent long-term power stability",
        "High OSNR for demanding optical platforms",
        "Compact fiber-integrated construction for robust deployment",
      ],
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Precision measurement and optical metrology",
        "Coherent optical communication and modulation testbeds",
        "High-sensitivity fiber sensing (DAS, DTS, FBG interrogation)",
        "Scientific instrumentation and laboratory systems",
        "Microwave photonics and stable RF/clock generation",
        "LIDAR research and high-resolution ranging",
      ],
    },

    // Existing deeper technical sections, slightly tuned
    {
      type: "text",
      heading: "About the Ultra-Low Noise Fiber Laser Series",
      content:
        "The Ultra-Low Noise Fiber Laser Series minimizes relative intensity noise (RIN) and phase noise for applications where even small fluctuations impact measurement accuracy. These systems deliver high OSNR, stable output power, and consistent long-term performance for both laboratory and industrial environments. They are designed as reliable building blocks for precision optical platforms that cannot tolerate instability or drift.",
    },

    {
      type: "features",
      heading: "Series-Level Performance Advantages",
      bullets: [
        "Extremely low relative intensity noise (RIN) across the operating bandwidth",
        "Stable frequency and power output with minimal drift over time",
        "Ultra-narrow linewidth options (Hz to kHz depending on model)",
        "High optical signal-to-noise ratio (OSNR)",
        "Consistent output over extended duty cycles and continuous operation",
      ],
    },

    {
      type: "text",
      heading: "Technical Advantages of the Series",
      content:
        "Noise suppression, precise cavity control, and advanced electronics maintain consistent intensity and spectral purity. These design choices directly benefit interferometry, coherent communications, spectroscopy, microwave photonics and sensitive sensing platforms. By combining advanced optical components with optimized electronic control, the series supports demanding system architectures that rely on ultra-stable optical sources.",
    },

    {
      type: "features",
      heading: "Construction & Design",
      bullets: [
        "Fully fiber-integrated cavity to reduce mechanical sensitivity",
        "Temperature control modules for wavelength and power stabilization",
        "Precision electronic control for gain and thermal dynamics",
        "Protective housings for vibration resistance and field deployment",
        "Modular designs for OEM integration or benchtop use",
      ],
    },

    {
      type: "text",
      heading: "Product Specifications (Typical)",
      content:
        "Typical configurations offer Hz-to-kHz linewidths, very low RIN, output power options from mW up to higher watt-class modules, high OSNR and PM/SM outputs. Exact numbers vary by model—contact Techwin for detailed datasheets, spectral plots and model-specific specifications suited to your application.",
    },

    {
      type: "text",
      heading: "Integration & Customization",
      content:
        "Modules are designed for easy integration into optical testbeds and OEM products. Custom options include wavelength selection, power tuning, connector types, polarization handling, and mechanical form factors to meet application-specific needs. System integrators can embed these lasers into larger sensing, metrology or communication platforms with minimal redesign.",
    },

    {
      type: "features",
      heading: "Why Choose This Ultra-Low Noise Series",
      bullets: [
        "Reduced measurement error thanks to low amplitude and phase noise",
        "High repeatability and low maintenance requirements",
        "Flexible configurations for laboratory and industrial deployment",
        "Engineered and tested under strong manufacturing standards in Hangzhou City",
      ],
    },

    {
      type: "text",
      heading: "Support & Ordering",
      content:
        "For model selection, datasheets, and quotations, contact Techwin. Engineering support is available for integration guidance, calibration services, and customized solutions tailored to your system requirements. Our technical team can help match linewidth, wavelength, power level and interface options to your precise application needs.",
    },
  ],

  /** -----------------------------------
   * COMPLETE RELATED PRODUCTS
   * (all other lasers in the category)
   * ----------------------------------- */
  relatedProducts: [
    {
      slug: "ultra-narrow-linewidth",
      title: "Hz-Level Ultra-Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription:
        "Hz-level ultra-narrow linewidth laser for ultimate spectral precision.",
      image: {
        src: "/products/single-frequency/ultra-narrow-linewidth/hero.jpg",
        alt: "Hz-Level Ultra-Narrow Linewidth Fiber Laser",
      },
      href: "/products/single-frequency/ultra-narrow-linewidth",
    },
    {
      slug: "broadband-low-noise",
      title: "Broadband Ultra-Low Noise Single-Frequency Fiber Laser",
      shortDescription:
        "Broadband low-noise laser source for spectroscopy and sensing.",
      image: {
        src: "/products/single-frequency/broadband-low-noise/hero.jpg",
        alt: "Broadband Ultra-Low Noise Fiber Laser",
      },
      href: "/products/single-frequency/broadband-low-noise",
    },
    {
      slug: "narrow-linewidth",
      title: "Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription:
        "Narrow linewidth laser for precision metrology and coherent systems.",
      image: {
        src: "/products/single-frequency/narrow-linewidth/hero.jpg",
        alt: "Narrow Linewidth Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/narrow-linewidth",
    },
    {
      slug: "sensor-stabilized",
      title: "High-Sensitivity Sensor-Stabilized Fiber Laser",
      shortDescription:
        "Sensor-stabilized laser for distributed sensing and long-range monitoring.",
      image: {
        src: "/products/single-frequency/sensor-stabilized/hero.jpg",
        alt: "High-Sensitivity Sensor-Stabilized Fiber Laser",
      },
      href: "/products/single-frequency/sensor-stabilized",
    },
    {
      slug: "magnetic-field",
      title: "Magnetic Field Detection Laser",
      shortDescription:
        "1083 nm precision laser for quantum sensing and geomagnetic detection.",
      image: {
        src: "/products/single-frequency/magnetic-field/hero.jpg",
        alt: "Magnetic Field Detection Laser",
      },
      href: "/products/single-frequency/magnetic-field",
    },
    {
      slug: "1um",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription:
        "1.0 µm single-frequency fiber laser for precision sensing and interferometry.",
      image: {
        src: "/products/single-frequency/1um/hero.jpg",
        alt: "1.0 µm Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/1um",
    },
    {
      slug: "1-5um",
      title: "1.5 µm Single-Frequency Fiber Laser",
      shortDescription:
        "1.5 µm laser for coherent communication, sensing and metrology.",
      image: {
        src: "/products/single-frequency/1-5um/hero.jpg",
        alt: "1.5 µm Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/1-5um",
    },
    {
      slug: "2um",
      title: "2.0 µm Single-Frequency Fiber Laser",
      shortDescription:
        "2.0 µm single-frequency laser for mid-IR sensing and spectroscopy.",
      image: {
        src: "/products/single-frequency/2um/hero.jpg",
        alt: "2.0 µm Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/2um",
    },
    {
      slug: "stabilized",
      title: "Frequency-Stabilized Fiber Laser (All Wavelengths)",
      shortDescription:
        "Frequency-locked fiber laser platform for coherent and quantum systems.",
      image: {
        src: "/products/single-frequency/stabilized/hero.jpg",
        alt: "Frequency-Stabilized Fiber Laser",
      },
      href: "/products/single-frequency/stabilized",
    },
     {
    slug: "1-5um-high-reliability",
    title: "1.5µm High-Reliability Single-Frequency Fiber Laser",
    shortDescription:
      "High-reliability 1.5µm single-frequency laser for long-term wavelength stability and rugged operation.",
    image: {
      src: "/products/single-frequency/1-5um-high-reliability/hero.jpg",
      alt: "1.5µm High-Reliability Single-Frequency Fiber Laser"
    },
    href: "/products/single-frequency/1-5um-high-reliability"
  },
  {
    slug: "1-5um-industrial",
    title: "1.5µm Industrial Single-Frequency Fiber Laser",
    shortDescription:
      "Industrial 1.5µm single-frequency laser for coherent sensing, telecom and outdoor operation.",
    image: {
      src: "/products/single-frequency/1-5um-industrial/hero.jpg",
      alt: "1.5µm Industrial Single-Frequency Fiber Laser"
    },
    href: "/products/single-frequency/1-5um-industrial"
  },
  {
    slug: "2um-high-reliability",
    title: "2.0µm High-Reliability Single-Frequency Fiber Laser",
    shortDescription:
      "High-reliability 2.0µm single-frequency laser for mid-IR sensing and atmospheric monitoring.",
    image: {
      src: "/products/single-frequency/2um-high-reliability/hero.jpg",
      alt: "2.0µm High-Reliability Single-Frequency Fiber Laser"
    },
    href: "/products/single-frequency/2um-high-reliability"
  },
  {
    slug: "2um-industrial",
    title: "2.0µm Industrial Single-Frequency Fiber Laser",
    shortDescription:
      "Industrial 2.0µm single-frequency laser supporting rugged environments and continuous field deployment.",
    image: {
      src: "/products/single-frequency/2um-industrial/hero.jpg",
      alt: "2.0µm Industrial Single-Frequency Fiber Laser"
    },
    href: "/products/single-frequency/2um-industrial"
  },
  {
    slug: "compact",
    title: "Compact Single-Frequency Fiber Laser",
    shortDescription:
      "Compact single-frequency laser with excellent spectral purity, low noise and long coherence length.",
    image: {
      src: "/products/single-frequency/compact/hero.jpg",
      alt: "Compact Single-Frequency Fiber Laser"
    },
    href: "/products/single-frequency/compact"
  },
  ],
};

export default ultraLowNoiseFiberLaserSeries;
