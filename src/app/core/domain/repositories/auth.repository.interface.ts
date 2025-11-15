import { Signal } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

export interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

export interface LogoutRequest {
  userId: string;
  refreshToken: string;
}

export abstract class AuthRepository {
  abstract readonly currentUser: Signal<LoginResponse | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;
  abstract readonly isAuthenticated: Signal<boolean>;

  abstract login(credentials: LoginCredentials): void;
  abstract refreshToken(request: RefreshTokenRequest): void;
  abstract logout(request: LogoutRequest): void;
}
