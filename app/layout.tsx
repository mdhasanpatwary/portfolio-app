import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { header, footer } from "@/data";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/global/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PortfolioChatWidget from "@/components/ai/PortfolioChatWidget";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const typedMetadata = metadataConfig as MetadataConfig;
const layoutMetadata = typedMetadata.pages.layout;
const siteConfig = typedMetadata.site;
const defaultImage = typedMetadata.defaultImage;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: layoutMetadata.title,
  description: layoutMetadata.description,
  keywords: layoutMetadata.keywords,
  openGraph: {
    title: layoutMetadata.openGraph.title,
    description: layoutMetadata.openGraph.description,
    url: siteConfig.url,
    siteName: layoutMetadata.openGraph.siteName,
    images: [
      {
        url: defaultImage.url,
        width: defaultImage.width,
        height: defaultImage.height,
        alt: defaultImage.alt,
      },
    ],
    locale: siteConfig.locale,
    type: (layoutMetadata.openGraph.type as "website") || "website",
  },
  twitter: layoutMetadata.twitter ? {
    card: layoutMetadata.twitter.card as "summary_large_image",
    title: layoutMetadata.twitter.title,
    description: layoutMetadata.twitter.description,
    images: [defaultImage.url],
  } : {
    card: "summary_large_image",
    title: layoutMetadata.openGraph.title,
    description: layoutMetadata.openGraph.description,
    images: [defaultImage.url],
  },
  twitter: layoutMetadata.twitter
    ? {
        card: layoutMetadata.twitter.card as "summary_large_image",
        title: layoutMetadata.twitter.title,
        description: layoutMetadata.twitter.description,
        images: [defaultImage.url],
      }
    : {
        card: "summary_large_image",
        title: layoutMetadata.openGraph.title,
        description: layoutMetadata.openGraph.description,
        images: [defaultImage.url],
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(typedMetadata.structuredData.person),
          }}
        />
        <meta
          name="google-site-verification"
          content="mAw4WDufpIlGKITY-HKXUg0YyJqt3H_iUNTUXWDDAA4"
        />
        <link rel="canonical" href={siteConfig.url} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="MD Hasan Patwary RSS"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="MD Hasan Patwary Projects RSS"
          href="/projects.xml"
        />
        <link rel="preconnect" href="https://dev.to" crossOrigin="" />
        {/* Preconnect to analytics/vitals domains to speed up first requests */}
        <link
          rel="preconnect"
          href="https://va.vercel-scripts.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          crossOrigin=""
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            {/* Skip to content link for keyboard users (inside a navigation landmark) */}
            <nav aria-label="Skip links">
              <a href="#main-content" className="skip-link">
                Skip to content
              </a>
            </nav>
            <Toaster position="top-right" />
            <Header navItems={header.navItems} />
            {/* Primary page content within a single main landmark */}
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer name={footer.name} description={footer.description} />

            {/* Floating AI Chat Widget */}
            <PortfolioChatWidget />
          </ErrorBoundary>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
