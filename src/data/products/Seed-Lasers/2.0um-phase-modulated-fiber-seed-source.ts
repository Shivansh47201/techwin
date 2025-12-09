import { Product } from "@/types/categories";

export const twoMicronPhaseModulatedFiberSeedSource: Product = {
  slug: "2um-phase",
  category: "seed-lasers",

  meta: {
    title: "Techwin 2.0 µm Phase-Modulated Fiber Seed Source | Stable Output",
    description:
      "Techwin's 2.0 µm Phase-Modulated Fiber Seed Source provides stable performance and high reliability for advanced systems. Contact +86-13958180450 from Hangzhou City.",
    keywords:
      "2.0 µm phase-modulated seed, phase-modulated fiber seed, 2um seed laser, thulium seed source, Techwin phase modulation",
  },

  title: "2.0 µm Phase-Modulated Fiber Seed Source",

  shortDescription:
    "A high-precision mid-IR seed laser with integrated phase modulation and narrow linewidth. Designed for TDFA systems, high-power fiber sources, remote sensing, spectroscopy, and medical photonics applications.",

  /** HERO + GALLERY IMAGES */
  heroImage: {
    src: "/products/seed-lasers/2um-phase/hero.jpg",
    alt: "2.0 µm Phase-Modulated Fiber Seed Source",
  },

  galleryImages: [
    {
      src: "/products/seed-lasers/2um-phase/hero.jpg",
      alt: "2.0µm phase-modulated fiber seed source preview",
    },
    {
      src: "/products/seed-lasers/2um-phase/hero.jpg",
      alt: "2.0µm phase-modulated fiber seed source hero",
    },
  ],

  datasheetUrl: "/products/seed-lasers/2um-phase/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/2um-phase/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/2um-phase/preview.jpg",

  /** TABLE + GRAPH IMAGE + CSV */
  tableCsvUrl: "/products/seed-lasers/2um-phase/specs.csv",
  graphImageURL: "/products/seed-lasers/2um-phase/graph.jpg",
  tableImageURL: "/products/seed-lasers/2um-phase/table.png",

  /** TOP-LEVEL FEATURES (from your text) */
  features: [
    "Mid-infrared wavelength output with narrow-linewidth operation.",
    "Advanced phase modulation capability with excellent stability.",
    "Fully fiberized all-fiber architecture for robust integration.",
    "Highly stable mid-IR performance suitable for OEM and lab platforms.",
  ],

  /** TOP-LEVEL APPLICATION AREAS (from your text) */
  applicationAreas: [
    "LiDAR and remote sensing",
    "Medical photonics and imaging",
    "Environmental monitoring",
    "Spectroscopic analysis",
  ],

  /** MAIN SECTIONS (existing content kept) */
  sections: [
    {
      type: "text",
      heading: "Overview of the 2.0 µm Phase-Modulated Fiber Seed Source",
      image: {
        src: "/products/seed-lasers/2um-phase/overview.jpg",
        alt: "2.0 µm phase-modulated overview",
      },
      content:
        "The 2.0 µm Phase-Modulated Fiber Seed Source delivers controlled phase modulation with narrow linewidth, stable mid-infrared output, and a clean spectral profile. Built on a fiber-based platform, it is optimized for long-term stability and reliable integration with Thulium-doped amplifier chains and mid-IR sensing systems.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Integrated phase modulation capability with adjustable modulation depth",
        "Narrow and stable single-frequency output",
        "Low phase noise and low RIN for high-fidelity signals",
        "Fiber-based architecture for robust OEM integration",
        "PM fiber output and industry-standard connectors",
        "Compact, thermally-stable package for continuous operation",
      ],
    },

    {
      type: "features",
      heading: "Applications",
      bullets: [
        "LiDAR and atmospheric remote sensing",
        "TDFA-based amplification systems",
        "Molecular spectroscopy and chemical sensing",
        "Medical photonics instrumentation",
        "Environmental monitoring and emission detection",
      ],
    },

    {
      type: "text",
      heading: "Benefits of Phase Modulation",
      content:
        "Advanced phase modulation enables spectral shaping, frequency shifting, coherence control, and signal conditioning for high-performance detection and amplification systems. This enhances downstream amplifier efficiency and measurement sensitivity.",
    },

    {
      type: "text",
      heading: "Typical Performance Characteristics",
      content:
        "Center wavelength around 2.0 µm, narrow linewidth (model-dependent), stable output power, adjustable phase modulation parameters, and high spectral purity. Exact specifications depend on selected model and configuration.",
    },

    {
      type: "text",
      heading: "System Integration Advantages",
      content:
        "Designed for seamless compatibility with Thulium-doped fiber amplifiers, OEM fiber systems, and long-duration laboratory instruments. Compact construction and robust thermal stabilization ensure predictable modulation accuracy and long-term operational reliability.",
    },
  ],relatedProducts: [
  {
    slug: "2um-single",
    title: "2.0 µm Single-Frequency Seed Laser",
    shortDescription:
      "Narrow-linewidth 2.0 µm seed source for spectroscopy, LiDAR, and coherent sensing.",
    image: {
      src: "/products/seed-lasers/2um-single/hero.jpg",
      alt: "2.0 µm Single-Frequency Seed Laser",
    },
    href: "/products/seed-lasers/2um-single",
  },
  {
    slug: "1-5um-phase-modulated",
    title: "1.5 µm Phase-Modulated Seed Laser",
    shortDescription:
      "1.5 µm phase-modulated seed laser with tunable phase and ultra-low phase noise.",
    image: {
      src: "/products/seed-lasers/1-5um-phase/hero.jpg",
      alt: "1.5 µm Phase-Modulated Seed Laser",
    },
    href: "/products/seed-lasers/1-5um-phase-modulated",
  },
  {
    slug: "1-5um-narrow",
    title: "1.5 µm Narrow Linewidth Seed Laser",
    shortDescription:
      "100 Hz-level ultra-narrow linewidth seed laser with superb coherence.",
    image: {
      src: "/products/seed-lasers/1-5um-narrow/hero.jpg",
      alt: "1.5 µm Narrow Linewidth Seed Laser",
    },
    href: "/products/seed-lasers/1-5um-narrow",
  },
  {
    slug: "1um-ultra-low-noise",
    title: "1.0 µm Ultra-Low Noise Seed Laser",
    shortDescription:
      "Ultra-low RIN and long-term power stability for precise amplifier seeding.",
    image: {
      src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
      alt: "1.0 µm Ultra-Low Noise Seed Laser",
    },
    href: "/products/seed-lasers/1um-ultra-low-noise",
  },
  {
    slug: "1um-stabilized",
    title: "1.0 µm Frequency-Stabilized Seed Laser",
    shortDescription:
      "Frequency-locked single-frequency seed laser with minimal drift.",
    image: {
      src: "/products/seed-lasers/1um-stabilized/hero.jpg",
      alt: "1.0 µm Frequency-Stabilized Seed Laser",
    },
    href: "/products/seed-lasers/1um-stabilized",
  },
  {
    slug: "1um-narrow",
    title: "1.0 µm Narrow Linewidth Seed Laser",
    shortDescription:
      "Stable and narrow single-frequency emission for coherent sensing and amplifier chains.",
    image: {
      src: "/products/seed-lasers/1um-narrow/hero.jpg",
      alt: "1.0 µm Narrow Linewidth Seed Laser",
    },
    href: "/products/seed-lasers/1um-narrow",
  },
],
};

export default twoMicronPhaseModulatedFiberSeedSource;
