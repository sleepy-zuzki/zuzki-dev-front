import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

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

  // Keys de almacenamiento (solicitado: buscar 'access_token')
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'auth_user';

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig,
    private readonly toast: HotToastService
  ) {
    super();
    // Restaurar sesión desde localStorage (SSR-safe)
    this.restoreFromStorage();
  }

  // API pública para garantizar restauración previa a un guard
  ensureSession(): boolean {
    this.restoreFromStorage();
    return this._isAuthenticated();
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
    ).pipe(
      catchError(err => {
        console.error('Login failed:', err);
        return throwError(() => new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.'));
      })
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
        // Validar que el token no esté expirado antes de persistir
        if (this.isJwtExpired(loginResponse.accessToken)) {
          this._error.set('El token recibido ya expiró');
          this.toast.error('La sesión es inválida. Por favor, intenta iniciar sesión de nuevo.');
          this._currentUser.set(null);
          this._isAuthenticated.set(false);
          this._loading.set(false);
          this.clearStorage();
          return;
        }
        this._currentUser.set(loginResponse);
        this._isAuthenticated.set(true);
        this.writeToStorage(loginResponse);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al iniciar sesión';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
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
    ).pipe(
      catchError(err => {
        console.error('Token refresh failed:', err);
        return throwError(() => new Error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'));
      })
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
        if (this.isJwtExpired(loginResponse.accessToken)) {
          this._error.set('La sesión expiró');
          this.toast.error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
          this._currentUser.set(null);
          this._isAuthenticated.set(false);
          this._loading.set(false);
          this.clearStorage();
          return;
        }
        this._currentUser.set(loginResponse);
        this._isAuthenticated.set(true);
        this.writeToStorage(loginResponse);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al refrescar token';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
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
    ).pipe(
      catchError(err => {
        console.warn('Logout API call failed, clearing session locally:', err);
        return throwError(() => new Error('Error al cerrar sesión.'));
      })
    ).subscribe({
      next: () => {
        this._currentUser.set(null);
        this._isAuthenticated.set(false);
        this._loading.set(false);
        this.clearStorage();
      },
      error: (error) => {
        // Si el API falla, forzamos el logout en el cliente de todas formas
        const errorMessage = error.message || 'Error al cerrar sesión';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._currentUser.set(null);
        this._isAuthenticated.set(false);
        this._loading.set(false);
        this.clearStorage();
      }
    });
  }

  // ---------- Helpers de almacenamiento y JWT ----------

  private getStorage(): Storage | null {
    try {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        return window.localStorage;
      }
      return null;
    } catch {
      return null;
    }
  }

  private writeToStorage(session: LoginResponse): void {
    const storage = this.getStorage();
    if (!storage) return;
    try {
      storage.setItem(this.ACCESS_TOKEN_KEY, session.accessToken);
      storage.setItem(this.REFRESH_TOKEN_KEY, session.refreshToken);
      storage.setItem(this.USER_KEY, JSON.stringify(session.user));
    } catch {
      // Ignorar errores de cuota o denegación
    }
  }

  private clearStorage(): void {
    const storage = this.getStorage();
    if (!storage) return;
    try {
      storage.removeItem(this.ACCESS_TOKEN_KEY);
      storage.removeItem(this.REFRESH_TOKEN_KEY);
      storage.removeItem(this.USER_KEY);
    } catch {
      // Ignorar
    }
  }

  private restoreFromStorage(): void {
    const storage = this.getStorage();
    if (!storage) return;

    const accessToken = storage.getItem(this.ACCESS_TOKEN_KEY);
    const refreshToken = storage.getItem(this.REFRESH_TOKEN_KEY);
    const userRaw = storage.getItem(this.USER_KEY);

    if (!accessToken || !userRaw) {
      this._isAuthenticated.set(false);
      this._currentUser.set(null);
      return;
    }

    if (this.isJwtExpired(accessToken)) {
      this._isAuthenticated.set(false);
      this._currentUser.set(null);
      // Limpia tokens expirados
      this.clearStorage();
      return;
    }

    try {
      const user = JSON.parse(userRaw) as LoginResponse['user'];
      const loginResponse: LoginResponse = { accessToken, refreshToken: refreshToken || '', user };
      this._currentUser.set(loginResponse);
      this._isAuthenticated.set(true);
    } catch {
      this._isAuthenticated.set(false);
      this._currentUser.set(null);
      this.clearStorage();
    }
  }

  private decodeJwtPayload<T = Record<string, unknown>>(token: string): T | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as T;
    } catch {
      return null;
    }
  }

  private isJwtExpired(token: string): boolean {
    const payload = this.decodeJwtPayload<{ exp?: number }>(token);
    if (!payload || !payload.exp) {
      // Si no hay 'exp', por seguridad lo consideramos expirado
      return true;
    }
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
  }
}
