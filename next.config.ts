import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gdp.elosolutions.com.br/:path*',
      },
    ]
  },
};

export default nextConfig;
