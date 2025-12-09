import { Product } from "@/types/categories";

export const nm532WavelengthConversionLaser: Product = {
  slug: "532nm",
  category: "wavelength-conversion",

  meta: {
    title: "532 nm Wavelength Conversion Laser | Techwin Green SHG System",
    description:
      "Techwin 532 nm Wavelength Conversion Laser offering high brightness, low noise and stable beam quality for precision machining, biomedical systems and scientific instrumentation. Contact +86-13958180450.",
    keywords:
      "532 nm laser, green frequency conversion, SHG green laser, wavelength conversion 532nm, Techwin 532nm, biomedical laser, micro-processing laser"
  },

  title: "532 nm Wavelength Conversion Laser",

  shortDescription:
    "The 532 nm wavelength conversion laser is a high-performance green laser developed with fully independent intellectual property and internationally advanced technology. Utilizing highly efficient nonlinear frequency-conversion methods and an optimized optical path design, it delivers high brightness, low noise, and outstanding beam quality. Enhanced by intelligent stability control and refined beam-quality optimization, this laser ensures reliable and consistent green-light output for demanding applications.",

  heroImage: {
    src: "/products/wavelength-conversion/532nm/hero.jpg",
    alt: "532 nm Wavelength Conversion Laser",
  },

  /** NEW — GRAPH + TABLE IMAGE LINKS */
  graphImageURL: "/products/wavelength-conversion/532nm/graph.jpg",
  tableImageURL: "/products/wavelength-conversion/532nm/table.png",

  galleryImages: [
    {
      src: "/products/wavelength-conversion/532nm/hero.jpg",
      alt: "532 nm wavelength conversion laser module view",
    },
    {
      src: "/products/wavelength-conversion/532nm/hero.jpg",
      alt: "532 nm wavelength conversion laser housing",
    },
  ],

  datasheetUrl: "/products/wavelength-conversion/532nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/532nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/532nm/preview.jpg",

  /** ROOT FEATURES — taken from your provided points */
  features: [
    "Advanced beam-quality optimization system",
    "High-efficiency nonlinear frequency-conversion technology",
    "Intelligent stability and power-control system"
  ],

  applicationAreas: [
    "Precision machining and micro-processing",
    "Biomedical and life-science applications",
    "Scientific research instruments and laboratory systems"
  ],

  sections: [
    {
      type: "text",
      heading: "532 nm Wavelength Conversion Laser",
      image: {
        src: "/products/wavelength-conversion/532nm/hero.jpg",
        alt: "532 nm Wavelength Conversion Laser overview"
      },
      content:
        "The 532 nm wavelength conversion laser is a high-performance green laser developed with fully independent intellectual property and internationally advanced technology. Utilizing highly efficient nonlinear frequency-conversion methods and an optimized optical path design, it delivers high brightness, low noise, and outstanding beam quality. Enhanced by intelligent stability control and refined beam-quality optimization, this laser ensures reliable and consistent green-light output for demanding applications."
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Advanced beam-quality optimization system",
        "High-efficiency nonlinear frequency-conversion technology",
        "Intelligent stability and power-control system"
      ]
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Precision machining and micro-processing",
        "Biomedical and life-science applications",
        "Scientific research instruments and laboratory systems"
      ]
    }
  ],

  /** RELATED — all wavelength-conversion lasers except 532nm */
  relatedProducts: [
    {
      slug: "193nm",
      title: "193 nm Wavelength Conversion Laser",
      shortDescription:
        "Deep-UV output for semiconductor inspection and microscopic material analysis.",
      image: {
        src: "/products/wavelength-conversion/193nm/hero.jpg",
        alt: "193 nm Wavelength Conversion Laser"
      },
      href: "/products/wavelength-conversion/193nm"
    },
    {
      slug: "266nm",
      title: "266 nm Wavelength Conversion Laser",
      shortDescription:
        "Fourth-harmonic deep-UV laser for advanced semiconductor and materials processing.",
      image: {
        src: "/products/wavelength-conversion/266nm/hero.jpg",
        alt: "266 nm Wavelength Conversion Laser"
      },
      href: "/products/wavelength-conversion/266nm"
    },
    {
      slug: "355nm",
      title: "355 nm Wavelength Conversion Laser",
      shortDescription:
        "UV frequency-conversion system for semiconductor inspection and precise UV machining.",
      image: {
        src: "/products/wavelength-conversion/355nm/hero.jpg",
        alt: "355 nm Wavelength Conversion Laser"
      },
      href: "/products/wavelength-conversion/355nm"
    },
    {
      slug: "780nm",
      title: "780 nm Wavelength Conversion Laser",
      shortDescription:
        "780 nm green-converted laser for biomedical optics and laboratory instrumentation.",
      image: {
        src: "/products/wavelength-conversion/780nm/hero.jpg",
        alt: "780 nm Wavelength Conversion Laser"
      },
      href: "/products/wavelength-conversion/780nm"
    },
    {
      slug: "795nm",
      title: "795 nm Wavelength Conversion Laser",
      shortDescription:
        "795 nm wavelength-converted laser for rubidium physics and precision atomic measurement.",
      image: {
        src: "/products/wavelength-conversion/795nm/hero.jpg",
        alt: "795 nm Wavelength Conversion Laser"
      },
      href: "/products/wavelength-conversion/795nm"
    }
  ]
};

export default nm532WavelengthConversionLaser;
