import { Product } from "@/types/categories";

export const nm795WavelengthConversionLaser: Product = {
  slug: "795nm",
  category: "wavelength-conversion",

  meta: {
    title: "795 nm Wavelength Conversion Laser | Techwin UV Laser Systems",
    description:
      "Techwin 795 nm Wavelength Conversion Laser for UV system precision. Contact +86-13958180450 for details. Manufacturer located in Hangzhou City for optical solutions.",
    keywords:
      "795 nm laser, wavelength conversion 795nm, rubidium laser 795, optical pumping laser, frequency conversion laser, Techwin 795nm",
  },

  title: "795 nm Wavelength Conversion Laser",
  shortDescription:
    "A precision 795 nm wavelength-converted laser designed for atomic physics, spectroscopy, optical pumping and metrology, offering narrow linewidth, high stability and reliable long-duration operation.",

  heroImage: { src: "/products/wavelength-conversion/795nm/hero.jpg",
    alt: "795 nm Wavelength Conversion Laser",
  },

  galleryImages: [
      { src: "/wavelength-conversion/795nm/preview.jpg", alt: "795nm wavelength conversion laser preview" },
      { src: "/wavelength-conversion/795nm/hero.jpg", alt: "795nm wavelength conversion laser hero" },
    ],

  datasheetUrl: "/products/wavelength-conversion/795nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/795nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/795nm/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "About the 795 nm Wavelength",
      image: { src: "/wavelength-conversion/795nm/hero.jpg", alt: "795 nm overview" },
      content:
        "The 795 nm wavelength is commonly used for rubidium D-line transitions and supports laser cooling, magneto-optical trapping, optical pumping and high-resolution spectroscopy. This wavelength-converted source is engineered for spectral purity, repeatable performance and low-noise operation in laboratory and industrial measurement systems.",
    },

    {
      type: "features",
      heading: "Core Characteristics",
      bullets: [
        "Narrow spectral linewidth for frequency-sensitive experiments",
        "Stable output power and low intensity noise",
        "High beam quality with clean spatial mode",
        "Temperature-controlled nonlinear conversion architecture",
        "Robust mechanical housing to minimize vibration impact",
        "Integrated feedback and electronic power control",
      ],
    },

    {
      type: "text",
      heading: "Wavelength Conversion & Engineering Design",
      content:
        "Generated via nonlinear conversion (e.g., SHG/SFG) using precision crystals and actively stabilized temperature control, the system includes spectral filtering and feedback loops to preserve linewidth and deliver a clean 795 nm output suitable for atomic and metrology tasks.",
    },

    {
      type: "features",
      heading: "Common Uses",
      bullets: [
        "Optical pumping and rubidium-based experiments",
        "Magneto-optical trapping (MOT) and laser cooling setups",
        "High-resolution absorption and fluorescence spectroscopy",
        "Frequency reference and atomic clock research",
        "NIR detector calibration and imaging alignment",
      ],
    },

    {
      type: "text",
      heading: "Technical Design Considerations",
      content:
        "Key design elements include crystal selection and phase-matching, active thermal stabilization, spectral filtering stages, precise current/temperature drivers, and robust mechanical mounting to ensure consistent performance across long experimental runs.",
    },

    {
      type: "features",
      heading: "Performance Parameters (Typical)",
      bullets: [
        "Center wavelength: 795 nm (model dependent tuning)",
        "Linewidth: narrow (kHz-level achievable depending on model)",
        "Output power: laboratory-grade mW to higher depending on configuration",
        "Low RIN and high SMSR for spectral purity",
        "Fiber-coupled or free-space output options",
      ],
    },

    {
      type: "text",
      heading: "Integration & Maintenance",
      content:
        "Designed for easy integration with spectroscopy benches, MOT setups and metrology stations. Regular maintenance focuses on keeping optics clean, maintaining thermal control, and verifying electronic driver stability to ensure long-term repeatability.",
    },

    {
      type: "text",
      heading: "Applications in Research & Industry",
      content:
        "Widely used in atomic physics, quantum research, frequency-standard labs, high-resolution spectroscopy and imaging calibration. The 795 nm output is particularly well-suited for rubidium-based experiments and precision metrology where frequency stability is critical.",
    },

    {
      type: "text",
      heading: "How to Request More Information",
      content:
        "For datasheets, model options, and integration support provide application details (required power, linewidth tolerance, desired output format). Contact our technical team for specification guidance and customization options.",
    },
  ],

  relatedProducts: [
    {
      slug: "780nm",
      title: "780 nm Wavelength Conversion Laser",
      shortDescription: "Near-IR wavelength source often used for rubidium and atomic physics experiments.",
      image: { src: "/wavelength-conversion/780nm/hero.jpg", alt: "780 nm laser" },
      href: "/wavelength-conversion/780nm",
    },
    {
      slug: "532nm",
      title: "532 nm Wavelength Conversion Laser",
      shortDescription: "Green SHG lasers for metrology, alignment and visible-range applications.",
      image: { src: "/wavelength-conversion/532nm/hero.jpg", alt: "532 nm laser" },
      href: "/wavelength-conversion/532nm",
    },
  ],
};

export default nm795WavelengthConversionLaser;
