import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { 
  Project, 
  CreateProjectDto, 
  UpdateProjectDto, 
  AddImageToProjectDto, 
  ReorderProjectFilesDto 
} from '@core/interfaces/project.interface';
import { ApiConfig } from '@core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base)
    ).pipe(
      catchError(err => {
        console.error('Error fetching projects:', err);
        return throwError(() => new Error('No se pudieron cargar los proyectos.'));
      })
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.featured)
    ).pipe(
      catchError(err => {
        console.error('Error fetching featured projects:', err);
        return throwError(() => new Error('No se pudieron cargar los proyectos destacados.'));
      })
    );
  }

  getProjectBySlug(slug: string): Observable<Project> {
    return this.http.get<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    ).pipe(
      catchError(err => {
        console.error(`Error fetching project with slug ${slug}:`, err);
        return throwError(() => new Error(`No se pudo cargar el proyecto ${slug}.`));
      })
    );
  }

  createProject(request: CreateProjectDto): Observable<Project> {
    return this.http.post<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base),
      request
    ).pipe(
      catchError(err => {
        console.error('Error creating project:', err);
        return throwError(() => new Error('No se pudo crear el proyecto.'));
      })
    );
  }

  updateProject(id: string, request: UpdateProjectDto): Observable<Project> {
    return this.http.patch<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id)),
      request
    ).pipe(
      catchError(err => {
        console.error(`Error updating project ${id}:`, err);
        return throwError(() => new Error('No se pudo actualizar el proyecto.'));
      })
    );
  }

  deleteProject(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id))
    ).pipe(
      catchError(err => {
        console.error(`Error deleting project ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar el proyecto.'));
      })
    );
  }

  addImageToCarousel(projectId: string, request: AddImageToProjectDto): Observable<void> {
    return this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.files(projectId)),
      request
    ).pipe(
      catchError(err => {
        console.error(`Error adding image to carousel for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo añadir la imagen al carrusel.'));
      })
    );
  }

  removeImageFromCarousel(projectId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.removeFile(projectId, fileId))
    ).pipe(
      catchError(err => {
        console.error(`Error removing image from carousel for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo eliminar la imagen del carrusel.'));
      })
    );
  }

  reorderCarouselImages(projectId: string, request: ReorderProjectFilesDto): Observable<void> {
    return this.http.patch<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.reorderFiles(projectId)),
      request
    ).pipe(
      catchError(err => {
        console.error(`Error reordering carousel images for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo reordenar las imágenes del carrusel.'));
      })
    );
  }

  setCoverImage(projectId: string, fileId: string): Observable<void> {
    return this.http.put<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.cover(projectId, fileId)),
      {}
    ).pipe(
      catchError(err => {
        console.error(`Error setting cover image for project ${projectId}:`, err);
        return throwError(() => new Error('No se pudo establecer la imagen de portada.'));
      })
    );
  }
}