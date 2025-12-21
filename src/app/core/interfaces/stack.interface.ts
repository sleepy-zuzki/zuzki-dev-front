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
  createdAt: string;
  updatedAt: string;
}

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

export type StackResponseDto = Stack;