import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@headlessui/react", "react-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // pathname: '/**',
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; connect-src 'self' https://dev.to https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live https://*.vercel.live; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live https://*.vercel.live; frame-src 'self' https://vercel.live https://*.vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; connect-src 'self' https://dev.to; script-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
