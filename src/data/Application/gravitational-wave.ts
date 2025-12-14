// src/data/applications/gravitational-wave.ts

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

export const gravitationalWaveApplication: ApplicationDetail = {
  slug: "gravitational-wave",
  url: "/application/gravitational-wave",
  name: "Gravitational Wave Detection",
  metaTitle:
    "Lasers for Gravitational Wave Detection | Techwin – single frequency fiber laser",
  metaDescription:
    "Lasers for gravitational wave detection by Techwin – single frequency fiber laser in Hangzhou City. Call +86-571-88284299 for low noise and ultra-stable laser solutions.",
  heroTitle: "Lasers for Gravitational Wave Detection",
  heroTagline:
    "Ultra-stable, narrow-linewidth and low-noise fiber laser sources engineered for interferometric gravitational wave detection systems.",
  heroImage: {
    src: "/applications/gravitational-wave-detection.jpg",
    alt: "Gravitational Wave Detection",
  },
  heroIntro:
    "The study of gravitational waves requires exceptional optical precision. Measuring extremely small distortions in spacetime depends on laser systems that offer high stability, narrow linewidth, and very low noise for accurate scientific observation and long-term measurement consistency.",

  sections: [
    {
      id: "introduction",
      heading: "Introduction to Gravitational Wave Detection",
      body: [
        "Gravitational waves are ripples in spacetime produced by cosmic events such as merging black holes and neutron stars. Detecting these waves requires large interferometers that can observe variations far smaller than atomic dimensions.",
        "Lasers used in these systems must provide stable and predictable output to ensure interferometers function with maximum sensitivity. Key properties include narrow linewidth, strong frequency stability, long coherence length, minimal noise, and excellent beam quality.",
      ],
    },
    {
      id: "high-precision-importance",
      heading: "Why High-Precision Lasers Are Essential",
      subSections: [
        {
          id: "sensitivity",
          heading: "Sensitivity to Extremely Small Variations",
          body: [
            "Gravitational wave observatories measure changes smaller than one part in a trillion. A low noise laser helps prevent disturbances that could affect scientific readings.",
          ],
        },
        {
          id: "frequency-stability",
          heading: "Frequency Stability for Interferometers",
          body: [
            "Even very small frequency fluctuations can distort interference patterns. Consistent optical output ensures reliable and accurate scientific results.",
          ],
        },
        {
          id: "long-term-consistency",
          heading: "Long-Term Measurement Consistency",
          body: [
            "Observatories collect data continuously. An ultra-stable fiber laser helps maintain accuracy for long-term monitoring and advanced data analysis.",
          ],
        },
      ],
    },
    {
      id: "core-requirements",
      heading: "Core Requirements for Gravitational Wave Detection Lasers",
      bullets: [
        "Narrow linewidth (sub-kilohertz range)",
        "Ultra-low intensity noise",
        "Long coherence length for kilometre-scale interferometers",
        "Clean TEM00 optical beam profile",
        "Highly stable frequency output",
      ],
    },
    {
      id: "fiber-laser-role",
      heading: "How Ultra-Stable Fiber Lasers Support Detection Systems",
      bullets: [
        "Noise suppression for clean interferometric detection",
        "Stability over long optical paths",
        "Long-term reliability for continuous monitoring",
        "Seamless integration with reference cavities and modulators",
      ],
    },
    {
      id: "applications",
      heading: "Key Applications in Gravitational Wave Observatories",
      bullets: [
        "Primary input laser source for interferometers",
        "Laser systems for pre-stabilization stages",
        "Frequency-locking to reference cavities",
        "Auxiliary beams for alignment and calibration",
        "Optical metrology and monitoring systems",
      ],
    },
    {
      id: "technical-advantages",
      heading: "Technical Advantages in Gravitational Wave Detection",
      bullets: [
        "High signal-to-noise performance",
        "Reduced measurement uncertainty",
        "Stable calibration reference",
        "Reliable long-term operation",
        "Accurate interferometric behavior",
      ],
    },
    {
      id: "feature-requirements",
      heading: "Features Needed for Gravitational Wave Laser Systems",
      bullets: [
        "Thermal stability",
        "Vibration isolation",
        "High-quality control electronics",
        "Environmental isolation and sealing",
      ],
    },
    {
      id: "performance-parameters",
      heading: "Performance Parameters Required",
      bullets: [
        "Sub-kilohertz linewidth",
        "Very low amplitude noise",
        "Long coherence length",
        "Stable output power",
        "High frequency stability",
      ],
    },
    {
      id: "research-role",
      heading: "Role in Advanced Research Facilities",
      body: [
        "Future gravitational wave facilities aim for higher sensitivity, making the demand for highly stable lasers more important. Ultra-stable fiber laser technology is suitable for next-generation observatories and optical metrology systems.",
      ],
    },
    {
      id: "research-benefits",
      heading: "Benefits for Research Teams and Institutions",
      bullets: [
        "Reliable scientific readings",
        "Reduced maintenance requirements",
        "Consistent long-term performance",
        "Smooth optical subsystem integration",
        "Improved interferometric stability",
      ],
    },
    {
      id: "related-fields",
      heading: "Other Fields Using Similar Laser Technology",
      bullets: [
        "Quantum optics",
        "Metrology",
        "Optical frequency control",
        "Precision spectroscopy",
        "Optical clock systems",
      ],
    },
    {
      id: "summary",
      heading: "Summary",
      body: [
        "Gravitational wave detection requires lasers with minimal noise, narrow linewidth, and stable long-term operation. Advanced ultra-stable fiber lasers form the foundation of modern interferometric detection systems that enable accurate observation of distant cosmic events.",
      ],
    },
  ],
};
