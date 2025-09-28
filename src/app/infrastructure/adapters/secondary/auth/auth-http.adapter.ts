import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthRepository, LoginCredentials, LoginResponse, RefreshTokenRequest, LogoutRequest } from '@domain/repositories/auth.repository.interface';
import { LoginDto, LoginResponseDto, RefreshTokenDto, LogoutDto, LogoutResponseDto } from '@application/dtos/auth/auth.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpAdapter extends AuthRepository {
  private _currentUser: WritableSignal<LoginResponse | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);
  private _isAuthenticated: WritableSignal<boolean> = signal(false);

  // Public readonly signals
  public readonly currentUser: Signal<LoginResponse | null> = computed(() => this._currentUser());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());
  public readonly isAuthenticated: Signal<boolean> = computed(() => this._isAuthenticated());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  login(credentials: LoginCredentials): void {
    this._loading.set(true);
    this._error.set(null);

    const loginDto: LoginDto = {
      email: credentials.email,
      password: credentials.password
    };

    this.http.post<LoginResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.login),
      loginDto
    ).subscribe({
      next: (response) => {
        const loginResponse: LoginResponse = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: {
            id: response.user.id,
            email: response.user.email,
            roles: response.user.roles
          }
        };
        this._currentUser.set(loginResponse);
        this._isAuthenticated.set(true);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al iniciar sesión');
        this._isAuthenticated.set(false);
        this._loading.set(false);
      }
    });
  }

  refreshToken(request: RefreshTokenRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const refreshDto: RefreshTokenDto = {
      userId: request.userId,
      refreshToken: request.refreshToken
    };

    this.http.post<LoginResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.refresh),
      refreshDto
    ).subscribe({
      next: (response) => {
        const loginResponse: LoginResponse = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: {
            id: response.user.id,
            email: response.user.email,
            roles: response.user.roles
          }
        };
        this._currentUser.set(loginResponse);
        this._isAuthenticated.set(true);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al refrescar token');
        this._isAuthenticated.set(false);
        this._loading.set(false);
      }
    });
  }

  logout(request: LogoutRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const logoutDto: LogoutDto = {
      userId: request.userId,
      refreshToken: request.refreshToken
    };

    this.http.post<LogoutResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.logout),
      logoutDto
    ).subscribe({
      next: () => {
        this._currentUser.set(null);
        this._isAuthenticated.set(false);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cerrar sesión');
        this._loading.set(false);
      }
    });
  }
}
