export interface User {
  id: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  roles?: string[];
  isActive?: boolean;
}

// Alias for compatibility
export type UserResponseDto = User;