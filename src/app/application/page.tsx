// src/app/applications/page.tsx

import React from "react";
import type { Metadata } from "next";
import ApplicationsPage from "@/components/application/listing/ApplicationsPage";
import type { ApplicationSummary } from "@/components/application/listing/ApplicationCard";

export const metadata: Metadata = {
  title: "Fiber Laser Applications | Techwin Solutions",
  description:
    "Discover fiber laser applications from Techwin: LiDAR systems, quantum technology, optical sensing, gravitational waves, communications, biomedical, spectroscopy, material processing and more.",
};

// NOTE: yahi data tumne pehle share kiya tha (name, URL, title, keywords)
const applications: ApplicationSummary[] = [
  {
    name: "LiDAR Systems",
    slug: "lidar",
    heading: "Fiber Lasers for LiDAR Systems – high-stability optical sources for precision ranging and 3D mapping.",
    keywords: ["lidar fiber laser", "remote sensing", "3D mapping"],
  },
  {
    name: "Quantum Technology",
    slug: "quantum",
    heading: "Fiber Lasers for Quantum Technology – narrow-linewidth, low-noise sources for quantum optics and sensing.",
    keywords: ["quantum laser", "quantum optics", "cold atoms"],
  },
  {
    name: "Fiber Optic Sensing",
    slug: "sensing",
    heading: "Fiber Lasers for Optical Sensing – ultra-stable sources for DAS, DTS and distributed sensing platforms.",
    keywords: ["sensing laser", "distributed fiber sensing"],
  },
  {
    name: "Gravitational Wave Detection",
    slug: "gravitational-wave",
    heading: "Lasers for Gravitational Wave Detection – ultra-stable, low-noise single-frequency laser platforms.",
    keywords: ["ultra-stable laser", "low noise laser"],
  },
  {
    name: "Optical Communication",
    slug: "communication",
    heading: "Fiber Lasers for Optical Communication – coherent sources for high-capacity telecom links.",
    keywords: ["coherent communication", "telecom laser"],
  },
  {
    name: "Biomedical & Diagnostics",
    slug: "biomedical",
    heading: "Lasers for Biomedical Applications – reliable optical sources for imaging, diagnostics and treatment devices.",
    keywords: ["biomedical laser", "medical laser"],
  },
  {
    name: "Spectroscopy & Photonics",
    slug: "spectroscopy",
    heading: "Fiber Lasers for Spectroscopy – narrow-linewidth sources for precision spectral analysis and photonics R&D.",
    keywords: ["spectroscopy laser", "narrow linewidth"],
  },
  {
    name: "Material Processing",
    slug: "material-processing",
    heading: "Fiber Lasers for Material Processing – high-precision, industrial-grade cutting, welding and surface treatment.",
    keywords: ["industrial laser", "high power fiber"],
  },
  {
    name: "Atomic Physics Research",
    slug: "atomic",
    heading: "Fiber Lasers for Atomic Research – ultra-stable light for atomic physics, metrology and precision experiments.",
    keywords: ["atomic laser", "precision measurement"],
  },
  {
    name: "Satellite Communication",
    slug: "satellite",
    heading: "Lasers for Satellite Communication – single-frequency sources for optical satellite and deep-space links.",
    keywords: ["satellite laser", "space communication"],
  },
];

export default function ApplicationsRoutePage() {
  return <ApplicationsPage applications={applications} />;
}
