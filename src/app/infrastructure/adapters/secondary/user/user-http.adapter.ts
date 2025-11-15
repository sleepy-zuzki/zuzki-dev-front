import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

import { UserRepository, CreateUserRequest } from '@domain/repositories/user.repository.interface';
import { UserEntity } from '@domain/entities/user/user.entity';
import { CreateUserDto, UserResponseDto } from '@application/dtos/user/user.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserHttpAdapter extends UserRepository {
  private _currentUser: WritableSignal<UserEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly currentUser: Signal<UserEntity | null> = computed(() => this._currentUser());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig,
    private readonly toast: HotToastService
  ) {
    super();
  }

  getUserById(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<UserResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.byId(id))
    ).pipe(
      catchError(err => {
        console.error(`Error fetching user ${id}:`, err);
        return throwError(() => new Error('No se pudo cargar el usuario.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (user) => {
        const mappedUser = this.mapToUserEntity(user);
        this._currentUser.set(mappedUser);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar usuario';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  createUser(request: CreateUserRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const createDto: CreateUserDto = {
      email: request.email,
      password: request.password,
      roles: request.roles,
      isActive: request.isActive
    };

    this.http.post<UserResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.base),
      createDto
    ).pipe(
      catchError(err => {
        console.error('Error creating user:', err);
        return throwError(() => new Error('No se pudo crear el usuario.'));
      }),
      takeUntilDestroyed()
    ).subscribe({
      next: (user) => {
        const mappedUser = this.mapToUserEntity(user);
        this._currentUser.set(mappedUser);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al crear usuario';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  private mapToUserEntity = (dto: UserResponseDto): UserEntity => {
    return new UserEntity(
      dto.id,
      dto.email,
      dto.roles,
      dto.isActive,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
