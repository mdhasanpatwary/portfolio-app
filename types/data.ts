export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export interface About {
  title: string;
  subtitle: string;
  description: string;
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

export interface Experiences {
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
    gpa: string;
    description: string;
    keySkills: string[];
    achievements: string[];
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
    status: "live" | "development" | "concept";
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

export interface GlobalData {
  education: Education;
  projects: Projects;
  banner: Banner;
  skills: SkillsData;
  experiences: Experiences;
  services: Services;
  funFacts: FunFacts;
  hobbies: HobbiesSection;
  testimonials: TestimonialsData;
  contact: Contact;
  header: Header;
  footer: Footer;
}
