import { Product } from "@/types/categories";

export const aseLightSource2um: Product = {
  slug: "2um",
  category: "ase-sources",

  meta: {
    title: "ASE Light Source (2.0 µm) | Techwin Broadband 2.0 µm ASE Unit Pro",
    description:
      "Techwin ASE Light Source (2.0 µm) for sensing, component testing, and mid-IR research. Stable broadband output from Hangzhou City. For support Call +86-13958180450.",
    keywords:
      "2.0 µm ASE, mid-IR ASE source, thulium ASE, holmium ASE, broadband mid-IR source, Techwin ASE",
  },

  title: "ASE Light Source (2.0 µm)",
  shortDescription:
    "Mid-IR ASE light source centered around 2.0 µm — stable broadband output for sensing, component testing, spectroscopy and mid-IR research.",

  heroImage: { src: "/products/ase-sources/2um/hero.jpg",
    alt: "ASE Light Source 2.0 µm Hero Image",
  },

  galleryImages: [
      { src: "/ase-sources/2um/preview.jpg", alt: "ASE light source 2.0µm preview" },
      { src: "/ase-sources/2um/hero.jpg", alt: "ASE light source 2.0µm hero" },
    ],

  datasheetUrl: "/products/ase-sources/2um/datasheet.jpg",
  datasheetImageSrc: "/products/ase-sources/2um/datasheet.jpg",
  previewImageSrc: "/products/ase-sources/2um/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview — ASE Light Source (2.0 µm)",
      image: {
        src: "/ase-sources/ase-light-source-2um/overview.jpg",
        alt: "Overview ASE 2.0 µm",
      },
      content:
        "The ASE Light Source (2.0 µm) is a mid-infrared broadband source built on thulium/holmium-doped fiber technology. It delivers stable, low-ripple broadband emission around 2.0 µm suited for gas absorption studies, mid-IR component testing, spectroscopy, and OEM/mid-IR system development.",
    },

    {
      type: "features",
      heading: "Key Characteristics",
      bullets: [
        "Broadband emission centered near 2.0 µm (model dependent)",
        "Low spectral ripple and stable long-term output",
        "Thulium/holmium doped fiber architecture",
        "PM and non-PM fiber pigtail options",
        "Compact module form factor — rack or bench integration",
        "Temperature-regulated packaging for repeatable performance",
      ],
    },

    {
      type: "text",
      heading: "Why Mid-IR ASE Matters",
      content:
        "Mid-IR ASE sources provide smooth, low-coherence spectra ideal for evaluating mid-IR components, measuring gas absorption features (e.g., CO₂ related lines), benchmarking detectors, and validating coatings or filters without coherence-induced artifacts.",
    },

    {
      type: "specs",
      heading: "Typical Performance & Options",
      blocks: [
        {
          label: "Performance",
          rows: [
            { name: "Output Power", value: "Configurable per model / application" },
            { name: "Stability", value: "Engineered for low drift over long cycles" },
            { name: "Form Factor", value: "Module or benchtop" },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Common uses include mid-IR fiber component characterization, gas absorption and atmospheric studies, mid-IR spectroscopy platforms, detector validation, OEM calibration workflows, and laboratory research where broadband mid-IR coverage is required.",
    },

    {
      type: "features",
      heading: "Integration & Operational Advantages",
      bullets: [
        "Simple integration via standard fiber connectors",
        "Stable spectral power reduces measurement uncertainty",
        "Compact, thermally-managed module suitable for lab & OEM use",
        "Optional configurable power and fiber types to match system needs",
      ],
    },

    {
      type: "text",
      heading: "Selection Considerations",
      content:
        "When choosing a 2.0 µm ASE module, evaluate required spectral bandwidth, output power, fiber type (PM vs SM), operating temperature range, and mechanical format to ensure compatibility with your sensing or test platform.",
    },

    {
      type: "text",
      heading: "Manufacturer & Support",
      content:
        "Units are supplied by engineering teams based in Hangzhou City. For datasheets, configuration options, and project support, contact +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "2um",
      title: "Broadband Light Source",
      shortDescription: "Wide-spectrum source for general optical testing & metrology.",
      image: {
        src: "/ase-sources/broadband-thumb.jpg",
        alt: "Broadband light source",
      },
      href: "/ase-sources/broadband-light-source",
    },
    {
      slug: "2um",
      title: "ASE Light Source (1.0 µm)",
      shortDescription: "ASE source around 1.0 µm for fiber testing and calibration.",
      image: {
        src: "/ase-sources/ase-1um-thumb.jpg",
        alt: "ASE 1.0 µm",
      },
      href: "/ase-sources/ase-light-source-1um",
    },
  ],
};

export default aseLightSource2um;
