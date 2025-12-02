import { Product } from "@/types/categories";

export const oneMicronNarrowLinewidthSeedLaser: Product = {
  slug: "1um-narrow",
  category: "seed-lasers",

  meta: {
    title: "1.0 µm Narrow Linewidth Seed Laser | Techwin Laser Systems in China",
    description:
      "Techwin 1.0 µm Narrow Linewidth Seed Laser for precise optical applications. Based in Hangzhou City. Contact +86-13958180450 for stable and low-noise laser solutions.",
    keywords:
      "1.0 µm seed laser, narrow linewidth seed laser, low noise seed laser, Techwin 1.0um laser, fiber seed laser",
  },

  title: "1.0 µm Narrow Linewidth Seed Laser",
  shortDescription:
    "A stable, low-noise, narrow linewidth 1.0 µm seed laser designed for coherent systems, scientific instrumentation, sensing platforms, and precision optical applications.",

  heroImage: { src: "/products/seed-lasers/1um-narrow/hero.jpg",
    alt: "1.0 µm Narrow Linewidth Seed Laser",
  },

  galleryImages: [
      { src: "/seed-lasers/1um-narrow/preview.jpg", alt: "1.0µm narrow-linewidth seed laser preview" },
      { src: "/seed-lasers/1um-narrow/hero.jpg", alt: "1.0µm narrow-linewidth seed laser hero" },
    ],

  datasheetUrl: "/products/seed-lasers/1um-narrow/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/1um-narrow/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/1um-narrow/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "What Is a 1.0 µm Narrow Linewidth Seed Laser?",
      image: {
        src: "/seed-lasers/1um-narrow/",
        alt: "1.0 µm seed laser explanation",
      },
      content:
        "A 1.0 µm Narrow Linewidth Seed Laser provides a highly stable, low phase-noise optical output suitable for coherent communication systems, amplifier chains, metrology, quantum sensing, and scientific instrumentation. Its narrow linewidth ensures predictable, low-drift spectral performance during long-term operation.",
    },

    {
      type: "features",
      heading: "Core Advantages of Narrow Linewidth Seed Lasers",
      bullets: [
        "Extremely narrow linewidth for precision optical systems",
        "High spectral purity enabled by stable cavity design",
        "Low phase noise suitable for sensitive measurements",
        "Stable wavelength output during temperature variations",
        "Ideal seed source for high-power fiber amplifier chains",
      ],
    },

    {
      type: "text",
      heading: "Design Characteristics",
      content:
        "The seed laser architecture includes fiber-based components for stable beam alignment, temperature regulation for wavelength stability, low-noise electronics for reduced amplitude/phase fluctuations, and compact module designs for easy system integration.",
    },

    {
      type: "features",
      heading: "Typical Specifications Range",
      bullets: [
        "Wavelength: ~1030 to 1080 nm",
        "Linewidth: typically < few kHz",
        "Output Power: from a few mW to ~50 mW",
        "Low relative intensity noise (RIN)",
        "Minimal long-term frequency drift",
        "Linear or PM polarization options",
      ],
    },

    {
      type: "text",
      heading: "Why Narrow Linewidth Matters",
      content:
        "Applications such as coherent detection, quantum sensing, metrology, and fiber amplifier seeding require optical sources with minimal wavelength drift and ultra-stable spectral purity. Narrow linewidth ensures high measurement accuracy and consistent performance.",
    },

    {
      type: "features",
      heading: "Industrial and Research Applications",
      bullets: [
        "Coherent optical communication",
        "Optical sensing and metrology",
        "High-precision scientific research",
        "Quantum experiments and detection systems",
        "Fiber amplifier seeding for 1.0 µm systems",
      ],
    },

    {
      type: "text",
      heading: "Integration in Fiber Systems",
      content:
        "The fiber-coupled output, predictable wavelength, and low-noise characteristics simplify integration into optical setups. Stable polarization, reduced vibration sensitivity, and compact size support seamless and reliable operation in lab and industrial environments.",
    },

    {
      type: "text",
      heading: "Thermal Stability and Long-Term Performance",
      content:
        "Temperature regulation maintains wavelength stability across varying conditions. The seed laser preserves stable output even during extended run-times, reducing recalibration and ensuring consistent downstream system behavior.",
    },

    {
      type: "text",
      heading: "Low Noise Operation",
      content:
        "Internal low-noise circuitry minimizes phase, amplitude, and frequency noise—supporting applications that require clean optical signals, such as sensing, spectroscopy, and coherent communications.",
    },

    {
      type: "features",
      heading: "Why Choose This Seed Laser",
      bullets: [
        "Stable wavelength during continuous operation",
        "High spectral purity and reduced drift",
        "Superior coherence for precision setups",
        "Reliable performance for scientific and industrial tasks",
        "Ideal for custom amplifier systems requiring stable seeding",
      ],
    },

    {
      type: "text",
      heading: "Service Support and Technical Assistance",
      content:
        "Techwin provides product selection guidance, integration support, wavelength tuning advice, documentation, and long-term reliability assistance. Ideal for complex research systems or industrial automation platforms.",
    },

    {
      type: "text",
      heading: "About Techwin",
      content:
        "This product is manufactured by Techwin in Hangzhou City, known for precision laser components and stable single-frequency systems used in laboratories, scientific institutes, and industrial platforms.",
    },
  ],

  relatedProducts: [
    {
      slug: "1um-narrow",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription: "High-stability 1.0 µm laser for coherent systems.",
      image: {
        src: "/single-frequency/1um-hero.jpg",
        alt: "1.0 µm Single-Frequency Laser",
      },
      href: "/seed-lasers/1um-narrow/",
    },
    {
      slug: "1um-narrow",
      title: "1.0 µm Frequency-Stabilized Seed Laser",
      shortDescription: "Stable frequency output for coherent and metrology systems.",
      image: {
        src: "/seed-lasers/1um-narrow/",
        alt: "1.0 µm frequency-stabilized seed laser",
      },
      href: "/seed-lasers/1um-narrow/",
    },
  ],
};

export default oneMicronNarrowLinewidthSeedLaser;
