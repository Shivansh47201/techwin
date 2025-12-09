import { Product } from "@/types/categories";

export const sledLightSource: Product = {
  slug: "sled",
  category: "ase-sources",

  meta: {
    title: "Superluminescent LED (SLED) | Techwin SLED Light Source Systems",
    description:
      "Techwin Superluminescent LED (SLED) for fiber sensing, OCT and optical testing applications. Stable broadband output performance. Contact +86-13958180450 today.",
    keywords:
      "SLED, superluminescent LED, broadband SLED, fiber sensing SLED, OCT light source, Techwin SLED",
  },

  title: "Superluminescent LED (SLED)",

  shortDescription:
    "The superluminescent LED (SLED) is a high-brightness broadband light source that combines the wide spectral output of an LED with the high coherence and stability characteristics of a laser. Designed using advanced semiconductor and packaging technology, the SLED delivers low noise, excellent spectral stability, and high optical power. Its compact and reliable structure makes it ideal for precision sensing, imaging, and measurement applications that require stable broadband illumination with minimal spectral ripple.",

  heroImage: {
    src: "/products/ase-sources/sled/hero.jpg",
    alt: "Superluminescent LED (SLED) Light Source",
  },

  graphImageURL: "/products/ase-sources/sled/graph.jpg",
  tableImageURL: "/products/ase-sources/sled/table.png",

  galleryImages: [
    {
      src: "/products/ase-sources/sled/hero.jpg",
      alt: "SLED light source front view",
    },
    {
      src: "/products/ase-sources/sled/hero.jpg",
      alt: "SLED light source module",
    },
  ],

  datasheetUrl: "/products/ase-sources/sled/datasheet.jpg",
  datasheetImageSrc: "/products/ase-sources/sled/datasheet.jpg",
  previewImageSrc: "/products/ase-sources/sled/preview.jpg",

  // From your Key Features & Application Areas
  features: [
    "Broad and smooth spectral output",
    "High optical power and low noise",
    "Excellent spectral stability",
    "Compact and highly reliable design",
  ],

  applicationAreas: [
    "Fiber-optic sensing (FBG, interferometric sensing)",
    "Optical coherence tomography (OCT)",
    "Precision measurement and metrology",
    "Biomedical imaging and scientific instrumentation",
  ],

  sections: [
    {
      type: "text",
      heading: "Superluminescent LED (SLED)",
      image: {
        src: "/products/ase-sources/sled/hero.jpg",
        alt: "SLED light source overview",
      },
      content:
        "The superluminescent LED (SLED) is a high-brightness broadband light source that combines the wide spectral output of an LED with the high coherence and stability characteristics of a laser. Designed using advanced semiconductor and packaging technology, the SLED delivers low noise, excellent spectral stability, and high optical power. Its compact and reliable structure makes it ideal for precision sensing, imaging, and measurement applications that require stable broadband illumination with minimal spectral ripple.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Broad and smooth spectral output",
        "High optical power and low noise",
        "Excellent spectral stability",
        "Compact and highly reliable design",
      ],
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Fiber-optic sensing (FBG, interferometric sensing)",
        "Optical coherence tomography (OCT)",
        "Precision measurement and metrology",
        "Biomedical imaging and scientific instrumentation",
      ],
    },

    // Existing deeper technical content kept as extra detail
    {
      type: "text",
      heading: "Overview — Superluminescent LED (SLED)",
      image: {
        src: "/products/ase-sources/sled/hero.jpg",
        alt: "SLED overview",
      },
      content:
        "A Superluminescent LED (SLED) is a broadband semiconductor light source offering high optical power, wide spectral bandwidth, and very low coherence. SLEDs are ideal for OCT, fiber sensing, metrology, and optical component testing where interference fringes must be minimized while keeping strong coupling into fibers.",
    },

    {
      type: "features",
      heading: "Key Characteristics",
      bullets: [
        "Broad spectral output with smooth spectral shape",
        "Very low coherence to minimize speckle and interference",
        "High coupling efficiency into single-mode and PM fibers",
        "Available wavelengths: 840 nm, 980 nm, 1310 nm, 1550 nm (and custom)",
        "Packaging: butterfly, fiber-pigtailed modules, benchtop instruments",
        "Thermo-electric control for wavelength/power stability",
      ],
    },

    {
      type: "specs",
      heading: "Typical Specifications",
      blocks: [
        {
          label: "Performance",
          rows: [
            {
              name: "Output Power",
              value: "Model dependent — from mW-level to higher",
            },
            {
              name: "Relative Intensity Noise",
              value: "Low (application dependent)",
            },
            {
              name: "Coherence Length",
              value: "Very short — ideal for low-coherence interferometry",
            },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "SLEDs are widely used in Optical Coherence Tomography (OCT), fiber sensing networks, reflectometry, optical component characterization (FBG testing, WDM verification), biomedical imaging, and OEM instruments that require stable broadband light without coherence-induced artifacts.",
    },

    {
      type: "features",
      heading: "Package & Integration Options",
      bullets: [
        "Butterfly packages with TEC & monitor photodiode",
        "Fiber-pigtailed modules (SM / PM options)",
        "Compact benchtop units with power control & monitoring",
        "OEM modules for embedded integration",
        "Custom wavelength and bandwidth tailoring available",
      ],
    },

    {
      type: "text",
      heading: "Selection Considerations",
      content:
        "When selecting a SLED, consider center wavelength, bandwidth (affects axial resolution in OCT), required output power, fiber type (SM vs PM), thermal control needs, and connector/packaging format to ensure compatibility with your system.",
    },

    {
      type: "text",
      heading: "Support & Contact",
      content:
        "For datasheets, model selection, or integration assistance, contact our engineering team in Hangzhou City at +86-13958180450. We provide configuration guidance for connector types, thermal settings, and spectrum tailoring.",
    },
  ],

  // All other ASE products as related (except SLED itself)
  relatedProducts: [
    {
      slug: "broadband",
      title: "Broadband Light Source",
      shortDescription:
        "Wide-spectrum broadband light source for optical testing, sensing and spectroscopy.",
      image: {
        src: "/products/ase-sources/broadband/hero.jpg",
        alt: "Broadband Light Source",
      },
      href: "/products/ase-sources/broadband",
    },
    {
      slug: "1um",
      title: "ASE Light Source (1.0 µm)",
      shortDescription:
        "1.0 µm ASE source with optimized ytterbium-doped fiber design for precision testing and sensing.",
      image: {
        src: "/products/ase-sources/1um/hero.jpg",
        alt: "ASE Light Source (1.0 µm)",
      },
      href: "/products/ase-sources/1um",
    },
    {
      slug: "1-5um",
      title: "ASE Light Source (1.5 µm)",
      shortDescription:
        "1.5 µm C-band erbium-doped ASE source for optical testing, sensing and spectral analysis.",
      image: {
        src: "/products/ase-sources/1-5um/hero.jpg",
        alt: "ASE Light Source (1.5 µm)",
      },
      href: "/products/ase-sources/1-5um",
    },
    {
      slug: "2um",
      title: "ASE Light Source (2.0 µm)",
      shortDescription:
        "2.0 µm thulium-doped ASE source for advanced testing and sensing applications.",
      image: {
        src: "/products/ase-sources/2um/hero.jpg",
        alt: "ASE Light Source (2.0 µm)",
      },
      href: "/products/ase-sources/2um",
    },
  ],
};

export default sledLightSource;
