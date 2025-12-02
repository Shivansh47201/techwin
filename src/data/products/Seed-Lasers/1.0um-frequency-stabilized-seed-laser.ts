import { Product } from "@/types/categories";

export const oneMicronFrequencyStabilizedSeedLaser: Product = {
  slug: "1um-stabilized",
  category: "seed-lasers",

  meta: {
    title: "1.0 µm Frequency-Stabilized Seed Laser | Techwin Precision Systems",
    description:
      "Techwin 1.0 µm Frequency-Stabilized Seed Laser for research and sensing applications with stable output and reliable performance. Contact +86-13958180450 for more details.",
    keywords:
      "1.0 µm frequency-stabilized seed laser, seed laser 1.0um, narrow linewidth seed laser, Techwin seed laser, stabilized seed source",
  },

  title: "1.0 µm Frequency-Stabilized Seed Laser",
  shortDescription:
    "Frequency-stabilized 1.0 µm seed lasers engineered for narrow linewidth emission, minimal frequency drift, and dependable long-term operation—ideal for research, sensing, and amplifier seeding.",

  heroImage: { src: "/products/seed-lasers/1um-stabilized/hero.jpg",
    alt: "1.0 µm Frequency-Stabilized Seed Laser",
  },

  galleryImages: [
      { src: "/seed-lasers/1um-stabilized/preview.jpg", alt: "1.0µm frequency-stabilized seed laser preview" },
      { src: "/seed-lasers/1um-stabilized/hero.jpg", alt: "1.0µm frequency-stabilized seed laser hero" },
    ],

  datasheetUrl: "/products/seed-lasers/1um-stabilized/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/1um-stabilized/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/1um-stabilized/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 1.0 µm Frequency-Stabilized Seed Laser Category",
      image: { src: "/seed-lasers/1um-stabilized/", alt: "1.0 µm frequency-stabilized overview" },
      content:
        "Seed lasers in the 1.0 µm region are used to initiate coherent radiation in high-power amplifiers and nonlinear systems. Frequency-stabilized models provide narrow linewidth, suppressed frequency noise, and minimal wavelength drift—ensuring high system efficiency and reliable downstream performance.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Narrow linewidth output with minimal mode hopping",
        "Excellent frequency stability across short- and long-term operation",
        "Low relative intensity noise (RIN) for clean signal seeding",
        "High spectral purity for improved amplifier behaviour",
        "Fiber-coupled architecture (SM / PM options) for easy integration",
        "Designed for long operational lifetime with low maintenance",
      ],
    },

    {
      type: "text",
      heading: "Why 1.0 µm Seed Lasers Matter",
      content:
        "The 1.0 µm wavelength band is compatible with ytterbium-doped fibers and nonlinear conversion processes. Frequency-stabilized seeds ensure better conversion efficiency, predictable amplifier operation, and stable outputs for precision applications.",
    },

    {
      type: "features",
      heading: "Applications",
      bullets: [
        "Fiber laser seeding for ytterbium amplifiers",
        "LIDAR and coherent detection systems",
        "Precision metrology and interferometry",
        "Nonlinear frequency conversion and harmonic generation",
        "Quantum optics and spectroscopy",
        "Research laboratories and industrial testbeds",
      ],
    },

    {
      type: "text",
      heading: "Performance Parameters to Consider",
      content:
        "When selecting a model, evaluate wavelength accuracy, frequency stability, required output power, polarization (PM/SM), linewidth specification, environmental tolerance, and noise characteristics to ensure optimal fit for your application.",
    },

    {
      type: "text",
      heading: "How Frequency Stabilization Works",
      content:
        "Stabilization is achieved through precision temperature control, high-stability current drivers, internal wavelength locking, optical resonators, and rapid feedback control electronics—collectively minimizing drift and frequency noise in dynamic environments.",
    },

    {
      type: "features",
      heading: "Mechanical & Electrical Integration",
      bullets: [
        "Compact modules, benchtop units, or OEM configurations",
        "Rugged housings, standard connectors, and optional control panels",
        "Digital/analog interfaces for monitoring and control",
        "Electrical protections against overcurrent and overheating",
      ],
    },

    {
      type: "text",
      heading: "Advantages of Stabilized Seed Lasers",
      content:
        "Integrating a frequency-stabilized seed provides improved measurement precision, more consistent amplifier performance, reduced recalibration needs, and greater data integrity in demanding sensing and research applications.",
    },

    {
      type: "features",
      heading: "Integration Guidance",
      bullets: [
        "Ensure proper fiber alignment for minimal coupling loss",
        "Provide thermal management to reduce wavelength drift",
        "Use electrical shielding to preserve low-noise operation",
        "Monitor output performance via diagnostics for long-term reliability",
      ],
    },

    {
      type: "text",
      heading: "Support & Customization",
      content:
        "Techwin offers engineering support, datasheets, and customization for wavelength, output power, polarization, and interface options. Contact our team for model selection and integration assistance.",
    },

    {
      type: "text",
      heading: "About Techwin",
      content:
        "Manufactured in Hangzhou City, Techwin supplies frequency-stabilized seed lasers with strict quality controls and engineering support for research institutions, integrators, and industrial customers.",
    },
  ],

  relatedProducts: [
    {
      slug: "1um-stabilized",
      title: "1.0 µm Narrow Linewidth Seed Laser",
      shortDescription: "Stable, low-noise seed source for coherent systems.",
      image: { src: "/seed-lasers/1um-stabilized/", alt: "1.0 µm narrow linewidth seed" },
      href: "/seed-lasers/1um-stabilized/",
    },
    {
      slug: "1um-stabilized", // self-reference is OK; you may remove or replace later
      title: "Other 1.0 µm Frequency-Stabilized Models",
      shortDescription: "Variant models for different power and linewidth needs.",
      image: { src: "/seed-lasers/1um-stabilized/", alt: "Frequency stabilized variants" },
      href: "/seed-lasers/1um-stabilized/",
    },
  ],
};

export default oneMicronFrequencyStabilizedSeedLaser;
