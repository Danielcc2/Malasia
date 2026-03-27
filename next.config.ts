import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Malasia",
  assetPrefix: "/Malasia/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
