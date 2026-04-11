import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Codecanyon / Themeforest marketplace images (project thumbnails)
      {
        protocol: "https",
        hostname: "market-resized.envatousercontent.com",
      },
      // Dev.to blog post cover images
      {
        protocol: "https",
        hostname: "dev-to-uploads.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // General dev.to CDN
      {
        protocol: "https",
        hostname: "media2.dev.to",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    formats: ["image/avif", "image/webp"],
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
            value:
              "default-src 'self'; connect-src 'self' https://dev.to https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live https://*.vercel.live https://api.emailjs.com https://*.emailjs.com; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live https://*.vercel.live; frame-src 'self' https://vercel.live https://*.vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
          },
        ],
      },

      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
