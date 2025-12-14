// src/data/applications/sensing.ts

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

export const sensingApplication: ApplicationDetail = {
  slug: "sensing",
  url: "/application/sensing",
  name: "Fiber Optic Sensing",
  metaTitle:
    "Fiber Lasers for Optical Sensing in Hangzhou City | Techwin – China",
  metaDescription:
    "Precision fiber lasers for optical sensing applications by Techwin – single frequency fiber laser, Hangzhou City. Call +86-571-88284299 for reliable sensing performance.",
  heroTitle:
    "Fiber Lasers for Optical Sensing – High-Stability Sensing Laser Solutions",
  heroTagline:
    "High-stability, narrow-linewidth fiber lasers engineered for advanced optical sensing, structural monitoring, and distributed measurement systems.",
  heroImage: {
    src: "/applications/fiber-optic-sensing.jpg",
    alt: "Fiber Optic Sensing",
  },
  heroIntro:
    "Optical sensing technologies depend on light sources that offer accuracy, narrow linewidth, and long-term signal stability. For advanced measurement environments—whether structural monitoring, geophysical tracking, industrial inspection, or temperature and strain analysis—having a dependable sensing laser is essential for collecting meaningful data with minimal noise.",

  sections: [
    {
      id: "overview",
      heading: "Overview of Fiber Lasers for Optical Sensing",
      body: [
        "Fiber-based optical sensing systems have become widely adopted because they deliver consistent results over long distances. They provide immunity to electromagnetic interference, high sensitivity, and long-term reliability.",
        "To support such systems, the laser source must exhibit specific performance characteristics that maintain signal quality and measurement stability in demanding environments.",
      ],
      bullets: [
        "Narrow linewidth for precise frequency stability",
        "Low relative intensity noise (RIN)",
        "High spectral purity for clean signal generation",
        "Stable wavelength output for sensitive measurement tasks",
        "Reliable long-term operation in various temperature conditions",
      ],
    },
    {
      id: "why-sensing-laser-matters",
      heading: "Why a High-Quality Sensing Laser Matters",
      body: [
        "A sensing laser plays a central role in optical measurement systems. It determines how accurately the system can detect changes in strain, vibration, pressure, temperature, or structural movement.",
      ],
      subSections: [
        {
          id: "accurate-long-distance",
          heading: "1. Accurate Measurement Over Long Distances",
          body: [
            "Optical fibers can extend for kilometers, so a laser with narrow linewidth ensures that the signal remains clean and stable throughout transmission, supporting precise measurement over long distances.",
          ],
        },
        {
          id: "signal-to-noise",
          heading: "2. Improved Signal-to-Noise Ratio",
          body: [
            "Low phase and amplitude noise are critical for measurements where even small environmental changes must be captured. A low-noise sensing laser helps maintain high signal-to-noise ratio in these systems.",
          ],
        },
        {
          id: "harsh-environments",
          heading: "3. Reliability in Harsh Environments",
          body: [
            "Industrial and outdoor sensing applications often face temperature swings, moisture, and vibration. A robust laser design ensures continuous operation and dependable data capture in these conditions.",
          ],
        },
        {
          id: "distributed-sensing",
          heading: "4. Compatibility With Distributed Sensing",
          body: [
            "Systems such as DAS, DTS, and BOTDA require stable wavelength and high coherence. Advanced fiber lasers provide these properties, enabling accurate distributed sensing along long fiber lengths.",
          ],
        },
      ],
    },
    {
      id: "applications",
      heading: "Applications Supported by Fiber Lasers in Optical Sensing",
      body: [
        "Fiber lasers are used across numerous industries due to their measurement accuracy and high performance. They support applications ranging from infrastructure monitoring to environmental sensing.",
      ],
      subSections: [
        {
          id: "structural-health-monitoring",
          heading: "Structural Health Monitoring",
          body: [
            "Fiber sensors are deployed to track strain, cracks, and vibration in critical infrastructure, helping operators plan maintenance and improve safety.",
          ],
          bullets: [
            "Bridges",
            "Tunnels",
            "Buildings",
            "Rail systems",
            "Wind turbines",
          ],
        },
        {
          id: "oil-gas",
          heading: "Oil & Gas Pipeline Monitoring",
          body: [
            "Distributed acoustic sensing (DAS) and distributed temperature sensing (DTS) applications require lasers with long coherence length and stable output to monitor pipelines and wellbores.",
          ],
        },
        {
          id: "power-grid",
          heading: "Power Grid and Energy Monitoring",
          body: [
            "Fiber sensing systems support real-time monitoring of temperature, partial discharge, vibration, and load distribution in power and utility networks.",
          ],
        },
        {
          id: "geophysical",
          heading: "Geophysical and Seismic Sensing",
          body: [
            "High-resolution vibration measurement demands precise laser stability to detect geological events and subtle earth movements.",
          ],
        },
        {
          id: "industrial-machine",
          heading: "Industrial Machine Monitoring",
          body: [
            "Fiber-based sensors provide accurate feedback on pressure, temperature, and alignment in production systems and industrial machinery.",
          ],
        },
        {
          id: "environmental",
          heading: "Environmental and Atmospheric Sensing",
          body: [
            "Laser-based fiber sensing helps measure humidity, air quality, gas concentration, and temperature gradients in environmental monitoring applications.",
          ],
        },
      ],
    },
    {
      id: "distributed-fiber-laser",
      heading: "Role of Distributed Fiber Laser Systems",
      body: [
        "A distributed fiber laser system supports long-distance sensing over tens or even hundreds of kilometres. These systems make use of the fiber itself as the sensing element, enabling continuous measurement rather than point-based detection.",
      ],
      bullets: [
        "Large-scale measurement capability",
        "Reduced sensor hardware requirements",
        "Continuous monitoring over extended areas",
        "High spatial resolution for detailed analysis",
        "Long-term data consistency",
      ],
    },
    {
      id: "performance-features",
      heading: "Performance Features of Our Fiber Lasers for Sensing",
      body: [
        "Our fiber laser solutions deliver characteristics specifically suited for optical sensing tasks, from distributed systems to point-based measurement platforms.",
      ],
      subSections: [
        {
          id: "ultra-narrow-linewidth",
          heading: "Ultra-Narrow Linewidth",
          body: [
            "Provides clean, stable measurements with minimal phase noise, improving the accuracy of frequency- and phase-based sensing methods.",
          ],
        },
        {
          id: "stable-wavelength",
          heading: "Stable Wavelength Output",
          body: [
            "Ensures reproducible results even in long-term field installations, reducing recalibration intervals and drift-related errors.",
          ],
        },
        {
          id: "low-noise-architecture",
          heading: "Low Noise Architecture",
          body: [
            "Supports sensitive detection where small environmental changes must be identified, maintaining high signal fidelity in sensing data.",
          ],
        },
        {
          id: "long-coherence-length",
          heading: "Long Coherence Length",
          body: [
            "Ideal for distributed acoustic sensing and distributed temperature systems that rely on coherent backscatter over long distances.",
          ],
        },
        {
          id: "rugged-construction",
          heading: "Rugged Construction",
          body: [
            "Engineered to operate reliably in industrial and outdoor environments, including applications with vibration, dust, or temperature variations.",
          ],
        },
        {
          id: "compact-design",
          heading: "Compact, System-Ready Design",
          body: [
            "Compact form factors and system-ready interfaces make integration into sensing modules and OEM equipment straightforward.",
          ],
        },
      ],
    },
    {
      id: "sensing-types",
      heading: "Types of Optical Sensing Supported",
      body: [
        "Our fiber lasers support a broad range of sensing principles, enabling both distributed and localized measurement approaches.",
      ],
      subSections: [
        {
          id: "das",
          heading: "1. Distributed Acoustic Sensing (DAS)",
          body: [
            "Uses backscattered light to detect vibration and movement along long distances such as pipelines, borders, or rail tracks.",
          ],
        },
        {
          id: "dts",
          heading: "2. Distributed Temperature Sensing (DTS)",
          body: [
            "Monitors temperature variation along the entire length of a fiber, useful for power cables, oil wells, and storage facilities.",
          ],
        },
        {
          id: "distributed-strain",
          heading: "3. Distributed Strain Sensing",
          body: [
            "Supports structural integrity monitoring with high sensitivity to bending or stretching along the fiber.",
          ],
        },
        {
          id: "interferometric",
          heading: "4. Interferometric Sensing",
          body: [
            "Relies on coherent laser output for precise phase-based measurements in vibration, acoustic, and position sensing.",
          ],
        },
        {
          id: "fbg",
          heading: "5. Fiber Bragg Grating (FBG) Sensing",
          body: [
            "Laser-based systems measure reflection changes from FBGs to detect strain, pressure, and temperature with high accuracy.",
          ],
        },
      ],
    },
    {
      id: "industries",
      heading: "Industries Benefiting From Optical Sensing Fiber Lasers",
      body: [
        "Our fiber lasers support a wide range of sectors where reliable sensing performance helps improve safety, efficiency, and asset visibility.",
      ],
      bullets: [
        "Infrastructure and civil engineering",
        "Oil and gas transmission",
        "Power and utility companies",
        "Aerospace and aviation",
        "Defense and security",
        "Scientific research",
        "Environmental monitoring",
        "Manufacturing and industrial automation",
      ],
    },
    {
      id: "why-choose-us",
      heading: "Why Choose Our Fiber Laser Solutions for Optical Sensing",
      body: [
        "Customers rely on our sensing-grade fiber lasers because they are engineered specifically for demanding optical measurement environments.",
      ],
      subSections: [
        {
          id: "consistent-accuracy",
          heading: "Consistent Measurement Accuracy",
          body: [
            "High stability ensures results remain dependable across long-term operations, reducing drift and recalibration requirements.",
          ],
        },
        {
          id: "application-design",
          heading: "Application-Oriented Design",
          body: [
            "Each laser model supports defined sensing protocols and measurement techniques, making it easier to match a laser to a specific system architecture.",
          ],
        },
        {
          id: "flexible-output",
          heading: "Flexible Output Configurations",
          body: [
            "Wavelength, power, and spectral properties can be selected to match specific sensing system designs and performance needs.",
          ],
        },
        {
          id: "field-reliability",
          heading: "Field-Proven Reliability",
          body: [
            "Performance remains stable under changing temperature, humidity, and mechanical stress in real-world deployments.",
          ],
        },
        {
          id: "integration-support",
          heading: "System Integration Support",
          body: [
            "We assist OEMs and system developers in selecting the right laser for their sensing platform, helping accelerate development and deployment.",
          ],
        },
      ],
    },
  ],
};
