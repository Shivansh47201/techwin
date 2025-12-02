import { Product } from "@/types/categories";

export const nm266WavelengthConversionLaser: Product = {
  slug: "266nm",
  category: "wavelength-conversion",

  meta: {
    title: "266 nm Wavelength Conversion Laser | Techwin | High Stability",
    description:
      "Techwin 266 nm Wavelength Conversion Laser systems offering precise UV output and stable performance for industrial and research use. Contact +86-13958180450 today now.",
    keywords:
      "266 nm laser, deep-UV laser, wavelength conversion 266nm, fourth harmonic generation, THG 266, Techwin 266nm, UV laser system",
  },

  title: "266 nm Wavelength Conversion Laser",
  shortDescription:
    "Deep-UV 266 nm wavelength-converted lasers engineered for precise UV output, narrow linewidth, strong beam quality and long-term stability for research and industrial applications.",

  heroImage: { src: "/products/wavelength-conversion/266nm/hero.jpg",
    alt: "266 nm Wavelength Conversion Laser",
  },

  galleryImages: [
      { src: "/wavelength-conversion/266nm/preview.jpg", alt: "266nm wavelength conversion laser preview" },
      { src: "/wavelength-conversion/266nm/hero.jpg", alt: "266nm wavelength conversion laser hero" },
    ],

  datasheetUrl: "/products/wavelength-conversion/266nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/266nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/266nm/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Introduction to 266 nm UV Generation Technology",
      image: { src: "/wavelength-conversion/266nm/hero.jpg", alt: "266 nm UV introduction" },
      content:
        "The 266 nm output is produced by multi-stage nonlinear frequency conversion (commonly fourth-harmonic generation) from a stable infrared/visible fundamental. Systems are engineered for high conversion efficiency, tight wavelength tolerance and long-term operational stability for deep-UV tasks.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Stable deep-UV output (266 nm) with narrow linewidth",
        "High long-term power stability and low drift",
        "Excellent beam quality (low M²) for fine-scale work",
        "Temperature-stabilized conversion crystals for repeatable performance",
        "Compact modules with dust-protected housings and robust mounts",
        "Configurable output (fiber-coupled or free-space) and power classes",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Typical uses include semiconductor lithography research, wafer inspection, material micro-processing, DNA/protein fluorescence excitation, Raman and deep-UV spectroscopy, environmental trace-gas detection, and laboratory-grade UV instrumentation.",
    },

    {
      type: "features",
      heading: "Technical Characteristics",
      bullets: [
        "UV power adjustable to application needs (model-dependent)",
        "Low relative intensity noise (RIN) and high SMSR for spectral purity",
        "Beam profile optimized for focusability and uniform energy delivery",
        "Smart thermal and electrical control for stable conversion efficiency",
        "Mechanical designs that minimize alignment drift and vibration sensitivity",
      ],
    },

    {
      type: "text",
      heading: "Design & Working Principle",
      content:
        "A stable fundamental laser (e.g., 1064 nm) is frequency-doubled and subsequently converted to 266 nm using carefully phase-matched crystals and active temperature control. Filtering and isolation stages protect components and ensure a clean UV beam suitable for sensitive applications.",
    },

    {
      type: "features",
      heading: "Selection Considerations",
      bullets: [
        "Required UV power level and application duty cycle",
        "Allowed linewidth and wavelength tolerance for your measurements",
        "Beam quality (M²) and delivery format (fiber vs free-space)",
        "Cooling requirements (air vs water) based on power and environment",
        "Maintenance plan for nonlinear crystals and optical coatings",
      ],
    },

    {
      type: "text",
      heading: "Quality Assurance & Support",
      content:
        "Systems are manufactured and tested for thermal stability, power repeatability, beam quality and long-term reliability. Technical support includes specification guidance, integration help and model-specific datasheets to ensure correct selection and deployment.",
    },

    {
      type: "text",
      heading: "How to Request Information",
      content:
        "To request datasheets or a quotation, provide your required UV power, linewidth tolerance, preferred output format and operating environment. For assistance and ordering, contact +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "355nm",
      title: "355 nm Wavelength Conversion Laser",
      shortDescription: "UV (355 nm) modules for high-resolution UV processing and spectroscopy.",
      image: { src: "/wavelength-conversion/355nm/hero.jpg", alt: "355 nm laser" },
      href: "/wavelength-conversion/355nm",
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

export default nm266WavelengthConversionLaser;
