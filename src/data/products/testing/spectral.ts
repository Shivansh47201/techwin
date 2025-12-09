import { Product } from "@/types/categories";

export const spectralTesting: Product = {
  slug: "spectral",
  category: "testing",

  meta: {
    title: "Spectral Testing System | High-Resolution Laser Spectrum Measurement",
    description:
      "Techwin Spectral Testing System provides precise spectral measurement and analysis for laser center wavelength, linewidth, OSNR, SMSR, and spectral stability. Ideal for R&D, fiber sensing, QC testing, and industrial photonics environments.",
    keywords:
      "spectral testing system, wavelength analyzer, linewidth measurement, OSNR analysis, SMSR testing, spectral stability, laser spectrum, Techwin testing",
  },

  title: "Spectral Testing System",

  shortDescription:
    "The Spectral Testing System is designed for precise and comprehensive analysis of laser and light source spectral characteristics. With high-resolution optical spectrum measurement capability, it enables accurate evaluation of key parameters such as center wavelength, linewidth, optical signal-to-noise ratio (OSNR), side-mode suppression ratio (SMSR), and spectral stability. The system integrates advanced spectrometer technology, stable optical path design, and intelligent data processing, ensuring reliable measurements for both laboratory research and industrial testing.",

  heroImage: {
    src: "/products/testing/spectral/hero.jpg",
    alt: "Spectral Testing System",
  },

  galleryImages: [
    {
      src: "/products/testing/spectral/hero.jpg",
      alt: "Spectral testing system front view",
    },
    {
      src: "/products/testing/spectral/hero.jpg",
      alt: "Spectral testing system device view",
    },
  ],

  datasheetUrl: "/products/testing/spectral/datasheet.jpg",
  datasheetImageSrc: "/products/testing/spectral/datasheet.jpg",
  previewImageSrc: "/products/testing/spectral/preview.jpg",

  // ⭐ ROOT-LEVEL FEATURES (from your text)
  features: [
    "High-resolution spectral measurement across multiple wavelength bands",
    "Wide spectral range: visible, near-IR, and mid-IR compatibility",
    "High optical dynamic range for OSNR, SMSR and weak side-mode measurement",
    "Stable and reliable performance with optimized optical path design",
    "Intelligent real-time data processing and automated report generation",
    "Flexible integration with external optical modules and custom system configurations",
  ],

  // ⭐ ROOT-LEVEL APPLICATION AREAS (from your text)
  applicationAreas: [
    "Laser R&D and manufacturing",
    "Optical communication testing",
    "Spectroscopy research",
    "Wavelength stability monitoring",
    "Fiber sensing system development",
  ],

  // ⭐ YOUR SECTIONS — **UNCHANGED EXACTLY AS REQUESTED**
  sections: [
    {
      type: "text",
      heading: "Overview of Spectral Testing Systems",
      content:
        "Spectral Testing Systems provide precise characterization of wavelength, linewidth, spectral purity, and drift for narrowband, broadband, CW, or pulsed lasers. Used in research labs, manufacturing lines, and optical integration platforms, it ensures the stability and accuracy of laser and photonic systems.",
    },

    {
      type: "features",
      heading: "Key Measurement Capabilities",
      bullets: [
        "High-accuracy wavelength measurement for narrowband and broadband lasers",
        "Linewidth analysis for single-frequency and precision laser sources",
        "Spectral purity monitoring including side-mode and noise evaluation",
        "Long-term frequency drift tracking",
        "Thermally stabilized internal architecture for measurement consistency",
        "Real-time spectral visualization software with automated reporting",
        "Wide compatibility with fiber lasers, diode lasers, CW and pulsed sources",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Ideal for optical R&D, fiber laser production, DWDM component evaluation, metrology tasks, environmental detection systems, lidar development, and quality-control in narrowband laser manufacturing.",
    },

    {
      type: "text",
      heading: "Selection Guide",
      content:
        "Select based on wavelength range, resolution, dynamic range, software integration needs, power compatibility, and environmental stability requirements. Models are available for telecom band, infrared, or custom wavelength ranges.",
    },

    {
      type: "text",
      heading: "Integration",
      content:
        "Easily integrates with laser benches, automated inspection systems, R&D platforms, and fiber-based test setups. USB/Ethernet interfaces support real-time monitoring, long-term logging, and automated analysis workflows.",
    },

    {
      type: "text",
      heading: "Ordering & Support",
      content:
        "To request specifications, pricing, or OEM customization, contact +86-13958180450. Techwin provides full documentation, software support, and engineering assistance from Hangzhou City.",
    },
  ],

  // ⭐ RELATED PRODUCTS – NOW SHOWS
  relatedProducts: [
    {
      slug: "noise",
      title: "Noise Testing System",
      shortDescription:
        "High-precision laser RIN and intensity noise characterization system for narrow-linewidth lasers and semiconductor sources.",
      image: {
        src: "/products/testing/noise/hero.jpg",
        alt: "Noise Testing System",
      },
      href: "/products/testing/noise",
    },
  ],
};

export default spectralTesting;
