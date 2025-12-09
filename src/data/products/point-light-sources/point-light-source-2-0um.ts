import { Product } from "@/types/categories";

export const pointLightSource20um: Product = {
  slug: "2um-point",
  category: "sled",

  meta: {
    title: "2.0 µm Point Light Source | Techwin Eye-Safe IR Point Source",
    description:
      "The 2.0 µm point light source from Techwin is a compact, high-performance infrared source designed for precise spatial positioning, eye-safe operation, and strong environmental resilience. Ideal for next-generation LiDAR, precision medical systems, and advanced industrial processing.",
    keywords:
      "2.0 µm point light source, 2um IR source, eye-safe infrared laser, LiDAR light source, precision medical IR, industrial mid-IR source, Techwin",
  },

  title: "2.0 µm Point Light Source",

  shortDescription:
    "Compact, eye-safe 2.0 µm point light source with micron-level spot positioning, high peak power and strong environmental resilience for LiDAR, precision medical and advanced industrial processing.",

  heroImage: {
    src: "/products/sled/2um-point/hero.jpg",
    alt: "2.0 µm Point Light Source",
  },

  previewImageSrc: "/products/sled/2um-point/preview.jpg",

  galleryImages: [
    {
      src: "/products/sled/2um-point/hero.jpg",
      alt: "2.0 µm point light source hero",
    },
    {
      src: "/products/sled/2um-point/hero.jpg",
      alt: "2.0 µm point light source device view",
    },
  ],

  datasheetUrl: "/products/sled/2um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/2um-point/datasheet.jpg",

  // Graph & table images
  graphImageURL: "/products/sled/2um-point/graph.jpg",
  tableImageURL: "/products/sled/2um-point/table.png",

  // ROOT-LEVEL FEATURES & APPLICATION AREAS (as requested)
  features: [
    "High beam quality",
    "Stable and reliable output power",
    "Polarization-maintaining single-mode operation",
  ],

  applicationAreas: [
    "Scientific research",
    "Experimental teaching",
    "Device testing and measurement",
  ],

  sections: [
    // === OVERVIEW (updated with your text) ===
    {
      type: "text",
      heading: "Overview",
      content:
        "The 2.0 µm point light source is a compact, high-performance infrared laser designed for applications requiring precise spatial positioning, eye-safe operation and strong environmental resilience. With advantages such as micron-level spot positioning, high peak power, automotive-grade durability and multi-band customization, it serves as a key optical source for next-generation LiDAR, precision medical systems and advanced industrial processing.\n\nIn addition to these advanced capabilities, the source maintains excellent beam quality and stable single-mode output, enabling reliable integration into both laboratory setups and rugged OEM platforms where long-term stability and repeatable performance are critical.",
    },

    // === KEY FEATURES (detailed version) ===
    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "High beam quality with near-diffraction-limited output for precise focusing and coupling.",
        "Stable and reliable output power suitable for long-duration operation.",
        "Polarization-maintaining single-mode output for polarization-sensitive systems.",
        "Micron-level spot positioning capability for accurate spatial targeting and scanning.",
        "High peak power for demanding LiDAR, sensing and interaction tasks.",
        "Automotive-grade mechanical durability and environmental robustness.",
        "Multi-band customization options to match specific application or system requirements.",
      ],
    },

    // === TECHNICAL SPECS (summary text + original structured blocks) ===
    {
      type: "text",
      heading: "Technical Specifications (Typical)",
      content:
        "The 2.0 µm Point Light Source is optimized for mid-infrared photonic systems and test platforms:\n\n" +
        "• Fiber & Connectors: Single-mode mid-IR fiber (2.0 µm compatible) or PM options with flexible connector configurations.\n" +
        "• Environmental & Electrical: Designed for reliable operation from 0°C to 40°C with integrated TEC control, low-noise drive electronics and multiple protection circuits.\n" +
        "• Mechanical: Rugged metal housing available in benchtop or OEM module configurations, suitable for lab racks and embedded systems.",
      blocks: [
        {
          label: "Fiber & Connectors",
          rows: [
            {
              name: "Fiber Type",
              value:
                "Single-mode mid-IR fiber (2.0 µm compatible) or PM option",
            },
            {
              name: "Connector Options",
              value:
                "Custom (FC-type adapters for mid-IR, bare fiber pigtail, or OEM ferrule)",
            },
            { name: "Pigtail Length", value: "Customizable (standard 1 m)" },
          ],
        },
        {
          label: "Environmental & Electrical",
          rows: [
            {
              name: "Operating Temperature",
              value: "0°C to 40°C (standard); extended ranges on request",
            },
            { name: "Storage Temperature", value: "-20°C to 70°C" },
            {
              name: "Drive Electronics",
              value:
                "Low-noise current driver with TEC control and protection circuits",
            },
            {
              name: "Protections",
              value: "Over-current, over-temp, reverse polarity",
            },
          ],
        },
        {
          label: "Mechanical",
          rows: [
            {
              name: "Housing",
              value: "Metal enclosure; benchtop or OEM module variants",
            },
            {
              name: "Dimensions (typ)",
              value: "Module: ~140 × 80 × 35 mm (model dependent)",
            },
            { name: "Weight (typ)", value: "Approx. 450 g" },
          ],
        },
      ],
    },

    // === APPLICATIONS (extended, includes your bullet areas + advanced use) ===
    {
      type: "text",
      heading: "Applications",
      content:
        "The 2.0 µm point light source is used across a wide range of mid-infrared and precision optical systems:\n\n" +
        "• Scientific research – mid-IR photonics, spectroscopy and optical experiment platforms.\n" +
        "• Experimental teaching – advanced optics courses and laboratory demonstrations involving eye-safe IR wavelengths.\n" +
        "• Device testing and measurement – characterization of mid-IR fibers, couplers, FBGs and specialty components.\n" +
        "• Next-generation LiDAR – automotive and industrial LiDAR requiring eye-safe, high-peak-power point sources.\n" +
        "• Precision medical systems – diagnostic, imaging and surgical tools operating near 2.0 µm.\n" +
        "• Advanced industrial processing – material interaction, surface treatment and process monitoring in the mid-IR band.",
    },

    // === INTEGRATION OPTIONS ===
    {
      type: "text",
      heading: "Integration & Customization Options",
      content:
        "The source can be supplied with selectable fiber types (SM or PM for 2.0 µm), configurable connectors, customized pigtail length and multiple packaging variants (module, benchtop, OEM). Digital and analog control interfaces are available to support automated test benches and embedded sensor modules. Multi-band or multi-channel configurations can be provided on request for complex system architectures.",
    },

    // === SELECTION GUIDELINES ===
    {
      type: "text",
      heading: "Selection Guidelines",
      content:
        "When selecting a 2.0 µm point light source, consider required output power, wavelength stability, connector formats and whether polarization-maintaining fiber is necessary for your application. For gas sensing, atmospheric transmission or LiDAR work, prioritize wavelength accuracy, low relative intensity noise (RIN) and robust environmental performance. For OEM integration, also evaluate mechanical footprint, control interface and thermal management requirements.",
    },

    // === HANDLING / MAINTENANCE ===
    {
      type: "text",
      heading: "Handling, Maintenance & Quality Assurance",
      content:
        "To ensure long-term reliability, keep all connectors and pigtails clean, avoid sharp bends and tension on the fiber and operate the unit within its specified temperature range. Allow the TEC and internal control electronics to stabilize after power-on before taking critical measurements. Follow standard ESD and laser safety protocols when handling the device. Each unit undergoes optical power, spectral and stability verification during QA to ensure consistent performance.",
    },
  ],

  // PROPER relatedProducts with image, text & href
  relatedProducts: [
    {
      slug: "1um-point",
      title: "1.0 µm Point Light Source",
      shortDescription:
        "Stable 1.0 µm point source with high beam quality and polarization-maintaining output for research, teaching and fiber testing.",
      image: {
        src: "/products/sled/1um-point/hero.jpg",
        alt: "1.0 µm Point Light Source",
      },
      href: "/products/sled/1um-point",
    },
    {
      slug: "1-5um-point",
      title: "1.5 µm Point Light Source",
      shortDescription:
        "Compact, eye-safe 1.5 µm point light source with stable single-mode output for LiDAR, quantum research and biomedical systems.",
      image: {
        src: "/products/sled/1-5um-point/hero.jpg",
        alt: "1.5 µm Point Light Source",
      },
      href: "/products/sled/1-5um-point",
    },
  ],
};

export default pointLightSource20um;
