import { Signal } from '@angular/core';
import { ProjectEntity } from '../entities/project/project.entity';
import { ProjectStatus } from '../enums/project-status.enum';

export interface CreateProjectRequest {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status?: ProjectStatus;
  technologyIds?: number[];
}

export interface UpdateProjectRequest {
  name?: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status?: ProjectStatus;
  technologyIds?: number[];
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
