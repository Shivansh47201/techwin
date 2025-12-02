import { Product } from "@/types/categories";

export const kilowattLevelFiberLaserCombustionDiagnostics: Product = {
  slug: "kilowatt",
  category: "high-power",

  meta: {
    title: "Techwin Kilowatt-Level Fiber Laser for Combustion Diagnostics Systems",
    description:
      "Techwin Kilowatt-Level Fiber Laser for Combustion Diagnostics from Hangzhou City. High stability and reliable output for research. Contact +86-13958180450 today.",
    keywords:
      "kilowatt fiber laser, combustion diagnostics laser, high-power fiber laser, Techwin kilowatt laser, PIV laser, LIF laser",
  },

  title: "Kilowatt-Level Fiber Laser for Combustion Diagnostics",
  shortDescription:
    "High-power kilowatt-class fiber lasers engineered for combustion diagnostics, offering narrow linewidth, stable beam quality, and long-term reliability for demanding research and industrial applications.",

  heroImage: { src: "/products/high-power/kilowatt/hero.jpg",
    alt: "Kilowatt-Level Fiber Laser for Combustion Diagnostics",
  },

  galleryImages: [
      { src: "/high-power/kilowatt/preview.jpg", alt: "kilowatt-level-fiber-laser-combustion-diagnostics preview" },
      { src: "/high-power/kilowatt/hero.jpg", alt: "kilowatt-level-fiber-laser-combustion-diagnostics hero" },
    ],

  datasheetUrl: "/products/high-power/kilowatt/datasheet.jpg",
  datasheetImageSrc: "/products/high-power/kilowatt/datasheet.jpg",
  previewImageSrc: "/products/high-power/kilowatt/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Kilowatt-Level Fiber Lasers for Combustion Research",
      image: { src: "/high-power/kilowatt/overview.jpg", alt: "Kilowatt fiber laser overview" },
      content:
        "Combustion diagnostics requires high-energy, narrow-linewidth, and highly stable light sources. Techwin’s kilowatt-class fiber lasers are engineered to support advanced measurement techniques—delivering continuous high power, stable beam quality and resilient performance in harsh experimental environments.",
    },

    {
      type: "features",
      heading: "Why Kilowatt-Level Fiber Lasers Matter in Combustion Diagnostics",
      bullets: [
        "High optical power for long-range propagation and penetration through particulate-laden flame zones",
        "Narrow spectral linewidth for selective species excitation and precise spectroscopy",
        "Stable beam quality (M² optimized) for uniform illumination in PIV and imaging",
        "Robust continuous operation for long test campaigns",
        "Fiber-based architecture for enhanced thermal management and reliability",
      ],
    },

    {
      type: "text",
      heading: "Common Diagnostic Techniques Supported",
      content:
        "These lasers enable multiple advanced diagnostics including Laser-Induced Fluorescence (LIF) for species mapping, Particle Image Velocimetry (PIV) for flow-field analysis, Coherent Anti-Stokes Raman Spectroscopy (CARS) for temperature and composition, absorption-based pollutant monitoring, and high-speed imaging of transient flame phenomena.",
    },

    {
      type: "features",
      heading: "Key Features & Performance Highlights",
      bullets: [
        "Kilowatt-class continuous and quasi-CW output modes (model dependent)",
        "Superior beam quality and pointing stability",
        "Narrow linewidth for molecular-selective excitation",
        "High coherence and low phase noise for interferometric measurements",
        "Wavelength options and tunability to target specific transitions",
      ],
    },

    {
      type: "text",
      heading: "Applications in Industry and Research",
      content:
        "Widely used by aerospace, automotive, energy, and academic research groups for propulsion diagnostics, emissions monitoring, turbine testing, reaction kinetics studies, and high-resolution combustion imaging under realistic operating conditions.",
    },

    {
      type: "features",
      heading: "Operational Advantages in Combustion Environments",
      bullets: [
        "Strong optical penetration through thermal gradients and particulate media",
        "Reliable continuous operation for extended experimental campaigns",
        "Compatibility with high-speed detectors and synchronized measurement systems",
        "Low maintenance due to fiber-integrated design and robust components",
      ],
    },

    {
      type: "text",
      heading: "Design & Integration Considerations",
      content:
        "When selecting a kilowatt-class system, evaluate required output power (continuous vs pulsed), wavelength matching for target species, beam delivery and attenuation, cooling and power infrastructure, safety interlocks, and integration with existing diagnostic instrumentation.",
    },

    {
      type: "features",
      heading: "Technical Checklist Before Purchase",
      bullets: [
        "Required power level and operational duty cycle",
        "Desired wavelength(s) and tunability",
        "Beam quality (M²) and pointing stability requirements",
        "Cooling and facility power specifications",
        "Delivery optics and fiber/beamline compatibility",
        "Service and calibration support availability",
      ],
    },

    {
      type: "text",
      heading: "Advantages of Fiber Lasers vs. Traditional Solid-State Systems",
      content:
        "Fiber lasers provide improved heat dissipation, higher energy efficiency, cleaner beam profiles, greater resistance to misalignment, and lower long-term maintenance—making them especially suited for rigorous combustion research and industrial diagnostics.",
    },

    {
      type: "text",
      heading: "Manufacturer & Support",
      content:
        "Techwin designs and manufactures kilowatt-level fiber laser solutions with strict quality control and testing in Hangzhou City. For specification sheets, site requirements, and integration assistance contact our technical team.",
    },
  ],

  relatedProducts: [
    {
      slug: "kilowatt",
      title: "Industrial High-Power Fiber Laser Series",
      shortDescription: "High-power fiber lasers for industrial processing and testing.",
      image: { src: "/high-power/kilowatt/", alt: "Industrial high-power fiber lasers" },
      href: "/high-power/kilowatt/",
    },
    {
      slug: "kilowatt",
      title: "Mid-Power Fiber Lasers for Research",
      shortDescription: "Stable mid-power lasers for laboratory diagnostics and experiments.",
      image: { src: "/high-power/kilowatt/", alt: "Mid-power fiber lasers" },
      href: "/high-power/kilowatt/",
    },
  ],
};

export default kilowattLevelFiberLaserCombustionDiagnostics;
