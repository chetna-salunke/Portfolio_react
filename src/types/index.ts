export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  type: 'react' | 'simple';
}

export interface FigmaDesign {
  id: string;
  title: string;
  description: string;
  figmaUrl: string;
  image?: string;
  tags: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PortfolioState {
  theme: 'dark' | 'light';
  activeSection: string;
  contactFormStatus: 'idle' | 'sending' | 'success' | 'error';
}
