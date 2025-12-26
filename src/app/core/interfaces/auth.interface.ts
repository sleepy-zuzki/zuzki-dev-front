export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

// Alias for DTO compatibility if needed
export type LoginResponseDto = LoginResponse;

export interface RefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

export type RefreshTokenDto = RefreshTokenRequest;

export interface LogoutRequest {
  userId: string;
  refreshToken: string;
}

export type LogoutDto = LogoutRequest;

export interface LogoutResponseDto {
  success: boolean;
}
