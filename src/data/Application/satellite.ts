// src/data/applications/satellite.ts

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

export const satelliteApplication: ApplicationDetail = {
  slug: "satellite",
  url: "/application/satellite",
  name: "Satellite Communication",
  heroImage: {
    src: "/applications/Satellite Communication.jpg",
    alt: "Satellite Communication",
  },
  metaTitle:
    "Lasers for Satellite Communication in Hangzhou City | Techwin China",
  metaDescription:
    "High-precision lasers for satellite communication supplied by Techwin – single frequency fiber laser in Hangzhou City. Call +86-571-88284299 for dependable space communication systems.",
  heroTitle:
    "Lasers for Satellite Communication – Single Frequency Solutions for Space Systems",
  heroTagline:
    "Ultra-stable, narrow-linewidth and low-noise single frequency lasers engineered for deep space, satellite networking, and secure optical links.",
  heroIntro:
    "Satellite communication requires controlled wavelength output, high signal purity, and reliable long-distance optical performance. Single frequency fiber lasers provide the precision needed for inter-satellite links, space-to-ground channels, deep-space missions, and secure communication systems.",

  sections: [
    {
      id: "single-frequency-role",
      heading: "Single Frequency Lasers in Optical Satellite Communication",
      body: [
        "Optical communication is becoming central to satellite networks due to high data capacity and immunity to electromagnetic interference.",
        "A space communication laser delivers stable coherent light required for accurate modulation and long-range transmission, even in extreme thermal and mechanical environments.",
      ],
    },
    {
      id: "importance",
      heading: "Importance of High-Stability Lasers in Satellite Links",
      bullets: [
        "Narrow linewidth for clean signal transmission",
        "Excellent frequency stability for long-distance links",
        "High beam quality for efficient free-space propagation",
        "Low intensity noise to maintain data accuracy",
        "Mechanical and thermal durability for launch and orbit operation",
      ],
    },
    {
      id: "applications",
      heading: "Major Applications in Satellite Communication",
      subSections: [
        {
          id: "inter-satellite",
          heading: "Inter-Satellite Optical Links (ISL)",
          body: [
            "High-speed optical beams connect satellites across different orbits using coherent, stable laser emission for long-range performance.",
          ],
        },
        {
          id: "space-ground",
          heading: "Space-to-Ground Optical Communication Terminals",
          body: [
            "Ground stations use narrow-linewidth lasers to maintain high-quality communication links with orbiting spacecraft.",
          ],
        },
        {
          id: "deep-space",
          heading: "Deep-Space Data Transmission",
          body: [
            "Spacecraft rely on long-range optical communication lasers with minimal loss and high stability.",
          ],
        },
        {
          id: "quantum",
          heading: "Quantum Satellite Communication",
          body: [
            "Photon-based quantum communication channels demand extremely stable lasers to support secure quantum protocols.",
          ],
        },
        {
          id: "navigation-timing",
          heading: "Navigation and Timing Systems",
          body: [
            "Accurate frequency output supports high-precision synchronization across satellite constellations.",
          ],
        },
      ],
    },
    {
      id: "performance-features",
      heading: "Performance Features Required for Space-Grade Communication Lasers",
      bullets: [
        "Low linewidth for advanced modulation",
        "Strong wavelength stability",
        "High beam quality and low divergence",
        "Exceptional thermal control",
        "Resistance to shock and vibration",
        "Low intensity noise for reliable data transmission",
      ],
    },
    {
      id: "future-missions",
      heading: "Role of Single Frequency Lasers in Future Space Missions",
      bullets: [
        "LEO communication constellations",
        "Earth observation satellites",
        "Deep-space scientific missions",
        "Commercial data relay platforms",
        "Scientific satellite exploration",
      ],
    },
    {
      id: "benefits",
      heading: "Benefits of Using Single Frequency Lasers in Satellite Systems",
      bullets: [
        "Higher optical communication speeds",
        "More secure transmission channels",
        "Immune to electromagnetic interference",
        "Long propagation range",
        "Energy-efficient design",
        "Compact, lightweight laser modules",
      ],
    },
    {
      id: "use-cases",
      heading: "Where Single Frequency Lasers Are Used",
      bullets: [
        "Climate and environmental satellites",
        "Space science research platforms",
        "Navigation and timing constellations",
        "Commercial communication networks",
        "Defense-grade optical communication",
        "Interplanetary missions",
      ],
    },
    {
      id: "integration-requirements",
      heading: "Key Requirements for Integration into Satellite Terminals",
      bullets: [
        "Vacuum compatibility",
        "Radiation endurance",
        "Thermal cycling stability",
        "Mechanical robustness",
        "Long operational lifespan",
        "Stable wavelength locking",
        "Space-qualified packaging compatibility",
      ],
    },
    {
      id: "laser-models",
      heading: "Laser Models Suitable for Optical Satellite Communication",
      bullets: [
        "Narrow linewidth single frequency lasers",
        "Frequency-stabilized laser configurations",
        "Low-noise optical emission models",
        "High-power laser modules",
        "Compact modules for CubeSat and microsatellite platforms",
      ],
    },
    {
      id: "technical-strength",
      heading: "Technical Strength in Satellite Communication Projects",
      bullets: [
        "Stable and clean optical output",
        "Advanced frequency locking systems",
        "Robust construction for harsh conditions",
        "Payload integration support",
        "Long-term operational reliability",
      ],
    },
    {
      id: "about-techwin",
      heading: "About Techwin – Single Frequency Fiber Laser",
      body: [
        "Based in Hangzhou City, Techwin supports projects requiring precise, long-life fiber laser sources. Their products meet aerospace standards and are trusted for space-grade optical communication development.",
      ],
    },
  ],
};
