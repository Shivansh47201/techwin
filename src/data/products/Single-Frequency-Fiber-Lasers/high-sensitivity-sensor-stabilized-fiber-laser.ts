import { Product } from "@/types/categories";

export const highSensitivitySensorStabilizedFiberLaser: Product = {
  slug: "sensor-stabilized",
  category: "single-frequency-fiber-lasers",
  tableCsvUrl:
    "https://docs.google.com/spreadsheets/d/1dray0_tpQpYOvnh-88lwq-Ejo1bUlKtECY9qyasZS4o/export?format=csv&gid=105283573",

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

  heroImage: {
    src: "/products/single-frequency/sensor-stabilized/hero.jpg",
    alt: "High-Sensitivity Sensor-Stabilized Fiber Laser",
  },
  graphImageURL: "/products/single-frequency/sensor-stabilized/graph.jpg",
  tableImageURL: "/products/single-frequency/sensor-stabilized/table.png",

  features: [
    "High-precision sensor-based stabilization",
    "Ultra-low drift and enhanced long-term stability",
    "Low noise and high spectral purity",
  ],

  applicationAreas: [
    "Precision sensing and detection",
    "High-resolution spectroscopy",
    "Optical metrology and interferometry",
    "Scientific research and laboratory applications",
  ],

  galleryImages: [
    {
      src: "/products/single-frequency/sensor-stabilized/hero.jpg",
      alt: "High-sensitivity sensor-stabilized fiber laser preview",
    },
    {
      src: "/products/single-frequency/sensor-stabilized/hero.jpg",
      alt: "High-sensitivity sensor-stabilized fiber laser hero",
    },
  ],

  datasheetUrl: "/products/single-frequency/sensor-stabilized/datasheet.jpg",
  datasheetImageSrc:
    "/products/single-frequency/sensor-stabilized/datasheet.jpg",
  previewImageSrc:
    "/products/single-frequency/sensor-stabilized/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "What Is a High-Sensitivity Sensor-Stabilized Fiber Laser?",
      image: {
        src: "/products/single-frequency/sensor-stabilized/what-is.jpg",
        alt: "Sensor stabilized explanation",
      },
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
      image: {
        src: "/products/single-frequency/sensor-stabilized/features.jpg",
        alt: "Key Features",
      },
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
            {
              name: "Control",
              value: "Precision control unit with real-time feedback",
            },
            {
              name: "Interfaces",
              value: "Remote control (Ethernet/Serial) and local UI",
            },
            {
              name: "Environmental Compensation",
              value: "Active thermal control & vibration mitigation",
            },
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

  /** -----------------------------------
   *  UPDATED COMPLETE RELATED PRODUCTS
   * ----------------------------------- */
  relatedProducts: [
    {
      slug: "ultra-narrow-linewidth",
      title: "Hz-Level Ultra-Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription: "Hz-level laser for ultra-high stability and precision.",
      image: {
        src: "/products/single-frequency/ultra-narrow-linewidth/hero.jpg",
        alt: "Ultra Narrow Linewidth Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/ultra-narrow-linewidth",
    },
    {
      slug: "broadband-low-noise",
      title: "Broadband Ultra-Low Noise Single-Frequency Fiber Laser",
      shortDescription:
        "Ultra-low noise broadband source for sensing, metrology and spectroscopy.",
      image: {
        src: "/products/single-frequency/broadband-low-noise/hero.jpg",
        alt: "Broadband Ultra-Low Noise Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/broadband-low-noise",
    },
    {
      slug: "narrow-linewidth",
      title: "Narrow Linewidth Single-Frequency Fiber Laser",
      shortDescription:
        "Stable narrow-linewidth fiber laser for coherent optical detection.",
      image: {
        src: "/products/single-frequency/narrow-linewidth/hero.jpg",
        alt: "Narrow Linewidth Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/narrow-linewidth",
    },
    {
      slug: "magnetic-field",
      title: "Magnetic Field Detection Laser",
      shortDescription:
        "Laser specialized for optical magnetic field measurement applications.",
      image: {
        src: "/products/single-frequency/magnetic-field/hero.jpg",
        alt: "Magnetic Field Detection Laser",
      },
      href: "/products/single-frequency-fiber-lasers/magnetic-field",
    },
    {
      slug: "1um",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription:
        "1.0 µm laser platform for sensing, interferometry and coherent detection.",
      image: {
        src: "/products/single-frequency/1um/hero.jpg",
        alt: "1.0 µm Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/1um",
    },
    {
      slug: "1-5um",
      title: "1.5 µm Single-Frequency Fiber Laser",
      shortDescription:
        "1.5 µm laser for metrology, telecom, spectroscopy and remote sensing.",
      image: {
        src: "/products/single-frequency/1-5um/hero.jpg",
        alt: "1.5 µm Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/1-5um",
    },
    {
      slug: "2um",
      title: "2.0 µm Single-Frequency Fiber Laser",
      shortDescription:
        "2.0 µm wavelength laser for mid-IR sensing and scientific measurements.",
      image: {
        src: "/products/single-frequency/2um/hero.jpg",
        alt: "2 µm Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/2um",
    },
    {
      slug: "stabilized",
      title: "Frequency-Stabilized Fiber Laser (All Wavelengths)",
      shortDescription:
        "Frequency-locked laser platform for coherent, spectroscopic and quantum systems.",
      image: {
        src: "/products/single-frequency/stabilized/hero.jpg",
        alt: "Frequency-Stabilized Fiber Laser",
      },
      href: "/products/single-frequency-fiber-lasers/stabilized",
    },
    {
      slug: "ultra-low-noise",
      title: "Ultra-Low Noise Fiber Laser Series",
      shortDescription:
        "Low-noise fiber laser series for demanding metrology, calibration and sensing.",
      image: {
        src: "/products/single-frequency/ultra-low-noise/hero.jpg",
        alt: "Ultra-Low Noise Fiber Laser Series",
      },
      href: "/products/single-frequency-fiber-lasers/ultra-low-noise",
    },
  ],

  published: true,
  featured: false,
};

export default highSensitivitySensorStabilizedFiberLaser;
