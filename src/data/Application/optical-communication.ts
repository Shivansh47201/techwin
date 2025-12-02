// src/data/applications/optical-communication.ts

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

export const opticalCommunicationApplication: ApplicationDetail = {
  slug: "optical-communication",
  url: "/application/optical-communication",
  name: "Optical Communication",
  aliases: ["communication"],
  metaTitle:
    "Fiber Lasers for Optical Communication in Hangzhou City | Techwin – China",
  metaDescription:
    "Precision fiber lasers for optical communication applications by Techwin – single frequency fiber laser, Hangzhou City. Call +86-571-88284299 for reliable communication performance.",
  heroTitle:
    "Fiber Lasers for Optical Communication – High-Stability Laser Solutions",
  heroTagline:
    "High-stability, narrow-linewidth fiber lasers engineered for advanced optical communication, data transmission, and networking systems.",
  heroImage: {
    src: "/applications/Optical Communication.jpg",
    alt: "Optical Communication",
  },
  heroIntro:
    "Optical communication technologies depend on light sources that offer accuracy, narrow linewidth, and long-term signal stability. For advanced data transmission environments—whether long-haul networks, data centers, or satellite links—having a dependable laser is essential for sending meaningful data with minimal noise.",

  sections: [
    {
      id: "overview",
      heading: "Overview of Fiber Lasers for Optical Communication",
      body: [
        "Fiber-based optical communication systems have become widely adopted because they deliver consistent results over long distances. They provide immunity to electromagnetic interference, high bandwidth, and long-term reliability.",
        "To support such systems, the laser source must exhibit specific performance characteristics that maintain signal quality and data integrity in demanding environments.",
      ],
      bullets: [
        "Narrow linewidth for precise frequency stability",
        "Low relative intensity noise (RIN)",
        "High spectral purity for clean signal generation",
        "Stable wavelength output for dense wavelength-division multiplexing (DWDM)",
        "Reliable long-term operation in various temperature conditions",
      ],
    },
  ],
};
