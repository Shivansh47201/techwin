// src/data/applications.ts

export type ApplicationItem = {
  name: string;
  slug: string;
  heading: string;
  keywords: string[];
  image?: string;
};

export const applications: ApplicationItem[] = [
  {
    name: "LiDAR Systems",
    slug: "lidar",
    heading: "Fiber Lasers for LiDAR Systems",
    keywords: ["lidar fiber laser", "remote sensing laser"],
    image: "/applications/lidar-systems.jpg",
  },
  {
    name: "Quantum Technology",
    slug: "quantum",
    heading: "Fiber Lasers for Quantum Technology",
    keywords: ["quantum laser", "quantum optics fiber laser"],
    image: "/applications/quantum-technology.jpg",
  },
  {
    name: "Fiber Optic Sensing",
    slug: "sensing",
    heading: "Fiber Lasers for Optical Sensing",
    keywords: ["sensing laser", "distributed fiber laser"],
    image: "/applications/fiber-optic-sensing.jpg",
  },
  {
    name: "Gravitational Wave Detection",
    slug: "gravitational-wave",
    heading: "Lasers for Gravitational Wave Detection",
    keywords: ["ultra-stable fiber laser", "low noise laser"],
    image: "/applications/gravitational-wave-detection.jpg",
  },
  {
    name: "Optical Communication",
    slug: "communication",
    heading: "Fiber Lasers for Optical Communication",
    keywords: ["coherent communication laser", "telecom laser"],
    image: "/applications/optical-communication.jpg",
  },
  {
    name: "Biomedical & Diagnostics",
    slug: "biomedical",
    heading: "Lasers for Biomedical Applications",
    keywords: ["biomedical laser", "medical laser"],
    image: "/applications/biomedical-diagnostics.jpg",
  },
  {
    name: "Spectroscopy & Photonics",
    slug: "spectroscopy",
    heading: "Fiber Lasers for Spectroscopy",
    keywords: ["spectroscopy laser", "narrow linewidth source"],
    image: "/applications/spectroscopy-photonics.jpg",
  },
  {
    name: "Material Processing",
    slug: "material-processing",
    heading: "Fiber Lasers for Material Processing",
    keywords: ["industrial laser", "high power fiber laser"],
    image: "/applications/material-processing.jpg",
  },
  {
    name: "Atomic Physics Research",
    slug: "atomic",
    heading: "Fiber Lasers for Atomic Research",
    keywords: ["atomic laser", "precision measurement laser"],
    image: "/applications/atomic-physics-research.jpg",
  },
  {
    name: "Satellite Communication",
    slug: "satellite",
    heading: "Lasers for Satellite Communication",
    keywords: ["satellite laser", "space communication laser"],
    image: "/applications/satellite-communication.jpg",
  },
];
