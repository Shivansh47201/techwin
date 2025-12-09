import { Product } from "@/types/categories";

export const onePointFiveMicronSingleFrequencyFiberLaser: Product = {
  slug: "1-5um",
  category: "single-frequency",
  tableCsvUrl:
    "https://docs.google.com/spreadsheets/d/1dray0_tpQpYOvnh-88lwq-Ejo1bUlKtECY9qyasZS4o/export?format=csv&gid=105283573",

  meta: {
    title: "1.5 µm Single-Frequency Fiber Laser | Techwin Precision Lasers",
    description:
      "High-performance 1.5 µm Single-Frequency Fiber Laser systems by Techwin. Reliable, narrow linewidth output for critical applications. Contact +86-13958180450 for details.",
    keywords:
      "1.5 µm fiber laser, 1550 nm single-frequency laser, narrow linewidth 1.5um, Techwin 1.5um laser, high stability fiber laser",
  },

  title: "1.5 µm Single-Frequency Fiber Laser",
  shortDescription:
    "The 1.5 µm single-frequency fiber laser is designed for applications demanding high spectral purity, stable single-frequency operation, and long-term reliability. Utilizing an optimized resonator design and advanced fiber components, it provides ultra-narrow linewidth, low phase noise, and excellent coherence. This laser is ideal for coherent communication, fiber sensing, and precision measurement systems.",

  heroImage: {
    src: "/products/single-frequency/1-5um/hero.jpg",
    alt: "1.5 µm Single-Frequency Fiber Laser",
  },
  graphImageURL: "/products/single-frequency/1-5um/graph.jpg",
  tableImageURL: "/products/single-frequency/1-5um/table.png",

  features: [
    "Ultra-narrow linewidth",
    "High coherence and frequency stability",
    "Low phase noise",
    "Compact and easy-to-integrate design",
    "Reliable long-term operation",
  ],

  applicationAreas: [
    "Coherent optical communication",
    "Fiber-optic sensing",
    "Precision metrology",
    "Scientific research",
  ],

  galleryImages: [
    {
      src: "/products/single-frequency/1-5um/hero.jpg",
      alt: "1.5µm single-frequency fiber laser preview",
    },
    {
      src: "/products/single-frequency/1-5um/hero.jpg",
      alt: "1.5µm single-frequency fiber laser hero",
    },
  ],

  datasheetUrl: "/products/single-frequency/1-5um/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/1-5um/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/1-5um/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of 1.5 µm Fiber Laser Technology",
      image: { src: "/single-frequency/1-5um-overview.jpg", alt: "1.5 µm overview" },
      content:
        "Fiber lasers operating in the 1.5 µm band are recognized for reliability, long-distance propagation capability, and superior stability. Techwin’s 1.5 µm single-frequency systems deliver extremely pure spectral output ideal for high-coherence applications.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Narrow linewidth output (sub-kHz depending on model)",
        "Stable single-frequency operation with minimal mode hopping",
        "High coherence length for interferometry and sensing",
        "Low amplitude and phase noise for high SNR",
        "Compact, all-fiber architecture with rugged construction",
        "Eye-safe wavelength suitable for outdoor and free-space use",
      ],
    },

    {
      type: "text",
      heading: "Technical Advantages",
      content:
        "The 1.5 µm range offers low attenuation in standard fiber, excellent environmental stability, and compatibility with telecom-grade components—making it ideal for long-distance propagation, trace-gas detection, and coherent communications.",
    },

    {
      type: "features",
      heading: "Performance Specifications (typical)",
      bullets: [
        "Wavelength: centered near 1550 nm (tunable or fixed options)",
        "Linewidth: sub-kHz (model dependent)",
        "Output Power: multiple power classes available",
        "Polarization: PM / linear with high PER",
        "Frequency Stability: excellent short- and long-term stability",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "The 1.5 µm single-frequency series supports distributed acoustic sensing (DAS), coherent LIDAR, optical metrology, fiber sensing, spectroscopy, telecom research, and industrial measurement systems.",
    },

    {
      type: "features",
      heading: "Product Variants & Configurations",
      bullets: [
        "Benchtop units with full control interfaces",
        "OEM fiber-coupled modules for integration",
        "High-power free-space or fiber-coupled options",
        "Wavelength-locked solutions for fixed-reference applications",
      ],
    },

    {
      type: "text",
      heading: "Integration & Environmental Tolerance",
      content:
        "Interfaces include standard fiber connectors, modulation and monitoring ports, and optional Ethernet/serial control. Systems include temperature regulation and mechanical rigidity for field deployment and low-maintenance operation.",
    },

    {
      type: "text",
      heading: "Quality Control, Service & Support",
      content:
        "Each unit undergoes rigorous testing for frequency stability, linewidth, power consistency, and long-term endurance. Techwin provides technical consultation, calibration, warranty and integration support to help match the system to your application requirements.",
    },
  ],

  /** -----------------------------
   *  UPDATED RELATED PRODUCTS
   * ----------------------------- */
  relatedProducts: [
    {
      slug: "ultra-narrow-linewidth",
      title: "Hz-Level Ultra-Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription: "Hz-level laser for extreme spectral purity.",
      image: {
        src: "/products/single-frequency/ultra-narrow-linewidth/hero.jpg",
        alt: "Hz-Level Ultra-Narrow Linewidth Fiber Laser",
      },
      href: "/products/single-frequency/ultra-narrow-linewidth",
    },
    {
      slug: "broadband-low-noise",
      title: "Broadband Ultra-Low Noise Single-Frequency Fiber Laser",
      shortDescription: "Ultra-low intensity noise for sensing & metrology.",
      image: {
        src: "/products/single-frequency/broadband-low-noise/hero.jpg",
        alt: "Broadband Ultra-Low Noise Fiber Laser",
      },
      href: "/products/single-frequency/broadband-low-noise",
    },
    {
      slug: "narrow-linewidth",
      title: "Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription: "Stable narrow linewidth for coherent applications.",
      image: {
        src: "/products/single-frequency/narrow-linewidth/hero.jpg",
        alt: "Narrow Linewidth Fiber Laser",
      },
      href: "/products/single-frequency/narrow-linewidth",
    },
    {
      slug: "sensor-stabilized",
      title: "High-Sensitivity Sensor-Stabilized Laser",
      shortDescription: "Laser designed for sensing & stabilization systems.",
      image: {
        src: "/products/single-frequency/sensor-stabilized/hero.jpg",
        alt: "Sensor-Stabilized Fiber Laser",
      },
      href: "/products/single-frequency/sensor-stabilized",
    },
    {
      slug: "magnetic-field",
      title: "Magnetic Field Detection Laser",
      shortDescription: "Laser for magnetic field detection & spectroscopy.",
      image: {
        src: "/products/single-frequency/magnetic-field/hero.jpg",
        alt: "Magnetic Field Detection Laser",
      },
      href: "/products/single-frequency/magnetic-field",
    },
    {
      slug: "1um",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription: "Stable 1.0µm laser for sensing & interferometry.",
      image: {
        src: "/products/single-frequency/1um/hero.jpg",
        alt: "1.0µm Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/1um",
    },
    {
      slug: "2um",
      title: "2.0 µm Single-Frequency Fiber Laser",
      shortDescription:
        "Mid-IR wavelength laser used in sensing and spectroscopy.",
      image: {
        src: "/products/single-frequency/2um/hero.jpg",
        alt: "2.0µm Single-Frequency Fiber Laser",
      },
      href: "/products/single-frequency/2um",
    },
    {
      slug: "stabilized",
      title: "Frequency-Stabilized Fiber Laser (All Wavelengths)",
      shortDescription: "Frequency-locked fiber laser solutions.",
      image: {
        src: "/products/single-frequency/stabilized/hero.jpg",
        alt: "Frequency-Stabilized Fiber Laser",
      },
      href: "/products/single-frequency/stabilized",
    },
    {
      slug: "ultra-low-noise",
      title: "Ultra-Low Noise Fiber Laser Series",
      shortDescription: "Ultimate low-noise laser for metrology & sensing.",
      image: {
        src: "/products/single-frequency/ultra-low-noise/hero.jpg",
        alt: "Ultra-Low Noise Fiber Laser",
      },
      href: "/products/single-frequency/ultra-low-noise",
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

export default onePointFiveMicronSingleFrequencyFiberLaser;
