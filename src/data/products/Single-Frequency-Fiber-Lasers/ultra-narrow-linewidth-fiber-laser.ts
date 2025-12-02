import { Product } from "@/types/categories";

export const ultraNarrowLinewidth: Product = {
  slug: "ultra-narrow-linewidth",
  category: "single-frequency-fiber-lasers",

  meta: {
    title: "Hz-Level Ultra-Narrow Linewidth Single-Frequency Fiber Laser | Techwin China",
    description:
      "Hz-level ultra-narrow linewidth single-frequency fiber lasers in Hangzhou — stable 1550nm narrow-linewidth sources for coherent detection, lidar, and quantum research. Contact +86-13958180450.",
    keywords:
      "ultra-narrow linewidth fiber laser, single frequency fiber laser, coherent detection laser, 1550nm narrow linewidth source",
  },

  title: "Hz-Level Ultra‑Narrow Linewidth Single‑Frequency Fiber Laser",

  shortDescription:
    "Hz-level ultra-narrow linewidth fiber laser delivering exceptional coherence, phase stability, and spectral purity for scientific, industrial, sensing, and quantum applications.",

  heroImage: { src: "/products/single-frequency/narrow-linewidth/hero.jpg",
    alt: "Ultra-Narrow Linewidth Fiber Laser Main Image",
  },

  galleryImages: [
      { src: "/products/single-frequency/narrow-linewidth/preview.jpg", alt: "ultra-narrow-linewidth preview" },
      { src: "/products/single-frequency/narrow-linewidth/hero.jpg", alt: "ultra-narrow-linewidth hero" },
    ],

  datasheetUrl: "/products/single-frequency/narrow-linewidth/datasheet.pdf",
  datasheetImageSrc: "/products/single-frequency/narrow-linewidth/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/narrow-linewidth/preview.jpg",

  sections: [
    {
      type: 'text',
      heading: "What Is an Ultra‑Narrow Linewidth Fiber Laser?",
      image: { src: "/single-frequency/ultra-narrow-linewidth/what-is.jpeg", alt: "what is section image"},
      content: `An ultra-narrow linewidth fiber laser is engineered to achieve extremely low linewidth levels — down to Hz or sub-kHz — giving very long coherence lengths and low phase noise.`,
    },
    {
      type: 'features',
      heading: "Why Linewidth Matters in High‑Precision Applications",
      bullets: [
        "Longer coherence length",
        "Improved phase noise characteristics",
        "Higher measurement accuracy",
        "Superior interferometric performance",
        "Stable long-range signal transmission",
      ],
    },
  ],

  relatedProducts: [
    // These slugs need to correspond to actual file names.
    // Assuming 'single-frequency-amplifier.ts' and 'low-noise-1550.ts' exist in the same category directory.
    { slug: "ultra-narrow-linewidth-fiber-laser", title: "Single‑Frequency Amplifier", shortDescription: "A high power single frequency amplifier", image: { src: "/single-frequency/sfa.jpg", alt: "Single frequency amplifier" }, href:"/single-frequency/ultra-narrow-linewidth-fiber-laser" },
    { slug: "ultra-narrow-linewidth-fiber-laser", title: "Low‑Noise 1550nm Laser", shortDescription: "A low-noise 1550nm laser", image: { src: "/single-frequency/ln150.jpg", alt: "low noise 1550nm laser" }, href:"/single-frequency/ultra-narrow-linewidth-fiber-laser" },
  ],
};

export default ultraNarrowLinewidth;
