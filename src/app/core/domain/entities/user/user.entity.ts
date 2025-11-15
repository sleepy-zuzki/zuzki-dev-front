import { User } from '../../interfaces/user.interface';

export class UserEntity implements User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly roles: string[],
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  canManageProjects(): boolean {
    return this.isAdmin() || this.hasRole('editor');
  }
}
