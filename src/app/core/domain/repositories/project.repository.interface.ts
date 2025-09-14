import { Observable } from 'rxjs';
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
  abstract getProjects(): Observable<ProjectEntity[]>;
  abstract getProjectBySlug(slug: string): Observable<ProjectEntity>;
  abstract createProject(request: CreateProjectRequest): Observable<ProjectEntity>;
  abstract updateProject(id: number, request: UpdateProjectRequest): Observable<ProjectEntity>;
  abstract deleteProject(id: number): Observable<{ success: boolean }>;
  abstract addImageToCarousel(projectId: number, request: AddImageToCarouselRequest): Observable<void>;
  abstract removeImageFromCarousel(projectId: number, fileId: number): Observable<void>;
  abstract reorderCarouselImages(projectId: number, request: ReorderCarouselImagesRequest): Observable<void>;
}
