export enum ServiceType {
  FRAME = 'FRAME',
  PHOTO_VIDEO = 'PHOTO_VIDEO',
  AI_CREATIVE = 'AI_CREATIVE'
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceType;
  imageUrl: string;
  description?: string;
}

export interface ServiceInfo {
  id: ServiceType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  useCases: string[];
  imageUrl: string;
  path: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
