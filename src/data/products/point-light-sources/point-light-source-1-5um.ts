import { Product } from "@/types/categories";

export const pointLightSource1p5um: Product = {
  slug: "1-5um-point",
  category: "sled",

  meta: {
    title: "Techwin 1.5 µm Point Light Source | Eye-Safe Infrared Point Source",
    description:
      "Techwin 1.5 µm point light source is a compact, high-performance eye-safe infrared source with stable single-mode output, high beam quality, and excellent environmental stability — ideal for LiDAR, quantum technologies, and precision medical systems.",
    keywords:
      "1.5 µm point light source, eye-safe IR source, 1.5um fiber source, LiDAR point source, quantum technology light source, medical infrared laser, Techwin",
  },

  title: "1.5 µm Point Light Source",

  shortDescription:
    "The 1.5 μm point light source is a compact, high-performance infrared laser designed for applications requiring eye-safe wavelengths and stable single-mode output. With its miniaturized packaging, high peak power capability, and excellent environmental stability, it provides reliable and precise optical performance. These characteristics make it an ideal choice for advanced applications in LiDAR, quantum technologies, and precision medical systems.",

  heroImage: {
    src: "/products/sled/1-5um-point/hero.jpg",
    alt: "1.5 µm Point Light Source",
  },

  previewImageSrc: "/products/sled/1-5um-point/preview.jpg",

  galleryImages: [
    {
      src: "/products/sled/1-5um-point/hero.jpg",
      alt: "Point Light Source 1.5 µm hero",
    },
    {
      src: "/products/sled/1-5um-point/hero.jpg",
      alt: "Point Light Source 1.5 µm device view",
    },
  ],

  datasheetUrl: "/products/sled/1-5um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/1-5um-point/datasheet.jpg",

  // NEW: Graph & table image URLs
  graphImageURL: "/products/sled/1-5um-point/graph.jpg",
  tableImageURL: "/products/sled/1-5um-point/table.png",

  features: [
  "High beam quality",
  "Stable output power",
  "Polarization-maintaining single-mode operation",
],

applicationAreas: [
  "LiDAR systems",
  "Quantum technology research",
  "Precision medicine and biomedical applications",
],


  sections: [
    // === OVERVIEW (improved text) ===
    {
      type: "text",
      heading: "Overview",
      content:
        "The 1.5 µm point light source is a compact, high-performance infrared laser designed for applications that require eye-safe wavelengths and stable single-mode output. With miniaturized packaging, high peak power capability and excellent environmental stability, it delivers reliable and precise optical performance in both laboratory and field environments.\n\nThanks to its high beam quality and polarization-maintaining single-mode output, this source is well suited for advanced LiDAR platforms, cutting-edge quantum technology experiments and precision medical systems that depend on repeatable, low-noise infrared illumination.",
    },

    // === KEY FEATURES (from your Key Features text, expanded) ===
    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "High beam quality with near-diffraction-limited output.",
        "Stable output power suitable for long-duration operation.",
        "Polarization-maintaining single-mode operation for sensitive measurements.",
        "Miniaturized, compact package ideal for OEM and benchtop integration.",
        "Excellent environmental stability for mobile and industrial environments.",
        "High peak power capability for demanding LiDAR and sensing tasks.",
      ],
    },

    // === APPLICATION AREAS (from your Application Areas text) ===
    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "LiDAR systems – including automotive, industrial and atmospheric LiDAR where eye safety and range are critical.",
        "Quantum technology research – stable 1.5 µm source for quantum communication, sensing and information experiments.",
        "Precision medicine and biomedical applications – supports diagnostic, imaging and therapeutic systems in the 1.5 µm band.",
      ],
    },

    // === TECHNICAL SPECS (summary text + keep structured data for future) ===
    {
      type: "text",
      heading: "Technical Specifications (Typical)",
      content:
        "The 1.5 µm Point Light Source is engineered for precise fiber-optic and photonic setups:\n\n" +
        "• Optical: Centered around 1.5 µm with configurable output power in the mW range and point / fiber-coupled / collimated beam formats.\n" +
        "• Fiber & Connectors: SMF or PM fiber options with FC/APC, FC/PC or bare fiber (on request) and typical coupling efficiency above 70%.\n" +
        "• Environmental & Electronics: Regulated low-noise current drive, integrated TEC temperature control and operation from 0°C to 40°C for stable performance in lab and OEM environments.",
      specGroups: [
        {
          label: "Optical",
          rows: [
            { name: "Wavelength", value: "Centered at 1.5 µm" },
            { name: "Output Power", value: "Configurable (mW range)" },
            { name: "Beam Type", value: "Point / fiber-coupled / collimated" },
            { name: "Linewidth", value: "Low (application dependent)" },
          ],
        },
        {
          label: "Fiber / Connectors",
          rows: [
            { name: "Output Fiber", value: "SMF or PM fiber options" },
            {
              name: "Connector Types",
              value: "FC/APC, FC/PC, bare fiber (on request)",
            },
            { name: "Coupling Efficiency", value: "> 70% typical" },
          ],
        },
        {
          label: "Environmental & Electronics",
          rows: [
            {
              name: "Drive Mode",
              value: "Regulated low-noise current drive",
            },
            { name: "Thermal Control", value: "Integrated TEC + sensor" },
            { name: "Operating Temp", value: "0°C to 40°C" },
          ],
        },
      ],
    },

    // === CONFIGURATION / INTEGRATION ===
    {
      type: "text",
      heading: "Configuration & Integration Options",
      content:
        "The 1.5 µm point source is available with FC/APC, FC/PC, bare fiber or collimated free-space outputs. It supports continuous emission with adjustable power settings and is designed for quick integration into optical benches, OEM modules and compact test systems that require eye-safe, stable infrared illumination.",
    },

    // === SELECTION GUIDELINES ===
    {
      type: "text",
      heading: "Selection Guidelines",
      content:
        "When selecting a 1.5 µm point light source, consider wavelength accuracy, required output power, connector format and whether polarization-maintaining fiber is required. For interferometry, LiDAR or sensing applications, pay close attention to noise performance, thermal stability and long-term wavelength drift.",
    },

    // === HANDLING / MAINTENANCE ===
    {
      type: "text",
      heading: "Handling & Maintenance",
      content:
        "Maintain clean connectors, avoid tight fiber bends and use recommended low-noise drivers for powering the source. Allow the TEC to stabilize after power-up for consistent performance and follow standard laser safety procedures when working with 1.5 µm infrared light in laboratory or production environments.",
    },
  ],

  // UPDATED relatedProducts with images + short descriptions
  relatedProducts: [
    {
      slug: "1um-point",
      title: "1.0 µm Point Light Source",
      shortDescription:
        "Stable 1.0 µm point source with high beam quality and polarization-maintaining output for research and fiber testing.",
      image: {
        src: "/products/sled/1um-point/hero.jpg",
        alt: "1.0 µm Point Light Source",
      },
      href: "/products/sled/1um-point",
    },
    {
      slug: "2um-point",
      title: "2.0 µm Point Light Source",
      shortDescription:
        "Eye-safe 2.0 µm point light source with micron-level spot positioning, high peak power and rugged environmental performance.",
      image: {
        src: "/products/sled/2um-point/hero.jpg",
        alt: "2.0 µm Point Light Source",
      },
      href: "/products/sled/2um-point",
    },
  ],
};

export default pointLightSource1p5um;
