import { Product } from "@/types/categories";

export const nm780WavelengthConversionLaser: Product = {
  slug: "780nm",
  category: "wavelength-conversion",

  meta: {
    title: "780 nm Wavelength Conversion Laser | Techwin UV Laser Systems",
    description:
      "Techwin 780 nm Wavelength Conversion Laser designed for reliable UV applications. Contact +86-13958180450 for technical details. Manufacturer based in Hangzhou City.",
    keywords:
      "780 nm laser, wavelength conversion 780nm, rubidium D2 laser, optical pumping laser, wavelength-conversion, Techwin 780nm",
  },

  title: "780 nm Wavelength Conversion Laser",
  shortDescription:
    "Precision 780 nm wavelength-converted laser engineered for atomic physics, spectroscopy, imaging calibration and metrology — offering narrow linewidth, stable output and long-duration reliability.",

  heroImage: { src: "/products/wavelength-conversion/780nm/hero.jpg",
    alt: "780 nm Wavelength Conversion Laser",
  },

  galleryImages: [
      { src: "/wavelength-conversion/780nm/preview.jpg", alt: "780nm wavelength conversion laser preview" },
      { src: "/wavelength-conversion/780nm/hero.jpg", alt: "780nm wavelength conversion laser hero" },
    ],

  datasheetUrl: "/products/wavelength-conversion/780nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/780nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/780nm/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 780 nm Wavelength Conversion Laser",
      image: { src: "/wavelength-conversion/780nm/hero.jpg", alt: "780 nm overview" },
      content:
        "The 780 nm Wavelength Conversion Laser is engineered to deliver spectrally-clean, narrow-linewidth output suitable for rubidium D2 transitions, precision spectroscopy, laser cooling and magneto-optical trapping. Built with robust wavelength-conversion modules, active thermal stabilization and spectral filtering, it supports long-duration experiments and industrial test benches.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Narrow-linewidth single-frequency emission for atomic transition work",
        "High wavelength accuracy with low long-term drift",
        "Excellent beam quality (near-diffraction-limited mode)",
        "Efficient nonlinear conversion architecture with phase-matched crystals",
        "Temperature-controlled optical modules for spectral stability",
        "Fiber-coupled or free-space output delivery options",
      ],
    },

    {
      type: "text",
      heading: "Design Structure and Optical Engineering",
      content:
        "The 780 nm output is produced via nonlinear conversion (SHG/SFG/OPG depending on configuration) using precision crystals, active temperature control and spectral filtering stages. Electronic feedback and driver systems maintain power stability and protect against back-reflection to preserve linewidth and mode quality.",
    },

    {
      type: "features",
      heading: "Applications",
      bullets: [
        "Rubidium-based atomic physics (optical pumping, laser cooling, MOT)",
        "High-resolution absorption and fluorescence spectroscopy",
        "Frequency reference and atomic clock research",
        "NIR imaging calibration and detector alignment",
        "Microscopy illumination, semiconductor inspection and metrology",
      ],
    },

    {
      type: "text",
      heading: "Technical Performance Expectations",
      content:
        "Typical performance parameters include narrow linewidth (kHz-level achievable depending on model), stable output power in the mW to higher lab-grade range, low RIN, high SMSR, and long coherence length. Exact specs vary by model and configuration—consult the datasheet for model-specific values.",
    },

    {
      type: "features",
      heading: "Integration & Maintenance Notes",
      bullets: [
        "Keep optical surfaces clean and maintain thermal control for best performance",
        "Use recommended mounting and vibration isolation for long-term stability",
        "Confirm fiber or free-space interface options at order time",
        "Regularly verify wavelength and power using reference cells and diagnostic tools",
      ],
    },

    {
      type: "text",
      heading: "Why Choose 780 nm Wavelength Conversion Systems?",
      content:
        "The 780 nm band aligns closely with key atomic transitions and provides an ideal balance between imaging penetration and photon energy for many lab and industrial tasks. Conversion modules with high spectral purity and thermal control enable reproducible results in precision experiments and manufacturing tests.",
    },

    {
      type: "text",
      heading: "How to Request a Quotation",
      content:
        "For datasheets, model options, and integration guidance, please provide required power, linewidth tolerance, desired output format (fiber/free-space), and environmental operating conditions when contacting our team. We can supply custom configurations and integration assistance.",
    },
  ],

  relatedProducts: [
    {
      slug: "795nm",
      title: "795 nm Wavelength Conversion Laser",
      shortDescription: "Near-IR 795 nm source optimized for rubidium D1 transitions and MOT setups.",
      image: { src: "/wavelength-conversion/795nm/hero.jpg", alt: "795 nm laser" },
      href: "/wavelength-conversion/795nm",
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

export default nm780WavelengthConversionLaser;
