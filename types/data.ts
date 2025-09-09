export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

// Metadata Configuration Types
export interface GlobalMetadata {
  siteName: string;
  domain: string;
  author: string;
  language: string;
  defaultImage: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
}

export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName?: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  locale?: string;
  type?: string;
}

export interface TwitterCardData {
  card: string;
  title: string;
  description: string;
  images: string[];
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: OpenGraphData;
  twitter: TwitterCardData;
  canonical?: string;
}

export interface PersonSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  image: string;
  description: string;
  knowsAbout: string[];
  worksFor: {
    "@type": string;
    name: string;
  };
  hasOccupation: {
    "@type": string;
    name: string;
    description: string;
  };
}

export interface WebsiteSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  url: string;
  name: string;
  description: string;
  publisher: {
    "@id": string;
  };
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: {
    "@id": string;
  };
  areaServed: string;
  serviceType: string;
}

export interface ProfessionalServiceSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  description: string;
  provider: {
    "@id": string;
  };
  areaServed: string;
  availableLanguage: string;
  serviceType: string[];
  hasOfferCatalog: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      itemOffered: {
        "@type": string;
        name: string;
        description: string;
      };
    }>;
  };
}

export interface FAQSchema {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

export interface StructuredDataConfig {
  person: PersonSchema;
  website: WebsiteSchema;
  organization: OrganizationSchema;
  professional_service: ProfessionalServiceSchema;
  faq: FAQSchema[];
}

export interface MetadataConfig {
  global: GlobalMetadata;
  seo: SEOConfig;
  pages: {
    home: PageMetadata;
    about: PageMetadata;
    projects: PageMetadata;
    blog: PageMetadata;
    contact: PageMetadata;
    layout: PageMetadata;
  };
  structured_data: StructuredDataConfig;
}

export interface About {
  title: string;
  subtitle: string;
  description: string | string[];
  image: string;
}

export interface SkillTechnology {
  name: string;
  icon: string;
  docUrl?: string;
}

export interface SkillGroup {
  title: string;
  technologies: SkillTechnology[];
}

export interface SkillsData {
  title: string;
  subtitle: string;
  groups: SkillGroup[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  website: string;
  highlights: string[];
  techStack: SkillTechnology[];
}

export interface Experience {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
}

export interface Service {
  title: string;
  description: string;
  tools: string[];
  icon: string;
}

export interface Services {
  title: string;
  subtitle: string;
  items: Service[];
}

export interface FunFact {
  icon: string;
  value: string;
  title: string;
  description: string;
}
export interface FunFacts {
  title: string;
  subtitle: string;
  items: FunFact[];
}

export interface Hobby {
  title: string;
  description: string;
  icon: string;
}

export interface HobbiesSection {
  title: string;
  subtitle: string;
  items: Hobby[];
}

export interface Testimonial {
  name: string;
  title: string;
  message: string;
  avatar: string;
}
export type Testimonials = Testimonial[];

export interface Education {
  title: string;
  subtitle: string;
  items: Array<{
    id: string;
    degree: string;
    institution: string;
    period: string;
  }>;
}

export interface Projects {
  title: string;
  subtitle: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    github: string;
    category: string;
    status: string;
    longDescription?: string;
    features?: string[];
    challenges?: string[];
    solutions?: string[];
    marketplace: "codecanyon" | "themeforest";
    demo?: string;
  }>;
}

export interface Header {
  navItems: Array<{ label: string; href: string }>;
}

export interface Footer {
  name: string;
  description: string;
}

export interface Contact {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  availability: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    required: string;
    sendMessage: string;
    reset: string;
    sending: string;
  };
  placeholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
  messages: {
    success: string;
    error: string;
  };
  socialLinks: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

export interface Banner {
  name: string;
  title: string;
  summary: string;
  image: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

export interface FAQsData {
  title: string;
  subtitle?: string;
  items: Array<{ question: string; answer: string }>;
}

export interface GlobalData {
  education: Education;
  projects: Projects;
  banner: Banner;
  skills: SkillsData;
  experiences: Experience;
  services: Services;
  funFacts: FunFacts;
  hobbies: HobbiesSection;
  testimonials: TestimonialsData;
  contact: Contact;
  header: Header;
  footer: Footer;
}
