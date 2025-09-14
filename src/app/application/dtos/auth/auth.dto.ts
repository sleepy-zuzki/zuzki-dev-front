export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserInfoDto;
}

export interface UserInfoDto {
  id: string;
  email: string;
  roles: string[];
}

export interface RefreshTokenDto {
  userId: string;
  refreshToken: string;
}

export interface LogoutDto {
  userId: string;
  refreshToken: string;
}

export interface LogoutResponseDto {
  success: boolean;
}
