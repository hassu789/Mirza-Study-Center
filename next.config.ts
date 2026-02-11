import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No remote patterns needed - all images are local now
    remotePatterns: [],
  },
};

export default nextConfig;
