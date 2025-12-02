import { Product } from "@/types/categories";

export const polarizationMaintainingFiberAmplifier: Product = {
  slug: "pm",
  category: "fiber-amplifiers",

  meta: {
    title:
      "Polarization-Maintaining Fiber Amplifier by Techwin | Fiber Amplifiers",
    description:
      "Techwin Polarization-Maintaining Fiber Amplifier with stable single-frequency output and dependable performance from Hangzhou City. Contact +86-13958180450 for details.",
    keywords:
      "PM fiber amplifier, polarization maintaining amplifier, fiber amplifier, low-noise amplifier, Techwin fiber amplifiers",
  },

  title: "Polarization-Maintaining Fiber Amplifier",
  shortDescription:
    "High-stability PM Fiber Amplifier engineered for polarization preservation, narrow-linewidth signals & advanced sensing/laser applications.",

  heroImage: { src: "/products/fiber-amplifiers/pm/hero.jpg",
    alt: "Polarization-Maintaining Fiber Amplifier",
  },

  galleryImages: [
      { src: "/fiber-amplifiers/pm/preview.jpg", alt: "Polarization-maintaining fiber amplifier preview" },
      { src: "/fiber-amplifiers/pm/hero.jpg", alt: "Polarization-maintaining fiber amplifier hero" },
    ],

  datasheetUrl: "/products/fiber-amplifiers/pm/datasheet.jpg",
  datasheetImageSrc: "/products/fiber-amplifiers/pm/datasheet.jpg",
  previewImageSrc: "/products/fiber-amplifiers/pm/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Introduction to PM Fiber Amplifier Technology",
      image: {
        src: "/fiber-amplifiers/polarization-maintaining-fiber-amplifier/pm-technology.jpg",
        alt: "Polarization Maintaining Fiber Technology",
      },
      content:
        "Polarization-maintaining (PM) fiber amplifiers preserve polarization state during amplification using birefringent PM fibers. The technology supports coherent communication, precision sensing, narrow-linewidth lasers, interferometry, and advanced scientific instruments where polarization stability is critical.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "High Polarization Extinction Ratio (PER)",
        "Low noise figure for clean, stable amplification",
        "Narrow linewidth preservation for high-coherence systems",
        "Efficient saturation performance with minimal distortion",
        "Fiber-based, compact, alignment-free construction",
        "Stable operation under mechanical and thermal variations",
      ],
    },

    {
      type: "text",
      heading: "Why Polarization Integrity Matters",
      content:
        "PM fiber amplifiers ensure stable polarization, reducing measurement errors and improving performance in coherent detection, interferometry, LIDAR, frequency references, and optical sensing. High birefringence fibers maintain polarization even under temperature changes or vibration.",
    },

    {
      type: "specs",
      heading: "Typical Technical Specifications",
      blocks: [
        {
          label: "Signal Stability",
          rows: [
            { name: "Linewidth Preservation", value: "Maintains narrow linewidth without broadening" },
            { name: "Noise Figure", value: "Low, suitable for coherent architectures" },
            { name: "Environmental Stability", value: "Resistant to vibration & temperature variations" },
          ],
        },
        {
          label: "Integration & Design",
          rows: [
            { name: "Fiber Type", value: "PM fiber input/output" },
            { name: "Package Type", value: "Module or OEM-ready assembly" },
            { name: "Cooling", value: "Temperature-controlled internal design" },
          ],
        },
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "PM Fiber Amplifiers are widely used in precision optical sensing, coherent communication, LIDAR, interferometry, laser spectroscopy, fiber gyroscopes, frequency reference systems, and advanced laboratory research.",
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
        "Built using PM fibers, pump diodes, WDM couplers, isolators, polarization-maintaining splices, and temperature stabilization units. The amplifier maintains optical reliability and consistent output during long-term operation.",
    },

    {
      type: "text",
      heading: "Selection Considerations",
      content:
        "Choose based on output power needs, wavelength compatibility, environmental requirements, noise sensitivity, and fiber connector type. Proper selection ensures optimal system performance.",
    },

    {
      type: "text",
      heading: "Support & Customization",
      content:
        "Custom options include wavelength selection, output power levels, and integration guidance. For technical assistance or system configuration support, contact our engineering team at +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "pm",
      title: "Erbium-Doped Fiber Amplifier (EDFA)",
      shortDescription: "High-performance EDFA for telecom & optical amplification.",
      image: {
        src: "/fiber-amplifiers/pm/",
        alt: "EDFA",
      },
      href: "/fiber-amplifiers/pm/",
    },
    {
      slug: "pm",
      title: "Superluminescent LED (SLED)",
      shortDescription: "Broadband low-coherence SLED for fiber sensing & OCT.",
      image: {
        src: "/ase-sources/sled-thumb.jpg",
        alt: "SLED Source",
      },
      href: "/ase-sources/sled-light-source",
    },
  ],
};

export default polarizationMaintainingFiberAmplifier;
