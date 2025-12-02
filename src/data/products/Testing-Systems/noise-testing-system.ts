import { Product } from "@/types/categories";

export const noiseTestingSystem: Product = {
  slug: "noise",
  category: "testing",

  meta: {
    title: "Noise Testing System | Techwin Laser Measurement Solutions",
    description:
      "Techwin Noise Testing System for precision laser characterization. Advanced measurement for phase noise, intensity noise and spectral analysis. Based in Hangzhou City. Call +86-13958180450.",
    keywords: "noise testing, laser noise measurement, phase noise, intensity noise, laser characterization, Techwin testing",
  },

  title: "Noise Testing System",
  shortDescription:
    "Comprehensive noise measurement system engineered for laser characterization with precision phase noise, intensity noise, and spectral analysis capabilities for R&D and production QA.",

  heroImage: { src: "/products/testing/noise/hero.jpg", alt: "Noise Testing System" },

  galleryImages: [
    { src: "/products/testing/noise/preview.jpg", alt: "Noise testing system preview" },
    { src: "/products/testing/noise/hero.jpg", alt: "Noise testing system hero" },
  ],

  datasheetUrl: "/products/testing/noise/datasheet.jpg",
  datasheetImageSrc: "/products/testing/noise/datasheet.jpg",
  previewImageSrc: "/products/testing/noise/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of Noise Testing Systems",
      content:
        "Noise Testing Systems provide precise measurement of laser noise characteristics including phase noise, intensity noise, and spectral distribution. These systems are essential for verifying laser performance, characterizing narrow-linewidth sources, and ensuring quality standards in production environments.",
    },

    {
      type: "features",
      heading: "Key Measurement Capabilities",
      bullets: [
        "Phase noise measurement (SSB and DSB modes)",
        "Intensity noise (RIN) measurement across frequency bands",
        "Spectral analysis and linewidth characterization",
        "Real-time data acquisition and analysis",
        "Multiple detector and frequency range options",
        "Automated test protocols for production use",
        "Statistical analysis and trend reporting",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Ideal for verifying single-frequency fiber lasers, seed laser systems, optical communication sources, metrology instruments, and precision sensing systems where noise performance is critical to application success.",
    },
  ],

  relatedProducts: [],
};

export default noiseTestingSystem;
