import { Product } from "@/types/categories";

export const onePointFiveMicronPhaseModulatedSeedLaser: Product = {
  slug: "1-5um-phase",
  category: "seed-lasers",

  meta: {
    title: "Techwin 1.5 µm Phase-Modulated Seed Laser | Seed Lasers Systems 1",
    description:
      "Techwin 1.5 µm Phase-Modulated Seed Laser for sensing and optical research applications. Stable seed source from Hangzhou City. Contact +86-13958180450 now.",
    keywords:
      "1.5 µm phase-modulated seed laser, 1550 nm seed laser, Techwin seed laser, coherent lidar seed, distributed sensing seed",
  },

  title: "1.5 µm Phase-Modulated Seed Laser",

  shortDescription:
    "A stable 1.5 µm phase-modulated seed laser engineered for coherent lidar, distributed sensing, optical research, telecom testing, and precision photonics applications.",

  heroImage: { src: "/products/seed-lasers/1-5um-phase/hero.jpg",
    alt: "1.5 µm Phase-Modulated Seed Laser",
  },

  galleryImages: [
      { src: "/seed-lasers/1-5um-phase/preview.jpg", alt: "1.5µm phase-modulated seed laser preview" },
      { src: "/seed-lasers/1-5um-phase/hero.jpg", alt: "1.5µm phase-modulated seed laser hero" },
    ],

  datasheetUrl: "/products/seed-lasers/1-5um-phase/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/1-5um-phase/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/1-5um-phase/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Introduction to 1.5 µm Seed Laser Technology",
      image: { src: "/seed-lasers/1-5um-phase/", alt: "1.5 µm Seed Laser Overview" },
      content:
        "The 1.5 µm Phase-Modulated Seed Laser combines narrow-linewidth seed performance with advanced phase modulation. Operating around the 1550 nm telecom band, it offers low fiber attenuation, atmospheric transparency, and compatibility with telecom-grade optical components—ideal for coherent detection, lidar, distributed sensing, and high-end photonics research.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Ultra-narrow linewidth (<10 kHz typical)",
        "Integrated phase modulation with wide tuning range",
        "High wavelength and frequency stability",
        "Low frequency and intensity noise",
        "Compact and rugged mechanical structure",
        "Optimized for 1550 nm fiber systems",
      ],
    },

    {
      type: "text",
      heading: "What Is a Phase-Modulated Seed Laser?",
      content:
        "A phase-modulated seed laser is a stabilized optical source equipped with internal or external modulation elements to precisely control the phase of the optical carrier. This is essential for coherent lidar, distributed fiber sensing, high-resolution interferometry, and advanced optical communication schemes.",
    },

    {
      type: "features",
      heading: "Technical Advantages",
      bullets: [
        "Stable wavelength output with minimal drift",
        "Clean, low-jitter phase modulation performance",
        "Low intensity and frequency noise for precision sensing",
        "Digital control interface for easy system integration",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "This seed laser is used in coherent lidar, distributed acoustic sensing (DAS), DTS/DFOS, optical communication research, quantum photonics, precision spectroscopy, and interferometric metrology.",
    },

    {
      type: "features",
      heading: "Primary Application Areas",
      bullets: [
        "Coherent FMCW lidar systems",
        "Distributed fiber sensing",
        "Coherent optical communication experiments",
        "Precision spectroscopy and metrology",
        "Quantum photonics and interferometry",
      ],
    },

    {
      type: "text",
      heading: "Product Structure & Typical Parameters",
      content:
        "Typical specifications include a 1520–1600 nm wavelength range, <10 kHz linewidth, multiple output power options, high-stability temperature control, low electrical noise, and environmental robustness with shock/vibration resistance.",
    },

    {
      type: "text",
      heading: "Why Choose a 1.5 µm Phase-Modulated Seed Laser?",
      content:
        "This category is preferred for applications requiring precise phase control, narrow-linewidth output, and reliable fiber-based integration. It is ideal for long-term laboratory setups, field deployments, and advanced optical system development.",
    },

    {
      type: "text",
      heading: "About the Manufacturer",
      content:
        "Manufactured in Hangzhou City by Techwin, a globally recognized provider of high-precision photonic systems. Known for reliability, stability, and industry-level engineering quality across scientific and industrial applications.",
    },
  ],

  relatedProducts: [
    {
      slug: "1-5um-phase",
      title: "1.5 µm Narrow Linewidth Seed Laser",
      shortDescription: "Ultra-stable 1550 nm narrow-linewidth seed for sensing and research.",
      image: { src: "/seed-lasers/1-5um-phase/", alt: "1.5 µm narrow linewidth seed" },
      href: "/seed-lasers/1-5um-phase/",
    },
    {
      slug: "1-5um-phase",
      title: "1.5 µm Ultra-Low Noise Seed Laser",
      shortDescription: "Low-noise seed source for coherent detection and metrology.",
      image: { src: "/seed-lasers/1-5um-phase/", alt: "1.5 µm ultra-low noise seed" },
      href: "/seed-lasers/1-5um-phase/",
    },
  ],
};

export default onePointFiveMicronPhaseModulatedSeedLaser;
