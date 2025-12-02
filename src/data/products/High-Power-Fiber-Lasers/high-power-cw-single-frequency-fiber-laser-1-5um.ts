import { Product } from "@/types/categories";

export const highPowerCWSingleFrequencyFiberLaser1_5um: Product = {
  slug: "1-5um-cw",
  category: "high-power",

  meta: {
    title: "High-Power CW Single-Frequency Fiber Laser (1.5 µm) | Techwin",
    description:
      "Techwin High-Power CW Single-Frequency Fiber Laser (1.5 µm) for precision applications. Contact +86-13958180450 for details. Hangzhou City manufacturer.",
    keywords:
      "high power fiber laser 1.5um, single frequency fiber laser 1550nm, CW high power laser, narrow linewidth 1.5µm, Techwin high power fiber laser",
  },

  title: "High-Power CW Single-Frequency Fiber Laser (1.5 µm)",
  shortDescription:
    "High-power continuous-wave single-frequency fiber laser at 1.5 µm delivering narrow linewidth, excellent beam quality, and long-term stability for precision industrial, research and atmospheric applications.",

  heroImage: { src: "/products/high-power/1-5um-cw/hero.jpg",
    alt: "High-Power CW Single-Frequency Fiber Laser (1.5 µm)",
  },

  galleryImages: [
      { src: "/high-power/1-5um-cw/preview.jpg", alt: "high-power-cw-single-frequency-fiber-laser-1-5um preview" },
      { src: "/high-power/1-5um-cw/hero.jpg", alt: "high-power-cw-single-frequency-fiber-laser-1-5um hero" },
    ],

  datasheetUrl: "/products/high-power/1-5um-cw/datasheet.jpg",
  datasheetImageSrc: "/products/high-power/1-5um-cw/datasheet.jpg",
  previewImageSrc: "/products/high-power/1-5um-cw/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 1.5 µm High-Power Single-Frequency Laser Platform",
      image: { src: "/high-power/1-5um-cw/overview.jpg", alt: "1.5 µm laser overview" },
      content:
        "The High-Power CW Single-Frequency Fiber Laser (1.5 µm) series combines continuous-wave high power with ultra-narrow linewidth and low phase noise. Optimized for eye-safe, long-range and field-deployable systems, these lasers offer stable polarization, high coherence length and reliable operation for demanding measurement and communication tasks.",
    },

    {
      type: "features",
      heading: "Core Technical Features",
      bullets: [
        "Single-frequency emission with ultra-narrow linewidth (kHz-level typical)",
        "High CW output power with robust thermal management",
        "Low relative intensity noise (RIN) and low phase noise",
        "Near-diffraction-limited beam quality (TEM00 / M² ≈ 1)",
        "Fiber-integrated architecture for alignment-free operation",
        "Eye-safe wavelength band suitable for free-space and field systems",
      ],
    },

    {
      type: "text",
      heading: "Key Advantages",
      content:
        "This 1.5 µm class provides long coherence length, excellent spectral purity, and scalable output power—making it ideal for coherent LIDAR, distributed sensing, OCT, free-space optical links, and precision spectroscopy.",
    },

    {
      type: "features",
      heading: "Typical Specifications (Model-Dependent)",
      bullets: [
        "Wavelength: centered near 1.5 µm (tunable options available)",
        "Linewidth: kHz or below (model dependent)",
        "Output: medium-to-high CW power classes",
        "Polarization: PM or non-PM options",
        "Output delivery: single-mode or PM fiber, free-space option",
        "Control interfaces: digital/analog and software control",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Common uses include coherent FMCW/Doppler LIDAR, distributed acoustic/temperature sensing (DAS/DTS), OCT imaging, free-space optical communications, atmospheric monitoring, and precision metrology.",
    },

    {
      type: "features",
      heading: "Integration & Deployment Benefits",
      bullets: [
        "Compact, rugged design for lab or field deployment",
        "Standard fiber connectors and easy optical interfacing",
        "Efficient heat dissipation and long-term continuous operation",
        "Low-maintenance fiber-based construction",
      ],
    },

    {
      type: "text",
      heading: "Quality, Reliability & Support",
      content:
        "Manufactured with rigorous testing and quality control in Hangzhou City, Techwin supplies engineering support, customization options and service plans to match application-specific requirements and facility constraints.",
    },

    {
      type: "text",
      heading: "Ordering & Customization",
      content:
        "Customers can request model-specific datasheets, custom power levels, polarization options, and integration assistance. Provide application details (power, linewidth, environmental conditions) when requesting a quotation.",
    },
  ],

  relatedProducts: [
    {
      slug: "1-5um-cw",
      title: "High-Power CW Single-Frequency Fiber Laser (1.0 µm)",
      shortDescription: "High-power CW single-frequency laser at 1.0 µm for precision systems.",
      image: { src: "/high-power/1-5um-cw/", alt: "1.0 µm High-Power Laser" },
      href: "/high-power/1-5um-cw/",
    },
    {
      slug: "1-5um-cw",
      title: "High-Power CW Single-Frequency Fiber Laser (2.0 µm)",
      shortDescription: "Mid-IR high-power single-frequency laser for sensing and research.",
      image: { src: "/high-power/1-5um-cw/", alt: "2.0 µm High-Power Laser" },
      href: "/high-power/1-5um-cw/",
    },
  ],
};

export default highPowerCWSingleFrequencyFiberLaser1_5um;
