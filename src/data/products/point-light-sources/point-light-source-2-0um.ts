import { Product } from "@/types/categories";

export const pointLightSource20um: Product = {
  slug: "2um-point",
  category: "sled",

  meta: {
    title: "2.0 µm Point Light Source | Techwin Fiber Optic Test Device Units",
    description:
      "High-performance 2.0 µm point light source for precision fiber testing. Stable output, reliable design. Contact +86-13958180450. Available from Techwin, Hangzhou City.",
    keywords: "2.0 µm, point light source, mid-IR, thulium, holmium, fiber testing, Techwin",
  },

  title: "2.0 µm Point Light Source",

  shortDescription:
    "Stable 2.0 µm point illumination for mid-IR fiber testing, component validation, gas-sensing R&D and OEM integration — narrow linewidth and low-noise.",

  heroImage: { src: "/products/sled/2um-point/hero.jpg",
    alt: "2.0 µm Point Light Source",
  },

  galleryImages: [
      { src: "/sled/point-light-source-2-0um/preview.jpg", alt: "point-light-source-2-0um preview" },
      { src: "/sled/point-light-source-2-0um/hero.jpg", alt: "point-light-source-2-0um hero" },
    ],

  datasheetUrl: "/products/sled/2um-point/datasheet.jpg",
  datasheetImageSrc: "/products/sled/2um-point/datasheet.jpg",
  previewImageSrc: "/products/sled/2um-point/preview.jpg",


  sections: [
    {
      type: "overview",
      heading: "Overview",
      content:
        "The 2.0 µm Point Light Source is a compact, fiber-delivered mid-infrared point illumination unit engineered for specialty fiber testing, component validation, atmospheric/gas sensing research, and laboratory prototyping. Based on thulium/holmium-doped fiber technology with active stabilization, it delivers narrow-linewidth, low-noise output tailored for precision mid-IR measurement workflows.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Stable center wavelength at ~2.0 µm with narrow spectral deviation",
        "Low intensity noise and controlled linewidth for accurate testing",
        "Thulium/holmium-doped fiber core with high-quality filtering",
        "Fiber-coupled single-mode output (2.0 µm compatible fiber) or free-space option",
        "Integrated temperature control and wavelength locking",
        "Robust metal housing with OEM-ready mechanical options",
      ],
    },

    {
      type: "specs",
      heading: "Technical Specifications (Typical)",
      blocks: [
        {
          label: "Fiber & Connectors",
          rows: [
            { name: "Fiber Type", value: "Single-mode mid-IR fiber (2.0 µm compatible) or PM option" },
            { name: "Connector Options", value: "Custom (FC-type adapters for mid-IR, bare fiber pigtail, or OEM ferrule)" },
            { name: "Pigtail Length", value: "Customizable (standard 1 m)" },
          ],
        },
        {
          label: "Environmental & Electrical",
          rows: [
            { name: "Operating Temperature", value: "0°C to 40°C (standard); extended ranges on request" },
            { name: "Storage Temperature", value: "-20°C to 70°C" },
            { name: "Drive Electronics", value: "Low-noise current driver with TEC control and protection circuits" },
            { name: "Protections", value: "Over-current, over-temp, reverse polarity" },
          ],
        },
        {
          label: "Mechanical",
          rows: [
            { name: "Housing", value: "Metal enclosure; benchtop or OEM module variants" },
            { name: "Dimensions (typ)", value: "Module: ~140 × 80 × 35 mm (model dependent)" },
            { name: "Weight (typ)", value: "Approx. 450 g" },
          ],
        },
      ],
    },

    {
      type: "applications",
      heading: "Applications",
      content:
        "Used for mid-IR fiber component testing (FBGs, specialty couplers), gas-sensing R&D, atmospheric transmission studies, prototype mid-IR photonics development, OEM sensor integration, and laboratory measurement tasks where precise 2.0 µm illumination is required.",
    },

    {
      type: "integration",
      heading: "Integration & Customization Options",
      content:
        "Available with selectable fiber types (SM/PM for 2.0 µm), configurable connectors, pigtail length, and packaging (module, benchtop, OEM). Digital/analog control interfaces and firmware options are available for automated test-benches or embedded sensor modules.",
    },

    {
      type: "selection",
      heading: "Selection Guidelines",
      content:
        "Choose based on required output power, wavelength stability, connector format, and whether PM fiber is needed for polarization-sensitive tests. For gas sensing or atmospheric work prioritize wavelength accuracy and low RIN. Consult the datasheet for model-specific linewidth and power options.",
    },

    {
      type: "handling",
      heading: "Handling, Maintenance & QA",
      content:
        "Keep connectors and pigtails clean, avoid sharp bends and tensile loads on the fiber, allow TEC to stabilize after power-on, and operate within recommended temperature range. Follow ESD and laser safety protocols. Units undergo optical power and spectrum verification during QA before shipment.",
    },
  ],

  relatedProducts: [],
};

export default pointLightSource20um;