import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import data from "@/data/data.json";
import { GlobalData } from "@/types/data";
import { AppProvider } from "@/context/BlogContext";
import { Toaster } from "react-hot-toast";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { header, footer } = data as GlobalData;

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description:
    "MD Hasan Patwary - Front-End Developer | 6+ Years Exp. | HTML, CSS, JavaScript, jQuery, React, Next.js, Docker, AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300`}>
        <AppProvider>
          <Toaster position="top-right" />
          <Header navItems={header.navItems} />
          {children}
          <Footer
            name={footer.name}
            description={footer.description}
          />
        </AppProvider>
      </body>
    </html>
  );
}
