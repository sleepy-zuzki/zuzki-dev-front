import { Technology } from './technology.interface';

export interface Stack {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologies: Technology[];
  createdAt: Date;
  updatedAt: Date;
}
