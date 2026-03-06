import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://bilder.computer-extra.de/**")],
  },
};

export default nextConfig;
