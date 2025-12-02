import { Product } from "@/types/categories";

export const highPowerFiberAmplifier: Product = {
  slug: "high-power",
  category: "fiber-amplifiers",

  meta: {
    title: "High-Power Fiber Amplifier by Techwin | High-Precision Optical Modules",
    description:
      "High-stability High-Power Fiber Amplifier by Techwin, produced in Hangzhou City for OEM laser systems and precision optical projects. Contact +86-13958180450 for customization.",
    keywords: "fiber amplifier module, OEM amplifier, PM amplifier module, Techwin fiber module",
  },

  title: "High-Power Fiber Amplifier",
  shortDescription:
    "Compact, OEM-ready fiber amplifier modules engineered for stable gain, low noise, and long-term reliability — configurable for CW, pulsed, PM and single-frequency applications.",

  heroImage: { src: "/products/fiber-amplifiers/high-power/hero.jpg",
    alt: "High-Power Fiber Amplifier",
  },

  galleryImages: [
      { src: "/fiber-amplifiers/high-power/preview.jpg", alt: "High-power fiber amplifier preview" },
      { src: "/fiber-amplifiers/high-power/hero.jpg", alt: "High-power fiber amplifier hero" },
    ],

  datasheetUrl: "/products/fiber-amplifiers/high-power/datasheet.jpg",
  datasheetImageSrc: "/products/fiber-amplifiers/high-power/datasheet.jpg",
  previewImageSrc: "/products/fiber-amplifiers/high-power/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview",
      content:
        "Fiber Amplifier Modules are designed for OEM integration and system-level deployment where stable optical gain, compact footprint, and high reliability are required. These modules support continuous-wave (CW), pulsed, polarization-maintaining (PM) and single-frequency seed signals and are manufactured under controlled processes in Hangzhou City.",
    },

    {
      type: "features",
      heading: "Core Features",
      bullets: [
        "OEM-friendly compact form factors (module / benchtop / rack)",
        "Low noise figure and stable gain across operating band",
        "Polarization-maintaining (PM) and non-PM options",
        "CW, pulsed and single-frequency compatible designs",
        "Integrated pump diodes with automated protection",
        "Digital and analog control interfaces (RS232 / USB / Ethernet / Analog)",
        "Custom fiber pigtail length and connector types",
      ],
    },

    {
      type: "specs",
      heading: "Typical Technical Specifications",
      blocks: [
        {
          label: "Mechanical & Electrical",
          rows: [
            { name: "Form Factor", value: "OEM module, benchtop, 19\" rack options" },
            { name: "Cooling", value: "Air-cooled (fan) / optional water-cooled variants" },
            { name: "Control Interface", value: "RS232 / USB / Ethernet / Analog I/O" },
            { name: "Protection", value: "Over-temp, over-current, reverse isolation" },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Module Types",
      content:
        "We provide multiple module architectures: single-stage CW amplifiers for continuous operation, pulsed amplifiers with peak-power shaping, PM amplifiers that preserve SOP, and custom modules tuned for narrow-linewidth single-frequency amplification. Each variant is optimized for low noise and stable thermal behaviour.",
    },

    {
      type: "features",
      heading: "Why Choose These Modules",
      bullets: [
        "Designed for rapid OEM integration and minimal alignment",
        "Stable output power with low drift across long runs",
        "Robust thermal management for continuous operation",
        "Configurable connectors, fiber lengths and control protocols",
        "Manufactured with quality-controlled fiber splicing and pump selection",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Modules are ideal for system integrators building LIDAR transmitters, fiber sensing heads, telecom amplifiers, laboratory test equipment, material inspection lasers, and embedded OEM subsystems that require compact and stable amplification.",
    },

    {
      type: "text",
      heading: "Integration & Customization",
      content:
        "Available custom options include tailored output power, connector type (FC/APC, SMA, etc.), PM fiber routing, integrated monitoring electronics, custom firmware/interface protocols, and mechanical mounting options to suit your product design.",
    },

    {
      type: "text",
      heading: "Installation & Safety",
      content:
        "Install modules on vibration-free, ventilated mounts. Follow IEC 60825 laser safety guidance when connecting fibers. Use recommended start-up/shutdown sequences and ensure proper grounding and pump diode current limits as described in the datasheet.",
    },

    {
      type: "text",
      heading: "Ordering & Support",
      content:
        "For pricing, lead times, or custom engineering support contact our technical sales team at +86-13958180450. We provide integration guidance, test reports, and long-term service agreements for volume deployments.",
    },
  ],

  relatedProducts: [
    {
      slug: "high-power",
      title: "High-Power Fiber Amplifier",
      shortDescription: "High-power modules for demanding industrial and research systems.",
      image: { src: "/fiber-amplifiers/high-power/", alt: "High Power Amplifier" },
      href: "/fiber-amplifiers/high-power/",
    },
    {
      slug: "high-power",
      title: "Polarization-Maintaining Fiber Amplifier",
      shortDescription: "PM amplifiers that preserve polarization for coherent systems.",
      image: { src: "/fiber-amplifiers/high-power/", alt: "PM Amplifier" },
      href: "/fiber-amplifiers/high-power/",
    },
  ],
};

export default highPowerFiberAmplifier;
