import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig: NextConfig = {
  // Enable the React compiler (Next.js 15+)
  reactCompiler: true,

  // Turbopack build configuration
  turbopack: {
  root: process.cwd(),
  },
  
 
  // output: "export",
  // Produce a standalone server bundle so deployment images contain
  // only the runtime and required files (smaller footprint on server)
  output: "standalone",

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

export default withAnalyzer(nextConfig);



