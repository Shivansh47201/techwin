import { Product } from "@/types/categories";

export const aseLightSource1um: Product = {
  slug: "1um",
  category: "ase-sources",

  meta: {
    title: "ASE Light Source (1.0 µm) for Optical Applications | Techwin",
    description:
      "Techwin ASE Light Source (1.0 µm) for optical testing and measurement tasks. Contact +86-13958180450 for details. Reliable manufacturer based in Hangzhou City China.",
    keywords:
      "ASE source 1.0um, broadband light source, low coherence optical source, Techwin ASE 1um",
  },

  title: "ASE Light Source (1.0 µm)",

  shortDescription:
    "The 1.0 µm ASE light source utilizes an optimized ytterbium-doped fiber optical design along with high-precision ATC and ACC (APC) control circuitry to ensure highly stable and reliable operation. It delivers consistent single-mode output with excellent performance, making it suitable for a wide range of precision testing and sensing applications.",

  heroImage: {
    src: "/products/ase-sources/1um/hero.jpg",
    alt: "ASE Light Source 1.0 µm Hero Image",
  },

  previewImageSrc: "/products/ase-sources/1um/preview.jpg",

  graphImageURL: "/products/ase-sources/1um/graph.jpg",
  tableImageURL: "/products/ase-sources/1um/table.png",

  galleryImages: [
    {
      src: "/products/ase-sources/1um/hero.jpg",
      alt: "ASE Light Source 1.0 µm front view",
    },
    {
      src: "/products/ase-sources/1um/hero.jpg",
      alt: "ASE Light Source 1.0 µm module",
    },
  ],

  datasheetUrl: "/products/ase-sources/1um/datasheet.jpg",
  datasheetImageSrc: "/products/ase-sources/1um/datasheet.jpg",

  // root summary bullets from your Key Features / Application Areas
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
    // purana overview rehne de rahe hain — extra detail ke liye
    {
      type: "text",
      heading: "Overview of the ASE Light Source (1.0 µm)",
      content:
        "The ASE Light Source (1.0 µm) is a broadband emission system engineered for laboratory testing, fiber-optic evaluation and calibration workflows. Its low-coherence output minimizes interference artifacts, making it suitable for metrology, imaging and optical component assessment. Stable spectral performance and durable internal construction ensure consistent results in demanding environments.",
    },

    {
      type: "text",
      heading: "Working Principle",
      content:
        "An ASE source emits amplified spontaneous emission without resonant optical feedback, resulting in smooth broadband output. The 1.0 µm variant uses doped fiber amplification, feedback-suppression and thermal management to maintain low relative intensity noise, uniform spectral distribution and dependable power stability for extended duty cycles.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Broadband spectral output ideal for component analysis and imaging",
        "Low-coherence operation minimizes interference and speckle artifacts",
        "Stable long-term output with minimal drift",
        "Fiber-based construction for mechanical robustness",
        "Compact module or benchtop form factor",
        "Engineered for long operational life in lab and industrial setups",
      ],
    },

    {
      type: "text",
      heading: "Design Characteristics",
      content:
        "The internal design includes pump diodes, optimized gain fiber, feedback-suppressed optical paths, temperature regulation, integrated monitoring circuits and standard digital interfaces. These elements ensure stable spectral behavior and reduce maintenance overhead.",
    },

    {
      type: "specs",
      heading: "Technical Specifications (Typical)",
      blocks: [
        {
          label: "Optical Specifications",
          rows: [
            { name: "Wavelength Range", value: "Centered near 1.0 µm" },
            { name: "Output Power", value: "Configurable per model" },
            { name: "Spectral Width", value: "Broad, smooth emission" },
            { name: "Stability", value: "Low drift over extended cycles" },
            { name: "Noise Performance", value: "Low RIN characteristics" },
          ],
        },
        {
          label: "Mechanical & Interface",
          rows: [
            { name: "Form Factor", value: "Bench-top or compact module" },
            { name: "Fiber Output", value: "Low-coherence fiber" },
            { name: "Control Interfaces", value: "Analog & digital ports" },
            { name: "Cooling", value: "Thermal-regulated housing" },
          ],
        },
      ],
    },

    {
      type: "features",
      heading: "Applications",
      bullets: [
        "Fiber-optic component testing (FBGs, couplers, WDMs)",
        "Laboratory calibration and measurement",
        "Interferometry and imaging system validation",
        "Optical communication research and loss analysis",
        "Material studies and spectral reference illumination",
        "Integrated photonics research and testing",
      ],
    },

    {
      type: "text",
      heading: "Advantages for Research & Industry",
      content:
        "ASE sources offer smooth spectral output, reduced interference patterns and predictable behavior under steady operating conditions. Their broadband coverage and ease of integration make them valuable tools for research labs and automated industrial test environments.",
    },

    {
      type: "text",
      heading: "Why This Product Category Matters",
      content:
        "High-stability broadband sources are essential where narrowband lasers introduce coherence-related distortions. ASE systems provide uniform illumination, supporting prototyping, optical alignment, calibration tasks and detailed metrology.",
    },

    {
      type: "text",
      heading: "System Integration Approach",
      content:
        "With standard fiber interfaces, configurable power levels, and compatibility with mounts and OEM platforms, the ASE 1.0 µm module integrates quickly into existing optical benches and test systems.",
    },

    {
      type: "text",
      heading: "Maintenance & Handling",
      content:
        "For reliable long-term use, maintain clean fiber connectors, ensure proper ventilation, avoid sharp fiber bends, and store units in a controlled environment. Follow grounding and operational guidelines provided by the manufacturer.",
    },

    {
      type: "text",
      heading: "Industry Segments Using ASE Sources",
      content:
        "This ASE wavelength is widely used in optical component manufacturing, fiber-optic research labs, metrology centers, industrial inspection, photonic device development and sensor technology workflows.",
    },

    {
      type: "text",
      heading: "Brand Presence",
      content:
        "Techwin is recognized internationally for supplying dependable photonic devices and test instruments. The ASE Light Source (1.0 µm) series reflects the brand’s emphasis on stable output, long-term reliability and precision-focused engineering.",
    },
  ],

  // baaki sab related products (1.5um, 2um, broadband, sled) — khud ko include nahi kiya
  relatedProducts: [
    {
      slug: "1-5um",
      title: "ASE Light Source (1.5 µm)",
      shortDescription:
        "1.5 µm C-band ASE source for optical testing, sensing and spectral analysis.",
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

export default aseLightSource1um;
