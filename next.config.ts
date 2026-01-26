import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/collect",
        destination: "https://cbam-collect-test.vercel.app",
      },
      {
        source: "/collect/:path*",
        destination: "https://cbam-collect-test.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
