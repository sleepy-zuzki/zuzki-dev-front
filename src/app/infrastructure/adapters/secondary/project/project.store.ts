import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';

import { ProjectRepository, CreateProjectRequest, UpdateProjectRequest, AddImageToCarouselRequest, ReorderCarouselImagesRequest } from '@domain/repositories/project.repository.interface';
import { ProjectEntity } from '@core/domain';
import { ProjectApiService } from './project-api.service';
import { ProjectMapper } from './project.mapper';
import { FileApiService } from '../file/file-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStore extends ProjectRepository {
  private readonly apiService = inject(ProjectApiService);
  private readonly fileApiService = inject(FileApiService);

  private _projects: WritableSignal<ProjectEntity[]> = signal([]);
  private _featuredProjects: WritableSignal<ProjectEntity[]> = signal([]);
  private _currentProject: WritableSignal<ProjectEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  public readonly projects: Signal<ProjectEntity[]> = this._projects.asReadonly();
  public readonly featuredProjects: Signal<ProjectEntity[]> = this._featuredProjects.asReadonly();
  public readonly currentProject: Signal<ProjectEntity | null> = this._currentProject.asReadonly();
  public readonly loading: Signal<boolean> = this._loading.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  constructor() {
    super();
  }

  getProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getProjects().subscribe({
      next: (projects) => {
        const mappedProjects = projects.map(ProjectMapper.toEntity);
        this._projects.set(mappedProjects);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar proyectos');
        this._loading.set(false);
      }
    });
  }

  getFeaturedProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getFeaturedProjects().subscribe({
      next: (projects) => {
        const mappedProjects = projects.map(ProjectMapper.toEntity);
        this._featuredProjects.set(mappedProjects);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar proyectos destacados');
        this._loading.set(false);
      }
    });
  }

  getProjectBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getProjectBySlug(slug).subscribe({
      next: (project) => {
        const mappedProject = ProjectMapper.toEntity(project);
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

    this.apiService.createProject(request).subscribe({
      next: (project) => {
        const mappedProject = ProjectMapper.toEntity(project);
        this._projects.update(currentProjects => [...currentProjects, mappedProject]);
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

    this.apiService.updateProject(id, request).subscribe({
      next: (project) => {
        const mappedProject = ProjectMapper.toEntity(project);
        this._projects.update(projects => projects.map(p => p.id === id ? mappedProject : p));
        if (this._currentProject()?.id === id) {
          this._currentProject.set(mappedProject);
        }
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

    this.apiService.deleteProject(id).subscribe({
      next: () => {
        this._projects.update(projects => projects.filter(p => p.id !== id));
        if (this._currentProject()?.id === id) {
          this._currentProject.set(null);
        }
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

    this.apiService.addImageToCarousel(projectId, request).subscribe({
      next: () => {
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

    this.apiService.removeImageFromCarousel(projectId, fileId).subscribe({
      next: () => {
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

    this.apiService.reorderCarouselImages(projectId, request).subscribe({
      next: () => {
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

  uploadCarouselImage(projectId: number, file: File): void {
    this._loading.set(true);
    this._error.set(null);

    this.fileApiService.uploadFile(file).subscribe({
      next: (uploadedFile) => {
        const request: AddImageToCarouselRequest = { fileId: uploadedFile.id };
        // Re-use the existing method to associate the file and handle state
        this.addImageToCarousel(projectId, request);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al subir la imagen');
        this._loading.set(false);
      }
    });
  }
}
