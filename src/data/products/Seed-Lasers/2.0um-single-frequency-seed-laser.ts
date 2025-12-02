import { Product } from "@/types/categories";

export const twoMicronSingleFrequencySeedLaser: Product = {
  slug: "2um-single",
  category: "seed-lasers",

  meta: {
    title: "Techwin 2.0 µm Single-Frequency Seed Laser | High Stability.",
    description:
      "Techwin 2.0 µm Single-Frequency Seed Laser offering stable linewidth and dependable performance for precision systems. Contact +86-13958180450 from Hangzhou City.",
    keywords:
      "2.0 µm seed laser, 2000 nm single-frequency seed, narrow linewidth 2.0um, Techwin seed laser, mid-IR seed source",
  },

  title: "2.0 µm Single-Frequency Seed Laser",
  shortDescription:
    "A high-stability 2.0 µm single-frequency seed laser engineered for narrow linewidth, wavelength stability, and reliable long-term operation — ideal for gas sensing, LIDAR, nonlinear conversion and precision instruments.",

  heroImage: { src: "/products/seed-lasers/2um-single/hero.jpg",
    alt: "2.0 µm Single-Frequency Seed Laser",
  },

  galleryImages: [
      { src: "/seed-lasers/2um-single/preview.jpg", alt: "2.0µm single-frequency seed laser preview" },
      { src: "/seed-lasers/2um-single/hero.jpg", alt: "2.0µm single-frequency seed laser hero" },
    ],

  datasheetUrl: "/products/seed-lasers/2um-single/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/2um-single/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/2um-single/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Introduction to the 2.0 µm Wavelength Range",
      image: { src: "/seed-lasers/2um-single/", alt: "2.0 µm wavelength overview" },
      content:
        "The 2.0 µm spectral band supports strong molecular absorption lines, mid-IR conversion, and eye-safer operation in many environments. Techwin’s 2.0 µm seed lasers provide narrowband, stable optical output suitable for gas sensing, free-space transmission, medical research, and high-precision instrumentation.",
    },

    {
      type: "features",
      heading: "Key Features and Performance Highlights",
      bullets: [
        "Narrow optical linewidth for coherent detection and precision metrology",
        "Low relative intensity noise (RIN) for clean signal generation",
        "Wavelength stability via thermal and mechanical control",
        "Wide operating temperature tolerance for field deployment",
        "Polarization-maintaining (PM) output options",
        "Compact, rugged structural design for OEM integration",
      ],
    },

    {
      type: "text",
      heading: "Working Principle of Single-Frequency Seed Lasers",
      content:
        "A single-frequency seed laser produces one longitudinal mode with minimal unwanted spectral components. The internal cavity, gain fiber, and feedback elements are optimized to avoid mode-hopping and maintain single-mode operation, providing a stable source for amplification and precision measurement.",
    },

    {
      type: "features",
      heading: "Applications of the 2.0 µm Single-Frequency Seed Laser",
      bullets: [
        "Gas detection and tunable diode laser absorption spectroscopy (TDLAS) for CO₂, CH₄ and other gases",
        "LIDAR and remote sensing with improved atmospheric transmission",
        "Nonlinear frequency conversion and mid-IR generation",
        "Scientific research in photonics and spectroscopy",
        "Fiber laser pumping and seeding for mid-IR amplifiers",
        "Free-space communication with enhanced eye-safety characteristics",
      ],
    },

    {
      type: "text",
      heading: "Technical Advantages for System Integrators",
      content:
        "This seed laser supports coherent amplifier chains with stable seeding, compact OEM packaging, reliable thermal management (TEC-based), and standard fiber connector compatibility to simplify system integration and reduce development time.",
    },

    {
      type: "features",
      heading: "Design Considerations Before Selection",
      bullets: [
        "Required output power (mW to watt-class options)",
        "Linewidth and coherence length needed by your application",
        "Wavelength tolerance and tuning range for target absorption lines",
        "Mechanical mounting and thermal dissipation constraints",
        "Electrical and control interface requirements",
      ],
    },

    {
      type: "text",
      heading: "Manufacturing Quality and Reliability",
      content:
        "Techwin follows strict fabrication and alignment processes. Each unit is tested for linewidth, frequency stability, power consistency, and environmental tolerance to ensure reliable long-term performance from the Hangzhou City production facility.",
    },

    {
      type: "features",
      heading: "Safety & Operational Guidance",
      bullets: [
        "Use eye protection appropriate for mid-IR wavelengths",
        "Operate within recommended thermal and humidity ranges",
        "Avoid direct or reflected beam exposure",
        "Ensure proper electrical grounding and protections",
      ],
    },

    {
      type: "text",
      heading: "Customization Options",
      content:
        "Available customizations include output power variants, connector types, wavelength tolerance, specialized mounting, and electrical interface options to fit OEM or research system needs.",
    },

    {
      type: "text",
      heading: "Summary",
      content:
        "The 2.0 µm Single-Frequency Seed Laser delivers narrow linewidth, excellent wavelength stability, and integration-friendly packaging—making it a dependable seed source for sensing, research, and mid-IR photonic systems. Contact our team for datasheets, models, and integration support.",
    },
  ],

  relatedProducts: [
    {
      slug: "2um-single",
      title: "1.5 µm Narrow Linewidth Seed Laser",
      shortDescription: "Narrow-linewidth 1.5 µm seed source for sensing and metrology.",
      image: { src: "/seed-lasers/2um-single/", alt: "1.5 µm seed laser" },
      href: "/seed-lasers/2um-single/",
    },
    {
      slug: "2um-single",
      title: "1.0 µm Narrow Linewidth Seed Laser",
      shortDescription: "Stable 1.0 µm seed source for coherent systems and amplifier seeding.",
      image: { src: "/seed-lasers/2um-single/", alt: "1.0 µm seed laser" },
      href: "/seed-lasers/2um-single/",
    },
  ],
};

export default twoMicronSingleFrequencySeedLaser;
