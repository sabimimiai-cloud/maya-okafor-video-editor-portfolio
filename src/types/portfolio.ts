export interface CaseStudy {
  challenge: string;
  theEdit: string;
  whyItWorks: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  duration: string;
  image: string;
  videoUrl?: string;
  caseStudy: CaseStudy;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}
