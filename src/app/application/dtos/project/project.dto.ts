import { FileResponseDto } from '../file/file.dto';
import { TechnologyResponseDto } from '@app/application';

export interface CreateProjectDto {
  name: string;
  slug: string;
  description?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  category?: string | null;
  year?: number | null;
  isFeatured?: boolean;
  technologyIds?: number[];
  previewImageId?: number | null;
}

export interface UpdateProjectDto {
  name?: string;
  slug?: string;
  description?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  category?: string | null;
  year?: number | null;
  isFeatured?: boolean;
  technologyIds?: number[] | null;
  previewImageId?: number | null;
}

export interface ProjectResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  details?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  category?: string | null;
  year?: number | null;
  isFeatured?: boolean;
  previewImageId?: number | null;
  technologies: TechnologyResponseDto[];
  carouselImages: FileResponseDto[];
  createdAt: string;
  updatedAt: string;
}

export interface AddImageToCarouselDto {
  fileId: number;
  position?: number;
}

export interface ReorderCarouselImagesDto {
  images: Array<{
    fileId: number;
    position: number;
  }>;
}
