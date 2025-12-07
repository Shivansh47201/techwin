import { Product } from "@/types/categories";

export const onePointFiveMicronPhaseModulatedSeedLaser: Product = {
  slug: "1-5um-phase-modulated",
  category: "seed-lasers",

  meta: {
    title: "1.5 µm Phase-Modulated Seed Laser | Techwin Quantum & Sensing Source",
    description:
      "Techwin 1.5 µm Phase-Modulated Seed Laser with tunable phase, ultra-low phase noise, and high power stability. Ideal for optical quantum communication, DAS, LiDAR, and femtosecond micromachining.",
    keywords:
      "1.5 µm phase-modulated seed laser, phase controlled seed laser, low phase noise 1550nm laser, quantum communication laser, DAS LiDAR seed source",
  },

  title: "1.5 µm Phase-Modulated Seed Laser",

  shortDescription:
    "The 1.5 µm phase-modulated fiber seed laser is engineered for applications requiring precise and adjustable phase control. With tunable phase capability, ultra-low phase noise, high power stability, and a fully polarization-maintaining architecture, it offers outstanding anti-interference performance for advanced quantum and high-precision sensing systems.",

  /** IMAGES */
  heroImage: {
    src: "/products/seed-lasers/1-5um-phase/hero.jpg",
    alt: "1.5 µm Phase-Modulated Seed Laser",
  },

  galleryImages: [
    {
      src: "/products/seed-lasers/1-5um-phase/hero.jpg",
      alt: "1.5 µm phase-modulated seed laser hero",
    },
    {
      src: "/products/seed-lasers/1-5um-phase/hero.jpg",
      alt: "1.5 µm phase-modulated seed laser hero",
    },
  ],

  datasheetUrl: "/products/seed-lasers/1-5um-phase/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/1-5um-phase/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/1-5um-phase/preview.jpg",

  /** TABLE + GRAPH */
  tableCsvUrl: "/products/seed-lasers/1-5um-phase/specs.csv",
  graphImageURL: "/products/seed-lasers/1-5um-phase/graph.jpg",
  tableImageURL: "/products/seed-lasers/1-5um-phase/table.png",

  /** TOP-LEVEL FEATURES & APPLICATION AREAS (from your text) */
  features: [
    "Tunable phase for precise and adjustable phase control in advanced optical systems.",
    "Ultra-low phase noise for high-fidelity coherent detection and quantum measurements.",
    "High power stability to ensure consistent system performance over long operating times.",
    "Fully polarization-maintaining optical path for superior anti-interference performance.",
  ],

  applicationAreas: [
    "Optical quantum communication",
    "Distributed acoustic sensing (DAS)",
    "LiDAR and coherent ranging systems",
    "Femtosecond micromachining",
  ],

  /** SECTIONS */
  sections: [
    {
      type: "text",
      heading: "Overview of the 1.5 µm Phase-Modulated Seed Laser",
      image: {
        src: "/products/seed-lasers/1-5um-phase-modulated/overview.jpg",
        alt: "1.5 µm phase-modulated seed laser overview",
      },
      content:
        "The 1.5 µm Phase-Modulated Seed Laser is designed for systems that demand precise phase control, ultra-low phase noise, and high power stability. With a fully polarization-maintaining architecture and robust phase modulation capability, it is ideally suited for quantum communication links, distributed acoustic sensing, LiDAR, and ultrafast micromachining platforms.",
    },

    {
      type: "features",
      heading: "Key Phase Modulation Advantages",
      bullets: [
        "Fine and stable phase control across a wide operating range",
        "Ultra-low phase noise for high-coherence interferometric systems",
        "Excellent suppression of phase jitter and timing instability",
        "Compatible with advanced modulation formats and coherent detection schemes",
      ],
    },

    {
      type: "text",
      heading: "Polarization-Maintaining Architecture",
      content:
        "A fully polarization-maintaining (PM) optical path ensures that the output polarization state is stable and predictable over time. This significantly enhances system robustness in quantum key distribution, coherent detection, and distributed sensing applications where polarization fluctuations can degrade performance.",
    },

    {
      type: "features",
      heading: "Typical Technical Specifications (Platform Level)",
      bullets: [
        "Wavelength: centered around 1.5 µm (1550 nm region)",
        "Phase Modulation: tunable with high linearity and stability",
        "Phase Noise: ultra-low, optimized for coherent and quantum applications",
        "Output Power: configurable mW-level options",
        "Polarization: fully polarization-maintaining output fiber",
        "Form Factor: compact module or benchtop configuration",
      ],
    },

    {
      type: "features",
      heading: "Typical Applications",
      bullets: [
        "Optical quantum communication links and quantum key distribution (QKD)",
        "Distributed acoustic sensing (DAS) for perimeter and infrastructure monitoring",
        "Coherent LiDAR and Doppler/range-resolved detection",
        "Femtosecond micromachining and precision material processing front-end seeding",
        "Advanced photonics and quantum optics research platforms",
      ],
    },

    {
      type: "text",
      heading: "System Integration and Control",
      content:
        "The laser can be integrated with external controllers, phase drivers and digital signal processing units. Standard electrical and communication interfaces simplify the implementation of closed-loop phase control, synchronization with external clocks and integration into complex experimental setups.",
    },

    {
      type: "text",
      heading: "Support and Customization",
      content:
        "Techwin offers customization options for wavelength, phase modulation range, output power, and interface formats. Engineering support, reference designs, and application notes are available to help users integrate the 1.5 µm phase-modulated seed laser into quantum, sensing and LiDAR platforms with confidence.",
    },
  ],

  /** RELATED PRODUCTS WITH IMAGES */
  relatedProducts: [
    {
      slug: "1-5um-narrow",
      title: "1.5 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "1.5 µm ultra-narrow linewidth seed laser with 100 Hz-level linewidth and excellent environmental adaptability.",
      image: {
        src: "/products/seed-lasers/1-5um-narrow/hero.jpg",
        alt: "1.5 µm Narrow Linewidth Seed Laser",
      },
      href: "/products/seed-lasers/1-5um-narrow",
    },
    {
      slug: "1um-narrow",
      title: "1.0 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "1.0 µm ultra-narrow linewidth seed laser for precision sensing and coherent systems.",
      image: {
        src: "/products/seed-lasers/1um-narrow/hero.jpg",
        alt: "1.0 µm Narrow Linewidth Seed Laser",
      },
      href: "/products/seed-lasers/1um-narrow",
    },
    {
      slug: "1um-stabilized",
      title: "1.0 µm Frequency-Stabilized Seed Laser",
      shortDescription:
        "Frequency-stabilized 1.0 µm seed laser with narrow linewidth and minimal frequency drift.",
      image: {
        src: "/products/seed-lasers/1um-stabilized/hero.jpg",
        alt: "1.0 µm Frequency-Stabilized Seed Laser",
      },
      href: "/products/seed-lasers/1um-stabilized",
    },
    {
      slug: "1-0um-ultra-low-noise-seed-laser",
      title: "1.0 µm Ultra-Low Noise Seed Laser",
      shortDescription:
        "1.0 µm ultra-low noise seed laser with exceptional power stability and low RIN.",
      image: {
        src: "/products/seed-lasers/1um-ultra-low-noise/hero.jpg",
        alt: "1.0 µm Ultra-Low Noise Seed Laser",
      },
      href: "/products/seed-lasers/1um-ultra-low-noise",
    },
    {
      slug: "2um-single-frequency",
      title: "2.0 µm Single-Frequency Seed Laser",
      shortDescription:
        "2.0 µm single-frequency seed laser for quantum information, LiDAR, and spectroscopy.",
      image: {
        src: "/products/seed-lasers/2um-phase/hero.jpg",
        alt: "2.0 µm Single-Frequency Seed Laser",
      },
      href: "/products/seed-lasers/2um-phase",
    },
    {
      slug: "2um-phase-modulated",
      title: "2.0 µm Phase-Modulated Fiber Seed Source",
      shortDescription:
        "2.0 µm phase-modulated fiber seed source with mid-IR output and advanced phase control.",
      image: {
        src: "/products/seed-lasers/2um-single/hero.jpg",
        alt: "2.0 µm Phase-Modulated Fiber Seed Source",
      },
      href: "/products/seed-lasers/2um-single",
    },
  ],
};

export default onePointFiveMicronPhaseModulatedSeedLaser;
