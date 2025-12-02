// src/data/applications/material-processing.ts

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

export const materialProcessingApplication: ApplicationDetail = {
  slug: "material-processing",
  url: "/application/material-processing",
  name: "Material Processing",
  metaTitle:
    "Fiber Lasers for Material Processing in Hangzhou City | Techwin China",
  metaDescription:
    "High-precision fiber lasers for material processing by Techwin – single frequency fiber laser in Hangzhou City. Call +86-571-88284299 for reliable industrial laser solutions.",
  heroTitle: "Fiber Lasers for Material Processing",
  heroTagline:
    "Precision-focused, stable and high-efficiency fiber lasers built for industrial cutting, welding, drilling, engraving, and surface treatment workflows.",
  heroImage: {
    src: "/applications/Material Processing.jpg",
    alt: "Material Processing",
  },
  heroIntro:
    "Material shaping, cutting, welding, engraving, and surface treatment require precision, stability, and consistent optical performance. Modern industries rely on fiber-based laser sources because they provide narrow linewidth output, excellent beam quality, and long operational life.",

  sections: [
    {
      id: "introduction",
      heading: "Introduction to Fiber Lasers for Modern Industries",
      body: [
        "As global manufacturing demands move toward tighter tolerances and reduced waste, laser-enabled processes have become the preferred choice for many production lines.",
        "Fiber-based processing lasers deliver concentrated optical energy that interacts precisely with metals, polymers, glass, ceramics, and composite structures.",
        "These systems serve sectors such as electronics, automotive, aerospace, renewable energy, heavy machinery, instrumentation, fabrication workshops, research labs, and advanced manufacturing units.",
      ],
    },
    {
      id: "why-fiber-lasers",
      heading: "Why Fiber Lasers Are Ideal for Material Processing",
      subSections: [
        {
          id: "stable-output",
          heading: "1. Stable Optical Output",
          body: [
            "Production environments require a beam source that maintains consistent power and wavelength stability, essential for creating repeatable and reliable processed parts.",
          ],
        },
        {
          id: "beam-quality",
          heading: "2. Excellent Beam Quality",
          body: [
            "High beam quality enables clean cuts, smooth weld seams, and sharp engraving edges — even for thin, delicate, or micro-size components.",
          ],
        },
        {
          id: "efficiency",
          heading: "3. High Electrical Efficiency",
          body: [
            "Fiber architecture converts electrical energy into optical power more efficiently than many other laser systems, supporting lower operational cost and extended uptime.",
          ],
        },
        {
          id: "material-compatibility",
          heading: "4. Versatility for Multiple Materials",
          bullets: [
            "Stainless steel, mild steel and aluminum",
            "Copper, brass, nickel alloys",
            "Plastics and coated metals",
            "Transparent and reflective materials (with optimized wavelength)",
          ],
        },
        {
          id: "integration",
          heading: "5. Easy Integration",
          body: [
            "Compact design supports installation into existing CNC machines, robotic arms, automated lines, and modular workstations.",
          ],
        },
      ],
    },
    {
      id: "applications",
      heading: "Applications of Fiber Lasers in Material Processing",
      body: [
        "Fiber lasers are recognized for their ability to handle a wide range of tasks with high precision and reliability.",
      ],
      subSections: [
        {
          id: "cutting",
          heading: "Laser Cutting",
          body: [
            "Widely adopted for sheet metal fabrication, electronics, tooling, and decorative machining with minimal heat effect and fine edge quality.",
          ],
          bullets: [
            "Fine metal sheet cutting",
            "Thick plate cutting (power dependent)",
            "Precision micro-cutting",
            "Intricate decorative cutting",
            "Cutting reflective materials with proper configuration",
          ],
        },
        {
          id: "welding",
          heading: "Laser Welding",
          body: [
            "Supports deep penetration, stable seams, and low-deformation welds, suitable for high-strength and micro-assembly workflows.",
          ],
          bullets: [
            "Automotive components",
            "Battery packs",
            "Aerospace parts",
            "Sensor housings",
            "Instrumentation components",
            "Stainless steel enclosures",
          ],
        },
        {
          id: "engraving",
          heading: "Laser Marking and Engraving",
          body: [
            "Provides permanent and high-contrast markings suitable for branding, compliance coding, and traceability.",
          ],
          bullets: [
            "Product numbering",
            "QR & barcodes",
            "Deep engraving",
            "Branding stamps",
            "Electronics marking",
          ],
        },
        {
          id: "surface-treatment",
          heading: "Surface Treatment",
          bullets: [
            "Laser hardening for improved wear resistance",
            "Surface oxide & rust removal",
            "Coating removal",
            "Laser polishing for refined finish",
          ],
        },
        {
          id: "drilling",
          heading: "Drilling and Micro-Machining",
          body: [
            "Suitable for medical devices, aerospace parts, sensors, precision electronics and micro-industrial fabrication.",
          ],
          bullets: [
            "Accurate hole positioning",
            "High aspect-ratio drilling",
            "Consistent bore quality",
            "Works with metals, ceramics, polymers",
          ],
        },
      ],
    },
    {
      id: "workflow-benefits",
      heading: "Advantages of Fiber Lasers in Manufacturing Workflows",
      subSections: [
        {
          id: "maintenance",
          heading: "1. Low Maintenance Requirements",
          body: [
            "Fiber-based construction eliminates frequent optical alignment and reduces unexpected shutdowns.",
          ],
        },
        {
          id: "long-life",
          heading: "2. Long Lifecycle",
          body: [
            "Solid-state architecture supports reliable long-term usage even in dusty, vibrating, or temperature-changing workloads.",
          ],
        },
        {
          id: "speed",
          heading: "3. High Processing Speed",
          body: [
            "Beam stability ensures faster cutting, welding, marking, and drilling cycles with reduced production cost.",
          ],
        },
        {
          id: "compact",
          heading: "4. Compact and Lightweight",
          body: [
            "Requires less workspace and can be mounted into both mobile and fixed robotic systems.",
          ],
        },
        {
          id: "automation",
          heading: "5. Suitable for Automation",
          body: [
            "Easily integrates with robotic systems, CNC controllers, vision-based automation, and smart factory modules.",
          ],
        },
      ],
    },
    {
      id: "accuracy",
      heading: "How Fiber Lasers Improve Accuracy in Material Processing",
      bullets: [
        "Consistent edge finishing",
        "Reduced rework and material wastage",
        "Low thermal impact cutting",
        "Repeatable high-precision output",
        "Micron-grade detail production",
      ],
    },
    {
      id: "materials-supported",
      heading: "Material Compatibility",
      bullets: [
        "Stainless & mild steel",
        "Titanium and Ni-alloys",
        "Aluminum & copper",
        "Ceramics and composites",
        "Plastics & coated metals",
      ],
    },
    {
      id: "high-power-role",
      heading: "Role of High-Power Fiber Lasers in Heavy-Duty Applications",
      body: [
        "High-power fiber lasers support heavy industrial operations such as structural welding, deep penetration cutting, and large surface treatment.",
      ],
      bullets: [
        "Heavy fabrication",
        "Shipbuilding",
        "Aerospace structures",
        "Defense manufacturing",
        "Industrial machinery production",
      ],
    },
    {
      id: "industrial-solutions",
      heading: "Industrial Laser Solutions Offered",
      bullets: [
        "Continuous-wave fiber systems",
        "Pulsed fiber laser systems",
        "Narrow linewidth solutions",
        "Single-mode & multi-mode platforms",
        "Custom wavelength variants",
        "High-power modules",
        "Compact units for marking & engraving",
      ],
    },
    {
      id: "industries",
      heading: "Industries That Benefit from Fiber Lasers",
      bullets: [
        "Automotive & EV",
        "Aerospace",
        "Electronics manufacturing",
        "Instrumentation",
        "Renewable energy",
        "Medical device production",
        "Defense & research labs",
      ],
    },
    {
      id: "benefits",
      heading: "Why Choose Our Fiber Lasers for Material Processing",
      bullets: [
        "High beam quality & stability",
        "Long operational lifespan",
        "Easy installation & integration",
        "Reliable electronic control",
        "Wide power & wavelength options",
      ],
    },
    {
      id: "support",
      heading: "Customer Support and Technical Assistance",
      bullets: [
        "Pre-purchase consultation",
        "Material-based application study",
        "Installation assistance",
        "Remote & onsite support",
        "Maintenance & spares",
        "Long-term product advisory",
      ],
    },
    {
      id: "location",
      heading: "Located in Hangzhou City",
      body: [
        "Our facilities are based in Hangzhou City, an advanced hub for optical and photonics manufacturing. Systems are engineered for long-term reliability and precise industrial performance.",
      ],
    },
  ],
};
