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

export const atomicApplication: ApplicationDetail = {
  slug: "atomic",
  url: "/application/atomic",
  name: "Atomic Research",
  aliases: ["atomic-physics-research"],
  metaTitle:
    "Fiber Lasers for Atomic Research | Techwin – single frequency fiber laser",
  metaDescription:
    "High-stability fiber lasers for atomic research applications by Techwin – single frequency fiber laser in Hangzhou City. Contact +86-13958180450 for details.",
  heroTitle: "Fiber Lasers for Atomic Research",
  heroTagline:
    "High-stability fiber lasers engineered for precision atomic-physics experiments.",
  heroIntro:
    "Atomic-level studies demand optical sources that deliver stable power, narrow linewidth, and reliable long-term performance. Precise light control directly influences measurement accuracy, repeatability, and experimental reliability.",
  heroImage: {
    src: "/applications/atomic-physics-research.jpg",
    alt: "Atomic Physics Research",
  },

  sections: [
    {
      id: "introduction",
      heading: "Introduction to Fiber Lasers for Atomic-Level Experiments",
      body: [
        "Atomic physics laboratories rely on consistent optical emissions to probe interactions within atoms and ions. Studies involving cooling, trapping, or manipulating atoms require coherent light with minimal drift.",
        "Fiber lasers designed for atomic research offer long-term narrow linewidth, high spectral purity, low relative intensity noise, and stable single-frequency operation — all essential for metrology, precision tests, and fundamental research.",
      ],
      bullets: [
        "Long-term narrow linewidth",
        "High spectral purity",
        "Low relative intensity noise",
        "Stable single-frequency operation",
        "Compatibility with optical instruments and detection systems",
      ],
    },
    {
      id: "why-fit",
      heading: "Why Fiber Lasers Fit Atomic Physics Requirements",
      body: [
        "Fiber-based platforms have become standard in atomic laboratories due to stability, compactness, and immunity to alignment issues compared to bulk lasers.",
        "They support long-term operation without frequent adjustments and integrate easily with vacuum chambers, optical tables, and frequency reference systems.",
      ],
      subSections: [
        {
          id: "narrow-linewidth",
          heading: "Narrow Linewidth Operation",
          body: [
            "Enables addressing specific atomic transitions with minimal spectral broadening — crucial for high-resolution spectroscopy and frequency locking.",
          ],
        },
        {
          id: "single-frequency",
          heading: "Continuous Single-Frequency Output",
          body: [
            "Provides consistent single-mode operation with extremely low drift — required for cooling, trapping, optical pumping, and long-duration experiments."],
        },
        {
          id: "beam-quality",
          heading: "Excellent Beam Quality",
          body: [
            "High beam uniformity enables efficient coupling into optical paths, atom traps, interferometers, and detection systems."],
        },
        {
          id: "low-noise",
          heading: "Low Noise Performance",
          body: [
            "Reduced relative intensity noise (RIN) and low phase noise improve measurement accuracy for sensitive atomic experiments."],
        },
        {
          id: "stability",
          heading: "High Stability for Long Experiments",
          body: [
            "Designed to maintain output characteristics during multi-hour or multi-day runs without thermal drift or mechanical instability."],
        },
      ],
    },
    {
      id: "applications",
      heading: "Applications of Fiber Lasers in Atomic Laboratories",
      body: [
        "The design and performance of a fiber laser directly impact its usefulness across cold-atom physics, precision metrology, spectroscopy, and quantum experiments.",
      ],
      subSections: [
        {
          id: "cold-atom",
          heading: "Cold Atom Experiments",
          body: [
            "Used for magneto-optical traps (MOT), Doppler cooling, Raman transitions and optical dipole traps where frequency stability and tunability are essential."],
          bullets: ["Stable narrow linewidth", "Frequency tunability", "Long-term optical output"],
        },
        {
          id: "atomic-clocks",
          heading: "Atomic Clocks and Precision Metrology",
          body: [
            "Support frequency locking, optical reference cavities, and spectroscopy systems that underpin time and frequency standards."],
          bullets: ["Minimized frequency drift", "High coherence", "Support for ultra-long measurement cycles"],
        },
        {
          id: "spectroscopy",
          heading: "Spectroscopy of Atoms and Ions",
          body: [
            "Enable resolving fine spectral structures and hyperfine patterns thanks to tunable, spectrally-pure outputs."],
        },
        {
          id: "laser-cooling",
          heading: "Laser Cooling and Trapping",
          body: [
            "Provide frequency-stable, low-noise light fields required for momentum control and trapping techniques."],
        },
        {
          id: "quantum",
          heading: "Quantum Experiments Using Atoms",
          body: [
            "Support experiments in quantum memories, entanglement, coherent manipulation and spin interactions where optical stability is critical."],
        },
      ],
    },
    {
      id: "key-features",
      heading: "Key Features of Fiber Lasers for Atomic Research",
      bullets: [
        "Ultra-narrow linewidth (kHz or sub-kHz options)",
        "High spectral purity and low phase noise",
        "Low intensity noise (low RIN)",
        "Excellent output stability over long runs",
        "Compact, modular and fiber-coupled designs",
        "Long operating life and low maintenance",
      ],
    },
    {
      id: "measurement-accuracy",
      heading: "How Fiber Lasers Improve Atomic Measurement Accuracy",
      body: [
        "Stable wavelength control and highly coherent output reduce measurement uncertainty and improve repeatability when detecting atomic transitions or frequency shifts."],
    },
    {
      id: "industries",
      heading: "Industries and Research Areas Benefiting from These Lasers",
      body: [
        "Quantum measurement systems, metrology institutes, ion trap research, university physics departments, national laboratories and fundamental-physics groups rely on stable laser sources for demanding experiments."],
    },
    {
      id: "why-select",
      heading: "Why Select Our Fiber Lasers for Atomic Research",
      bullets: [
        "Stable single-frequency output",
        "Tailored wavelength options for atomic transitions",
        "Long-term operational consistency",
        "Support for laboratory integration and testing",
        "Responsive technical support and product testing",
      ],
    },
    {
      id: "technical-capabilities",
      heading: "Technical Capabilities Tailored to Laboratory Conditions",
      bullets: [
        "Sub-kHz linewidth options",
        "Low RIN performance",
        "Adjustable output power",
        "Frequency stability for long-term measurements",
        "Tunable wavelength ranges for common atomic transitions",
        "Efficient fiber-coupled outputs",
      ],
    },
    {
      id: "support",
      heading: "Support for Advanced Atomic Physics Setups",
      body: [
        "We provide configuration guidance for magneto-optical traps, atomic interferometers, optical lattice systems, Raman transition setups, and state-selective detection systems to ease integration into experimental platforms."],
    },
    {
      id: "ordering",
      heading: "Ordering and Inquiry Information",
      body: [
        "We supply fiber lasers for both basic and advanced atomic physics experiments. For help selecting a system or receiving pricing, contact our support team for guidance on wavelength choices, configuration support, and technical information tailored to your laboratory needs."],
    },
    {
      id: "brand-info",
      heading: "Location and Brand Information",
      body: [
        "Products are supplied by Techwin – single frequency fiber laser, located in Hangzhou City.",
        "For product details or pricing, call +86-13958180450."],
    },
  ],
};
