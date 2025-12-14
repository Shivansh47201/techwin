// src/data/Application/applications.ts

export type ApplicationItem = {
  slug: string;
  name: string;
  heading: string;
  keywords: string[];
  image: string;
  icon: string;
  short: string;
};

export const applications: ApplicationItem[] = [
  {
    slug: "lidar",
    name: "LiDAR & Remote Sensing",
    heading:
      "High-coherence fiber lasers supporting long-range 3D mapping, Doppler wind LiDAR and environmental monitoring.",
    keywords: ["3D Mapping", "Wind LiDAR", "Doppler", "Remote Sensing"],
    image: "/applications/lidar-systems.jpg",
    icon: "radar",
    short:
      "Coherent narrow-linewidth laser sources for long-range LiDAR, Doppler detection and atmospheric sensing."
  },

  {
    slug: "sensing",
    name: "Optical Fiber Sensing",
    heading:
      "Ultra-stable sources for DAS, DTS, and structural health monitoring across long-distance fiber links.",
    keywords: ["DAS", "DTS", "BOTDA", "Structural Monitoring"],
    image: "/applications/fiber-optic-sensing.jpg",
    icon: "activity",
    short:
      "Low-noise narrow-linewidth laser platform for distributed acoustic, temperature and strain sensing."
  },

  {
    slug: "gravitational-wave",
    name: "Gravitational Wave Detection",
    heading:
      "Sub-kHz linewidth lasers enabling ultra-precise interferometry for next-gen gravitational wave observatories.",
    keywords: ["Interferometry", "Sub-kHz", "Precision Physics"],
    image: "/applications/gravitational-wave-detection.jpg",
    icon: "waves",
    short:
      "Ultra-stable single-frequency lasers for precision interferometry used in gravitational-wave science."
  },

  {
    slug: "material-processing",
    name: "Material Processing",
    heading:
      "High-stability and high-quality beams for cutting, welding, drilling, surface treatment and engraving.",
    keywords: ["Cutting", "Welding", "Engraving", "Surface Treatment"],
    image: "/applications/material-processing.jpg",
    icon: "layers",
    short:
      "Reliable fiber sources for industrial cutting, welding, marking, drilling and precision micro-machining."
  },

  {
    slug: "quantum",
    name: "Quantum Technology",
    heading:
      "Narrow-linewidth coherent lasers for cold atom systems, quantum clocks, quantum sensing and QKD platforms.",
    keywords: ["Cold Atom", "QKD", "Atomic Clock", "Quantum Sensing"],
    image: "/applications/quantum-technology.jpg",
    icon: "atom",
    short:
      "Ultra-stable optical sources engineered for quantum computing, atomic clocks, metrology and QKD systems."
  },

  {
    slug: "satellite",
    name: "Satellite Communication",
    heading:
      "Space-grade stable lasers for inter-satellite links, space-to-ground communication and deep-space missions.",
    keywords: ["ISL", "Space Links", "Deep Space", "Optical Comm"],
    image: "/applications/satellite-communication.jpg",
    icon: "satellite",
    short:
      "Long-range coherent lasers for optical satellite links, GEO/LEO constellations and deep-space communication."
  },

  {
    slug: "spectroscopy",
    name: "Spectroscopy & Photonics",
    heading:
      "High spectral purity lasers for Raman, absorption, fluorescence and molecular spectroscopy setups.",
    keywords: ["Raman", "Absorption", "Fluorescence", "Photonics"],
    image: "/applications/spectroscopy-photonics.jpg",
    icon: "scan-line",
    short:
      "Stable narrow-linewidth fiber lasers for atomic/molecular spectroscopy and precision photonics research."
  },

  {
    slug: "biomedical",
    name: "Biomedical & Life Sciences",
    heading:
      "Stable excitation sources supporting imaging, diagnostics, OCT and advanced medical instruments.",
    keywords: ["OCT", "Diagnostics", "Imaging", "Biomedical"],
    image: "/applications/biomedical-diagnostics.jpg",
    icon: "heart",
    short:
      "High-stability lasers for OCT, fluorescence imaging, diagnostic sensing and biomedical photonics."
  },

  {
    slug: "optical-communication",
    name: "Optical Communication",
    heading:
      "High-bandwidth lasers for next-generation optical communication systems.",
    keywords: ["Telecom", "Datacom", "Free-space", "Coherent"],
    image: "/applications/optical-communication.jpg",
    icon: "cable",
    short:
      "Reliable and efficient lasers for high-speed optical communication networks."
  },

  {
    slug: "atomic-physics-research",
    name: "Atomic Physics Research",
    heading:
      "Precision lasers for cooling, trapping, and manipulating atoms.",
    keywords: ["Laser cooling", "Trapping", "Quantum optics", "Spectroscopy"],
    image: "/applications/atomic-physics-research.jpg",
    icon: "atom",
    short:
      "Ultra-stable lasers for cutting-edge atomic physics and quantum research."
  }
];
