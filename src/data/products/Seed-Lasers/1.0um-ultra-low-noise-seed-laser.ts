import { Product } from "@/types/categories";

/**
 * 1.0 µm Ultra-Low Noise Seed Laser — normalized for routing & rendering
 * Save / replace the existing export in your product data file.
 */
export const ultraLowNoiseSeedLaser: Product = {
  // make slug match the expected URL segment
  slug: "1-0um-ultra-low-noise-seed-laser",

  // ensure category matches the path segment used in URL generation
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
    "Stable, narrow-linewidth 1.0 µm seed laser designed for precision sensing, amplifier seeding and high-resolution spectroscopy.",

  // normalized image objects / paths (ensure these files exist under public/)
  heroImage: { src: "/products/seed-lasers/1um-narrow/hero.jpg", alt: "1.0 µm Ultra-Low Noise Seed Laser" },
  previewImageSrc: "/products/seed-lasers/1um-narrow/preview.jpg",
  galleryImages: [
    { src: "/products/seed-lasers/1um-narrow/preview.jpg", alt: "1.0 µm ULN seed laser preview" },
    { src: "/products/seed-lasers/1um-narrow/hero.jpg", alt: "1.0 µm ULN seed laser hero" },
  ],
  datasheetUrl: "/products/seed-lasers/1um-narrow/datasheet.pdf",
  datasheetImageSrc: "/products/seed-lasers/1um-narrow/datasheet.jpg",

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
      // use `specGroups` or `blocks` depending on your ProductDescription/Specs component;
      // your types accept `rows` or `blocks` — here we provide `blocks` (SpecsSection supports blocks).
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

  relatedProducts: [
    {
      slug: "1um-narrow",
      title: "1.0 µm Narrow Linewidth Seed Laser",
      href: "/products/seed-lasers/1um-narrow",
    },
    {
      slug: "1-0um-single-frequency",
      title: "1.0 µm Single-Frequency Laser",
      href: "/products/seed-lasers/1-0um-single-frequency",
    },
  ],
};

export default ultraLowNoiseSeedLaser;
