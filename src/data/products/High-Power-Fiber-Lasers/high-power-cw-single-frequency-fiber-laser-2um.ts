import { Product } from "@/types/categories";

export const highPowerCWSingleFrequencyFiberLaser2um: Product = {
  slug: "2um-cw",
  category: "high-power",

  meta: {
    title: "High-Power CW Single-Frequency Fiber Laser (2.0 µm) | Techwin",
    description:
      "Techwin High-Power CW Single-Frequency Fiber Laser (2.0 µm) designed for precision applications. Contact +86-13958180450 for details. Manufacturer based in Hangzhou City.",
    keywords:
      "high power fiber laser 2.0um, single frequency 2um, CW high power laser, narrow linewidth 2um, Techwin high power fiber laser",
  },

  title: "High-Power CW Single-Frequency Fiber Laser (2.0 µm)",
  shortDescription:
    "High-power continuous-wave single-frequency fiber laser at 2.0 µm providing narrow linewidth, high coherence, and long-term operational stability for industrial, scientific, medical, and sensing applications.",

  heroImage: { src: "/products/high-power/2um-cw/hero.jpg",
    alt: "High-Power CW Single-Frequency Fiber Laser (2.0 µm)",
  },

  galleryImages: [
      { src: "/high-power/2um-cw/preview.jpg", alt: "high-power-cw-single-frequency-fiber-laser-2um preview" },
      { src: "/high-power/2um-cw/hero.jpg", alt: "high-power-cw-single-frequency-fiber-laser-2um hero" },
    ],

  datasheetUrl: "/products/high-power/2um-cw/datasheet.jpg",
  datasheetImageSrc: "/products/high-power/2um-cw/datasheet.jpg",
  previewImageSrc: "/products/high-power/2um-cw/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 2.0 µm High-Power Single-Frequency Laser Platform",
      image: { src: "/high-power/2um-cw/overview.jpg", alt: "2.0 µm laser overview" },
      content:
        "The High-Power CW Single-Frequency Fiber Laser (2.0 µm) delivers continuous-wave narrow-linewidth output with high coherence and excellent spectral purity. Engineered for demanding environments, it supports industrial processing, spectroscopy, medical devices, environmental sensing, and precision measurement systems.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Narrow-linewidth single-frequency CW operation",
        "High continuous-wave output power with stable thermal handling",
        "Low relative intensity noise and high spectral purity",
        "Fiber-based architecture (Thulium/Holmium-doped designs)",
        "Compact, rugged packaging for lab and field deployment",
        "Intelligent digital control and real-time diagnostics",
      ],
    },

    {
      type: "text",
      heading: "Why the 2.0 µm Wavelength Matters",
      content:
        "The 2.0 µm band offers distinct advantages for material interaction, gas absorption sensing, and medical applications due to its absorption characteristics and atmospheric transmission. Its wavelength characteristics make it ideal for polymer processing, gas detection, LIDAR research and mid-IR generation.",
    },

    {
      type: "features",
      heading: "Typical Technical Strengths",
      bullets: [
        "High optical signal-to-noise ratio and long coherence length",
        "Robust continuous operation with minimal drift",
        "Excellent beam quality (near-diffraction-limited)",
        "Polarization-maintaining options and single-mode delivery",
        "Efficient thermal management and high-damage-threshold components",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "This laser category supports precision polymer welding and micromachining, spectroscopy and frequency references, gas sensing for CO₂/CH₄, LIDAR and remote sensing, medical device integration, and laboratory-grade interferometry and metrology.",
    },

    {
      type: "features",
      heading: "Integration & Deployment Considerations",
      bullets: [
        "Select appropriate cooling and facility power for high CW output",
        "Match wavelength and linewidth to target species or process",
        "Plan beam delivery (fiber vs free-space) and connector types",
        "Implement safety interlocks and mid-IR protective measures",
        "Confirm mounting, EMI, and vibration requirements for field use",
      ],
    },

    {
      type: "text",
      heading: "Design & Reliability",
      content:
        "Fiber-integrated designs reduce alignment sensitivity and improve durability versus bulk solid-state systems. Each unit is tested for linewidth stability, power consistency, thermal cycling, and long-term runtime reliability to meet demanding operational needs.",
    },

    {
      type: "features",
      heading: "Manufacturing Quality & Support",
      bullets: [
        "Production and testing performed with strict QA protocols",
        "Model-specific verification: power, linewidth, and environmental tests",
        "Technical support for integration, customization and commissioning",
      ],
    },

    {
      type: "text",
      heading: "Summary",
      content:
        "The High-Power CW Single-Frequency Fiber Laser (2.0 µm) provides a dependable, narrow-linewidth CW source for integrators and researchers requiring stable mid-IR performance. With a fiber-based, rugged architecture and comprehensive testing, it is suited for long-term deployment in industrial and scientific systems.",
    },
  ],

  relatedProducts: [
    {
      slug: "2um-cw",
      title: "High-Power CW Single-Frequency Fiber Laser (1.0 µm)",
      shortDescription: "High-power narrow-linewidth CW laser at 1.0 µm for precision tasks.",
      image: { src: "/high-power/2um-cw/", alt: "1.0 µm High-Power Laser" },
      href: "/high-power/2um-cw/",
    },
    {
      slug: "2um-cw",
      title: "Kilowatt-Level Fiber Laser for Combustion Diagnostics",
      shortDescription: "Kilowatt-class fiber lasers for combustion research and diagnostics.",
      image: { src: "/high-power/2um-cw/", alt: "Kilowatt fiber laser" },
      href: "/high-power/2um-cw/",
    },
  ],
};

export default highPowerCWSingleFrequencyFiberLaser2um;
