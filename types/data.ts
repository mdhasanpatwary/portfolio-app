export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
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

export interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  status: string;
  github?: string;
  demo?: string;
}

export interface ToolsData {
  title: string;
  subtitle: string;
  items: Tool[];
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
    marketplace: string;
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
  tools: ToolsData;
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

// Metadata Types for SEO and AEO
export interface MetadataConfig {
  site: SiteConfig;
  defaultImage: ImageConfig;
  social: SocialConfig;
  structuredData: StructuredDataConfig;
  pages: PagesMetadata;
  faq: FAQConfig;
}

export interface SiteConfig {
  name: string;
  url: string;
  domain: string;
  author: string;
  locale: string;
  type: string;
}

export interface ImageConfig {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface SocialConfig {
  twitter: string;
  github: string;
  linkedin: string;
}

export interface StructuredDataConfig {
  person: PersonSchema;
  website: WebsiteSchema;
  professionalService: ProfessionalServiceSchema;
  organization: OrganizationSchema;
}

export interface PersonSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  jobTitle: string;
  image: string;
  description: string;
  knowsAbout: string[];
  sameAs: string[];
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
  name: string;
  url: string;
  description: string;
  author: {
    "@id": string;
  };
  inLanguage: string;
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export interface ProfessionalServiceSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  provider: {
    "@id": string;
  };
  areaServed: string;
  serviceType: string[];
  availableLanguage: string[];
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  foundingDate: string;
  founder: {
    "@id": string;
  };
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
  };
  contactPoint: {
    "@type": string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    siteName?: string;
    type?: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
  };
  alternates?: {
    canonical: string;
  };
}

export interface PagesMetadata {
  layout: PageMetadata;
  home: PageMetadata;
  about: PageMetadata;
  blog: PageMetadata;
  contact: PageMetadata;
  projects: PageMetadata;
  cssTips: PageMetadata;
  tools: PageMetadata;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  global: FAQItem[];
}

export interface MetadataUtilOptions {
  pageKey: keyof PagesMetadata;
  customTitle?: string;
  customDescription?: string;
  customImage?: ImageConfig;
  customUrl?: string;
}
