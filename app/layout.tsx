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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "John Doe | Full-Stack Developer Portfolio",
  description:
    "John Doe - Full-Stack Developer | Modern Web Solutions | React, Next.js, TypeScript, Node.js. Professional portfolio showcasing skills and projects. Available for freelance & collaboration.",
  keywords: [
    "John Doe",
    "Portfolio",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Frontend",
    "Backend",
    "Freelance Developer",
  ],
  openGraph: {
    title: "John Doe | Full-Stack Developer Portfolio",
    description:
      "Full-Stack Developer (React, Next.js, TypeScript) | Modern Web Solutions | Professional Portfolio | Available for freelance & collaboration",
    url: "https://yourdomain.com",
    siteName: "John Doe Portfolio",
    images: [
      {
        url: "/profile.webp",
        width: 800,
        height: 600,
        alt: "John Doe - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe | Full-Stack Developer Portfolio",
    description:
      "Full-Stack Developer (React, Next.js, TypeScript) | Modern Web Solutions | Professional Portfolio | Available for freelance & collaboration",
    images: ["/profile.webp"],
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://yourdomain.com/#person",
              name: "John Doe",
              url: "https://yourdomain.com",
              sameAs: [
                "https://github.com/johndoe",
                "https://linkedin.com/in/johndoe",
                "https://twitter.com/johndoe",
                "https://instagram.com/johndoe",
              ],
              jobTitle: "Full-Stack Developer",
              image: "/profile.webp",
              description:
                "John Doe – Full-Stack Developer (React, Next.js, TypeScript) with expertise in modern web technologies. Professional portfolio showcasing skills and projects.",
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Node.js",
                "Web Development",
                "Frontend Development",
                "Backend Development",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance/Remote",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Full-Stack Developer",
                description:
                  "Specializing in React, Next.js, and modern web technologies",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://yourdomain.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Portfolio RSS"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Projects RSS"
          href="/projects.xml"
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
