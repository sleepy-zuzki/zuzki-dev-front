import { Technology } from './technology.interface';
import { FileEntity } from './file.interface';
import type { OutputData } from '@editorjs/editorjs';

export interface ProjectFile extends FileEntity {
  type?: string; // 'cover' | 'hero-slide' | 'gallery'
  order?: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  content?: OutputData;
  liveUrl?: string | null;
  repoUrl?: string | null;
  area?: { id: string; name: string; slug: string };
  year?: number | null;
  isFeatured?: boolean;
  previewImageId?: string | null;
  technologies: Technology[];
  images: ProjectFile[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  slug: string;
  description?: string | null;
  content?: OutputData;
  repoUrl?: string | null;
  liveUrl?: string | null;
  areaId: string;
  year?: number | null;
  isFeatured?: boolean;
  technologyIds?: string[];
}

export interface UpdateProjectDto {
  title?: string;
  slug?: string;
  description?: string | null;
  content?: OutputData;
  repoUrl?: string | null;
  liveUrl?: string | null;
  areaId?: string;
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
