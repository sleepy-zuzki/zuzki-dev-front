import { Technology } from './technology.interface';
import { FileEntity } from './file.interface';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  content?: any;
  liveUrl?: string | null;
  repoUrl?: string | null;
  categoryId?: string | null;
  year?: number | null;
  isFeatured?: boolean;
  previewImageId?: string | null;
  technologies: Technology[];
  images: FileEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  slug: string;
  description?: string | null;
  content?: any;
  repoUrl?: string | null;
  liveUrl?: string | null;
  categoryId: string;
  year?: number | null;
  isFeatured?: boolean;
  technologyIds?: string[];
}

export interface UpdateProjectDto {
  title?: string;
  slug?: string;
  description?: string | null;
  content?: any;
  repoUrl?: string | null;
  liveUrl?: string | null;
  categoryId?: string;
  year?: number | null;
  isFeatured?: boolean;
  technologyIds?: string[] | null;
  previewImageId?: string | null;
}

export interface AddImageToProjectDto {
  fileId: string;
  contextSlug?: string; // e.g., 'gallery', 'cover'
  order?: number;
}

export interface ReorderProjectFilesDto {
  items: Array<{
    fileId: string;
    order: number;
  }>;
}