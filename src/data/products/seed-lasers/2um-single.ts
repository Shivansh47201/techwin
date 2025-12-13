import { Product } from "@/types/categories";

export const twoMicronSingleFrequencySeedLaser: Product = {
  slug: "2um-single",
  category: "seed-lasers",

  meta: {
    title: "Techwin 2.0 µm Single-Frequency Seed Laser | High Stability",
    description:
      "Techwin 2.0 µm Single-Frequency Seed Laser offering narrow linewidth, exceptional coherence and stable operation for high-precision mid-IR systems. Contact +86-13958180450.",
    keywords:
      "2.0 µm seed laser, DBR single-frequency seed, 2000 nm narrow linewidth, mid-IR seed source, quantum sensing seed",
  },

  title: "2.0 µm Single-Frequency Seed Laser",

  shortDescription:
    "A 2.0 µm DBR single-frequency seed laser engineered for kHz-level linewidth, exceptional coherence, long-term wavelength stability, and low noise performance — ideal for spectroscopy, quantum sensing, LIDAR and nonlinear conversion systems.",

  /** HERO + GALLERY IMAGES */
  heroImage: {
    src: "/products/seed-lasers/2um-single/hero.jpg",
    alt: "2.0 µm Single-Frequency Seed Laser",
  },

  galleryImages: [
    {
      src: "/products/seed-lasers/2um-single/hero.jpg",
      alt: "2.0 µm single-frequency seed laser preview",
    },
    {
      src: "/products/seed-lasers/2um-single/hero.jpg",
      alt: "2.0 µm single-frequency seed laser hero",
    },
  ],

  datasheetUrl: "/products/seed-lasers/2um-single/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/2um-single/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/2um-single/preview.jpg",

  /** TABLE + GRAPH SUPPORT */
  tableCsvUrl: "/products/seed-lasers/2um-single/specs.csv",
  graphImageURL: "/products/seed-lasers/2um-single/graph.jpg",
  tableImageURL: "/products/seed-lasers/2um-single/table.png",

  /** TOP-LEVEL FEATURES (from your required content) */
  features: [
    "kHz-level narrow linewidth DBR laser cavity",
    "Wide tuning range without mode hopping",
    "High power stability for reliable long-term seeding",
    "Compact and robust fiber-coupled design",
  ],

  /** TOP-LEVEL APPLICATION AREAS (from your required content) */
  applicationAreas: [
    "Gas detection and TDLAS",
    "Quantum computing",
    "Quantum precision measurement",
    "High-accuracy mid-IR sensing",
  ],

  /** MAIN SECTIONS — keeping original */
  sections: [
    {
      type: "text",
      heading: "Introduction to the 2.0 µm Wavelength Range",
      image: {
        src: "/products/seed-lasers/2um-single/overview.jpg",
        alt: "2.0 µm wavelength overview",
      },
      content:
        "The 2.0 µm spectral band supports strong molecular absorption lines, mid-IR conversion, and eye-safer operation in many environments. Techwin’s 2.0 µm seed lasers provide narrowband, stable optical output suitable for gas sensing, free-space transmission, medical research, and high-precision instrumentation.",
    },

    {
      type: "features",
      heading: "Key Features and Performance Highlights",
      bullets: [
        "DBR cavity providing strong single-frequency operation",
        "kHz-level linewidth stability for precision interferometry",
        "Low RIN and clean spectral output for sensing and metrology",
        "Stable wavelength under temperature and mechanical variations",
        "Polarization-maintaining output for coherent detection",
        "Compact and rugged OEM-ready mechanical form",
      ],
    },

    {
      type: "text",
      heading: "Applications of the 2.0 µm Single-Frequency Seed Laser",
      content:
        "The laser is ideal for gas spectroscopy (CO₂, CH₄, trace detection), nonlinear frequency conversion, coherent LIDAR, atmospheric remote sensing, and quantum measurement platforms requiring high coherence and ultra-stable frequency output.",
    },

    {
      type: "features",
      heading: "Why DBR Single-Frequency Architecture Matters",
      bullets: [
        "Wide tuning range without mode hopping",
        "Excellent coherence for interferometric sensing",
        "Stable seeding for coherent amplifiers and mid-IR sources",
        "Predictable long-term spectral stability",
      ],
    },

    {
      type: "text",
      heading: "System Integration Advantages",
      content:
        "Designed for OEM and laboratory platforms, the laser features standard PM-fiber output, clean electrical interfaces, compact mechanical structure, and TEC-based thermal stabilization to ensure reliable continuous operation.",
    },
  ],

  /** RELATED PRODUCTS — consistent with seed-lasers */
  relatedProducts: [
  {
    slug: "2um-phase",
    title: "2.0 µm Phase-Modulated Fiber Seed Source",
    shortDescription:
      "Phase-modulated mid-IR seed source for TDFA systems, remote sensing and coherent detection.",
    image: {
      src: "/products/seed-lasers/2um-phase/hero.jpg",
      alt: "2.0 µm Phase-Modulated Seed Source",
    },
    href: "/products/seed-lasers/2um-phase",
  },
  {
    slug: "1-5um-narrow",
    title: "1.5 µm Narrow Linewidth Seed Laser",
    shortDescription:
      "100 Hz-level ultra-narrow linewidth seed laser for sensing, metrology and telecom research.",
    image: {
      src: "/products/seed-lasers/1-5um-narrow/hero.jpg",
      alt: "1.5 µm Narrow Linewidth Seed Laser",
    },
    href: "/products/seed-lasers/1-5um-narrow",
  },
  {
    slug: "1-5um-phase-modulated",
    title: "1.5 µm Phase-Modulated Seed Laser",
    shortDescription:
      "Tunable phase, ultra-low phase noise, and high power stability for quantum and DAS systems.",
    image: {
      src: "/products/seed-lasers/1-5um-phase/hero.jpg",
      alt: "1.5 µm Phase-Modulated Seed Laser",
    },
    href: "/products/seed-lasers/1-5um-phase-modulated",
  },
  {
    slug: "1um-narrow",
    title: "1.0 µm Narrow Linewidth Seed Laser",
    shortDescription:
      "Stable 1.0 µm seed source with narrow linewidth for coherent sensing and amplifier seeding.",
    image: {
      src: "/products/seed-lasers/1um-narrow/hero.jpg",
      alt: "1.0 µm Narrow Linewidth Seed Laser",
    },
    href: "/products/seed-lasers/1um-narrow",
  },
  {
    slug: "1um-stabilized",
    title: "1.0 µm Frequency-Stabilized Seed Laser",
    shortDescription:
      "Frequency-stabilized 1.0 µm seed laser for metrology and coherent applications.",
    image: {
      src: "/products/seed-lasers/1um-stabilized/hero.jpg",
      alt: "1.0 µm Frequency-Stabilized Seed Laser",
    },
    href: "/products/seed-lasers/1um-stabilized",
  },
  {
    slug: "1um-ultra-low-noise",
    title: "1.0 µm Ultra-Low Noise Seed Laser",
    shortDescription:
      "Ultra-low RIN seed source with outstanding power stability for amplifier seeding and quantum instruments.",
    image: {
      src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
      alt: "1.0 µm Ultra-Low Noise Seed Laser",
    },
    href: "/products/seed-lasers/1um-ultra-low-noise",
  },
  {
  slug: "1um-industrial",
  title: "1.0μm Industrial Single-Frequency Seed Source",
  shortDescription:
    "Industrial-grade 1.0μm single-frequency seed source with ultra-narrow linewidth and robust all-fiber construction.",
  image: {
    src: "/products/seed-lasers/1um-industrial/hero.jpg",
    alt: "1.0μm Industrial Single-Frequency Seed Source",
  },
  href: "/products/seed-lasers/1um-industrial",
},
{
  slug: "1um-high-reliability",
  title: "1.0μm High-Reliability Single-Frequency Seed Source",
  shortDescription:
    "High-reliability 1.0μm single-frequency seed source optimized for continuous-duty laser systems and stable wavelength output.",
  image: {
    src: "/products/seed-lasers/1um-high-reliability/hero.jpg",
    alt: "1.0μm High-Reliability Single-Frequency Seed Source",
  },
  href: "/products/seed-lasers/1um-high-reliability",
},
],
};

export default twoMicronSingleFrequencySeedLaser;
