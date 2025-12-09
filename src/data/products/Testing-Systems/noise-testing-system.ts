import { Product } from "@/types/categories";

export const noiseTestingSystem: Product = {
  slug: "noise",
  category: "testing",

  meta: {
    title: "Techwin Noise Testing System | Laser RIN & Intensity Noise Measurement",
    description:
      "The Techwin Noise Testing System is engineered for high-precision measurement of laser Relative Intensity Noise (RIN) and intensity noise across multiple bands. With low-noise photodetection, wide dynamic range and advanced spectral analysis, it is ideal for characterizing narrow-linewidth fiber and semiconductor lasers in research and production.",
    keywords:
      "noise testing system, laser RIN measurement, laser noise measurement, intensity noise, narrow-linewidth fiber laser, semiconductor laser, Techwin testing",
  },

  title: "Noise Testing System",

  shortDescription:
    "The Noise Testing System is engineered for high-precision measurement of laser Relative Intensity Noise (RIN), making it suitable for analyzing the noise characteristics of a wide range of light sources, including narrow-linewidth fiber lasers and semiconductor lasers. Equipped with low-noise photodetection, high-resolution spectral analysis, and advanced digital signal processing, the system provides accurate and reliable characterization of laser intensity noise for both scientific research and industrial applications.",
  heroImage: {
    src: "/products/testing/noise/hero.jpg",
    alt: "Noise Testing System",
  },

  galleryImages: [
    {
      src: "/products/testing/noise/hero.jpg",
      alt: "Noise testing system front view",
    },
    {
      src: "/products/testing/noise/hero.jpg",
      alt: "Noise testing system detail view",
    },
  ],

  datasheetUrl: "/products/testing/noise/datasheet.jpg",
  datasheetImageSrc: "/products/testing/noise/datasheet.jpg",
  previewImageSrc: "/products/testing/noise/preview.jpg",

  // NEW: root-level features & application areas (from your content)
  features: [
    "Multi-band compatibility for C-band, 1 µm, 780 nm, 2 µm and visible wavelengths",
    "Wide dynamic range from near the quantum limit (around -160 dB/Hz) up to >10 MHz",
    "High-sensitivity detection with low-noise balanced photodetector and high-linearity amplification",
    "Comprehensive multi-band analysis with baseband FFT and RF spectrum analyzers from DC to GHz range",
    "Enhanced environmental immunity with vibration-resistant design for stable operation",
  ],

  applicationAreas: [
    "Laser RIN and intensity noise characterization",
    "Narrow-linewidth fiber laser testing",
    "Semiconductor laser evaluation",
    "Laser source R&D and production quality assurance",
  ],

  // ⚠️ sections ko tumne bola “phale jaise rahne dena” – isliye unchanged rakhe hain
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

  // NEW: related products – ab “aur show honge”
  relatedProducts: [
    {
      slug: "spectral",
      title: "Spectral Testing System",
      shortDescription:
        "High-resolution spectral testing system for center wavelength, linewidth, OSNR and SMSR evaluation of lasers and light sources.",
      image: {
        src: "/products/testing/spectral/hero.jpg",
        alt: "Spectral Testing System",
      },
      href: "/products/testing/spectral",
    },
  ],
};

export default noiseTestingSystem;
