import { Product } from "@/types/categories";

export const highSensitivitySensorStabilizedFiberLaser: Product = {
  slug: "sensor-stabilized",
  category: "single-frequency-fiber-lasers",
  meta: {
    title: "Techwin China High-Sensitivity Sensor Stabilized Fiber Laser System",
    description:
      "High-Sensitivity Sensor-Stabilized Laser by Techwin for accurate optical sensing, stable output, and low noise performance. Contact +86-13958180450. Based in Hangzhou City.",
    keywords:
      "sensor-stabilized fiber laser, high-sensitivity fiber laser, low noise fiber laser, stable single-frequency laser, distributed sensing laser",
  },
  title: "High-Sensitivity Sensor-Stabilized Fiber Laser",
  shortDescription:
    "A High-Sensitivity Sensor-Stabilized Fiber Laser engineered for outstanding frequency stability, precise wavelength control, and low-noise optical output — ideal for demanding scientific and industrial sensing applications.",
  heroImage: { src: "/products/single-frequency/sensor-stabilized/hero.jpg",
    alt: "High-Sensitivity Sensor-Stabilized Fiber Laser",
  },
  galleryImages: [
      { src: "/single-frequency/sensor-stabilized/preview.jpg", alt: "High-sensitivity sensor-stabilized fiber laser preview" },
      { src: "/single-frequency/sensor-stabilized/hero.jpg", alt: "High-sensitivity sensor-stabilized fiber laser hero" },
    ],
  datasheetUrl: "/products/single-frequency/sensor-stabilized/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/sensor-stabilized/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/sensor-stabilized/preview.jpg",
  sections: [
    {
      type: "text",
      heading: "What Is a High-Sensitivity Sensor-Stabilized Fiber Laser?",
      image: { src: "/single-frequency/sensor-stabilized-what-is.jpg", alt: "Sensor stabilized explanation" },
      content:
        "A High-Sensitivity Sensor-Stabilized Laser integrates real-time feedback sensors into the laser cavity to monitor and correct fluctuations from temperature changes, vibration, or other disturbances. The internal compensation preserves narrow linewidth and exceptional frequency stability, ensuring consistent spectral purity for precision optical measurements.",
    },

    {
      type: "features",
      heading: "Why Choose a Sensor-Stabilized Fiber Laser System?",
      bullets: [
        "Reduced frequency drift and long-term wavelength stability",
        "Controlled wavelength variation with integrated feedback",
        "High signal purity and low phase noise",
        "Reliable operation in vibration-prone or mobile environments",
        "Custom wavelength options to match different sensing platforms",
        "Designed for continuous 24/7 operation with minimal maintenance",
      ],
      image: { src: "/single-frequency/sensor-stabilized-features.jpg", alt: "Key features" },
    },

    {
      type: "text",
      heading: "How the Stabilization Works",
      content:
        "Embedded sensors continuously measure cavity conditions (temperature, vibration, pressure). A precision control unit processes these signals and applies rapid corrections (thermal control, cavity-length adjustments), preserving stable output even under changing environments.",
    },

    {
      type: "specs",
      heading: "Technical Specifications",
      blocks: [
        {
          label: "Control & Interface",
          rows: [
            { name: "Control", value: "Precision control unit with real-time feedback" },
            { name: "Interfaces", value: "Remote control (Ethernet/Serial) and local UI" },
            { name: "Environmental Compensation", value: "Active thermal control & vibration mitigation" },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Distributed Sensing & Typical Applications",
      content:
        "This laser excels in distributed fiber sensing and long-distance measurement systems where signal integrity across kilometers is critical. Typical uses include power-grid fault detection, pipeline and structural monitoring, perimeter security, geological strain sensing, and precision metrology.",
    },

    {
      type: "features",
      heading: "Advantages for Long-Distance Sensing Networks",
      bullets: [
        "Reduced data errors and improved spatial resolution",
        "Better temperature and strain readouts across long fiber spans",
        "Lower system maintenance and higher uptime",
        "Enhanced confidence in monitoring and diagnostic systems",
      ],
    },

    {
      type: "text",
      heading: "Installation & Integration",
      content:
        "The compact module supports simple electrical interfaces, modular fiber connections, easy temperature regulation, and straightforward data integration so it can be added to existing sensing systems with minimal changes.",
    },
  ],

  relatedProducts: [
    {
      slug: "sensor-stabilized",
      title: "Hz-Level Ultra-Narrow Linewidth Fiber Laser",
      shortDescription: "Hz-level ultra-narrow linewidth single-frequency fiber laser.",
      image: { src: "/single-frequency/ultra-narrow-linewidth.jpg", alt: "Ultra narrow linewidth" },
      href: "/single-frequency/sensor-stabilized/",
    },
    {
      slug: "sensor-stabilized",
      title: "Broadband Ultra-Low Noise Fiber Laser",
      shortDescription: "Broadband fiber laser with ultra-low noise performance.",
      image: { src: "/single-frequency/broadband-ultra-low-noise-hero.jpg", alt: "Broadband ultra low noise" },
      href: "/single-frequency/sensor-stabilized/",
    },
    {
      slug: "sensor-stabilized",
      title: "Narrow Linewidth Fiber Laser",
      shortDescription: "Stable, kHz-level narrow linewidth fiber laser.",
      image: { src: "/single-frequency/narrow-linewidth-hero.jpg", alt: "Narrow linewidth" },
      href: "/single-frequency/sensor-stabilized/",
    },
  ],

  // optional flags you can use for drafts/publishing
  published: true,
  featured: false,
};

export default highSensitivitySensorStabilizedFiberLaser;
