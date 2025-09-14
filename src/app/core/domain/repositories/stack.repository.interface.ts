import { Observable } from 'rxjs';
import { StackEntity } from '../entities/stack/stack.entity';

export interface CreateStackRequest {
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologyIds?: number[];
}

export interface UpdateStackRequest {
  name?: string;
  slug?: string;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  technologyIds?: number[];
}

export abstract class StackRepository {
  abstract getStacks(): Observable<StackEntity[]>;
  abstract getStackBySlug(slug: string): Observable<StackEntity>;
  abstract createStack(request: CreateStackRequest): Observable<StackEntity>;
  abstract updateStack(id: number, request: UpdateStackRequest): Observable<StackEntity>;
  abstract deleteStack(id: number): Observable<{ success: boolean }>;
}
