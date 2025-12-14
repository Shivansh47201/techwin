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
  aliases?: string[];
  sections: ApplicationSection[];
};

export const communicationApplication: ApplicationDetail = {
  slug: "communication",
  url: "/application/communication",
  name: "Optical Communication",
  aliases: ["optical-communication"],
  metaTitle: "Fiber Lasers for Optical Communication | Techwin Single Frequency",
  metaDescription:
    "Fiber lasers for optical communication applications by Techwin – single frequency fiber laser, Hangzhou City. Call +86-13958180450 for telecom and coherent solutions.",
  heroTitle: "Fiber Lasers for Optical Communication",
  heroTagline:
    "Stable, narrow-linewidth fiber laser sources engineered for modern telecom and coherent communication systems.",
  heroIntro:
    "Reliable and stable light sources play a central role in optical communication. Our fiber lasers deliver narrow linewidth, low noise, and long-term wavelength stability for DWDM, coherent detection, and high-capacity links.",
  heroImage: {
    src: "/applications/optical-communication.jpg",
    alt: "Optical Communication",
  },

  sections: [
    {
      id: "introduction",
      heading: "Introduction to Fiber Lasers in Optical Communication",
      body: [
        "Optical communication systems transmit information using light through fiber. A highly stable laser source ensures reliable modulation, long-distance transmission, and high spectral purity.",
        "Fiber lasers provide narrow spectral linewidth, excellent wavelength stability, low RIN, thermal control, and integrated fiber-coupled outputs — making them ideal carriers for modern networks.",
      ],
      bullets: [
        "Narrow spectral linewidth",
        "Long-term wavelength stability",
        "Low relative intensity noise",
        "Fiber-coupled output",
        "Compatibility with modulation and amplification stages",
      ],
    },
    {
      id: "why-matters",
      heading: "Why the Right Laser Source Matters in Optical Communication",
      body: [
        "Minor fluctuations in wavelength, linewidth, or noise can degrade transmission quality in DWDM and coherent systems. Choosing a stable laser improves system margin and receiver sensitivity.",
      ],
      subSections: [
        {
          id: "narrow-linewidth",
          heading: "Narrow Linewidth",
          body: [
            "Reduces phase noise and supports advanced modulation formats such as QPSK, QAM, OFDM and DP-QPSK used in high-capacity networks.",
          ],
        },
        {
          id: "low-noise",
          heading: "Low Noise Characteristics",
          body: [
            "Low RIN and low frequency noise are essential for long-haul and high-capacity channels, improving bit-error-rate performance.",
          ],
        },
        {
          id: "wavelength-accuracy",
          heading: "Wavelength Accuracy",
          body: [
            "Precise wavelength control ensures interoperability with DWDM multiplexers, amplifiers, and narrowband filters.",
          ],
        },
      ],
    },
    {
      id: "coherent",
      heading: "Role of Coherent Communication Laser Solutions",
      body: [
        "Coherent detection relies on lasers with ultra-narrow linewidth, low phase noise and excellent stability. Our single-frequency fiber lasers act as high-quality local oscillators and carrier sources for coherent receivers.",
      ],
      bullets: [
        "Ultra-narrow linewidth",
        "Very low phase noise",
        "Compatibility with coherent receivers",
      ],
    },
    {
      id: "telecom-lasers",
      heading: "Telecom Lasers for Modern Communication Networks",
      body: [
        "Designed for metro, long-haul, submarine, data-center interconnects, and fronthaul/backhaul systems. These lasers are built for millions of operating hours with minimal drift and robust polarization stability.",
      ],
      bullets: [
        "Single-frequency output",
        "High SNR",
        "Stable polarization",
        "Integrated fiber pigtails",
        "High modulation compatibility",
      ],
    },
    {
      id: "performance",
      heading: "How Fiber Lasers Strengthen Optical Communication Performance",
      body: [
        "From DWDM channel stability to long-distance transmission and high-speed modulation, fiber lasers improve modulation efficiency, receiver sensitivity, and overall data throughput.",
      ],
      subSections: [
        {
          id: "long-distance",
          heading: "Long-Distance Transmission",
          body: [
            "High spectral purity and minimal signal distortion enable reliable amplification and transmission across terrestrial and submarine links.",
          ],
        },
        {
          id: "dwdm",
          heading: "Dense Wavelength Division Multiplexing (DWDM)",
          body: [
            "Stable channel spacing and minimal crosstalk are achieved when each DWDM channel uses a narrow-linewidth, wavelength-stable source.",
          ],
        },
        {
          id: "high-speed",
          heading: "High-Speed Data Communication",
          body: [
            "Predictable signal profiles from stable lasers help advanced DSP-based receivers decode high-order modulation formats more effectively.",
          ],
        },
      ],
    },
    {
      id: "applications",
      heading: "Applications of Fiber Lasers in Optical Communication",
      body: [
        "Use cases include local oscillator sources, transmitter carriers, reference lasers for calibration, test and measurement, coherent systems, and telecom infrastructure components.",
      ],
      bullets: [
        "Local Oscillator Sources",
        "Transmitter Light Sources",
        "Reference Lasers",
        "Test and Measurement",
        "Coherent Communication Systems",
        "Telecom Infrastructure",
      ],
    },
    {
      id: "technical-features",
      heading: "Technical Features Expected from Optical Communication Lasers",
      bullets: [
        "Ultra-narrow linewidth",
        "High optical SNR",
        "Low phase noise",
        "Stable polarization",
        "Long-term wavelength stability",
      ],
    },
    {
      id: "benefits",
      heading: "Benefits of Using Fiber Lasers for Communication Applications",
      bullets: [
        "Better integration with optical components",
        "Reduced maintenance due to all-fiber design",
        "Long operational lifetime",
        "Detailed frequency control",
        "Support for high-capacity data transfer",
      ],
    },
    {
      id: "industries",
      heading: "Industries Using Fiber Lasers for Optical Communication",
      body: [
        "Telecommunication providers, data centers, government and defense, research laboratories, and satellite communication companies use high-stability lasers for reliable links and experimental platforms.",
      ],
    },
    {
      id: "brand-info",
      heading: "Techwin – Single Frequency Fiber Laser Solutions",
      body: [
        "Techwin provides communication-grade laser sources engineered for stability and reliability in telecom environments. Located in Hangzhou City, our products support both transmitting and receiving stages and are adaptable to coherent testbeds and integrated photonics.",
      ],
    },
    {
      id: "why-select",
      heading: "Why Choose High-Stability Laser Sources for Optical Communication",
      body: [
        "Stable, narrow-linewidth fiber lasers minimize channel interference and signal degradation while enabling compatibility with external modulators, amplifiers and DSP-based receivers.",
      ],
    },
    {
      id: "ordering",
      heading: "Ordering and Inquiry",
      body: [
        "For product details, configurations, or pricing, contact our support team at +86-13958180450 for assistance selecting the right laser for your communication needs.",
      ],
    },
  ],
};
