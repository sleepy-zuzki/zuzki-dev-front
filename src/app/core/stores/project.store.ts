import { Injectable, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
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

  // --- State ---
  private readonly _selectedSlug = signal<string | null>(null);

  // --- Resources ---

  readonly projectsResource = rxResource<Project[], void>({
    stream: () => this.projectService.getProjects()
  });

  readonly featuredProjectsResource = rxResource<Project[], void>({
    stream: () => this.projectService.getFeaturedProjects()
  });

  readonly currentProjectResource = rxResource<Project | null, { slug: string | null }>({
    params: () => ({ slug: this._selectedSlug() }),
    stream: ({ params }) => {
      if (!params.slug) return of(null);
      return this.projectService.getProjectBySlug(params.slug);
    }
  });

  // --- Signals ---
  
  readonly projects = computed(() => this.projectsResource.value() ?? []);
  readonly featuredProjects = computed(() => this.featuredProjectsResource.value() ?? []);
  readonly currentProject = computed(() => this.currentProjectResource.value() ?? null);

  readonly loading = computed(() => 
    this.projectsResource.isLoading() || 
    this.featuredProjectsResource.isLoading() || 
    this.currentProjectResource.isLoading()
  );

  readonly error = computed(() => {
    const pErr = this.projectsResource.error();
    const fErr = this.featuredProjectsResource.error();
    const cErr = this.currentProjectResource.error();
    if (pErr || fErr || cErr) return 'Error al cargar datos';
    return null;
  });

  // --- Actions ---

  getProjects(): void {
    this.projectsResource.reload();
  }

  getFeaturedProjects(): void {
    this.featuredProjectsResource.reload();
  }

  getProjectBySlug(slug: string): void {
    this._selectedSlug.set(slug);
  }

  async createProject(request: CreateProjectDto): Promise<void> {
    try {
      await firstValueFrom(this.projectService.createProject(request));
      this.toast.success('Proyecto creado');
      this.projectsResource.reload();
    } catch (error: any) {
      this.toast.error(error.message || 'Error al crear proyecto');
    }
  }

  async updateProject(id: string, request: UpdateProjectDto): Promise<void> {
    try {
      const project = await firstValueFrom(this.projectService.updateProject(id, request));
      this.toast.success('Proyecto actualizado');
      this.projectsResource.reload();
      this.featuredProjectsResource.reload();
      
      if (this._selectedSlug() === project.slug) {
        this.currentProjectResource.reload();
      }
    } catch (error: any) {
      this.toast.error(error.message || 'Error al actualizar proyecto');
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await firstValueFrom(this.projectService.deleteProject(id));
      this.toast.success('Proyecto eliminado');
      this.projectsResource.reload();
      this.featuredProjectsResource.reload();
      this._selectedSlug.set(null);
    } catch (error: any) {
      this.toast.error(error.message || 'Error al eliminar proyecto');
    }
  }

  async addImageToCarousel(projectId: string, request: AddImageToProjectDto): Promise<void> {
    try {
      await firstValueFrom(this.projectService.addImageToCarousel(projectId, request));
      this.refreshAffectedProject(projectId);
    } catch (error: any) {
      this.toast.error(error.message || 'Error al añadir imagen');
    }
  }

  async removeImageFromCarousel(projectId: string, fileId: string): Promise<void> {
    try {
      await firstValueFrom(this.projectService.removeImageFromCarousel(projectId, fileId));
      this.refreshAffectedProject(projectId);
    } catch (error: any) {
      this.toast.error(error.message || 'Error al eliminar imagen');
    }
  }

  async reorderCarouselImages(projectId: string, request: ReorderProjectFilesDto): Promise<void> {
    try {
      await firstValueFrom(this.projectService.reorderCarouselImages(projectId, request));
      this.refreshAffectedProject(projectId);
    } catch (error: any) {
      this.toast.error(error.message || 'Error al reordenar imágenes');
    }
  }

  async uploadCarouselImage(projectId: string, file: File): Promise<void> {
    try {
      const uploadedFile = await firstValueFrom(this.fileService.uploadFile(file));
      await this.addImageToCarousel(projectId, { fileId: uploadedFile.id });
    } catch (error: any) {
      this.toast.error(error.message || 'Error al subir imagen');
    }
  }

  async setCoverImage(projectId: string, fileId: string): Promise<void> {
    try {
      await firstValueFrom(this.projectService.setCoverImage(projectId, fileId));
      this.refreshAffectedProject(projectId);
    } catch (error: any) {
      this.toast.error(error.message || 'Error al establecer portada');
    }
  }

  private refreshAffectedProject(projectId: string): void {
    const current = this.currentProject();
    if (current?.id === projectId) {
      this.currentProjectResource.reload();
    }
    this.projectsResource.reload();
    this.featuredProjectsResource.reload();
  }
}
