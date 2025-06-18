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

export interface Skills {
    title: string;
    subtitle: string;
    categories: Array<{
        name: string;
        skills: Array<{
            name: string;
            level: number;
        }>;
    }>;
}

export interface Experience {
    title: string;
    subtitle: string;
    items: Array<{
        id: string;
        role: string;
        company: string;
        period: string;
        description: string;
        responsibilities: string[];
        technologies: string[];
    }>;
}

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
    }>;
}

export interface Contact {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    social: Array<{
        name: string;
        url: string;
        icon: string;
    }>;
}

export interface GlobalData {
    hero: Hero;
    about: About;
    skills: Skills;
    experience: Experience;
    education: Education;
    projects: Projects;
    contact: Contact;
}