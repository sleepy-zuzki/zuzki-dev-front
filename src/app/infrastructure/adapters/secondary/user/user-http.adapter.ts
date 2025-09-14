import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserRepository, CreateUserRequest } from '@domain/repositories/user.repository.interface';
import { UserEntity } from '@domain/entities/user/user.entity';
import { CreateUserDto, UserResponseDto } from '@application/dtos/user/user.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserHttpAdapter extends UserRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getUserById(id: string): Observable<UserEntity> {
    return this.http.get<UserResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.byId(id))
    ).pipe(
      map(this.mapToUserEntity)
    );
  }

  createUser(request: CreateUserRequest): Observable<UserEntity> {
    const createDto: CreateUserDto = {
      email: request.email,
      password: request.password,
      roles: request.roles,
      isActive: request.isActive
    };

    return this.http.post<UserResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.users.base),
      createDto
    ).pipe(
      map(this.mapToUserEntity)
    );
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
