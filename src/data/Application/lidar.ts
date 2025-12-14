// src/data/applications/lidar.ts

export type ApplicationSubSection = {
  id: string;
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type ApplicationSection = {
  id: string;
  heading: string;
  body?: string[];
  bullets?: string[];
  subSections?: ApplicationSubSection[];
};

export type ApplicationDetail = {
  slug: string;
  url: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroTagline: string;
  heroIntro?: string;
  heroImage?: { src: string; alt: string };
  sections: ApplicationSection[];
};

export const lidarApplication: ApplicationDetail = {
  slug: "lidar",
  url: "/application/lidar",
  name: "LiDAR Systems",
  metaTitle: "Fiber Lasers for LiDAR Systems in Hangzhou City | Techwin – China",
  metaDescription:
    "Fiber Lasers for LiDAR Systems by Techwin – single frequency fiber laser in Hangzhou City China. Call +86-571-88284299 for stable performance and precise optical emission.",
  heroTitle:
    "Fiber Lasers for LiDAR Systems – High Stability Optical Sources for Precision Sensing",
  heroTagline:
    "Engineered for accuracy, long-range detection, and stable optical performance in modern LiDAR sensing platforms.",
  heroImage: {
    src: "/applications/lidar-systems.jpg",
    alt: "LiDAR Systems",
  },
  heroIntro:
    "LiDAR technology depends on stable, accurate, and narrow-linewidth optical sources to meet demanding requirements in distance measurement, 3D mapping, and environmental monitoring. A lidar fiber laser offers the optical coherence, stability, and reliability needed for these applications.",

  sections: [
    {
      id: "overview",
      heading: "Understanding the Role of Fiber Lasers in LiDAR",
      body: [
        "LiDAR functions by emitting pulses or continuous-wave optical signals and analyzing reflected beams to calculate distance, position, and structural information.",
        "Because of their long-term stability and environmental resistance, fiber lasers are preferred in high-performance LiDAR platforms across automotive, industrial, atmospheric, and scientific systems.",
      ],
      bullets: [
        "Narrow linewidth",
        "High optical coherence",
        "Low phase noise",
        "Stable wavelength",
        "High beam quality",
        "Robust operational reliability",
      ],
    },
    {
      id: "advantages",
      heading: "Advantages of Fiber Lasers for Remote Sensing Applications",
      body: [
        "High-performance LiDAR relies heavily on the stability and spectral quality of the optical source. Fiber lasers maintain narrow linewidth emission ideal for long-range precision measurement.",
      ],
      subSections: [
        {
          id: "narrow-linewidth",
          heading: "Narrow Linewidth Output",
          body: [
            "Ensures minimal frequency drift, enabling accurate long-distance measurement, Doppler shift detection, and high-resolution imaging required in LiDAR sensing.",
          ],
          bullets: [
            "Long-range measurement",
            "Accurate Doppler sensing",
            "High resolution imaging",
          ],
        },
        {
          id: "coherence",
          heading: "High Coherence and Signal Purity",
          body: [
            "Supports advanced ranging algorithms and multi-channel optical signal processing even during long observation periods.",
          ],
        },
        {
          id: "environmental-resistance",
          heading: "Resistance to Environmental Disturbances",
          bullets: [
            "Temperature variation tolerance",
            "Vibration resistance",
            "Humidity and moisture tolerance",
            "Reduced alignment sensitivity",
          ],
        },
        {
          id: "consistent-output",
          heading: "Consistent Output Power",
          body: [
            "Stable amplitude and wavelength output ensures reliable data acquisition across changing environmental and operational conditions.",
          ],
        },
        {
          id: "fiber-architecture",
          heading: "Fiber-Coupled Architecture",
          body: [
            "Easily integrates into modular LiDAR systems where fiber delivery, modulation, and beam splitting are required.",
          ],
        },
      ],
    },
    {
      id: "applications",
      heading: "Application Areas Powered by Fiber Lasers in LiDAR",
      body: [
        "Fiber laser–based LiDAR systems are used in multiple sectors that depend on high-accuracy environmental and geometric mapping.",
      ],
      subSections: [
        {
          id: "autonomous",
          heading: "Autonomous Vehicles and Robotics",
          body: [
            "Critical for navigation, obstacle detection, and environmental modelling in next-generation mobility systems.",
          ],
        },
        {
          id: "atmospheric",
          heading: "Atmospheric and Environmental Monitoring",
          body: ["Used in aerosol and cloud profiling, wind analysis, and pollution monitoring."],
          bullets: [
            "Aerosol measurement",
            "Cloud profiling",
            "Wind detection",
            "Pollution monitoring",
          ],
        },
        {
          id: "topography",
          heading: "Topographic Surveying and Geospatial Mapping",
          body: [
            "Enables precise civil engineering planning, terrain reconstruction, and high-resolution structural modelling.",
          ],
          bullets: [
            "Land surveying",
            "Terrain reconstruction",
            "3D urban mapping",
          ],
        },
        {
          id: "industrial-automation",
          heading: "Industrial Automation and Smart Infrastructure",
          body: [
            "Used to monitor spacing, detect movement, and support machine-to-machine coordination.",
          ],
        },
        {
          id: "research",
          heading: "Research and Scientific Instrumentation",
          body: [
            "Supports atmospheric research, optical ranging experiments, and marine sensing applications.",
          ],
        },
      ],
    },
    {
      id: "technical-parameters",
      heading: "Technical Parameters Important for LiDAR Fiber Lasers",
      bullets: [
        "Narrow optical linewidth",
        "Stable wavelength output",
        "High output power stability",
        "Excellent beam quality (low M²)",
        "Low phase and intensity noise",
        "Single-mode fiber coupling options",
      ],
    },
    {
      id: "why-preferred",
      heading: "Why Fiber Lasers Are the Preferred Choice for Advanced LiDAR Systems",
      bullets: [
        "Long operational lifetimes",
        "Stable emission properties",
        "Compact and modular design",
        "Compatible with modulation systems and optical interfaces",
      ],
    },
    {
      id: "integration",
      heading: "Integration Support for LiDAR Developers and System Engineers",
      bullets: [
        "Stable optical performance",
        "Reliable thermal management",
        "Consistent fiber-delivered output",
        "Modular design compatibility",
      ],
    },
    {
      id: "brand-info",
      heading: "Location and Brand Information",
      body: [
        "Products are supplied by Techwin – single frequency fiber laser, located in Hangzhou City.",
        "Solutions are engineered for stable optical performance, controlled emission, and long-term reliability required for LiDAR integration.",
      ],
    },
  ],
};
