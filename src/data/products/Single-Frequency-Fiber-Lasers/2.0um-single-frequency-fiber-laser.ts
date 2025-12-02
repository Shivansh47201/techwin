import { Product } from "@/types/categories";

export const twoMicronSingleFrequencyFiberLaser: Product = {
  slug: "2um",
  category: "single-frequency-fiber-lasers",

  meta: {
    title: "2.0 µm Single-Frequency Fiber Laser | High Stability Systems | Techwin",
    description:
      "High-stability 2.0 µm Single-Frequency Fiber Laser systems for sensing, research and precise measurement applications. Contact Techwin in Hangzhou City at +86-13958180450.",
    keywords:
      "2.0 µm fiber laser, mid-IR single-frequency laser, 2000 nm fiber laser, narrow linewidth 2um laser, Techwin fiber laser",
  },

  title: "2.0 µm Single-Frequency Fiber Laser",
  shortDescription:
    "A high-stability 2.0 µm Single-Frequency Fiber Laser engineered for gas sensing, LIDAR, spectroscopy, medical research, atmospheric monitoring and long-term precision applications.",

  heroImage: { src: "/products/single-frequency/2um/hero.jpg",
    alt: "2.0 µm Single-Frequency Fiber Laser",
  },

  galleryImages: [
      { src: "/products/single-frequency/2um/preview.jpg", alt: "2.0µm single-frequency fiber laser preview" },
      { src: "/products/single-frequency/2um/hero.jpg", alt: "2.0µm single-frequency fiber laser hero" },
    ],

  datasheetUrl: "/products/single-frequency/2um/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/2um/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/2um/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 2.0 µm Wavelength Band",
      image: {
        src: "/single-frequency/2um-overview.jpg",
        alt: "2.0 µm wavelength overview",
      },
      content:
        "The 2.0 µm wavelength band is used in material processing, free-space communication, atmospheric sensing, and medical research due to its mid-infrared compatibility. Techwin’s 2.0 µm fiber laser delivers narrow and stable spectral output that remains reliable across varying environmental conditions.",
    },

    {
      type: "features",
      heading: "Key Features of 2.0 µm Single-Frequency Fiber Laser Systems",
      bullets: [
        "Ultra-narrow optical linewidth for precision applications",
        "Stable single-frequency output with minimal drift",
        "High signal-to-noise ratio for accurate data acquisition",
        "Mid-infrared compatibility for gas sensing and spectroscopy",
        "Compact fiber-based structure with long operational life",
        "Strong resistance to vibration and temperature variations",
      ],
    },

    {
      type: "text",
      heading: "Why Choose This Wavelength Category",
      content:
        "The 2.0 µm band offers excellent atmospheric transmission, compatibility with mid-infrared optical components, and safe interaction with certain materials. It is ideal for long-term operation, high precision, and applications requiring long coherence length and stable frequency output.",
    },

    {
      type: "features",
      heading: "Technical Performance Overview",
      bullets: [
        "Multiple output power configurations (mW to watt-level options)",
        "Ultra-narrow linewidth for spectroscopy and interferometry",
        "Long coherence length and frequency-locking options",
        "Advanced thermal control mechanisms for stability",
        "Energy-efficient architecture with low power consumption",
      ],
    },

    {
      type: "text",
      heading: "Applications of 2.0 µm Single-Frequency Fiber Laser Systems",
      content:
        "These systems support advanced gas sensing, LIDAR, spectroscopy, medical research, environmental monitoring, free-space communication, and scientific instrumentation. The stable wavelength and long-term reliability make the 2.0 µm range ideal for laboratory and industrial use.",
    },

    {
      type: "features",
      heading: "Internal Construction & Design",
      bullets: [
        "Specialized gain fiber for efficient 2.0 µm amplification",
        "Precision fiber Bragg gratings for frequency stability",
        "Advanced thermal management to reduce wavelength drift",
        "Integrated digital control electronics",
        "Durable housing designed for vibration resistance",
      ],
    },

    {
      type: "text",
      heading: "Advantages for System Integration",
      content:
        "The 2.0 µm series supports plug-and-play integration, compact OEM modules, stable output in dynamic environments, and compatibility with sensing platforms, communication systems, and lab instruments.",
    },

    {
      type: "text",
      heading: "Comparison with Other Wavelengths",
      content:
        "Compared to 1.0 µm and 1.5 µm systems, the 2.0 µm band provides lower scattering, safer interaction with select materials, improved absorption characteristics for certain gases, and broader environmental sensing capabilities.",
    },

    {
      type: "text",
      heading: "Quality, Testing, and Reliability",
      content:
        "Every system undergoes stringent testing, including linewidth verification, frequency stability analysis, power consistency measurement, environmental simulation tests, and extended reliability evaluations to ensure optimal performance.",
    },

    {
      type: "features",
      heading: "Support and Customization",
      bullets: [
        "Custom output power options",
        "OEM module configurations",
        "Wavelength locking solutions",
        "Custom connectors and fiber types",
        "Application-specific tuning",
      ],
    },

    {
      type: "text",
      heading: "Summary",
      content:
        "Techwin’s 2.0 µm Single-Frequency Fiber Laser is a dependable solution for research institutions, laboratories, and integrators requiring narrow linewidth, long-term stability, and mid-infrared compatibility. For detailed specifications or engineering support, contact our team.",
    },
  ],

  relatedProducts: [
    {
      slug: "2um",
      title: "1.5 µm Single-Frequency Fiber Laser",
      shortDescription: "Stable 1550 nm single-frequency performance for sensing and telecom applications.",
      image: {
        src: "/single-frequency/1-5um-hero.jpg",
        alt: "1.5 µm Single-Frequency Laser",
      },
      href: "/single-frequency/2um/",
    },
    {
      slug: "2um",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription: "High-stability 1.0 µm wavelength for metrology and coherent applications.",
      image: {
        src: "/single-frequency/1um-hero.jpg",
        alt: "1.0 µm Single-Frequency Fiber Laser",
      },
      href: "/single-frequency/2um/",
    },
  ],
};

export default twoMicronSingleFrequencyFiberLaser;
