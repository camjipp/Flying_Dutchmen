import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/horses/northern-standard", destination: "/horses/slay-the-day", permanent: true },
      {
        source: "/news/northern-standard-derby-day-assignment",
        destination: "/news/slay-the-day-derby-day-assignment",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**"
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
