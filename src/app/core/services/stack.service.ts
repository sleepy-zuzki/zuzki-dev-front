import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Stack, CreateStackDto, UpdateStackDto } from '@core/interfaces/stack.interface';
import { ApiConfig } from '@core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StackService {
  private _stacks: WritableSignal<Stack[]> = signal([]);
  private _currentStack: WritableSignal<Stack | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  public readonly stacks: Signal<Stack[]> = computed(() => this._stacks());
  public readonly currentStack: Signal<Stack | null> = computed(() => this._currentStack());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {}

  getStacks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Stack[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.base)
    ).subscribe({
      next: (stacks) => {
        this._stacks.set(stacks);
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

    this.http.get<Stack>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.bySlug(slug))
    ).subscribe({
      next: (stack) => {
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar stack');
        this._loading.set(false);
      }
    });
  }

  createStack(request: CreateStackDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.post<Stack>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.base),
      request
    ).subscribe({
      next: (stack) => {
        this._stacks.update(current => [...current, stack]);
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al crear stack');
        this._loading.set(false);
      }
    });
  }

  updateStack(id: string, request: UpdateStackDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.patch<Stack>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.byId(id)),
      request
    ).subscribe({
      next: (stack) => {
        this._stacks.update(current => current.map(s => s.id === id ? stack : s));
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al actualizar stack');
        this._loading.set(false);
      }
    });
  }

  deleteStack(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.byId(id))
    ).subscribe({
      next: () => {
        this._stacks.update(current => current.filter(s => s.id !== id));
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar stack');
        this._loading.set(false);
      }
    });
  }
}
