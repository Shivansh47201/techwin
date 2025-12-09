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
    "The 193 nm wavelength conversion laser is a high-performance narrow-linewidth deep-UV laser created by integrating a proprietary narrow-linewidth fiber laser with advanced, highly efficient frequency-conversion technology. It delivers exceptional beam quality, stable output power, and reliable long-term performance. Its precise wavelength generation and refined linewidth control make it suitable for demanding scientific and industrial applications.",

  heroImage: {
    src: "/products/wavelength-conversion/193nm/hero.jpg",
    alt: "193 nm Wavelength Conversion Laser",
  },

  /** NEW — image URLs **/
  graphImageURL: "/products/wavelength-conversion/193nm/graph.jpg",
  tableImageURL: "/products/wavelength-conversion/193nm/table.png",

  galleryImages: [
    {
      src: "/products/wavelength-conversion/193nm/hero.jpg",
      alt: "193 nm wavelength conversion laser front view",
    },
    {
      src: "/products/wavelength-conversion/193nm/hero.jpg",
      alt: "193 nm wavelength conversion laser module view",
    },
  ],

  datasheetUrl: "/products/wavelength-conversion/193nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/193nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/193nm/preview.jpg",

  /** OPTIONAL ROOT BULLETS — extracted directly from your description **/
  features: [
    "Deep ultraviolet (DUV) generation technology",
    "Advanced linewidth control",
    "High power stability and reliability",
  ],

  applicationAreas: [
    "Precision micro-machining",
    "Medical and biomedical applications",
    "Semiconductor lithography and processing",
  ],

  sections: [
    {
      type: "text",
      heading: "193 nm Wavelength Conversion Laser",
      image: {
        src: "/products/wavelength-conversion/193nm/hero.jpg",
        alt: "193 nm Wavelength Conversion Laser overview",
      },
      content:
        "The 193 nm wavelength conversion laser is a high-performance narrow-linewidth deep-UV laser created by integrating a proprietary narrow-linewidth fiber laser with advanced, highly efficient frequency-conversion technology. It delivers exceptional beam quality, stable output power, and reliable long-term performance. Its precise wavelength generation and refined linewidth control make it suitable for demanding scientific and industrial applications.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Deep ultraviolet (DUV) generation technology",
        "Advanced linewidth control",
        "High power stability and reliability",
      ],
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Precision micro-machining",
        "Medical and biomedical applications",
        "Semiconductor lithography and processing",
      ],
    },

    /** Existing engineering section */
    {
      type: "features",
      heading: "Additional Attribute Highlights",
      bullets: [
        "Deep-UV 193 nm single- or narrow-linewidth emission",
        "High optical stability with low long-term drift",
        "Excellent pointing and beam uniformity for sub-micron tasks",
        "Sealed/low-contamination optical path suitable for cleanrooms",
        "Temperature-stabilized conversion crystals and optimized alignment",
        "Configurable pulse or CW behavior depending on model",
      ],
    },
  ],

  /** UPDATED + EXPANDED RELATED PRODUCTS **/
  relatedProducts: [
    {
      slug: "266nm",
      title: "266 nm Wavelength Conversion Laser",
      shortDescription: "Deep-UV 266 nm systems for micro-processing, spectroscopy and inspection.",
      image: {
        src: "/products/wavelength-conversion/266nm/hero.jpg",
        alt: "266 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/266nm",
    },
    {
      slug: "355nm",
      title: "355 nm Wavelength Conversion Laser",
      shortDescription: "UV 355 nm modules for precision processing and UV spectroscopy.",
      image: {
        src: "/products/wavelength-conversion/355nm/hero.jpg",
        alt: "355 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/355nm",
    },
    {
      slug: "532nm",
      title: "532 nm Wavelength Conversion Laser",
      shortDescription: "Green 532 nm frequency-conversion laser for micro-machining and biomedical optics.",
      image: {
        src: "/products/wavelength-conversion/532nm/hero.jpg",
        alt: "532 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/532nm",
    },
    {
      slug: "780nm",
      title: "780 nm Wavelength Conversion Laser",
      shortDescription: "780 nm frequency-doubled laser for biomedical and instrumentation applications.",
      image: {
        src: "/products/wavelength-conversion/780nm/hero.jpg",
        alt: "780 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/780nm",
    },
    {
      slug: "795nm",
      title: "795 nm Wavelength Conversion Laser",
      shortDescription: "795 nm narrow-linewidth laser for rubidium physics and precision measurement.",
      image: {
        src: "/products/wavelength-conversion/795nm/hero.jpg",
        alt: "795 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/795nm",
    },
  ],
};

export default nm193WavelengthConversionLaser;
