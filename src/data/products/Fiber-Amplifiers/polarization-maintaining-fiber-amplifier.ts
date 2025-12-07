import { Product } from "@/types/categories";

export const polarizationMaintainingFiberAmplifier: Product = {
  slug: "pm",
  category: "fiber-amplifiers",

  meta: {
    title:
      "Polarization-Maintaining Fiber Amplifier by Techwin | Fiber Amplifiers",
    description:
      "Techwin Polarization-Maintaining Fiber Amplifier with stable output, high polarization extinction ratio and dependable performance from Hangzhou City. Contact +86-13958180450 for details.",
    keywords:
      "PM fiber amplifier, polarization maintaining amplifier, fiber amplifier, low-noise amplifier, Techwin fiber amplifiers",
  },

  title: "Polarization-Maintaining Fiber Amplifier",

  shortDescription:
    "The Polarization-Maintaining (PM) Fiber Amplifier is designed to amplify low-power seed lasers while preserving excellent polarization characteristics. With high gain, low noise, and a fully PM optical path, it ensures stable output and reliable performance even in environments sensitive to polarization fluctuations.",

  heroImage: {
    src: "/products/fiber-amplifiers/pm/hero.jpg",
    alt: "Polarization-Maintaining Fiber Amplifier",
  },

  graphImageURL: "/products/fiber-amplifiers/pm/graph.jpg",
  tableImageURL: "/products/fiber-amplifiers/pm/table.png",

  galleryImages: [
    {
      src: "/products/fiber-amplifiers/pm/hero.jpg",
      alt: "Polarization-maintaining fiber amplifier front view",
    },
    {
      src: "/products/fiber-amplifiers/pm/hero.jpg",
      alt: "Polarization-maintaining fiber amplifier module",
    },
  ],

  datasheetUrl: "/products/fiber-amplifiers/pm/datasheet.jpg",
  datasheetImageSrc: "/products/fiber-amplifiers/pm/datasheet.jpg",
  previewImageSrc: "/products/fiber-amplifiers/pm/preview.jpg",

  // From Product Features
  features: [
    "High polarization extinction ratio",
    "Low noise amplification",
    "Stable output",
    "Fully PM fiber structure",
  ],

  // From Application Areas
  applicationAreas: [
    "Coherent communication",
    "Fiber optic sensing",
    "Quantum optics",
    "Precision measurement",
  ],

  sections: [
    {
      type: "text",
      heading: "Polarization-Maintaining Fiber Amplifier",
      image: {
        src: "/products/fiber-amplifiers/pm/hero.jpg",
        alt: "Polarization-Maintaining Fiber Amplifier",
      },
      content:
        "The Polarization-Maintaining (PM) Fiber Amplifier is designed to amplify low-power seed lasers while preserving excellent polarization characteristics. With high gain, low noise, and a fully PM optical path, it ensures stable output and reliable performance even in environments sensitive to polarization fluctuations.",
    },

    {
      type: "features",
      heading: "Product Features",
      bullets: [
        "High polarization extinction ratio",
        "Low noise amplification",
        "Stable output",
        "Fully PM fiber structure",
      ],
    },

    {
      type: "features",
      heading: "Application Areas",
      bullets: [
        "Coherent communication",
        "Fiber optic sensing",
        "Quantum optics",
        "Precision measurement",
      ],
    },

    // Keep some of the deeper technical context as extra sections
    {
      type: "text",
      heading: "Introduction to PM Fiber Amplifier Technology",
      image: {
        src: "/products/fiber-amplifiers/pm/hero.jpg",
        alt: "Polarization Maintaining Fiber Technology",
      },
      content:
        "Polarization-maintaining (PM) fiber amplifiers preserve polarization state during amplification using birefringent PM fibers. The technology supports coherent communication, precision sensing, narrow-linewidth lasers, interferometry, and advanced scientific instruments where polarization stability is critical.",
    },

    {
      type: "specs",
      heading: "Typical Technical Specifications",
      blocks: [
        {
          label: "Signal Stability",
          rows: [
            {
              name: "Linewidth Preservation",
              value: "Maintains narrow linewidth without significant broadening",
            },
            {
              name: "Noise Figure",
              value: "Low, suitable for coherent architectures",
            },
            {
              name: "Environmental Stability",
              value:
                "Resistant to vibration and temperature variations in typical lab/field setups",
            },
          ],
        },
        {
          label: "Integration & Design",
          rows: [
            { name: "Fiber Type", value: "PM fiber input/output" },
            { name: "Package Type", value: "Module or OEM-ready assembly" },
            {
              name: "Cooling",
              value: "Temperature-controlled internal mechanical design",
            },
          ],
        },
      ],
    },

    {
      type: "features",
      heading: "Industry Advantages",
      bullets: [
        "Enhanced coherence for interferometry & sensing",
        "Low sensitivity to environmental disturbances",
        "Custom wavelength configurations available",
        "Long-term reliability with optimized pump control",
        "Compact integration for lab and industrial systems",
      ],
    },

    {
      type: "text",
      heading: "Construction & Internal Design",
      content:
        "Built using PM fibers, pump diodes, WDM couplers, isolators, polarization-maintaining splices and temperature stabilization units, the amplifier maintains optical reliability and consistent output during long-term operation.",
    },

    {
      type: "text",
      heading: "Selection Considerations",
      content:
        "Choose based on output power needs, wavelength compatibility, environmental requirements, noise sensitivity and fiber connector type. Proper selection helps ensure optimal system performance in coherent and sensing architectures.",
    },

    {
      type: "text",
      heading: "Support & Customization",
      content:
        "Custom options include wavelength selection, output power levels and integration guidance. For technical assistance or system configuration support, contact our engineering team at +86-13958180450.",
    },
  ],

  // except jisme update kar rahe, baaki sab related
  relatedProducts: [
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
    {
      slug: "modules",
      title: "Fiber Amplifier Modules",
      shortDescription:
        "Compact fiber amplifier modules with low noise, high gain and easy OEM integration.",
      image: {
        src: "/products/fiber-amplifiers/modules/hero.jpg",
        alt: "Fiber Amplifier Modules",
      },
      href: "/products/fiber-amplifiers/modules",
    },
  ],
};

export default polarizationMaintainingFiberAmplifier;
