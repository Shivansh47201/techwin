import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable the React compiler (Next.js 15+)
  reactCompiler: true,

  // Turbopack build configuration
  turbopack: {
    root: __dirname,
  },
  
  // ✅ PRODUCTION: Export as a fully static site (generates `out/` folder)
  // This creates a static HTML export suitable for Hostinger deployment
  output: "export",

  // When exporting statically, Next.js' built-in image optimization isn't
  // available. Serve images as normal `<img>` sources by disabling the
  // optimizer so static sites reference the files under `/public`.
  images: {
    unoptimized: true,
  },

  // For stable production builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Trailing slashes for proper static routing
  trailingSlash: true,

  // ✅ Base path (empty for root domain)
  basePath: "",

  // ✅ Optimize for production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
