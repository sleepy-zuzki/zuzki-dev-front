import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
    ).pipe(
      catchError(err => {
        console.error('Error fetching projects:', err);
        return throwError(() => new Error('No se pudieron cargar los proyectos.'));
      })
    );
  }

  getFeaturedProjects(): Observable<ProjectResponseDto[]> {
    return this.http.get<ProjectResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.featured)
    ).pipe(
      catchError(err => {
        console.error('Error fetching featured projects:', err);
        return throwError(() => new Error('No se pudieron cargar los proyectos destacados.'));
      })
    );
  }

  getProjectBySlug(slug: string): Observable<ProjectResponseDto> {
    return this.http.get<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    ).pipe(
      catchError(err => {
        console.error(`Error fetching project with slug ${slug}:`, err);
        return throwError(() => new Error(`No se pudo cargar el proyecto ${slug}.`));
      })
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
    ).pipe(
      catchError(err => {
        console.error('Error creating project:', err);
        return throwError(() => new Error('No se pudo crear el proyecto.'));
      })
    );
  }

  updateProject(id: number, request: UpdateProjectRequest): Observable<ProjectResponseDto> {
    const updateDto: UpdateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description ?? null,
      details: request.details ?? null,
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
    ).pipe(
      catchError(err => {
        console.error(`Error updating project ${id}:`, err);
        return throwError(() => new Error('No se pudo actualizar el proyecto.'));
      })
    );
  }

  deleteProject(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id))
    ).pipe(
      catchError(err => {
        console.error(`Error deleting project ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar el proyecto.'));
      })
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
    ).pipe(
      catchError(err => {
        console.error(`Error adding image to carousel for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo añadir la imagen al carrusel.'));
      })
    );
  }

  removeImageFromCarousel(projectId: number, fileId: number): Observable<void> {
    return this.http.delete<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.removeImage(projectId, fileId))
    ).pipe(
      catchError(err => {
        console.error(`Error removing image from carousel for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo eliminar la imagen del carrusel.'));
      })
    );
  }

  reorderCarouselImages(projectId: number, request: ReorderCarouselImagesRequest): Observable<void> {
    const reorderDto: ReorderCarouselImagesDto = {
      images: request.images
    };

    return this.http.patch<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.images(projectId)),
      reorderDto
    ).pipe(
      catchError(err => {
        console.error(`Error reordering carousel images for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo reordenar las imágenes del carrusel.'));
      })
    );
  }
}
