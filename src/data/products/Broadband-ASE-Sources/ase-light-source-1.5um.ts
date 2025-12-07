import { Product } from "@/types/categories";

/**
 * ASE Light Source (1.5 µm)
 */
export const aseLightSource1p5um: Product = {
  slug: "1-5um",
  category: "ase-sources",

  meta: {
    title: "ASE Light Source (1.5 µm) for Optical Testing Fiber Use | Techwin",
    description:
      "Techwin ASE Light Source (1.5 µm) for sensing, metrology, and optical testing. Stable broadband output from Hangzhou City. Contact +86-13958180450 for detailed support.",
    keywords:
      "ASE source 1.5um, erbium ASE, broadband light source, ASE 1550nm, Techwin ASE",
  },

  title: "ASE Light Source (1.5 µm)",

  shortDescription:
    "The 1.5 µm C-band ASE light source is designed with an optimized erbium-doped fiber optical path and integrated high-precision ATC and ACC (APC) control circuitry, ensuring highly stable and accurate performance. It provides reliable single-mode output with excellent long-term stability, making it ideal for precision testing and sensing applications.",

  heroImage: {
    src: "/products/ase-sources/1-5um/hero.jpg",
    alt: "ASE Light Source 1.5 µm",
  },

  graphImageURL: "/products/ase-sources/1-5um/graph.jpg",
  tableImageURL: "/products/ase-sources/1-5um/table.png",

  galleryImages: [
    {
      src: "/products/ase-sources/1-5um/hero.jpg",
      alt: "ASE light source 1.5µm front view",
    },
    {
      src: "/products/ase-sources/1-5um/hero.jpg",
      alt: "ASE light source 1.5µm module",
    },
  ],

  datasheetUrl: "/products/ase-sources/1-5um/datasheet.jpg",
  datasheetImageSrc: "/products/ase-sources/1-5um/datasheet.jpg",
  previewImageSrc: "/products/ase-sources/1-5um/preview.jpg",

  // From your Key Features & Application Areas
  features: [
    "Single-mode fiber output",
    "High stability and long-term reliability",
  ],

  applicationAreas: [
    "Optical testing and measurement",
    "Fiber-optic sensing systems",
    "Spectral analysis",
  ],

  sections: [
    {
      type: "text",
      heading: "ASE Light Source (1.5 µm)",
      content:
        "The 1.5 µm C-band ASE light source is designed with an optimized erbium-doped fiber optical path and integrated high-precision ATC and ACC (APC) control circuitry, ensuring highly stable and accurate performance. It provides reliable single-mode output with excellent long-term stability, making it ideal for precision testing and sensing applications.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Single-mode fiber output",
        "High stability and long-term reliability",
      ],
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Optical testing and measurement",
        "Fiber-optic sensing systems",
        "Spectral analysis",
      ],
    },

    // Existing richer content kept as-is
    {
      type: "text",
      heading: "Overview",
      content:
        "The ASE Light Source (1.5 µm) uses erbium-doped fiber technology to generate a broadband, low-coherence output across the telecom band. It is designed for fiber sensing, DWDM component testing, metrology and laboratory platforms that require stable spectral power with minimal interference artifacts. Typical formats include benchtop and OEM module versions with standard fiber pigtails.",
    },

    {
      type: "features",
      heading: "Main Features",
      bullets: [
        "Broad spectral output across 1520–1600 nm (configurable)",
        "Low-coherence, low-ripple emission suitable for OCT and FBG interrogation",
        "Stable output power with long-term drift <0.05 dB (typical)",
        "SMF-28 or PM1550 fiber pigtail options; FC/APC termination available",
        "Benchtop and OEM module formats; compact and low-maintenance",
        "Integrated pump monitoring and over-temperature protection",
      ],
    },

    {
      type: "specs",
      heading: "Typical Technical Specifications",
      specGroups: [
        {
          label: "Optical",
          rows: [
            { name: "Wavelength", value: "1520–1600 nm (configurable)" },
            { name: "Output Power", value: "Up to 20 mW (typical)" },
            { name: "Linewidth", value: "<1 nm (3 dB)" },
            { name: "Stability", value: "<0.05 dB (long-term)" },
            { name: "Polarization", value: "Random" },
          ],
        },
        {
          label: "Mechanical & Electrical",
          rows: [
            {
              name: "Form Factor",
              value: "Benchtop / OEM module / Rack (optional)",
            },
            {
              name: "Control Interfaces",
              value: "Analog (0–5V), RS232, USB or Ethernet",
            },
            {
              name: "Cooling",
              value: "Passive / fan-cooled (depending on power)",
            },
            {
              name: "Power Input",
              value: "12–24 VDC or AC adaptor (model dependent)",
            },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Common uses include distributed fiber sensing (FBG/DAS), optical component characterization (filters, WDM modules), OCT imaging sources, wavelength calibration and DWDM test benches. The broadband, low-coherence output makes this source especially valuable where speckle or interference fringes would otherwise degrade measurements.",
    },

    {
      type: "text",
      heading: "Integration & Configuration Options",
      content:
        "Available options include flattened spectral shaping, higher output power configurations, polarization-maintaining output fiber, custom pigtail lengths, and OEM mounting. Benchtop units include front-panel displays and local control; modules expose digital and analog control pins for seamless integration into automated test systems.",
    },

    {
      type: "text",
      heading: "Safety & Handling",
      content:
        "Follow IEC 60825 laser safety guidelines. Although ASE light is broadband and low-coherence, it still carries optical power that can be hazardous to eyes. Use proper fiber connectors, avoid bending beyond specified radii, keep connectors dust-free, and operate within specified temperature ranges.",
    },

    {
      type: "text",
      heading: "Ordering, Support & Documentation",
      content:
        "For pricing, lead times, or custom engineering support contact our technical sales team at +86-13958180450. A downloadable datasheet, test reports and integration notes are provided with each order. Custom BOMs and NRE for OEM projects are available upon request.",
    },
  ],

  // except jisme update kar rahe, baaki sab related products
  relatedProducts: [
    {
      slug: "1um",
      title: "ASE Light Source (1.0 µm)",
      shortDescription:
        "1.0 µm ytterbium-doped ASE source for precision testing and fiber sensing.",
      image: {
        src: "/products/ase-sources/1um/hero.jpg",
        alt: "ASE Light Source (1.0 µm)",
      },
      href: "/products/ase-sources/1um",
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
      slug: "sled",
      title: "Superluminescent LED (SLED)",
      shortDescription:
        "High-brightness SLED broadband source for OCT, sensing and precision metrology.",
      image: {
        src: "/products/ase-sources/sled/hero.jpg",
        alt: "Superluminescent LED (SLED)",
      },
      href: "/products/ase-sources/sled",
    },
  ],
};

export default aseLightSource1p5um;
