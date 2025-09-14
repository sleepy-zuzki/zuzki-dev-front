import { Signal } from '@angular/core';
import { UserEntity } from '../entities/user/user.entity';

export interface CreateUserRequest {
  email: string;
  password: string;
  roles?: string[];
  isActive?: boolean;
}

export abstract class UserRepository {
  abstract readonly currentUser: Signal<UserEntity | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract getUserById(id: string): void;
  abstract createUser(request: CreateUserRequest): void;
}
