import { Product } from "@/types/categories";

/**
 * ASE Light Source (1.5 µm) — corrected to match route & expected shapes
 */
export const aseLightSource1p5um: Product = {
  slug: "ase-light-source-1-5um",
  category: "broadband-ase-sources",

  meta: {
    title: "ASE Light Source (1.5 µm) for Optical Testing Fiber Use | Techwin",
    description:
      "Techwin ASE Light Source (1.5 µm) for sensing, metrology, and optical testing. Stable broadband output from Hangzhou City. Contact +86-13958180450 for detailed support.",
    keywords: "ASE source 1.5um, erbium ASE, broadband light source, ASE 1550nm, Techwin ASE",
  },

  title: "ASE Light Source (1.5 µm)",
  shortDescription:
    "Erbium-doped fiber ASE light source centered around 1.5 µm — broadband, low-coherence, stable output for sensing, metrology and optical testing.",

  heroImage: {
    src: "/products/ase-sources/1-5um/hero.jpg",
    alt: "ASE Light Source 1.5 µm",
  },

  galleryImages: [
    { src: "/products/ase-sources/1-5um/preview.jpg", alt: "ASE light source 1.5µm preview" },
    { src: "/products/ase-sources/1-5um/hero.jpg", alt: "ASE light source 1.5µm hero" },
  ],

  datasheetUrl: "/products/ase-sources/1-5um/datasheet.pdf",
  datasheetImageSrc: "/products/ase-sources/1-5um/datasheet.jpg",
  previewImageSrc: "/products/ase-sources/1-5um/preview.jpg",

  sections: [
    {
      type: "overview",
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
            { name: "Form Factor", value: "Benchtop / OEM module / Rack (optional)" },
            { name: "Control Interfaces", value: "Analog (0–5V), RS232, USB or Ethernet" },
            { name: "Cooling", value: "Passive / fan-cooled (depending on power)" },
            { name: "Power Input", value: "12–24 VDC or AC adaptor (model dependent)" },
          ],
        },
      ],
    },

    {
      type: "applications",
      heading: "Applications",
      content:
        "Common uses include distributed fiber sensing (FBG/DAS), optical component characterization (filters, WDM modules), OCT imaging sources, wavelength calibration and DWDM test benches. The broadband, low-coherence output makes this source especially valuable where speckle or interference fringes would otherwise degrade measurements.",
    },

    {
      type: "integration",
      heading: "Integration & Configuration Options",
      content:
        "Available options include flattened spectral shaping, higher output power configurations, polarization-maintaining output fiber, custom pigtail lengths, and OEM mounting. Benchtop units include front-panel displays and local control; modules expose digital and analog control pins for seamless integration into automated test systems.",
    },

    {
      type: "safety",
      heading: "Safety & Handling",
      content:
        "Follow IEC 60825 laser safety guidelines. Although ASE light is broadband and low-coherence, it still carries optical power that can be hazardous to eyes. Use proper fiber connectors, avoid bending beyond specified radii, keep connectors dust-free, and operate within specified temperature ranges.",
    },

    {
      type: "ordering",
      heading: "Ordering, Support & Documentation",
      content:
        "For pricing, lead times, or custom engineering support contact our technical sales team at +86-13958180450. A downloadable datasheet, test reports and integration notes are provided with each order. Custom BOMs and NRE for OEM projects are available upon request.",
    },
  ],
};

export default aseLightSource1p5um;
