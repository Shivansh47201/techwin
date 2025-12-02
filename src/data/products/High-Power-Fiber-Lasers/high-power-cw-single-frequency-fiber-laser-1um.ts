import { Product } from "@/types/categories";

export const highPowerCWSingleFrequencyFiberLaser1um: Product = {
  slug: "1um-cw",
  category: "high-power",

  meta: {
    title: "High-Power CW Single-Frequency Fiber Laser (1.0 µm) | Techwin",
    description:
      "Techwin High-Power CW Single-Frequency Fiber Laser (1.0 µm) offers stable output, precise control and reliable performance. Call +86-13958180450 now for details.",
    keywords:
      "high power fiber laser 1.0um, single frequency fiber laser, CW high power laser, narrow linewidth, Techwin high power fiber laser",
  },

  title: "High-Power CW Single-Frequency Fiber Laser (1.0 µm)",
  shortDescription:
    "High-power continuous-wave single-frequency fiber laser delivering narrow linewidth, superior beam quality and long-term stability for scientific, industrial and defense applications.",

  heroImage: { src: "/products/high-power/1um-cw/hero.jpg",
    alt: "High-Power CW Single-Frequency Fiber Laser (1.0 µm)",
  },

  galleryImages: [
      { src: "/high-power/1um-cw/preview.jpg", alt: "high-power-cw-single-frequency-fiber-laser-1um preview" },
      { src: "/high-power/1um-cw/hero.jpg", alt: "high-power-cw-single-frequency-fiber-laser-1um hero" },
    ],

  datasheetUrl: "/products/high-power/1um-cw/datasheet.jpg",
  datasheetImageSrc: "/products/high-power/1um-cw/datasheet.jpg",
  previewImageSrc: "/products/high-power/1um-cw/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview",
      image: { src: "/high-power/1um-cw/overview.jpg", alt: "1.0 µm laser overview" },
      content:
        "This high-power CW single-frequency fiber laser delivers stable continuous-wave output with ultra-narrow linewidth and low phase noise. Optimized for sensing, coherent detection, nonlinear conversion and advanced scientific tasks, it ensures exceptional stability and reliable performance.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Single longitudinal mode operation with narrow linewidth",
        "High-power CW output with excellent thermal handling",
        "High wavelength stability around 1.0 µm",
        "Near-diffraction-limit beam quality (high spatial coherence)",
        "Rugged, compact fiber-integrated architecture",
        "Long-term operational reliability with minimal maintenance",
      ],
    },

    {
      type: "text",
      heading: "Why Choose a 1.0 µm Single-Frequency Fiber Laser?",
      content:
        "The 1.0 µm wavelength is widely used in fiber systems due to strong compatibility, power scalability and excellent propagation characteristics. The narrow-linewidth, high-coherence output supports long-distance communication, precise measurements and stable optical interference patterns.",
    },

    {
      type: "features",
      heading: "Technical Advantages",
      bullets: [
        "Ultra-narrow linewidth for high-coherence applications",
        "Low intensity noise for high-accuracy measurements",
        "Advanced TEC-based thermal stabilization",
        "Power scalability to high CW output levels",
        "High-damage-threshold optical components for continuous operation",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "This high-power 1.0 µm single-frequency CW laser is ideal for coherent optical communication, Doppler LIDAR, remote sensing, interferometry, nonlinear frequency conversion, optical frequency standards, quantum technology research and scientific micromachining.",
    },

    {
      type: "features",
      heading: "Performance Characteristics",
      bullets: [
        "Wavelength centered near 1.0 µm",
        "Very narrow linewidth optimized for sensitive optical tasks",
        "High CW output power with stable frequency performance",
        "Linear polarization with high extinction ratio",
        "Single-mode fiber delivery",
        "Shock and vibration-resistant mechanical design",
      ],
    },

    {
      type: "text",
      heading: "System Integration Benefits",
      content:
        "The fiber-based output ensures seamless integration into existing optical frameworks. Efficient thermal management, compact mechanical design and reliable long-term stability support both industrial and laboratory environments.",
    },

    {
      type: "text",
      heading: "Industry Use Cases",
      content:
        "Used across aerospace & defense, scientific laboratories and industrial sectors for coherent detection, precision measurement, metrology, micromachining and nonlinear optical experiments.",
    },

    {
      type: "text",
      heading: "About the Manufacturer",
      content:
        "Techwin, based in Hangzhou City, manufactures precision-engineered fiber laser systems designed for high stability, reliability and advanced optical performance.",
    },
  ],

  relatedProducts: [
    {
      slug: "1um-cw",
      title: "High-Power CW Single-Frequency Fiber Laser (1.5 µm)",
      shortDescription: "High-power narrow-linewidth laser for sensing and coherent applications.",
      image: {
        src: "/high-power/1um-cw/",
        alt: "1.5 µm High-Power Laser",
      },
      href: "/high-power/1um-cw/",
    },
    {
      slug: "1um-cw",
      title: "High-Power CW Single-Frequency Fiber Laser (2.0 µm)",
      shortDescription: "Mid-IR stable single-frequency high-power laser for precision tasks.",
      image: {
        src: "/high-power/1um-cw/",
        alt: "2.0 µm High-Power Laser",
      },
      href: "/high-power/1um-cw/",
    },
  ],
};

export default highPowerCWSingleFrequencyFiberLaser1um;
