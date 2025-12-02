import { Product } from "@/types/categories";

export const spectralTestingSystem: Product = {
  slug: "spectral",
  category: "testing",

  meta: {
    title: "Spectral Testing System | Techwin Laser Measurement Solutions",
    description:
      "Techwin Spectral Testing System for precision wavelength and linewidth characterization. Advanced measurement capabilities for laser R&D and production. Based in Hangzhou City. Call +86-13958180450.",
    keywords:
      "spectral testing, wavelength measurement, linewidth analysis, laser characterization, spectral analysis, Techwin testing",
  },

  title: "Spectral Testing System",
  shortDescription:
    "Precision spectral characterization system designed for wavelength, linewidth, and spectral purity measurement of narrowband and broadband laser sources with high-resolution analysis and real-time reporting.",

  heroImage: { src: "/products/testing/spectral/hero.jpg",
    alt: "Spectral Testing System",
  },

  galleryImages: [
      { src: "/testing/spectral/preview.jpg", alt: "Spectral testing system preview" },
      { src: "/testing/spectral/hero.jpg", alt: "Spectral testing system hero" },
    ],

  datasheetUrl: "/products/testing/spectral/datasheet.jpg",
  datasheetImageSrc: "/products/testing/spectral/datasheet.jpg",
  previewImageSrc: "/products/testing/spectral/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of Spectral Testing Systems",
      content:
        "Spectral Testing Systems provide precise characterization of wavelength, linewidth, spectral purity, and drift for narrowband, broadband, CW, or pulsed lasers. Used in research labs, manufacturing lines, and optical integration platforms, it ensures the stability and accuracy of laser and photonic systems.",
    },

    {
      type: "features",
      heading: "Key Measurement Capabilities",
      bullets: [
        "High-accuracy wavelength measurement for narrowband and broadband lasers",
        "Linewidth analysis for single-frequency and precision laser sources",
        "Spectral purity monitoring including side-mode and noise evaluation",
        "Long-term frequency drift tracking",
        "Thermally stabilized internal architecture for measurement consistency",
        "Real-time spectral visualization software with automated reporting",
        "Wide compatibility with fiber lasers, diode lasers, CW and pulsed sources",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Ideal for optical R&D, fiber laser production, DWDM component evaluation, metrology tasks, environmental detection systems, lidar development, and quality-control in narrowband laser manufacturing.",
    },

    {
      type: "text",
      heading: "Selection Guide",
      content:
        "Select based on wavelength range, resolution, dynamic range, software integration needs, power compatibility, and environmental stability requirements. Models are available for telecom band, infrared, or custom wavelength ranges.",
    },

    {
      type: "text",
      heading: "Integration",
      content:
        "Easily integrates with laser benches, automated inspection systems, R&D platforms, and fiber-based test setups. USB/Ethernet interfaces support real-time monitoring, long-term logging, and automated analysis workflows.",
    },

    {
      type: "text",
      heading: "Ordering & Support",
      content:
        "To request specifications, pricing, or OEM customization, contact +86-13958180450. Techwin provides full documentation, software support, and engineering assistance from Hangzhou City.",
    },
  ],

  relatedProducts: [],
};

export default spectralTestingSystem;
