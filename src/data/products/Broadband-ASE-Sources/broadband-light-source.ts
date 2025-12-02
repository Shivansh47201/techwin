import { Product } from "@/types/categories";

export const broadbandLightSource: Product = {
  slug: "broadband",
  category: "ase-sources",

  meta: {
    title: "Broadband Light Source | Techwin Optical Broadband Systems",
    description:
      "Techwin Broadband Light Source for optical testing & measurement tasks. Contact +86-13958180450 for specifications. Manufacturer situated in Hangzhou City for photonics.",
    keywords:
      "broadband light source, ASE light source, optical broadband source, fiber testing broadband, Techwin broadband source",
  },

  title: "Broadband Light Source",
  shortDescription:
    "Wide-spectrum broadband light source for metrology, OCT, fiber testing, imaging, and photonics development with stable intensity and clean spectral output.",

  heroImage: { src: "/products/ase-sources/broadband/hero.jpg",
    alt: "Broadband Light Source",
  },

  galleryImages: [
      { src: "/ase-sources/broadband/preview.jpg", alt: "Broadband ASE light source preview" },
      { src: "/ase-sources/broadband/hero.jpg", alt: "Broadband ASE light source hero" },
    ],

  datasheetUrl: "/products/ase-sources/broadband/datasheet.jpg",
  datasheetImageSrc: "/products/ase-sources/broadband/datasheet.jpg",
  previewImageSrc: "/products/ase-sources/broadband/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Introduction to Broadband Light Sources",
      content:
        "A Broadband Light Source provides wide-spectrum optical output essential for research, industrial testing, imaging, and fiber measurement systems. Its stable spectral output, uniform intensity, and flexible wavelength coverage make it suitable for laboratories, fiber diagnostics, spectral analysis, and calibration setups. One of the known providers is Techwin, located in Hangzhou City, offering systems optimized for optical performance.",
      image: {
        src: "/ase-sources/broadband-light-source/intro.jpg",
        alt: "Broadband source overview",
      },
    },

    {
      type: "features",
      heading: "Technical Characteristics",
      bullets: [
        "Wide spectral bandwidth for multi-wavelength testing",
        "Stable long-term optical output for precise measurements",
        "Low coherence suitable for OCT and imaging",
        "Uniform intensity distribution across the spectral range",
        "Compact and integration-ready structural design",
      ],
    },

    {
      type: "text",
      heading: "Core Design & Working Principle",
      content:
        "These systems use emission modules, optical conditioning networks, thermal regulation, and mechanical stabilization. Emission units may include spontaneous emission, ASE-based modules, fiber-emission systems, or lamp-based broadband units. Internal optics handle spectrum shaping, stabilization, and alignment while thermal management ensures consistent performance during long operations.",
      image: {
        src: "/ase-sources/broadband-light-source/structure.jpg",
        alt: "Internal broadband structure",
      },
    },

    {
      type: "features",
      heading: "Types of Broadband Light Sources",
      bullets: [
        "ASE-based broadband sources for fiber testing and sensing",
        "Lamp-based wide-spectrum systems for imaging tasks",
        "LED-based broadband units for targeted spectral regions",
        "Supercontinuum sources for extremely wide bandwidth applications",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "Broadband Light Sources are commonly used for optical component testing, spectral analysis, fiber Bragg grating evaluation, OCT medical imaging, distributed fiber sensing, imaging calibration, metrology, and R&D prototype validation. The broad spectral output supports wide-ranging tasks in laboratories and industrial test environments.",
    },

    {
      type: "features",
      heading: "Advantages for Research & Industry",
      bullets: [
        "Versatile for multi-purpose testing and measurement",
        "Reliable output suitable for long experimental cycles",
        "Uniform spectral profile ensures accurate calibration",
        "Flexible integration with optical benches and test systems",
        "Low maintenance requirements and strong operational lifespan",
      ],
    },

    {
      type: "text",
      heading: "Working Principle of ASE-Based Systems",
      content:
        "ASE systems operate by pumping doped fiber with a laser to generate spontaneous emission, which is then amplified within the fiber. This produces low-coherence, wide-spectrum light ideal for fiber sensing and testing environments due to its clean spectral behavior and stability.",
      image: {
        src: "/ase-sources/broadband-light-source/ase-diagram.jpg",
        alt: "ASE working principle",
      },
    },

    {
      type: "text",
      heading: "Structural Engineering & Thermal Stability",
      content:
        "Broadband sources use shock-resistant housings, dust-protected optical chambers, and precise thermal regulation with heat-dissipation pathways. Temperature-controlled modules ensure consistent spectral performance during extended operation.",
    },

    {
      type: "text",
      heading: "Integration in Automated Test Environments",
      content:
        "These sources integrate seamlessly into automated alignment machines, fiber inspection units, continuous spectral analysis platforms, and industrial measurement systems due to their stability and low maintenance design.",
    },

    {
      type: "text",
      heading: "Maintenance & Operational Guidelines",
      content:
        "To maintain peak performance, protect fiber connectors, avoid dust contamination, maintain stable environmental temperature, use proper fiber-handling procedures, and ensure steady electrical supply.",
    },

    {
      type: "text",
      heading: "Support & Manufacturing",
      content:
        "Techwin manufactures broadband systems designed for testing, sensing, metrology, and photonic prototype development. For specifications, configuration options, or integration guidance, contact +86-13958180450.",
    },
  ],

  relatedProducts: [
    {
      slug: "broadband",
      title: "ASE Light Source",
      shortDescription: "High-stability ASE emission for sensing & fiber testing.",
      image: {
        src: "/ase-sources/ase-light-thumb.jpg",
        alt: "ASE Light Source",
      },
      href: "/ase-sources/ase-light-source",
    },
    {
      slug: "broadband",
      title: "Supercontinuum Light Source",
      shortDescription:
        "Ultra-broad spectral coverage for advanced research and imaging.",
      image: {
        src: "/ase-sources/supercontinuum-thumb.jpg",
        alt: "Supercontinuum Light Source",
      },
      href: "/ase-sources/supercontinuum-light-source",
    },
  ],
};

export default broadbandLightSource;
