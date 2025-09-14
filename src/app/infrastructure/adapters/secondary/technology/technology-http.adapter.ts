import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TechnologyRepository, CreateTechnologyRequest, UpdateTechnologyRequest } from '../../../../core/domain/repositories/technology.repository.interface';
import { TechnologyEntity } from '../../../../core/domain/entities/technology/technology.entity';
import { TechnologyCategory } from '../../../../core/domain/enums/technology-category.enum';
import { CreateTechnologyDto, UpdateTechnologyDto, TechnologyResponseDto } from '../../../../application/dtos/technology/technology.dto';
import { ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TechnologyHttpAdapter extends TechnologyRepository {
  private _technologies: WritableSignal<TechnologyEntity[]> = signal([]);
  private _currentTechnology: WritableSignal<TechnologyEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly technologies: Signal<TechnologyEntity[]> = computed(() => this._technologies());
  public readonly currentTechnology: Signal<TechnologyEntity | null> = computed(() => this._currentTechnology());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getTechnologies(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<TechnologyResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.base)
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (technologies) => {
        const mappedTechnologies = technologies.map(this.mapToTechnologyEntity);
        this._technologies.set(mappedTechnologies);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar tecnologías');
        this._loading.set(false);
      }
    });
  }

  getTechnologyBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.bySlug(slug))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (technology) => {
        const mappedTechnology = this.mapToTechnologyEntity(technology);
        this._currentTechnology.set(mappedTechnology);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar tecnología');
        this._loading.set(false);
      }
    });
  }

  createTechnology(request: CreateTechnologyRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const createDto: CreateTechnologyDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      category: request.category,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color
    };

    this.http.post<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.base),
      createDto
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (technology) => {
        const mappedTechnology = this.mapToTechnologyEntity(technology);
        const currentTechnologies = this._technologies();
        this._technologies.set([...currentTechnologies, mappedTechnology]);
        this._currentTechnology.set(mappedTechnology);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al crear tecnología');
        this._loading.set(false);
      }
    });
  }

  updateTechnology(id: number, request: UpdateTechnologyRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const updateDto: UpdateTechnologyDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      category: request.category,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color
    };

    this.http.patch<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id)),
      updateDto
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (technology) => {
        const mappedTechnology = this.mapToTechnologyEntity(technology);
        const currentTechnologies = this._technologies();
        const updatedTechnologies = currentTechnologies.map(t => t.id === id ? mappedTechnology : t);
        this._technologies.set(updatedTechnologies);
        this._currentTechnology.set(mappedTechnology);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al actualizar tecnología');
        this._loading.set(false);
      }
    });
  }

  deleteTechnology(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        const currentTechnologies = this._technologies();
        const filteredTechnologies = currentTechnologies.filter(t => t.id !== id);
        this._technologies.set(filteredTechnologies);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar tecnología');
        this._loading.set(false);
      }
    });
  }

  private mapToTechnologyEntity = (dto: TechnologyResponseDto): TechnologyEntity => {
    return new TechnologyEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.category as TechnologyCategory,
      dto.iconUrl,
      dto.websiteUrl,
      dto.color,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
