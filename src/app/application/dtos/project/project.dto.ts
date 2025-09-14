import { FileResponseDto } from '../file/file.dto';
import { TechnologyResponseDto } from '../technology/technology.dto';

export interface CreateProjectDto {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status?: string;
  technologyIds?: number[];
}

export interface UpdateProjectDto {
  name?: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status?: string;
  technologyIds?: number[];
}

export interface ProjectResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status: string;
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
