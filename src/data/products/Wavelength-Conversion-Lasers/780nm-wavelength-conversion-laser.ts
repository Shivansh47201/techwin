import { Product } from "@/types/categories";

export const nm780WavelengthConversionLaser: Product = {
  slug: "780nm",
  category: "wavelength-conversion",

  meta: {
    title: "780 nm Wavelength Conversion Laser | Techwin UV Laser Systems",
    description:
      "Techwin 780 nm Wavelength Conversion Laser designed for stable narrow-linewidth output, scientific instrumentation and industrial processing. Manufacturer based in Hangzhou City. Contact +86-13958180450.",
    keywords:
      "780 nm laser, wavelength conversion 780nm, frequency doubled 780nm laser, biomedical NIR laser, spectroscopy 780nm, Techwin 780",
  },

  title: "780 nm Wavelength Conversion Laser",

  shortDescription:
    "The 780 nm wavelength conversion laser is a high-performance frequency-doubled laser developed with fully independent intellectual property and internationally advanced technology. Through the use of efficient nonlinear frequency-conversion techniques, a compact optical path design, and integrated beam-quality optimization with power-stability control, it delivers high brightness, low noise, excellent beam quality, and highly stable output power.",

  heroImage: {
    src: "/products/wavelength-conversion/780nm/hero.jpg",
    alt: "780 nm Wavelength Conversion Laser",
  },

  /** GRAPH + TABLE IMAGE SUPPORT */
  graphImageURL: "/products/wavelength-conversion/780nm/graph.jpg",
  tableImageURL: "/products/wavelength-conversion/780nm/table.png",

  galleryImages: [
    {
      src: "/products/wavelength-conversion/780nm/hero.jpg",
      alt: "780 nm wavelength conversion laser front view",
    },
    {
      src: "/products/wavelength-conversion/780nm/hero.jpg",
      alt: "780 nm wavelength conversion laser housing",
    },
  ],

  datasheetUrl: "/products/wavelength-conversion/780nm/datasheet.jpg",
  datasheetImageSrc: "/products/wavelength-conversion/780nm/datasheet.jpg",
  previewImageSrc: "/products/wavelength-conversion/780nm/preview.jpg",

  /** NEW ROOT GROUPED FEATURES — FROM YOUR DESCRIPTION */
  features: [
    "Efficient nonlinear frequency-conversion techniques",
    "Compact optical path design",
    "Integrated beam-quality optimization and power-stability control",
  ],

  applicationAreas: [
    "Biomedical applications",
    "Scientific instrumentation",
    "Industrial processing",
  ],

  sections: [
    {
      type: "text",
      heading: "780 nm Wavelength Conversion Laser",
      image: {
        src: "/products/wavelength-conversion/780nm/hero.jpg",
        alt: "780 nm Wavelength Conversion Laser overview",
      },
      content:
        "The 780 nm wavelength conversion laser is a high-performance frequency-doubled laser developed with fully independent intellectual property and internationally advanced technology. Through the use of efficient nonlinear frequency-conversion techniques, a compact optical path design, and integrated beam-quality optimization with power-stability control, it delivers high brightness, low noise, excellent beam quality, and highly stable output power.",
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Biomedical applications",
        "Scientific instrumentation",
        "Industrial processing",
      ],
    },

    /** Your original deeper engineering details preserved */
    {
      type: "text",
      heading: "Overview of the 780 nm Wavelength Conversion Laser",
      content:
        "The 780 nm Wavelength Conversion Laser is engineered to deliver spectrally-clean, narrow-linewidth output suitable for precision spectroscopy, calibration and NIR laboratory systems. Active wavelength stabilization, thermal control and clean optical routing deliver reliable long-duration operation.",
    },

    {
      type: "features",
      heading: "Technical Considerations",
      bullets: [
        "High wavelength accuracy with low drift",
        "Excellent beam quality with low M²",
        "Temperature-controlled nonlinear conversion stages",
        "Fiber-coupled or free-space interface options",
        "Low relative intensity noise and high SMSR",
      ],
    },
  ],

  /** EXPANDED RELATED PRODUCTS — ALL OTHERS EXCEPT 780nm */
  relatedProducts: [
    {
      slug: "193nm",
      title: "193 nm Wavelength Conversion Laser",
      shortDescription:
        "Deep-UV 193 nm source for semiconductor inspection and photomask metrology.",
      image: {
        src: "/products/wavelength-conversion/193nm/hero.jpg",
        alt: "193 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/193nm",
    },
    {
      slug: "266nm",
      title: "266 nm Wavelength Conversion Laser",
      shortDescription:
        "Fourth-harmonic UV system for semiconductor and materials analysis.",
      image: {
        src: "/products/wavelength-conversion/266nm/hero.jpg",
        alt: "266 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/266nm",
    },
    {
      slug: "355nm",
      title: "355 nm Wavelength Conversion Laser",
      shortDescription:
        "UV THG system for semiconductor, micro-machining and spectroscopy.",
      image: {
        src: "/products/wavelength-conversion/355nm/hero.jpg",
        alt: "355 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/355nm",
    },
    {
      slug: "532nm",
      title: "532 nm Wavelength Conversion Laser",
      shortDescription:
        "Green SHG laser for micro-processing, life sciences and sensing.",
      image: {
        src: "/products/wavelength-conversion/532nm/hero.jpg",
        alt: "532 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/532nm",
    },
    {
      slug: "795nm",
      title: "795 nm Wavelength Conversion Laser",
      shortDescription:
        "795 nm converted laser for rubidium physics, optical pumping and atomic experimentation.",
      image: {
        src: "/products/wavelength-conversion/795nm/hero.jpg",
        alt: "795 nm Wavelength Conversion Laser",
      },
      href: "/products/wavelength-conversion/795nm",
    },
  ],
};

export default nm780WavelengthConversionLaser;
