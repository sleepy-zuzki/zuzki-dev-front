import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

import { 
  Project, 
  CreateProjectDto, 
  UpdateProjectDto, 
  AddImageToProjectDto, 
  ReorderProjectFilesDto 
} from '@core/interfaces/project.interface';

import { ProjectService } from '@core/services/project.service';
import { FileService } from '@core/services/file.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStore {
  private readonly projectService = inject(ProjectService);
  private readonly fileService = inject(FileService);
  private readonly toast = inject(HotToastService);

  private _projects: WritableSignal<Project[]> = signal([]);
  private _featuredProjects: WritableSignal<Project[]> = signal([]);
  private _currentProject: WritableSignal<Project | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  public readonly projects: Signal<Project[]> = this._projects.asReadonly();
  public readonly featuredProjects: Signal<Project[]> = this._featuredProjects.asReadonly();
  public readonly currentProject: Signal<Project | null> = this._currentProject.asReadonly();
  public readonly loading: Signal<boolean> = this._loading.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  getProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this._projects.set(projects);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar proyectos';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  getFeaturedProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.getFeaturedProjects().subscribe({
      next: (projects) => {
        this._featuredProjects.set(projects);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar proyectos destacados';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  getProjectBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this._currentProject.set(project);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar proyecto';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  createProject(request: CreateProjectDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.createProject(request).subscribe({
      next: (project) => {
        this._projects.update(currentProjects => [...currentProjects, project]);
        this._currentProject.set(project);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al crear proyecto';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  updateProject(id: string, request: UpdateProjectDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.updateProject(id, request).subscribe({
      next: (project) => {
        this._projects.update(projects => projects.map(p => p.id === id ? project : p));
        if (this._currentProject()?.id === id) {
          this._currentProject.set(project);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al actualizar proyecto';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  deleteProject(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this._projects.update(projects => projects.filter(p => p.id !== id));
        if (this._currentProject()?.id === id) {
          this._currentProject.set(null);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al eliminar proyecto';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  addImageToCarousel(projectId: string, request: AddImageToProjectDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.addImageToCarousel(projectId, request).subscribe({
      next: () => {
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al añadir imagen al carrusel';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  removeImageFromCarousel(projectId: string, fileId: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.removeImageFromCarousel(projectId, fileId).subscribe({
      next: () => {
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al eliminar imagen del carrusel';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  reorderCarouselImages(projectId: string, request: ReorderProjectFilesDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.reorderCarouselImages(projectId, request).subscribe({
      next: () => {
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al reordenar imágenes del carrusel';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  uploadCarouselImage(projectId: string, file: File): void {
    this._loading.set(true);
    this._error.set(null);

    this.fileService.uploadFile(file).subscribe({
      next: (uploadedFile) => {
        const request: AddImageToProjectDto = { fileId: uploadedFile.id };
        this.addImageToCarousel(projectId, request);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al subir la imagen';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  setCoverImage(projectId: string, fileId: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.projectService.setCoverImage(projectId, fileId).subscribe({
      next: () => {
        const currentProject = this._currentProject();
        if (currentProject?.id === projectId) {
          this.getProjectBySlug(currentProject.slug);
        }
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al establecer la imagen de portada';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }
}