// ==================== PROJECT MODELS ====================
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedDate: Date;
  features: string[];
}

export enum ProjectCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  FULLSTACK = 'Full Stack',
  MOBILE = 'Mobile',
  AI_ML = 'AI/ML',
  WEB3 = 'Web3'
}

// ==================== SKILL MODELS ====================
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  icon: string;
  description?: string;
}

export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  DEVOPS = 'DevOps',
  TOOLS = 'Tools',
  SOFT_SKILLS = 'Soft Skills'
}

// ==================== TIMELINE MODELS ====================
export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: TimelineType;
  icon: string;
  achievements?: string[];
}

export enum TimelineType {
  EDUCATION = 'education',
  WORK = 'work',
  CERTIFICATION = 'certification',
  ACHIEVEMENT = 'achievement'
}

// ==================== SERVICE MODELS ====================
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// ==================== CONTACT MODELS ====================
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
}

// ==================== TESTIMONIAL MODELS ====================
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  message: string;
  rating: number;
  date: Date;
}

// ==================== STATS MODELS ====================
export interface Stat {
  label: string;
  value: string;
  icon: string;
  description?: string;
}

// ==================== NAVIGATION MODELS ====================
export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  external?: boolean;
}

// ==================== CERTIFICATION MODELS ====================
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
  credentialUrl?: string;
}

// ==================== ANIMATION MODELS ====================
export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

// ==================== THEME MODELS ====================
export interface ThemeConfig {
  isDark: boolean;
  primaryColor: string;
  secondaryColor: string;
}

// ==================== BLOG POST MODELS (Optional) ====================
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedDate: Date;
  tags: string[];
  readTime: number;
}

// ==================== SEO MODELS ====================
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}