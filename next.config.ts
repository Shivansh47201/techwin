import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable the React compiler (Next.js 15+)
reactCompiler: true,

  // Turbopack build configuration
  turbopack: {
    root: __dirname,
  },

  // For stable production builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
