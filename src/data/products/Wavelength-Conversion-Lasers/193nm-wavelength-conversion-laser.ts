import { Product } from "@/types/categories";

export const nm193WavelengthConversionLaser: Product = {
  slug: "193nm",
  category: "wavelength-conversion",

  meta: {
    title: "193 nm Wavelength Conversion Laser | Techwin Precision Systems",
    description:
      "Techwin 193 nm Wavelength Conversion Laser for precise UV applications. Manufacturer in Hangzhou City. Contact +86-13958180450 for details and technical support.",
    keywords:
      "193 nm laser, deep-UV laser, 193nm wavelength conversion, photomask inspection laser, deep ultraviolet laser, Techwin 193nm",
  },

  title: "193 nm Wavelength Conversion Laser",
  shortDescription:
    "Deep-UV 193 nm wavelength conversion laser engineered for semiconductor metrology, photomask inspection, micro-scale measurement and precision UV processes with stable long-term output.",

  heroImage: { src: "/products/wavelength-conversion/193nm/hero.jpg",
    alt: "193 nm Wavelength Conversion Laser",
  },

  galleryImages: [
      { src: "/wavelength-conversion/193nm/preview.jpg", alt: "193nm wavelength conversion laser preview" },
      { src: "/wavelength-conversion/193nm/hero.jpg", alt: "193nm wavelength conversion laser hero" },
    ],

  datasheetUrl: "/products/wavelength-conversion/193nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/193nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/193nm/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview — 193 nm Wavelength Conversion Laser",
      image: { src: "/wavelength-conversion/193nm/hero.jpg", alt: "193 nm overview" },
      content:
        "The 193 nm Wavelength Conversion Laser delivers deep-ultraviolet output optimized for high-resolution imaging, photomask inspection, microlithography research and precision material analysis. Built for long-term stability, narrow linewidth and repeatable beam performance, the system supports demanding semiconductor and metrology workflows.",
    },

    {
      type: "features",
      heading: "Key Attributes",
      bullets: [
        "Deep-UV 193 nm single- or narrow-linewidth emission",
        "High optical stability with low long-term drift",
        "Excellent pointing and beam uniformity for sub-micron tasks",
        "Sealed/low-contamination optical path suitable for cleanrooms",
        "Temperature-stabilized conversion crystals and optimized alignment",
        "Configurable pulse or CW behavior depending on model",
      ],
    },

    {
      type: "text",
      heading: "Why 193 nm Matters",
      content:
        "The 193 nm band enables high-resolution inspection and micro-scale processing due to its short wavelength and strong interaction with photo-resist and many substrate materials. It offers superior spatial resolution and reduced thermal loading compared with longer wavelengths.",
    },

    {
      type: "features",
      heading: "Primary Applications",
      bullets: [
        "Semiconductor photomask inspection and metrology",
        "Microlithography research and pattern evaluation",
        "Nanostructure measurement and thin-film inspection",
        "High-resolution UV spectroscopy and surface analysis",
        "Advanced scientific experiments requiring deep-UV sources",
      ],
    },

    {
      type: "text",
      heading: "Technical Performance",
      content:
        "Typical systems offer narrow linewidth performance, stable optical power, excellent beam quality (low M²) and robust pointing stability. Exact specs (power, pulse parameters, linewidth) are model-dependent — request the model datasheet for precise numbers.",
    },

    {
      type: "features",
      heading: "Engineering & Integration Notes",
      bullets: [
        "Optimized nonlinear conversion crystals and phase-matching for efficient UV generation",
        "Thermal control and environmental sealing to prevent contamination and drift",
        "Mechanical design that minimizes alignment drift and vibration sensitivity",
        "Multiple output formats: fiber-coupled (where applicable) or free-space",
        "Interfaces for common industrial control and OEM integration",
      ],
    },

    {
      type: "text",
      heading: "Selection Considerations",
      content:
        "When selecting a 193 nm system consider required UV power, duty cycle (CW vs pulsed), linewidth tolerance, beam quality (M²), cooling method, and cleanroom compatibility. Provide these details when requesting a quote to get the correct model recommendations.",
    },

    {
      type: "text",
      heading: "Support & Ordering",
      content:
        "For datasheets, model options, integration assistance or quotations, provide your required output (power/line width), operating environment, and preferred delivery format. For technical support and sales contact +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "266nm",
      title: "266 nm Wavelength Conversion Laser",
      shortDescription: "Deep-UV 266 nm systems for micro-processing, spectroscopy and inspection.",
      image: { src: "/wavelength-conversion/266nm/hero.jpg", alt: "266 nm laser" },
      href: "/wavelength-conversion/266nm",
    },
    {
      slug: "355nm",
      title: "355 nm Wavelength Conversion Laser",
      shortDescription: "UV 355 nm modules for precision material processing and spectroscopy.",
      image: { src: "/wavelength-conversion/355nm/hero.jpg", alt: "355 nm laser" },
      href: "/wavelength-conversion/355nm",
    },
  ],
};

export default nm193WavelengthConversionLaser;
