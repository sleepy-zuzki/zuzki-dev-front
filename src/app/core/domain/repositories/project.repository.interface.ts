import { Signal } from '@angular/core';
import { ProjectEntity } from '@core/domain';

export interface CreateProjectRequest {
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

export interface UpdateProjectRequest {
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

export interface AddImageToCarouselRequest {
  fileId: number;
  position?: number;
}

export interface ReorderCarouselImagesRequest {
  images: Array<{ fileId: number; position: number }>;
}

export abstract class ProjectRepository {
  abstract readonly projects: Signal<ProjectEntity[]>;
  abstract readonly currentProject: Signal<ProjectEntity | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract getProjects(): void;
  abstract getProjectBySlug(slug: string): void;
  abstract createProject(request: CreateProjectRequest): void;
  abstract updateProject(id: number, request: UpdateProjectRequest): void;
  abstract deleteProject(id: number): void;
  abstract addImageToCarousel(projectId: number, request: AddImageToCarouselRequest): void;
  abstract removeImageFromCarousel(projectId: number, fileId: number): void;
  abstract reorderCarouselImages(projectId: number, request: ReorderCarouselImagesRequest): void;
}
