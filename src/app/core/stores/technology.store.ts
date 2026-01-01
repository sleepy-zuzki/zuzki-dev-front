import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

import { Technology, CreateTechnologyDto, UpdateTechnologyDto } from '@core/interfaces/technology.interface';
import { TechnologyService } from '@core/services/technology.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyStore {
  private apiService = inject(TechnologyService);
  private toast = inject(HotToastService);

  private _technologies: WritableSignal<Technology[]> = signal([]);
  private _currentTechnology: WritableSignal<Technology | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  public readonly technologies: Signal<Technology[]> = this._technologies.asReadonly();
  public readonly currentTechnology: Signal<Technology | null> = this._currentTechnology.asReadonly();
  public readonly loading: Signal<boolean> = this._loading.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  getTechnologies(): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getTechnologies().subscribe({
      next: (entities) => {
        this._technologies.set(entities);
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al cargar tecnologías';
        this._error.set(errorMessage);
        
        this._loading.set(false);
      }
    });
  }

  getTechnologyBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getTechnologyBySlug(slug).subscribe({
      next: (entity) => {
        this._currentTechnology.set(entity);
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al cargar la tecnología';
        this._error.set(errorMessage);
        
        this._loading.set(false);
      }
    });
  }

  createTechnology(request: CreateTechnologyDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.createTechnology(request).subscribe({
      next: (entity) => {
        this._technologies.update(current => [...current, entity]);
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al crear la tecnología';
        this._error.set(errorMessage);
        
        this._loading.set(false);
      }
    });
  }

  updateTechnology(id: string, request: UpdateTechnologyDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.updateTechnology(id, request).subscribe({
      next: (entity) => {
        this._technologies.update(current => current.map(t => t.id === id ? entity : t));
        if (this._currentTechnology()?.id === id) {
          this._currentTechnology.set(entity);
        }
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al actualizar la tecnología';
        this._error.set(errorMessage);
        
        this._loading.set(false);
      }
    });
  }

  deleteTechnology(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.deleteTechnology(id).subscribe({
      next: () => {
        this._technologies.update(current => current.filter(t => t.id !== id));
        if (this._currentTechnology()?.id === id) {
          this._currentTechnology.set(null);
        }
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al eliminar la tecnología';
        this._error.set(errorMessage);
        
        this._loading.set(false);
      }
    });
  }
}