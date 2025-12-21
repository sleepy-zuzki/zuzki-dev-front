import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User, CreateUserDto } from '@core/interfaces/user.interface';
import { ApiConfig } from '@core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: WritableSignal<User | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  public readonly currentUser: Signal<User | null> = computed(() => this._currentUser());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {}

  getUserById(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<User>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (user) => {
        this._currentUser.set(user);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar usuario');
        this._loading.set(false);
      }
    });
  }

  createUser(request: CreateUserDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.post<User>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.base),
      request
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (user) => {
        this._currentUser.set(user);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al crear usuario');
        this._loading.set(false);
      }
    });
  }
}