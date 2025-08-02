import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { header, footer } from "@/data";
import { AppProvider } from "@/context/BlogContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/global/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://patwary.vercel.app"),
  title: "MD Hasan Patwary | Portfolio",
  description:
    "MD Hasan Patwary - Front-End Developer | 6+ Years Exp. | HTML, CSS, JavaScript, jQuery, React, Next.js, Docker, AWS. Explore projects, skills, experience, and more.",
  keywords: [
    "MD Hasan Patwary",
    "Portfolio",
    "Front-End Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Projects",
    "Blog",
    "JavaScript",
    "HTML",
    "CSS",
  ],
  openGraph: {
    title: "MD Hasan Patwary | Portfolio",
    description:
      "Front-End Developer (React, Next.js, TypeScript) | UI/UX Engineer | Leader in Scalable Web Apps | Docker & AWS | 6+ Years Exp. | Delivered for 30K+ Global Clients | Open to Remote/Relocation",
    url: "https://patwary.vercel.app",
    siteName: "MD Hasan Patwary Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 600,
        alt: "MD Hasan Patwary Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Hasan Patwary | Portfolio",
    description:
      "Front-End Developer (React, Next.js, TypeScript) | UI/UX Engineer | Leader in Scalable Web Apps | Docker & AWS | 6+ Years Exp. | Delivered for 30K+ Global Clients | Open to Remote/Relocation",
    images: ["/profile.png"],
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
              ],
              jobTitle: "Front-End Developer",
              image: "/profile.png",
              description:
                "MD Hasan Patwary - Front-End Developer (React, Next.js, TypeScript) | UI/UX Engineer | Leader in Scalable Web Apps | Docker & AWS | 6+ Years Exp. | Delivered for 30K+ Global Clients | Open to Remote/Relocation",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MD Hasan Patwary Portfolio",
              url: "https://patwary.vercel.app",
              description:
                "Front-End Developer Portfolio showcasing React, Next.js, TypeScript projects and web development expertise",
              author: {
                "@type": "Person",
                name: "MD Hasan Patwary",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://patwary.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            <AppProvider>
              <Toaster position="top-right" />
              <Header navItems={header.navItems} />
              {children}
              <Footer name={footer.name} description={footer.description} />
            </AppProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
