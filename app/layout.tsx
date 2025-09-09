import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { header, footer } from "@/data";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/global/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import PortfolioChatWidget from "@/components/ai/PortfolioChatWidget";
import { generateMetadata as createMetadata, getPageMetadata, generateStructuredData } from "@/utils/metadata";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata(getPageMetadata("layout"));

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
            __html: generateStructuredData("person"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData("website"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData("organization"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData("professional_service"),
          }}
        />
        <link rel="canonical" href="https://adamjosephscott.dev" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Portfolio RSS"
          href="/rss.xml"
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

      </body>
    </html>
  );
}
