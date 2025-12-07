import { Product } from "@/types/categories";

export const pointLightSource1um: Product = {
  slug: "1um-point",
  category: "sled",

  meta: {
    title: "Techwin 1.0 µm Point Light Source | Precision Fiber Optic Source",
    description:
      "Techwin 1.0 µm Point Light Source for fiber optic systems with stable output and reliable performance. OEM support available. Contact +86-13958180450 for details.",
    keywords:
      "1.0 µm, point light source, fiber optic source, Techwin, calibration, photonics",
  },

  title: "1.0 µm Point Light Source",

  shortDescription:
    "The 1.0 μm point light source is a single-mode, continuous-wave fiber laser designed for stable and high-quality optical output. Built with a Fabry–Perot cavity structure and single-clad fiber pumping technology, it delivers reliable performance with output power up to 200 mW. Featuring near-diffraction-limited beam quality and polarization-maintaining single-mode output, it is well-suited for scientific research, educational experiments, and device testing applications.",

  heroImage: {
    src: "/products/sled/1um-point/hero.jpg",
    alt: "1.0 µm Point Light Source",
  },

  // NEW: root-level features (short points)
  features: [
    "High beam quality at 1.0 µm",
    "Stable and reliable output power",
    "Polarization-maintaining single-mode operation",
  ],

  // NEW: root-level application areas (short points)
  applicationAreas: [
    "Scientific research",
    "Experimental and laboratory teaching",
    "Device testing and measurement",
  ],

  // NEW: graph & table image URLs
  graphImageURL: "/products/sled/1um-point/graph.jpg",
  tableImageURL: "/products/sled/1um-point/table.png",
  

  // FIXED: gallery image paths + hero as gallery image
  galleryImages: [
    {
      src: "/products/sled/1um-point/hero.jpg",
      alt: "1.0 µm Point Light Source hero",
    },
    {
      src: "/products/sled/1um-point/hero.jpg",
      alt: "1.0 µm Point Light Source view",
    },
  ],

  datasheetUrl: "/products/sled/1um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/1um-point/datasheet.jpg",
  previewImageSrc: "/products/sled/1um-point/preview.jpg",

 sections: [
    // === OVERVIEW ===
    {
      type: "text",
      heading: "Overview",
      content:
        "A 1.0 µm Point Light Source delivers stable near-infrared illumination for precision optical tasks, component evaluation, alignment, sensing and laboratory metrology. Its controlled beam characteristics and strong wavelength stability make it essential for photonics development, fiber-optic testing and long-running research experiments. Techwin, located in Hangzhou City, supports industrial and scientific users with dependable optical emission solutions.",
    },

    // === FEATURES (as-is, ye pehle se visible hona chahiye tha) ===
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

    // === SPECS SECTION – ab text type, readable summary content ke sath ===
    {
      type: "text",
      heading: "Technical Specifications (Typical)",
      content:
        "The 1.0 µm Point Light Source is engineered for reliable integration into fiber-optic and photonic setups:\n\n" +
        "• Fiber / Connectors: SMF or PM fiber options with FC/APC, FC/PC or bare-fiber termination and typical coupling efficiency above 70%.\n" +
        "• Electronics & Control: Low-noise regulated current drive with integrated TEC temperature control and protection for over-current, over-temperature and ESD.\n" +
        "• Environment: Designed for 0°C to 40°C operating range, -20°C to 70°C storage, and housed in a compact metal enclosure for laboratory and OEM use.",
      // original structured blocks ko future use ke liye rehne dete hain
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
            {
              name: "Protection",
              value: "Over-current, over-temp, ESD protection",
            },
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

    // === APPLICATIONS ===
    {
      type: "text",
      heading: "Typical Usage Areas",
      content:
        "Used in fiber-optic laboratories, alignment tasks, interferometric experiments, metrology stations, sensor validation, photonic device calibration and precision system development. The stable 1.0 µm output makes it highly suitable for research, industrial fiber testing and measurement environments.",
    },

    // === INTEGRATION OPTIONS ===
    {
      type: "text",
      heading: "Configuration & Integration Options",
      content:
        "Available with FC/APC, FC/PC, bare fiber or collimated free-space outputs. Supports continuous emission modes and adjustable power settings. Designed for seamless integration into optical benches, OEM assemblies and compact test systems.",
    },

    // === SELECTION GUIDELINES ===
    {
      type: "text",
      heading: "Selection Guidelines for Engineers",
      content:
        "When selecting a 1.0 µm point source, consider wavelength stability, required output power, connector type, mechanical mounting conditions and driver compatibility. For interferometry, sensing or high-precision metrology, pay special attention to noise performance, thermal stability and long-term drift.",
    },

    // === HANDLING / LONG-TERM USE ===
    {
      type: "text",
      heading: "Proper Handling & Long-Term Operation",
      content:
        "Keep all optical connectors clean, avoid sharp bends or stress on fibers, and operate the source with approved low-noise drivers. Maintain a clean workstation, follow laser safety standards and allow adequate thermal management. With proper handling, the internal temperature control and robust design support stable, long-duration operation in alignment and metrology environments.",
    },
  ],

  // NEW: Related products with proper slugs / hrefs / images
  relatedProducts: [
    {
      slug: "1-5um-point",
      title: "1.5 µm Point Light Source",
      shortDescription:
        "Eye-safe 1.5 µm point light source with compact packaging and stable single-mode performance for LiDAR and quantum systems.",
      image: {
        src: "/products/sled/1-5um-point/hero.jpg",
        alt: "1.5 µm Point Light Source",
      },
      href: "/products/sled/1-5um-point",
    },
    {
      slug: "2um-point",
      title: "2.0 µm Point Light Source",
      shortDescription:
        "2.0 µm point light source with micron-level spot positioning and strong environmental robustness for LiDAR and medical use.",
      image: {
        src: "/products/sled/2um-point/hero.jpg",
        alt: "2.0 µm Point Light Source",
      },
      href: "/products/sled/2um-point",
    },
  ],
};

export default pointLightSource1um;
