// src/data/applications/spectroscopy.ts

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

export const spectroscopyApplication: ApplicationDetail = {
  slug: "spectroscopy",
  url: "/application/spectroscopy",
  name: "Spectroscopy & Photonics",
  metaTitle:
    "Fiber Lasers for Spectroscopy | Techwin – Single Frequency Fiber Laser",
  metaDescription:
    "Techwin – single frequency fiber laser in Hangzhou City offers reliable fiber lasers for spectroscopy. Call +86-571-88284299 for stable optical performance solutions.",
  heroTitle: "Fiber Lasers for Spectroscopy – High Precision Laser Solutions",
  heroTagline:
    "Engineered for high spectral purity, narrow linewidth performance and stable optical output for spectroscopy and advanced photonics research.",
  heroImage: {
    src: "/applications/Spectroscopy & Photonics.jpg",
    alt: "Spectroscopy & Photonics",
  },
  heroIntro:
    "Spectroscopy applications rely on stable, accurate and repeatable optical performance. A high-quality spectroscopy laser ensures consistency required for material analysis, spectral shift detection, optical metrology and advanced research across laboratory and industrial environments.",

  sections: [
    {
      id: "introduction",
      heading: "Introduction to Fiber Lasers for Spectroscopy",
      body: [
        "Spectroscopy techniques depend on high signal fidelity and precise wavelength control to examine molecular structures, study chemical interactions or conduct remote sensing.",
        "Fiber lasers have become a standard option due to long-term wavelength stability, minimal noise, environmental resistance, efficient thermal performance and reliable long-term operation.",
      ],
    },
    {
      id: "narrow-linewidth",
      heading: "Importance of a Narrow Linewidth Source in Spectroscopy",
      bullets: [
        "High spectral purity",
        "Better resolution between adjacent spectral lines",
        "Reduced measurement uncertainty",
        "Improved detection sensitivity for weak signals",
        "Increased accuracy in wavelength-based sensing",
      ],
    },
    {
      id: "core-features",
      heading: "Core Features of Fiber Lasers for Spectroscopy",
      subSections: [
        {
          id: "wavelength-stability",
          heading: "1. High Wavelength Stability",
          body: [
            "Spectroscopy measurements require consistent wavelength output. Fiber lasers maintain wavelength accuracy even under temperature and vibration changes.",
          ],
        },
        {
          id: "low-noise",
          heading: "2. Low Phase Noise",
          body: [
            "A low-noise optical profile is important for Raman, fluorescence and atomic spectroscopy where clarity and precision are critical.",
          ],
        },
        {
          id: "beam-quality",
          heading: "3. Clean Beam Quality",
          body: [
            "Uniform, high-quality beams are suitable for tight focusing, long-distance propagation and sensitive detection systems.",
          ],
        },
        {
          id: "long-life",
          heading: "4. Long Lifetime Operation",
          body: [
            "Fiber-based architectures offer long-term service life and minimal maintenance requirements, ideal for labs and industrial photonics.",
          ],
        },
        {
          id: "power-stability",
          heading: "5. Consistent Power Output",
          body: [
            "Stable optical power ensures reliable absorption measurements, imaging and precision optical testing.",
          ],
        },
      ],
    },
    {
      id: "applications",
      heading: "Applications of Fiber Lasers in Spectroscopy & Photonics",
      subSections: [
        {
          id: "atomic-molecular",
          heading: "1. Atomic and Molecular Spectroscopy",
          body: [
            "Used to analyze transitions, investigate molecular bonding and study material structures with ultra-high spectral resolution.",
          ],
        },
        {
          id: "raman",
          heading: "2. Raman Spectroscopy",
          body: [
            "Stable excitation supports clearer Raman scattering signals, even for low-intensity samples.",
          ],
        },
        {
          id: "absorption",
          heading: "3. Absorption Spectroscopy",
          body: [
            "Precision wavelength output ensures accurate absorption measurement and spectral line evaluation.",
          ],
        },
        {
          id: "fluorescence",
          heading: "4. Laser-Induced Fluorescence",
          body: [
            "Provides controlled excitation for fluorescence-based molecular and biological detection systems.",
          ],
        },
        {
          id: "interferometry",
          heading: "5. Optical Coherence and Interferometric Techniques",
          body: [
            "Narrow linewidth output enhances coherence length, supporting long-range and high-resolution interferometry.",
          ],
        },
        {
          id: "photonics-research",
          heading: "6. Photonics Research",
          body: [
            "Used in testing photonic components, optical materials and integrated optical circuits.",
          ],
        },
        {
          id: "remote-sensing",
          heading: "7. Remote Sensing",
          body: [
            "Stable optical emission allows detection of gases, pollutants and environmental parameters.",
          ],
        },
      ],
    },
    {
      id: "improved-performance",
      heading: "How Fiber Lasers Improve Photonics System Performance",
      bullets: [
        "Reliable performance in extended measurement sessions",
        "Reduced recalibration requirement",
        "Better alignment and coupling efficiency",
        "Strong immunity to external disturbances",
        "Ideal for compact or portable measurement systems",
      ],
    },
    {
      id: "technical-characteristics",
      heading: "Technical Characteristics That Matter",
      bullets: [
        "Linewidth specification",
        "Long-term wavelength stability",
        "Output power level",
        "Relative intensity noise",
        "Beam uniformity and circularity",
        "Power efficiency and thermal performance",
        "Optical integration compatibility",
        "Fiber-coupled or free-space output options",
      ],
    },
    {
      id: "reason-for-choice",
      heading: "Why Many Institutions Prefer Fiber-Based Narrow Linewidth Sources",
      bullets: [
        "High coherence and spectral purity",
        "Minimal drift and stable behavior",
        "Long measurement cycle compatibility",
        "Durable fiber-based architecture",
        "Support for advanced photonics experimentation",
      ],
    },
    {
      id: "industrial-usage",
      heading: "Fiber Lasers for Industrial Spectroscopy Systems",
      bullets: [
        "Long operational lifetime",
        "Strong environmental resistance",
        "High stability under field conditions",
        "Compact and rugged architecture",
        "Easy integration into OEM systems",
      ],
    },
    {
      id: "photonics-development",
      heading: "Photonics Development Supported by Spectroscopy Lasers",
      bullets: [
        "Optical coating research",
        "Integrated waveguide testing",
        "High-precision spectral systems",
        "Quantum photonics research",
        "Laser communication development",
      ],
    },
    {
      id: "research-institutions",
      heading: "Why Choose Fiber Lasers for Research Institutions",
      bullets: [
        "Flexible integration options",
        "Consistent long-term performance",
        "Low maintenance requirements",
        "Stable and repeatable measurement results",
      ],
    },
    {
      id: "commitment",
      heading: "Commitment to Reliable Spectroscopy Laser Solutions",
      body: [
        "Techwin – single frequency fiber laser in Hangzhou City provides reliable fiber-based laser systems engineered for spectroscopy and photonics environments.",
        "These systems are developed to maintain stable spectral output, narrow linewidth characteristics and dependable wavelength performance.",
      ],
    },
    {
      id: "summary",
      heading: "Summary",
      body: [
        "Fiber lasers provide the stability, spectral purity and precision required for spectroscopy and advanced photonics research.",
        "Their architecture ensures long operational life, consistent data capture and strong environmental resistance.",
        "To request configuration guidance or discuss integration, contact the Hangzhou City support team at +86-571-88284299.",
      ],
    },
  ],
};
