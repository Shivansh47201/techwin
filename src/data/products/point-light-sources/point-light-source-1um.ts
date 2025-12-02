import { Product } from "@/types/categories";

export const pointLightSource1um: Product = {
  slug: "1um-point",
  category: "sled",

  meta: {
    title: "Techwin 1.0 µm Point Light Source | Precision Fiber Optic Source",
    description:
      "Techwin 1.0 µm Point Light Source for fiber optic systems with stable output and reliable performance. OEM support available. Contact +86-13958180450 for details.",
    keywords: "1.0 µm, point light source, fiber optic source, Techwin, calibration, photonics",
  },

  title: "1.0 µm Point Light Source",

  shortDescription:
    "Stable, low-noise 1.0 µm point illumination source for alignment, calibration, sensing and precision fiber-optic testing.",

  heroImage: { src: "/products/sled/1um-point/hero.jpg",
    alt: "1.0 µm Point Light Source",
  },

  galleryImages: [
      { src: "/sled/point-light-source-1um/preview.jpg", alt: "point-light-source-1um preview" },
      { src: "/sled/point-light-source-1um/hero.jpg", alt: "point-light-source-1um hero" },
    ],

  datasheetUrl: "/products/sled/1um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/1um-point/datasheet.jpg",
  previewImageSrc: "/products/sled/1um-point/preview.jpg",


  sections: [
    {
      type: "overview",
      heading: "Overview",
      content:
        "A 1.0 µm Point Light Source delivers stable near-infrared illumination for precision optical tasks, component evaluation, alignment, sensing and laboratory metrology. Its controlled beam characteristics and strong wavelength stability make it essential for photonics development, fiber-optic testing and long-running research experiments. Techwin, located in Hangzhou City, supports industrial and scientific users with dependable optical emission solutions.",
    },

    {
      type: "features",
      heading: "Main Performance Characteristics",
      bullets: [
        "Stable optical emission for long-duration tasks",
        "Controlled beam structure for precise alignment and sensing",
        "Fiber-coupled or free-space output options",
        "Strong thermal stability with low wavelength drift",
        "Compact form factor ideal for laboratory benches and OEM systems",
        "Low-noise emission suitable for precision measurement",
      ],
    },

    {
      type: "specs",
      heading: "Technical Specifications (Typical)",
      blocks: [
        {
          label: "Fiber / Connectors",
          rows: [
            { name: "Output Fiber", value: "SMF or PM fiber options" },
            { name: "Connector Types", value: "FC/APC, FC/PC, bare fiber" },
            { name: "Coupling Efficiency", value: "> 70% typical" },
          ],
        },
        {
          label: "Electronics & Control",
          rows: [
            { name: "Drive Mode", value: "Regulated, low-noise current drive" },
            { name: "Thermal Control", value: "Integrated TEC + sensor" },
            { name: "Protection", value: "Over-current, over-temp, ESD protection" },
          ],
        },
        {
          label: "Environment",
          rows: [
            { name: "Operating Temperature", value: "0°C to 40°C" },
            { name: "Storage Temperature", value: "-20°C to 70°C" },
            { name: "Housing", value: "Compact metal enclosure" },
          ],
        },
      ],
    },

    {
      type: "applications",
      heading: "Typical Usage Areas",
      content:
        "Used in fiber-optic laboratories, alignment tasks, interferometric experiments, metrology stations, sensor validation, photonic device calibration and precision system development. The stable 1.0 µm output makes it highly suitable for research, industrial fiber testing and measurement environments.",
    },

    {
      type: "integration",
      heading: "Configuration & Integration Options",
      content:
        "Available with FC/APC, FC/PC, bare fiber or collimated free-space outputs. Supports continuous emission modes and adjustable power settings. Designed for seamless integration into optical benches, OEM assemblies and compact test systems.",
    },

    {
      type: "selection",
      heading: "Selection Guidelines for Engineers",
      content:
        "Consider wavelength stability, output power, connector type, mechanical environment and electronic compatibility. Evaluate thermal performance and noise requirements when choosing a model for interferometry, sensing or high-precision measurement tasks.",
    },

    {
      type: "handling",
      heading: "Proper Handling & Long-Term Operation",
      content:
        "Keep connectors clean, avoid over-bending fibers, use approved drivers, maintain a clean workstation and follow optical safety protocols. Strong internal temperature control ensures stable long-duration use for alignment and metrology environments.",
    },
  ],

  relatedProducts: [],
};

export default pointLightSource1um;