import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';

import { TechnologyRepository, CreateTechnologyRequest, UpdateTechnologyRequest } from '@domain/repositories/technology.repository.interface';
import { TechnologyEntity } from '@core/domain';
import { TechnologyApiService } from './technology-api.service';
import { TechnologyMapper } from './technology.mapper';

import { HotToastService } from '@ngxpert/hot-toast';

/**
 * Servicio con estado (Store) para gestionar las tecnologías.
 * Orquesta la obtención de datos a través del ApiService y gestiona el estado con Signals.
 */
@Injectable({
  providedIn: 'root'
})
export class TechnologyStore extends TechnologyRepository {
  private apiService = inject(TechnologyApiService);
  private toast = inject(HotToastService);

  private _technologies: WritableSignal<TechnologyEntity[]> = signal([]);
  private _currentTechnology: WritableSignal<TechnologyEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly technologies: Signal<TechnologyEntity[]> = this._technologies.asReadonly();
  public readonly currentTechnology: Signal<TechnologyEntity | null> = this._currentTechnology.asReadonly();
  public readonly loading: Signal<boolean> = this._loading.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  constructor() {
    super();
  }

  getTechnologies(): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getTechnologies().subscribe({
      next: (dtos) => {
        const entities = dtos.map(TechnologyMapper.toEntity);
        this._technologies.set(entities);
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al cargar tecnologías';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  getTechnologyBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.getTechnologyBySlug(slug).subscribe({
      next: (dto) => {
        this._currentTechnology.set(TechnologyMapper.toEntity(dto));
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al cargar la tecnología';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  createTechnology(request: CreateTechnologyRequest): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.createTechnology(request).subscribe({
      next: (dto) => {
        const newEntity = TechnologyMapper.toEntity(dto);
        this._technologies.update(current => [...current, newEntity]);
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al crear la tecnología';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  updateTechnology(id: number, request: UpdateTechnologyRequest): void {
    this._loading.set(true);
    this._error.set(null);

    this.apiService.updateTechnology(id, request).subscribe({
      next: (dto) => {
        const updatedEntity = TechnologyMapper.toEntity(dto);
        this._technologies.update(current => current.map(t => t.id === id ? updatedEntity : t));
        if (this._currentTechnology()?.id === id) {
          this._currentTechnology.set(updatedEntity);
        }
        this._loading.set(false);
      },
      error: (err) => {
        const errorMessage = err.message || 'Error al actualizar la tecnología';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  deleteTechnology(id: number): void {
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
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }
}
