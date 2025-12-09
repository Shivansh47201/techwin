import { Product } from "@/types/categories";

export const fiberAmplifierModules: Product = {
  slug: "fiber-amplifier-modules",
  category: "fiber-amplifiers",

  meta: {
    title: "Fiber Amplifier Modules | Compact OEM Fiber Amplifier Solutions",
    description:
      "Fiber Amplifier Modules offer compact, integrable amplification for OEM systems with low noise, high gain and stable performance. Ideal for optical instruments, telecom and sensing platforms.",
    keywords:
      "fiber amplifier modules, compact fiber amplifier, OEM fiber amplifier, low noise fiber amplifier, Techwin fiber amplifiers",
  },

  title: "Fiber Amplifier Modules",

  shortDescription:
    "Fiber Amplifier Modules offer a compact, integrable amplification solution for OEM systems. Featuring low noise, high gain, and stable polarization management (optional), these modules provide reliable performance while supporting flexible wavelength and power configurations.",

  heroImage: {
    src: "/products/fiber-amplifiers/modules/hero.jpg",
    alt: "Fiber Amplifier Modules",
  },

  graphImageURL: "/products/fiber-amplifiers/modules/graph.jpg",
  tableImageURL: "/products/fiber-amplifiers/modules/table.png",

  galleryImages: [
    {
      src: "/products/fiber-amplifiers/modules/hero.jpg",
      alt: "Fiber amplifier module front view",
    },
    {
      src: "/products/fiber-amplifiers/modules/hero.jpg",
      alt: "Fiber amplifier module integration",
    },
  ],

  datasheetUrl: "/products/fiber-amplifiers/modules/datasheet.jpg",
  datasheetImageSrc: "/products/fiber-amplifiers/modules/datasheet.jpg",
  previewImageSrc: "/products/fiber-amplifiers/modules/preview.jpg",

  // From your Product Features
  features: [
    "Compact design",
    "High gain",
    "Low noise",
    "Customizable configurations",
    "Easy system integration",
  ],

  // From your Application Areas
  applicationAreas: [
    "Optical instruments",
    "Telecom systems",
    "Sensing platforms",
    "Integration into high-performance laser systems",
  ],

  sections: [
    {
      type: "text",
      heading: "Fiber Amplifier Modules",
      image: {
        src: "/products/fiber-amplifiers/modules/hero.jpg",
        alt: "Fiber Amplifier Modules",
      },
      content:
        "Fiber Amplifier Modules offer a compact, integrable amplification solution for OEM systems. Featuring low noise, high gain, and stable polarization management (optional), these modules provide reliable performance while supporting flexible wavelength and power configurations.",
    },
    {
      type: "features",
      heading: "Product Features",
      bullets: [
        "Compact design",
        "High gain",
        "Low noise",
        "Customizable configurations",
        "Easy system integration",
      ],
    },
    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Optical instruments",
        "Telecom systems",
        "Sensing platforms",
        "Integration into high-performance laser systems",
      ],
    },
  ],

  // except jisme update kar rahe, baaki sab related products
  relatedProducts: [
    {
      slug: "pm",
      title: "Polarization-Maintaining Fiber Amplifier",
      shortDescription:
        "PM fiber amplifier with high polarization extinction ratio and low noise for coherent communication and sensing.",
      image: {
        src: "/products/fiber-amplifiers/pm/hero.jpg",
        alt: "Polarization-Maintaining Fiber Amplifier",
      },
      href: "/products/fiber-amplifiers/pm",
    },
    {
      slug: "high-power",
      title: "High-Power Fiber Amplifier",
      shortDescription:
        "High-power MOPA fiber amplifier with excellent beam quality and efficient thermal management.",
      image: {
        src: "/products/fiber-amplifiers/high-power/hero.jpg",
        alt: "High-Power Fiber Amplifier",
      },
      href: "/products/fiber-amplifiers/high-power",
    },
  ],
};

export default fiberAmplifierModules;
