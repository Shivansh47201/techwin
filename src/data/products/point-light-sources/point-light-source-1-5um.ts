import { Product } from "@/types/categories";

export const pointLightSource1p5um: Product = {
  // route-friendly slug & category (matches the URL you gave)
  slug: "point-light-source-1-5um",
  category: "point-light-sources",

  meta: {
    title: "Point Light Source 1.5 µm | Techwin Precision Point Illumination",
    description:
      "Techwin 1.5 µm Point Light Source — stable near-IR point illumination for alignment, calibration and fiber testing. OEM options and support available. Call +86-13958180450.",
    keywords: "point light source 1.5um, fiber point source, calibration source, Techwin point light",
  },

  title: "1.5 µm Point Light Source",
  shortDescription:
    "Stable 1.5 µm point illumination for alignment, calibration, sensing and precision fiber-optic testing with fiber-coupled and free-space options.",

  // Normalized image paths under public/products/point-light-sources/1-5um/
  heroImage: { src: "/products/sled/1-5um-point/hero.jpg", alt: "1.5 µm Point Light Source" },
  previewImageSrc: "/products/sled/1-5um-point/preview.jpg",
  galleryImages: [
    { src: "/products/sled/1-5um-point/preview.jpg", alt: "Point Light Source 1.5 µm preview" },
    { src: "/products/sled/1-5um-point/hero.jpg", alt: "Point Light Source 1.5 µm hero" },
  ],

  datasheetUrl: "/products/sled/1-5um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/1-5um-point/datasheet.jpg",
  sections: [
    {
      type: "overview",
      heading: "Overview",
      content:
        "The 1.5 µm Point Light Source provides stable near-infrared point illumination for precision optical tasks — alignment, component validation, interferometry, and fiber-optic testing. It supports fiber-coupled and free-space outputs and is designed for laboratory and OEM integration.",
    },

    {
      type: "features",
      heading: "Main Performance Characteristics",
      bullets: [
        "Stable optical emission for long-duration tasks",
        "Controlled beam structure for precise alignment and sensing",
        "Fiber-coupled (SM/PM) or collimated free-space options",
        "Strong thermal stability with low wavelength drift",
        "Compact form factor ideal for benches and OEM systems",
        "Low-noise emission suitable for precision measurement",
      ],
    },

    {
      type: "specs",
      heading: "Technical Specifications (Typical)",
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
            { name: "Connector Types", value: "FC/APC, FC/PC, bare fiber (on request)" },
            { name: "Coupling Efficiency", value: "> 70% typical" },
          ],
        },
        {
          label: "Environmental & Electronics",
          rows: [
            { name: "Drive Mode", value: "Regulated low-noise current drive" },
            { name: "Thermal Control", value: "Integrated TEC + sensor" },
            { name: "Operating Temp", value: "0°C to 40°C" },
          ],
        },
      ],
    },

    {
      type: "applications",
      heading: "Typical Usage Areas",
      content:
        "Used in fiber-optic labs for alignment, interferometric experiments, metrology stations, sensor validation, photonic device calibration and precision system development.",
    },

    {
      type: "integration",
      heading: "Configuration & Integration Options",
      content:
        "Available with FC/APC, FC/PC, bare fiber or collimated free-space outputs. Supports continuous emission and adjustable power settings. Designed for quick integration into optical benches and OEM test systems.",
    },

    {
      type: "selection",
      heading: "Selection Guidelines",
      content:
        "Choose based on wavelength accuracy, required output power, connector format, and whether PM fiber is needed. For interferometry or sensing choose low-RIN options and stable TEC control.",
    },

    {
      type: "handling",
      heading: "Handling & Maintenance",
      content:
        "Maintain clean connectors, avoid tight bends, use recommended drivers, and follow optical safety guidelines. Allow TEC stabilization after power-up for consistent performance.",
    },
  ],

  relatedProducts: [
    { slug: "2um-point", title: "2.0 µm Point Light Source", href: "/products/point-light-sources/2um-point" },
    { slug: "1um-point", title: "1.0 µm Point Light Source", href: "/products/point-light-sources/1um-point" },
  ],
};

export default pointLightSource1p5um;
