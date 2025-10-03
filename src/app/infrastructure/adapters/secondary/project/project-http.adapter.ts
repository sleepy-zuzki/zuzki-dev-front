import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProjectRepository, CreateProjectRequest, UpdateProjectRequest, AddImageToCarouselRequest, ReorderCarouselImagesRequest } from '../../../../core/domain/repositories/project.repository.interface';
import { ProjectEntity } from '@core/domain';
import { TechnologyEntity } from '@core/domain';
import { FileEntity } from '@core/domain';
import { ProjectStatus } from '@core/domain';
import { TechnologyCategory } from '@core/domain';
import { CreateProjectDto, UpdateProjectDto, ProjectResponseDto, AddImageToCarouselDto, ReorderCarouselImagesDto } from '@app/application';
import { ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpAdapter extends ProjectRepository {
  private _projects: WritableSignal<ProjectEntity[]> = signal([]);
  private _currentProject: WritableSignal<ProjectEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly projects: Signal<ProjectEntity[]> = computed(() => this._projects());
  public readonly currentProject: Signal<ProjectEntity | null> = computed(() => this._currentProject());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<ProjectResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base)
    ).subscribe({
      next: (projects) => {
        const mappedProjects = projects.map(this.mapToProjectEntity);
        this._projects.set(mappedProjects);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar proyectos');
        this._loading.set(false);
      }
    });
  }

  getProjectBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.bySlug(slug))
    ).subscribe({
      next: (project) => {
        const mappedProject = this.mapToProjectEntity(project);
        this._currentProject.set(mappedProject);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar proyecto');
        this._loading.set(false);
      }
    });
  }

  createProject(request: CreateProjectRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const createDto: CreateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      technologyIds: request.technologyIds
    };

    this.http.post<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.base),
      createDto
    ).subscribe({
      next: (project) => {
        const mappedProject = this.mapToProjectEntity(project);
        const currentProjects = this._projects();
        this._projects.set([...currentProjects, mappedProject]);
        this._currentProject.set(mappedProject);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al crear proyecto');
        this._loading.set(false);
      }
    });
  }

  updateProject(id: number, request: UpdateProjectRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const updateDto: UpdateProjectDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      technologyIds: request.technologyIds
    };

    this.http.patch<ProjectResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id)),
      updateDto
    ).subscribe({
      next: (project) => {
        const mappedProject = this.mapToProjectEntity(project);
        const currentProjects = this._projects();
        const updatedProjects = currentProjects.map(p => p.id === id ? mappedProject : p);
        this._projects.set(updatedProjects);
        this._currentProject.set(mappedProject);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al actualizar proyecto');
        this._loading.set(false);
      }
    });
  }

  deleteProject(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.byId(id))
    ).subscribe({
      next: () => {
        const currentProjects = this._projects();
        const filteredProjects = currentProjects.filter(p => p.id !== id);
        this._projects.set(filteredProjects);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar proyecto');
        this._loading.set(false);
      }
    });
  }

  addImageToCarousel(projectId: number, request: AddImageToCarouselRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const addImageDto: AddImageToCarouselDto = {
      fileId: request.fileId,
      position: request.position
    };

    this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.images(projectId)),
      addImageDto
    ).subscribe({
      next: () => {
        // Recargar el proyecto actual para obtener las imágenes actualizadas
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al añadir imagen al carrusel');
        this._loading.set(false);
      }
    });
  }

  removeImageFromCarousel(projectId: number, fileId: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.removeImage(projectId, fileId))
    ).subscribe({
      next: () => {
        // Recargar el proyecto actual para obtener las imágenes actualizadas
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar imagen del carrusel');
        this._loading.set(false);
      }
    });
  }

  reorderCarouselImages(projectId: number, request: ReorderCarouselImagesRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const reorderDto: ReorderCarouselImagesDto = {
      images: request.images
    };

    this.http.patch<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.projects.images(projectId)),
      reorderDto
    ).subscribe({
      next: () => {
        // Recargar el proyecto actual para obtener las imágenes actualizadas
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al reordenar imágenes del carrusel');
        this._loading.set(false);
      }
    });
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
