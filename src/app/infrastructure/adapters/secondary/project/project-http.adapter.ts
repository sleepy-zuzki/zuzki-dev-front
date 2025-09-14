import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectRepository, CreateProjectRequest, UpdateProjectRequest, AddImageToCarouselRequest, ReorderCarouselImagesRequest } from '../../../../core/domain/repositories/project.repository.interface';
import { ProjectEntity } from '../../../../core/domain/entities/project/project.entity';
import { TechnologyEntity } from '../../../../core/domain/entities/technology/technology.entity';
import { FileEntity } from '../../../../core/domain/entities/file/file.entity';
import { ProjectStatus } from '../../../../core/domain/enums/project-status.enum';
import { TechnologyCategory } from '../../../../core/domain/enums/technology-category.enum';
import { CreateProjectDto, UpdateProjectDto, ProjectResponseDto, AddImageToCarouselDto, ReorderCarouselImagesDto } from '../../../../application/dtos/project/project.dto';
import { ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpAdapter extends ProjectRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getProjects(): Observable<ProjectEntity[]> {
    return this.http.get<ProjectResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base)
    ).pipe(
      map(projects => projects.map(this.mapToProjectEntity))
    );
  }

  getProjectBySlug(slug: string): Observable<ProjectEntity> {
    return this.http.get<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    ).pipe(
      map(this.mapToProjectEntity)
    );
  }

  createProject(request: CreateProjectRequest): Observable<ProjectEntity> {
    const createDto: CreateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      longDescription: request.longDescription,
      demoUrl: request.demoUrl,
      repositoryUrl: request.repositoryUrl,
      status: request.status,
      technologyIds: request.technologyIds
    };

    return this.http.post<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base),
      createDto
    ).pipe(
      map(this.mapToProjectEntity)
    );
  }

  updateProject(id: number, request: UpdateProjectRequest): Observable<ProjectEntity> {
    const updateDto: UpdateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      longDescription: request.longDescription,
      demoUrl: request.demoUrl,
      repositoryUrl: request.repositoryUrl,
      status: request.status,
      technologyIds: request.technologyIds
    };

    return this.http.patch<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id)),
      updateDto
    ).pipe(
      map(this.mapToProjectEntity)
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

  private mapToProjectEntity = (dto: ProjectResponseDto): ProjectEntity => {
    return new ProjectEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.longDescription,
      dto.demoUrl,
      dto.repositoryUrl,
      dto.status as ProjectStatus,
      dto.technologies.map(tech => new TechnologyEntity(
        tech.id,
        tech.name,
        tech.slug,
        tech.description,
        tech.category as TechnologyCategory,
        tech.iconUrl,
        tech.websiteUrl,
        tech.color,
        new Date(tech.createdAt),
        new Date(tech.updatedAt)
      )),
      dto.carouselImages.map(file => new FileEntity(
        file.id,
        file.originalName,
        file.filename,
        file.mimeType,
        file.size,
        file.url,
        file.alt,
        file.caption,
        file.projectId,
        new Date(file.createdAt),
        new Date(file.updatedAt)
      )),
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
