export type TemplateId = 'modern' | 'minimalist' | 'professional' | 'creative' | 'classic';

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  proofUrl?: string; // For uploaded certificate
  proofName?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  proofUrl?: string; // For uploaded internship proof
  proofName?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
}

export interface ResumeData {
  template: TemplateId;
  fullName: string;
  title: string;
  summary: string;
  avatarUrl: string;
  email: string;
  github: string;
  education: Education[];
  internships: Internship[];
  projects: Project[];
  portfolio: PortfolioItem[];
  skills: string[];
}