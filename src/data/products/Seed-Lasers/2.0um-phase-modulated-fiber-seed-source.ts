import { Product } from "@/types/categories";

export const twoMicronPhaseModulatedFiberSeedSource: Product = {
  slug: "2um-phase",
  category: "seed-lasers",

  meta: {
    title: "Techwin 2.0 µm Phase-Modulated Fiber Seed Source | Stable Output",
    description:
      "Techwin's 2.0 µm Phase-Modulated Fiber Seed Source provides stable performance and high reliability for advanced systems. Contact +86-13958180450 from Hangzhou City.",
    keywords:
      "2.0 µm phase-modulated seed, phase-modulated fiber seed, 2um seed laser, thulium seed source, Techwin phase modulation",
  },

  title: "2.0 µm Phase-Modulated Fiber Seed Source",
  shortDescription:
    "A phase-modulated 2.0 µm fiber seed source providing stable, low-noise, and phase-controlled output ideal for mid-IR sensing, TDFA chains, spectroscopy, LIDAR, medical and OEM applications.",

  heroImage: { src: "/products/seed-lasers/2um-phase/hero.jpg",
    alt: "2.0 µm Phase-Modulated Fiber Seed Source",
  },

  galleryImages: [
      { src: "/seed-lasers/2um-phase/preview.jpg", alt: "2.0µm phase-modulated fiber seed source preview" },
      { src: "/seed-lasers/2um-phase/hero.jpg", alt: "2.0µm phase-modulated fiber seed source hero" },
    ],

  datasheetUrl: "/products/seed-lasers/2um-phase/datasheet.jpg",
  datasheetImageSrc: "/products/seed-lasers/2um-phase/datasheet.jpg",
  previewImageSrc: "/products/seed-lasers/2um-phase/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 2.0 µm Phase-Modulated Fiber Seed Source",
      image: { src: "/seed-lasers/2um-phase/", alt: "2.0 µm phase-modulated overview" },
      content:
        "The 2.0 µm Phase-Modulated Fiber Seed Source delivers controlled phase modulation with narrow linewidth, stable mid-infrared output, and a clean spectral profile. Built on a fiber-based platform, it is optimized for long-term stability and reliable integration with Thulium-doped amplifier chains and mid-IR sensing systems.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Integrated phase modulation capability with adjustable modulation depth",
        "Narrow and stable single-frequency output",
        "Low phase noise and low RIN for high-fidelity signals",
        "Fiber-based architecture for robust OEM integration",
        "PM fiber output and industry-standard connectors",
        "Compact, thermally-stable package for continuous operation",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Ideal for LIDAR, atmospheric remote sensing, TDFA-driven amplification, molecular spectroscopy, medical fiber-amplified instruments, and laboratory research requiring controlled phase-modulated seed light at ~2.0 µm.",
    },

    {
      type: "features",
      heading: "Benefits of Phase Modulation",
      bullets: [
        "Improved spectral management and linewidth control",
        "Enhanced signal conditioning for downstream amplifiers",
        "Ability to implement frequency shifting and noise suppression techniques",
        "Better coherence control for coherent detection systems",
      ],
    },

    {
      type: "text",
      heading: "Typical Performance Characteristics",
      content:
        "Center wavelength around 2.0 µm, narrow linewidth (model-dependent), stable output power, adjustable phase modulation parameters, and high spectral purity. Exact specifications depend on selected model and configuration.",
    },

    {
      type: "features",
      heading: "System Integration Advantages",
      bullets: [
        "Seamless compatibility with Thulium-doped fiber amplifiers (TDFA)",
        "Compact OEM-friendly form factor",
        "Straightforward fiber-coupled installation",
        "Robust thermal management and long-term reliability",
      ],
    },

    {
      type: "text",
      heading: "Design & Construction",
      content:
        "Precision fiber components, phase modulation element (integrated or external driver), thermal stabilization (TEC), and high-quality control electronics form the backbone of this seed source—ensuring stable modulation accuracy and repeatable spectral output.",
    },

    {
      type: "features",
      heading: "Safety & Operational Notes",
      bullets: [
        "Follow mid-IR safety procedures and use appropriate eyewear",
        "Operate within recommended environmental ranges",
        "Ensure proper grounding and electrical protections",
      ],
    },

    {
      type: "text",
      heading: "Customization & Options",
      content:
        "Custom options include modulation depth/rate, output power classes, connector types, wavelength tolerance tuning, and specialized mounting for OEM deployments. Contact Techwin for model-specific customizations and datasheets.",
    },

    {
      type: "text",
      heading: "Summary",
      content:
        "Techwin’s 2.0 µm Phase-Modulated Fiber Seed Source offers a reliable, phase-controlled mid-IR seed for demanding photonics applications, combining spectral cleanliness, modulation flexibility, and packaging suitable for lab and OEM systems. For datasheets and integration support, contact our team in Hangzhou City.",
    },
  ],

  relatedProducts: [
    {
      slug: "2um-phase",
      title: "2.0 µm Single-Frequency Seed Laser",
      shortDescription: "Stable narrow-linewidth 2.0 µm seed source for mid-IR systems.",
      image: { src: "/seed-lasers/2um-phase/", alt: "2.0 µm single-frequency seed" },
      href: "/seed-lasers/2um-phase/",
    },
    {
      slug: "2um-phase",
      title: "2.0 µm TDFA Integration Kits",
      shortDescription: "Integration-ready modules for Thulium-doped amplifier chains.",
      image: { src: "/seed-lasers/2um-phase/", alt: "TDFA integration kit" },
      href: "/seed-lasers/2um-phase/",
    },
  ],
};

export default twoMicronPhaseModulatedFiberSeedSource;
