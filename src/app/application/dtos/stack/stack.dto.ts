import { TechnologyResponseDto } from '../technology/technology.dto';

export interface CreateStackDto {
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologyIds?: number[];
}

export interface UpdateStackDto {
  name?: string;
  slug?: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologyIds?: number[];
}

export interface StackResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologies: TechnologyResponseDto[];
  createdAt: string;
  updatedAt: string;
}
