import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateProjectDto, UpdateProjectDto, ProjectResponseDto, AddImageToCarouselDto, ReorderCarouselImagesDto } from '@app/application';
import { ApiConfig } from '../../../config/api.config';
import { CreateProjectRequest, UpdateProjectRequest, AddImageToCarouselRequest, ReorderCarouselImagesRequest } from '@domain/repositories/project.repository.interface';


@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) { }

  getProjects(): Observable<ProjectResponseDto[]> {
    return this.http.get<ProjectResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base)
    );
  }

  getFeaturedProjects(): Observable<ProjectResponseDto[]> {
    return this.http.get<ProjectResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.featured)
    );
  }

  getProjectBySlug(slug: string): Observable<ProjectResponseDto> {
    return this.http.get<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    );
  }

  createProject(request: CreateProjectRequest): Observable<ProjectResponseDto> {
    const createDto: CreateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description ?? null,
      repoUrl: request.repoUrl ?? null,
      liveUrl: request.liveUrl ?? null,
      category: request.category ?? null,
      year: request.year ?? null,
      isFeatured: request.isFeatured,
      technologyIds: request.technologyIds,
      previewImageId: request.previewImageId ?? null
    };

    return this.http.post<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base),
      createDto
    );
  }

  updateProject(id: number, request: UpdateProjectRequest): Observable<ProjectResponseDto> {
    const updateDto: UpdateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description ?? null,
      repoUrl: request.repoUrl ?? null,
      liveUrl: request.liveUrl ?? null,
      category: request.category ?? null,
      year: request.year ?? null,
      isFeatured: request.isFeatured,
      technologyIds: request.technologyIds ?? null,
      previewImageId: request.previewImageId ?? null
    };

    return this.http.patch<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id)),
      updateDto
    );
  }

  deleteProject(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id))
    );
  }

  addImageToCarousel(projectId: number, request: AddImageToCarouselRequest): Observable<void> {
    const addImageDto: AddImageToCarouselDto = {
      fileId: request.fileId,
      position: request.position
    };

    return this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.images(projectId)),
      addImageDto
    );
  }

  removeImageFromCarousel(projectId: number, fileId: number): Observable<void> {
    return this.http.delete<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.removeImage(projectId, fileId))
    );
  }

  reorderCarouselImages(projectId: number, request: ReorderCarouselImagesRequest): Observable<void> {
    const reorderDto: ReorderCarouselImagesDto = {
      images: request.images
    };

    return this.http.patch<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.images(projectId)),
      reorderDto
    );
  }
}
