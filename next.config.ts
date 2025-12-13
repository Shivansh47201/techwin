import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable the React compiler (Next.js 15+)
  reactCompiler: true,

  // Turbopack build configuration
  turbopack: {
  root: process.cwd(),
  },
  
 
  // output: "export",

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



