export interface User {
  id: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
