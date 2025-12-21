import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

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
    private readonly apiConfig: ApiConfig,
    private readonly toast: HotToastService
  ) {}

  getStacks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Stack[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.base)
    ).pipe(
      catchError(err => {
        console.error('Error fetching stacks:', err);
        return throwError(() => new Error('No se pudieron cargar los stacks.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (stacks) => {
        this._stacks.set(stacks);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar stacks';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  getStackBySlug(slug: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Stack>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.bySlug(slug))
    ).pipe(
      catchError(err => {
        console.error(`Error fetching stack ${slug}:`, err);
        return throwError(() => new Error('No se pudo cargar el stack.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar stack';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
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
    ).pipe(
      catchError(err => {
        console.error('Error creating stack:', err);
        return throwError(() => new Error('No se pudo crear el stack.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        this._stacks.update(current => [...current, stack]);
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al crear stack';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  updateStack(id: number, request: UpdateStackDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.patch<Stack>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.byId(id)),
      request
    ).pipe(
      catchError(err => {
        console.error(`Error updating stack ${id}:`, err);
        return throwError(() => new Error('No se pudo actualizar el stack.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (stack) => {
        this._stacks.update(current => current.map(s => s.id === id ? stack : s));
        this._currentStack.set(stack);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al actualizar stack';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  deleteStack(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.areas.byId(id))
    ).pipe(
      catchError(err => {
        console.error(`Error deleting stack ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar el stack.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this._stacks.update(current => current.filter(s => s.id !== id));
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al eliminar stack';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }
}
