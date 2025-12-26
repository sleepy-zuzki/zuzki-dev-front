import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.featured)
    );
  }

  getProjectBySlug(slug: string): Observable<Project> {
    return this.http.get<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    );
  }

  createProject(request: CreateProjectDto): Observable<Project> {
    return this.http.post<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base),
      request
    );
  }

  updateProject(id: string, request: UpdateProjectDto): Observable<Project> {
    return this.http.patch<Project>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id)),
      request
    );
  }

  deleteProject(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id))
    );
  }

  addImageToCarousel(projectId: string, request: AddImageToProjectDto): Observable<void> {
    return this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.files(projectId)),
      request
    );
  }

  removeImageFromCarousel(projectId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.removeFile(projectId, fileId))
    );
  }

  reorderCarouselImages(projectId: string, request: ReorderProjectFilesDto): Observable<void> {
    return this.http.patch<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.reorderFiles(projectId)),
      request
    );
  }

  setCoverImage(projectId: string, fileId: string): Observable<void> {
    return this.http.put<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.cover(projectId, fileId)),
      {}
    );
  }
}
