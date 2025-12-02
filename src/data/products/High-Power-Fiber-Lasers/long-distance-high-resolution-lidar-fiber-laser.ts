import { Product } from "@/types/categories";

export const longDistanceHighResolutionLidarFiberLaser: Product = {
  slug: "lidar",
  category: "high-power",

  meta: {
    title: "Long-Distance High-Resolution LiDAR Fiber Laser System | Techwin",
    description:
      "Techwin Long-Distance High-Resolution LiDAR Fiber Laser for precise sensing applications. Contact +86-13958180450. Reliable manufacturer based in Hangzhou City.",
    keywords:
      "long distance LiDAR laser, high-resolution LiDAR fiber laser, single-frequency LiDAR source, Techwin LiDAR laser, long coherence LiDAR",
  },

  title: "Long-Distance High-Resolution LiDAR Fiber Laser",
  shortDescription:
    "Fiber laser systems engineered for long-range, high-resolution LiDAR with narrow linewidth, long coherence length and stable continuous output—ideal for autonomous navigation, remote sensing and mapping.",

  heroImage: { src: "/products/high-power/lidar/hero.jpg",
    alt: "Long-Distance High-Resolution LiDAR Fiber Laser",
  },

  galleryImages: [
      { src: "/high-power/lidar/preview.jpg", alt: "long-distance-high-resolution-lidar-fiber-laser preview" },
      { src: "/high-power/lidar/hero.jpg", alt: "long-distance-high-resolution-lidar-fiber-laser hero" },
    ],

  datasheetUrl: "/products/high-power/lidar/datasheet.jpg",
  datasheetImageSrc: "/products/high-power/lidar/datasheet.jpg",
  previewImageSrc: "/products/high-power/lidar/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of Long-Distance LiDAR Fiber Lasers",
      image: { src: "/high-power/lidar/overview.jpg", alt: "LiDAR laser overview" },
      content:
        "Long-distance LiDAR requires a laser source with narrow linewidth, long coherence length, and highly stable output. These fiber lasers are optimized for high-resolution ranging and robust performance in adverse environmental conditions, providing accurate 3D mapping and precise remote sensing over extended ranges.",
    },

    {
      type: "features",
      heading: "Key Features",
      bullets: [
        "Narrow-linewidth single-frequency emission for high resolution",
        "Long coherence length to support long-range detection",
        "High beam quality and low divergence for improved SNR",
        "Stable continuous-wave or pulsed operation depending on model",
        "Low phase noise and high side-mode suppression ratio (SMSR)",
        "Efficient fiber coupling and rugged fiber-integrated architecture",
      ],
    },

    {
      type: "text",
      heading: "Why This Laser Type Suits Long-Distance LiDAR",
      content:
        "Stable wavelength, long coherence and low-noise operation enable high spatial resolution and precise ranging. These attributes reduce measurement error in time-of-flight and FMCW systems, improve target discrimination at long range, and enhance 3D point-cloud fidelity for mapping and navigation.",
    },

    {
      type: "features",
      heading: "Performance Parameters to Expect",
      bullets: [
        "CW or pulsed single-frequency output",
        "Linewidth typically in the kHz range (model dependent)",
        "Long coherence length for centimeter-level ranging accuracy",
        "Low relative intensity noise for cleaner returns",
        "High SMSR and strong spectral purity",
        "Robust operation under variable atmospheric conditions",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Applications include autonomous vehicle navigation, aerial and terrestrial remote sensing, environmental and atmospheric monitoring, precision surveying, industrial inspection, security/perimeter surveillance and high-resolution mapping for geospatial analysis.",
    },

    {
      type: "features",
      heading: "Integration & System Benefits",
      bullets: [
        "Compact fiber-based packaging simplifies integration into LiDAR heads and UAV payloads",
        "Standard fiber connectors and delivery options for flexible system design",
        "Low maintenance and long operational life compared with bulk lasers",
        "Compatibility with time-of-flight and FMCW LiDAR processing chains",
      ],
    },

    {
      type: "text",
      heading: "Design & Environmental Considerations",
      content:
        "Thermal stabilization, environmental sealing and robust fiber routing are critical for stable long-term performance. Choose models with appropriate cooling, protective housings and diagnostics for field deployment in airborne or mobile platforms.",
    },

    {
      type: "text",
      heading: "Manufacturer & Support",
      content:
        "Products in this category are manufactured with precise optical engineering and controlled processes in Hangzhou City. Technical support includes specification guidance, integration assistance, performance testing and customized configuration for LiDAR platforms.",
    },

    {
      type: "text",
      heading: "How to Request a Quotation",
      content:
        "For datasheets, custom configurations and integration support please provide required range, resolution, output format (CW/FMCW/pulsed), environmental operating conditions, and preferred delivery interface when contacting our team at +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "lidar",
      title: "High-Power CW Single-Frequency Fiber Laser (1.5 µm)",
      shortDescription: "High-coherence laser suitable for LiDAR and long-range sensing.",
      image: { src: "/high-power/lidar/", alt: "1.5 µm high-power laser" },
      href: "/high-power/lidar/",
    },
    {
      slug: "lidar",
      title: "Long-Range FMCW LiDAR Integration Kits",
      shortDescription: "Integration kits and modules for FMCW LiDAR development.",
      image: { src: "/high-power/lidar/fmcw-kit-thumb.jpg", alt: "FMCW LiDAR kit" },
      href: "/high-power/lidar/long-range-fmcw-lidar-kits",
    },
  ],
};

export default longDistanceHighResolutionLidarFiberLaser;
