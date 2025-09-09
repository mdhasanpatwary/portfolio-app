/**
 * Site Configuration
 * 
 * This file contains all the main configuration options for your portfolio.
 * Modify these values to customize your portfolio without editing multiple files.
 */

export const siteConfig = {
  // Site Information
  siteName: "Portfolio Template",
  siteDescription: "Modern Portfolio Template built with Next.js 15, TypeScript, and Tailwind CSS",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  
  // Personal Information
  author: {
    name: "John Doe",
    title: "Full-Stack Developer",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    resumeUrl: "/resume.pdf",
  },
  
  // Social Links
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://x.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
    dribbble: "https://dribbble.com/johndoe",
    behance: "https://behance.net/johndoe",
  },
  
  // Features Toggle
  features: {
    enableAI: true,
    enableBlog: true,
    enableContact: true,
    enableTestimonials: true,
    enableServices: true,
    enableHobbies: true,
    enableFunFacts: true,
    enableDarkMode: true,
  },
  
  // SEO Configuration
  seo: {
    keywords: [
      "portfolio",
      "developer",
      "react",
      "nextjs",
      "typescript",
      "web development",
      "frontend",
      "backend",
      "full-stack"
    ],
    ogImage: "/og-image.jpg",
    twitterCard: "summary_large_image",
  },
  
  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    enableVercelAnalytics: false,
    enableSpeedInsights: false,
  },
  
  // Contact Form
  contact: {
    enableEmailJS: true,
    emailJSConfig: {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    },
  },
  
  // AI Configuration
  ai: {
    enableAI: true,
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  
  // Theme Configuration
  theme: {
    defaultTheme: "dark", // "light" | "dark" | "system"
    enableThemeToggle: true,
  },
  
  // Navigation
  navigation: {
    enableSearch: false,
    enableBreadcrumbs: true,
    enableBackToTop: true,
  },
  
  // Footer
  footer: {
    showCopyright: true,
    showBuiltWith: true,
    customText: "Built with ❤️ using Next.js",
  },
  
  // Development
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

export type SiteConfig = typeof siteConfig;