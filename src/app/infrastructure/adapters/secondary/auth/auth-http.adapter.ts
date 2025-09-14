import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthRepository, LoginCredentials, LoginResponse, RefreshTokenRequest, LogoutRequest } from '@domain/repositories/auth.repository.interface';
import { LoginDto, LoginResponseDto, RefreshTokenDto, LogoutDto, LogoutResponseDto } from '@application/dtos/auth/auth.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpAdapter extends AuthRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    const loginDto: LoginDto = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post<LoginResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.login),
      loginDto
    ).pipe(
      map(response => ({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          id: response.user.id,
          email: response.user.email,
          roles: response.user.roles
        }
      }))
    );
  }

  refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
    const refreshDto: RefreshTokenDto = {
      userId: request.userId,
      refreshToken: request.refreshToken
    };

    return this.http.post<LoginResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.refresh),
      refreshDto
    ).pipe(
      map(response => ({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          id: response.user.id,
          email: response.user.email,
          roles: response.user.roles
        }
      }))
    );
  }

  logout(request: LogoutRequest): Observable<{ success: boolean }> {
    const logoutDto: LogoutDto = {
      userId: request.userId,
      refreshToken: request.refreshToken
    };

    return this.http.post<LogoutResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.auth.logout),
      logoutDto
    );
  }
}
