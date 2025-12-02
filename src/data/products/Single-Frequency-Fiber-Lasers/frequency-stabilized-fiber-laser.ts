import { Product } from "@/types/categories";

export const frequencyStabilizedFiberLaser: Product = {
  slug: "stabilized",
  category: "single-frequency-fiber-lasers",

  meta: {
    title: "Techwin China - Frequency-Stabilized Fiber Laser | All Wavelengths",
    description:
      "Frequency-Stabilized Fiber Laser systems for all wavelengths in Hangzhou City offering stable output and reliability for precision applications. Contact +86-13958180450.",
    keywords:
      "frequency stabilized fiber laser, single-frequency laser, wavelength-stabilized laser, Techwin fiber lasers, narrow linewidth laser",
  },

  title: "Frequency-Stabilized Fiber Laser (All Wavelengths)",
  shortDescription:
    "Frequency-stabilized single-frequency fiber lasers engineered for long-term wavelength stability, ultra-narrow linewidths, and reliable spectral performance across multiple wavelength options.",

  heroImage: { src: "/products/single-frequency/stabilized/hero.jpg",
    alt: "Frequency-stabilized fiber laser",
  },

  galleryImages: [
      { src: "/single-frequency/stabilized/preview.jpg", alt: "Frequency-stabilized fiber laser preview" },
      { src: "/single-frequency/stabilized/hero.jpg", alt: "Frequency-stabilized fiber laser hero" },
    ],

  datasheetUrl: "/products/single-frequency/stabilized/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/stabilized/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/stabilized/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "What Is a Frequency-Stabilized Fiber Laser?",
      image: { src: "/single-frequency/frequency-stabilized-what-is.jpg", alt: "Frequency stabilized explanation" },
      content:
        "A Frequency-Stabilized Fiber Laser is a single-frequency laser stabilized by internal components and feedback mechanisms to maintain a consistent frequency output. These systems minimize wavelength drift from temperature, vibration, or mechanical stress and are ideal for precision measurement, sensing, and scientific research.",
    },

    {
      type: "features",
      heading: "Key Features of Frequency-Stabilized Fiber Lasers",
      bullets: [
        "Single-frequency output with pure spectral performance",
        "Ultra-low linewidth (sub-kHz to Hz-level depending on configuration)",
        "Exceptional long-term frequency stability",
        "Wide wavelength selection (e.g., 1064 nm, 1550 nm, 1310 nm, 780 nm, 1030 nm, custom)",
        "Scalable output power options (mW to watt-level)",
        "Fiber-coupled design for easy integration",
        "Low relative intensity noise (RIN) and low phase noise",
      ],
    },

    {
      type: "text",
      heading: "How Frequency Stabilization Works",
      content:
        "Stabilization combines temperature-controlled cavities, fiber Bragg gratings (FBGs), external or internal reference modules, and fast feedback control electronics. These systems work together to continuously correct frequency deviations and maintain steady performance over long operational cycles.",
    },

    {
      type: "features",
      heading: "Common Stabilization Mechanisms",
      bullets: [
        "Temperature-controlled cavities using TECs",
        "Fiber Bragg Gratings (FBGs) for wavelength selectivity",
        "Reference-based stabilization (atomic lines or optical cavities)",
        "High-speed feedback electronics for rapid correction",
      ],
    },

    {
      type: "text",
      heading: "Applications of Frequency-Stabilized Fiber Lasers",
      content:
        "These lasers are used in spectroscopy, interferometry, precision metrology, coherent communications, optical sensing, LIDAR, and quantum optics. Their stability and spectral purity make them indispensable for long-duration experiments and mission-critical systems.",
    },

    {
      type: "features",
      heading: "Industry Sectors That Benefit",
      bullets: [
        "Aerospace research and navigation systems",
        "Fiber sensing industries (structural health monitoring, pipeline inspection)",
        "Semiconductor inspection and metrology",
        "Telecommunication research and coherent communication",
        "Environmental monitoring and atmospheric research",
        "Medical and biomedical research",
        "Universities and national research labs",
      ],
    },

    {
      type: "text",
      heading: "Technical Considerations When Selecting a Model",
      content:
        "Key selection factors include required wavelength, output power, linewidth specification, output format (PM/SM fiber or free-space), stabilization mechanism, and the expected environmental conditions (temperature, vibration). Choose models and configurations that match measurement precision and integration requirements.",
    },

    {
      type: "features",
      heading: "Quality Control & Manufacturing Standards",
      bullets: [
        "Spectral purity and linewidth verification",
        "Long-hour frequency stability testing",
        "Environmental simulation (temperature/vibration) checks",
        "Output power consistency verification",
        "Linewidth and noise characterization",
      ],
    },

    {
      type: "text",
      heading: "Support, Customization & Ordering",
      content:
        "Techwin offers customization for wavelength selection, output format, power level, and stabilization options. Engineering support, datasheets, and integration guidance are available to tailor systems to specific experimental or industrial needs. Contact our team for detailed specification requests.",
    },

    {
      type: "features",
      heading: "Typical Wavelength Options",
      bullets: [
        "1064 nm",
        "1550 nm",
        "1310 nm",
        "780 nm",
        "1030 nm",
        "Custom wavelengths on request",
      ],
    },

    {
      type: "text",
      heading: "Why Choose Techwin Frequency-Stabilized Systems",
      content:
        "Manufactured in Hangzhou City with strict quality controls, Techwin’s frequency-stabilized lasers deliver dependable performance, long-term stability, and low maintenance. These systems are engineered for researchers and integrators demanding reproducible, high-precision optical sources.",
    },
  ],

  relatedProducts: [
    {
      slug: "stabilized",
      title: "1.0 µm Single-Frequency Fiber Laser",
      shortDescription: "High-stability 1.0 µm single-frequency laser for metrology and sensing.",
      image: { src: "/single-frequency/1um-hero.jpg", alt: "1.0 µm laser" },
      href: "/single-frequency/stabilized/",
    },
    {
      slug: "stabilized",
      title: "1.5 µm Single-Frequency Fiber Laser",
      shortDescription: "Stable 1550 nm single-frequency performance for LIDAR and telecom research.",
      image: { src: "/single-frequency/1-5um-hero.jpg", alt: "1.5 µm laser" },
      href: "/single-frequency/stabilized/",
    },
  ],
};

export default frequencyStabilizedFiberLaser;
