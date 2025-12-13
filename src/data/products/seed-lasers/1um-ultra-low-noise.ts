import { Product } from "@/types/categories";

export const ultraLowNoiseSeedLaser: Product = {
 
  slug: "1um-ultra-low-noise",

  category: "seed-lasers",

  meta: {
    title: "Techwin 1.0 µm Ultra-Low Noise Seed Laser | Stable Seed Source",
    description:
      "Techwin 1.0 µm Ultra-Low Noise Seed Laser for precision sensing, research and stable single-frequency setups. High stability seed source. Call +86-13958180450 today.",
    keywords:
      "ultra-low noise seed laser, 1.0 µm seed laser, narrow-linewidth seed source, stable single-frequency laser",
  },

  title: "1.0 µm Ultra-Low Noise Seed Laser",
  shortDescription:
    "The 1.0 µm ultra-low noise seed laser is engineered for high-end applications such as new energy laser driving, coherent photoradar, precision interferometry, and quantum optics. Utilizing advanced low-RIN laser technology paired with a highly stable power control architecture, it effectively suppresses noise accumulation within the system. This ensures long-term power stability, extremely low intensity fluctuations, and enhanced detection sensitivity, significantly improving the overall accuracy and performance of related optical systems.",

  /** MAIN IMAGES (own folder) */
  heroImage: {
    src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
    alt: "1.0 µm Ultra-Low Noise Seed Laser",
  },
  previewImageSrc: "/products/seed-lasers/1um-ultra-low-noise/preview.jpg",

  galleryImages: [
    {
      src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
      alt: "1.0 µm ultra-low noise seed laser preview",
    },
    {
      src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
      alt: "1.0 µm ultra-low noise seed laser hero",
    },
  ],

  /** DATASHEET + TABLE/GRAPH IMAGES */
  // tree me datasheet.jpg hai, isliye yahan bhi .jpg hi rakhenge
  datasheetUrl: "/products/seed-lasers/1um-ultra-low-noise/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/1um-ultra-low-noise/datasheet.jpg",

  // CSV table for specs (optional – if your ProductSpecs uses it)
  tableCsvUrl: "/products/seed-lasers/1um-ultra-low-noise/specs.csv",

  // last main images for graph + table
  graphImageURL: "/products/seed-lasers/1um-ultra-low-noise/graph.jpg",
  tableImageURL: "/products/seed-lasers/1um-ultra-low-noise/table.png",

  /** TOP: FEATURES + APPLICATION AREAS (from your text) */
  features: [
    "Ultra-low intensity noise for high-end, noise-sensitive optical systems.",
    "Exceptional long-term power stability enabled by a highly stable power control architecture.",
    "Effectively suppresses noise accumulation within amplifier chains and detection subsystems.",
    "Narrow-linewidth, single-frequency operation for high spectral purity and coherence.",
    "Fully independent intellectual property rights for reliable long-term availability.",
  ],

  applicationAreas: [
    "New energy laser driving",
    "Coherent photoradar",
    "Precision interferometry",
    "Quantum optics",
    "Other noise-sensitive measurement and sensing fields",
  ],

  /** EXISTING SECTIONS KEPT (content unchanged) */
  sections: [
    {
      type: "text",
      heading: "Overview of the 1.0 µm Ultra-Low Noise Seed Laser",
      content:
        "The 1.0 µm Ultra-Low Noise Seed Laser provides an extremely stable, narrow-linewidth optical source designed for coherent detection, amplifier seeding and precision measurements. Built for low intensity noise and long-term wavelength stability, it integrates easily into lab and industrial systems.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Ultra-low intensity & phase noise",
        "Narrow linewidth for coherent systems",
        "Temperature controlled wavelength stability",
        "Fiber-coupled output (PM/SM options)",
        "Compact, ruggedized module for lab & OEM use",
        "Low drift under continuous operation",
      ],
    },

    {
      type: "text",
      heading: "Technical Design",
      content:
        "Engineered with a stabilized optical cavity, precision TEC control and low-noise drive electronics, the laser maintains spectral purity and minimal amplitude/phase noise suitable for high-accuracy experiments and instrument seeding.",
    },

    {
      type: "specs",
      heading: "Typical Specifications",
      specGroups: [
        {
          label: "Optical",
          rows: [
            { name: "Wavelength", value: "≈ 1.0 µm (model dependent)" },
            { name: "Linewidth", value: "< few kHz (depends on config)" },
            { name: "Output Power", value: "mW-level (configurable)" },
            { name: "Polarization", value: "PM option available" },
          ],
        },
        {
          label: "Electrical & Mechanical",
          rows: [
            { name: "Form Factor", value: "Benchtop / OEM module" },
            { name: "Control", value: "Analog + digital interfaces" },
            { name: "Power Input", value: "12–24 VDC (model dependent)" },
          ],
        },
      ],
    },

    {
      type: "features",
      heading: "Applications",
      bullets: [
        "Seed source for fiber amplifiers",
        "Coherent LIDAR research & prototypes",
        "High-resolution spectroscopy",
        "Precision optical sensing and metrology",
        "Quantum optics experiments requiring low phase noise",
      ],
    },

    {
      type: "text",
      heading: "Integration & Support",
      content:
        "Units are supplied with integration support, configuration options for power and polarization, and application notes for seeding amplifier chains. Contact our sales team for custom OEM options and detailed integration guidance.",
    },
  ],

  /** UPDATED RELATED PRODUCTS – image URLs + slugs aligned with your folder tree */
  relatedProducts: [
    {
      slug: "1um-narrow",
      title: "1.0 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "1.0 µm ultra-narrow linewidth fiber seed laser with kHz-level linewidth and excellent spectral purity.",
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
        "Frequency-stabilized 1.0 µm seed laser with narrow linewidth and minimal frequency drift for precision systems.",
      image: {
        src: "/products/seed-lasers/1um-stabilized/hero.jpg",
        alt: "1.0 µm Frequency-Stabilized Seed Laser",
      },
      href: "/products/seed-lasers/1um-stabilized",
    },
    {
      slug: "1-5um-narrow",
      title: "1.5 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "1.5 µm ultra-narrow linewidth seed laser for high-precision sensing and quantum measurement.",
      image: {
        src: "/products/seed-lasers/1-5um-narrow/hero.jpg",
        alt: "1.5 µm Narrow Linewidth Seed Laser",
      },
      href: "/products/seed-lasers/1-5um-narrow",
    },
    {
      slug: "1-5um-phase",
      title: "1.5 µm Phase-Modulated Seed Laser",
      shortDescription:
        "1.5 µm phase-modulated seed laser with tunable phase and ultra-low phase noise.",
      image: {
        src: "/products/seed-lasers/1-5um-phase/hero.jpg",
        alt: "1.5 µm Phase-Modulated Seed Laser",
      },
      href: "/products/seed-lasers/1-5um-phase",
    },
    {
      slug: "2um-single",
      title: "2.0 µm Single-Frequency Seed Laser",
      shortDescription:
        "2.0 µm DBR single-frequency seed laser for quantum information, lidar and high-resolution spectroscopy.",
      image: {
        src: "/products/seed-lasers/2um-single/hero.jpg",
        alt: "2.0 µm Single-Frequency Seed Laser",
      },
      href: "/products/seed-lasers/2um-single",
    },
    {
      slug: "2um-phase",
      title: "2.0 µm Phase-Modulated Fiber Seed Source",
      shortDescription:
        "2.0 µm phase-modulated fiber seed source with mid-IR output and advanced phase modulation.",
      image: {
        src: "/products/seed-lasers/2um-phase/hero.jpg",
        alt: "2.0 µm Phase-Modulated Fiber Seed Source",
      },
      href: "/products/seed-lasers/2um-phase",
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

export default ultraLowNoiseSeedLaser;
