export interface CreateUserDto {
  email: string;
  password: string;
  roles?: string[];
  isActive?: boolean;
}

export interface UserResponseDto {
  id: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
