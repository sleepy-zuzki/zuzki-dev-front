import { Observable } from 'rxjs';

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
  abstract login(credentials: LoginCredentials): Observable<LoginResponse>;
  abstract refreshToken(request: RefreshTokenRequest): Observable<LoginResponse>;
  abstract logout(request: LogoutRequest): Observable<{ success: boolean }>;
}
