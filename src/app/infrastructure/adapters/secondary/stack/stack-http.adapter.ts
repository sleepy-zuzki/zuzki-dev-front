import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StackRepository, CreateStackRequest, UpdateStackRequest } from '@domain/repositories/stack.repository.interface';
import { StackEntity } from '@domain/entities/stack/stack.entity';
import { TechnologyEntity } from '@domain/entities/technology/technology.entity';
import { TechnologyCategory } from '@domain/enums/technology-category.enum';
import { CreateStackDto, UpdateStackDto, StackResponseDto } from '@application/dtos/stack/stack.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StackHttpAdapter extends StackRepository {
  private _stacks: WritableSignal<StackEntity[]> = signal([]);
  private _currentStack: WritableSignal<StackEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly stacks: Signal<StackEntity[]> = computed(() => this._stacks());
  public readonly currentStack: Signal<StackEntity | null> = computed(() => this._currentStack());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getStacks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<StackResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.base)
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (stacks) => {
        const mappedStacks = stacks.map(this.mapToStackEntity);
        this._stacks.set(mappedStacks);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar stacks');
        this._loading.set(false);
      }
    });
  }

  getStackBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.bySlug(slug))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        const mappedStack = this.mapToStackEntity(stack);
        this._currentStack.set(mappedStack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar stack');
        this._loading.set(false);
      }
    });
  }

  createStack(request: CreateStackRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const createDto: CreateStackDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color,
      technologyIds: request.technologyIds
    };

    this.http.post<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.base),
      createDto
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        const mappedStack = this.mapToStackEntity(stack);
        const currentStacks = this._stacks();
        this._stacks.set([...currentStacks, mappedStack]);
        this._currentStack.set(mappedStack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al crear stack');
        this._loading.set(false);
      }
    });
  }

  updateStack(id: number, request: UpdateStackRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const updateDto: UpdateStackDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color,
      technologyIds: request.technologyIds
    };

    this.http.patch<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.byId(id)),
      updateDto
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        const mappedStack = this.mapToStackEntity(stack);
        const currentStacks = this._stacks();
        const updatedStacks = currentStacks.map(s => s.id === id ? mappedStack : s);
        this._stacks.set(updatedStacks);
        this._currentStack.set(mappedStack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al actualizar stack');
        this._loading.set(false);
      }
    });
  }

  deleteStack(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        const currentStacks = this._stacks();
        const filteredStacks = currentStacks.filter(s => s.id !== id);
        this._stacks.set(filteredStacks);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar stack');
        this._loading.set(false);
      }
    });
  }

  private mapToStackEntity = (dto: StackResponseDto): StackEntity => {
    return new StackEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.iconUrl,
      dto.websiteUrl,
      dto.color,
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
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
