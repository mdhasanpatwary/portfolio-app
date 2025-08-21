import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { header, footer } from "@/data";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/global/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import InstallPrompt from "@/components/global/InstallPrompt";
import ServiceWorkerRegistration from "@/components/global/ServiceWorkerRegistration";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PortfolioChatWidget from "@/components/ai/PortfolioChatWidget";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://patwary.vercel.app"),
  title: "MD Hasan Patwary | Front-End Developer Portfolio",
  description:
    "MD Hasan Patwary - Front-End Web Developer | 6+ Years Exp. | HTML, CSS, JavaScript, jQuery, React, Next.js, Docker, AWS. Leader in Scalable Web Apps. Delivered for 30K+ Global Clients. Available for freelance & collaboration.",
  keywords: [
    "MD Hasan Patwary",
    "Portfolio",
    "Front-End Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Docker",
    "AWS",
    "UI/UX Engineer",
    "Freelance Developer",
    "Dhaka",
    "Bangladesh",
  ],
  openGraph: {
    title: "MD Hasan Patwary | Front-End Developer Portfolio",
    description:
      "Front-End Web Developer (React, Next.js, TypeScript) | UI/UX Engineer | Leader in Scalable Web Apps | Docker & AWS | 6+ Years Exp. | Delivered for 30K+ Global Clients | Available for freelance & collaboration",
    url: "https://patwary.vercel.app",
    siteName: "MD Hasan Patwary Portfolio",
    images: [
      {
        url: "/profile.webp",
        width: 800,
        height: 600,
        alt: "MD Hasan Patwary - Front-End Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Hasan Patwary | Front-End Developer Portfolio",
    description:
      "Front-End Web Developer (React, Next.js, TypeScript) | UI/UX Engineer | Leader in Scalable Web Apps | Docker & AWS | 6+ Years Exp. | Delivered for 30K+ Global Clients | Available for freelance & collaboration",
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
              "@id": "https://patwary.vercel.app/#person",
              name: "MD Hasan Patwary",
              url: "https://patwary.vercel.app",
              sameAs: [
                "https://github.com/mdhasanpatwary",
                "https://www.linkedin.com/in/mdhasanpatwary/",
                "https://stackoverflow.com/users/11076109/patwary",
                "https://www.facebook.com/mdhasanpatwaryweb",
                "https://dev.to/mdhassanpatwary",
                "https://app.daily.dev/mdhassanpatwary",
                "https://codepen.io/MD-Hasan-Patwary",
                "https://www.upwork.com/freelancers/~01edc329725caf7992",
              ],
              jobTitle: "Front-End Developer",
              image: "/profile.webp",
              description: "MD Hasan Patwary – Front-End Developer (React, Next.js, TypeScript) with 6+ years experience. Expert in scalable web apps, AWS, Docker. Available for freelance & collaboration.",
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Docker",
                "AWS",
                "UI/UX Design",
                "Web Development",
                "Front-End Development",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance/Remote",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Front-End Developer",
                description:
                  "Specializing in React, Next.js, and modern web technologies",
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="mAw4WDufpIlGKITY-HKXUg0YyJqt3H_iUNTUXWDDAA4"
        />
        <link rel="canonical" href="https://patwary.vercel.app" />
        <link rel="alternate" type="application/rss+xml" title="MD Hasan Patwary RSS" href="/rss.xml" />
        <link rel="alternate" type="application/rss+xml" title="MD Hasan Patwary Projects RSS" href="/projects.xml" />
        <link rel="preconnect" href="https://dev.to" crossOrigin="" />
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
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {/* Development-only cache clearing script */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Gentle cache clearing in development - only clear service worker
                console.log('Development mode detected - clearing service workers');
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    console.log('Found service workers:', registrations.length);
                    registrations.forEach(registration => {
                      registration.unregister();
                      console.log('Unregistered service worker');
                    });
                  });
                }
                console.log('Development setup complete');
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            {/* Skip to content link for keyboard users (inside a navigation landmark) */}
            <nav aria-label="Skip links">
              <a href="#main-content" className="skip-link">Skip to content</a>
            </nav>
            <Toaster position="top-right" />
            <Header navItems={header.navItems} />
            {/* Primary page content within a single main landmark */}
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer name={footer.name} description={footer.description} />
            <InstallPrompt />
            <ServiceWorkerRegistration />
            {/* Floating AI Chat Widget */}
            <PortfolioChatWidget />
          </ErrorBoundary>
        </ThemeProvider>
        <Analytics/>
        <SpeedInsights />
      </body>
    </html>
  );
}
