import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user/user.entity';

export interface CreateUserRequest {
  email: string;
  password: string;
  roles?: string[];
  isActive?: boolean;
}

export abstract class UserRepository {
  abstract getUserById(id: string): Observable<UserEntity>;
  abstract createUser(request: CreateUserRequest): Observable<UserEntity>;
}
