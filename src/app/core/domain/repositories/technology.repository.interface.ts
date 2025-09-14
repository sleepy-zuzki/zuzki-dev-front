import { Observable } from 'rxjs';
import { TechnologyEntity } from '../entities/technology/technology.entity';
import { TechnologyCategory } from '../enums/technology-category.enum';

export interface CreateTechnologyRequest {
  name: string;
  slug: string;
  description?: string;
  category: TechnologyCategory;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
}

export interface UpdateTechnologyRequest {
  name?: string;
  slug?: string;
  description?: string;
  category?: TechnologyCategory;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
}

export abstract class TechnologyRepository {
  abstract getTechnologies(): Observable<TechnologyEntity[]>;
  abstract getTechnologyBySlug(slug: string): Observable<TechnologyEntity>;
  abstract createTechnology(request: CreateTechnologyRequest): Observable<TechnologyEntity>;
  abstract updateTechnology(id: number, request: UpdateTechnologyRequest): Observable<TechnologyEntity>;
  abstract deleteTechnology(id: number): Observable<{ success: boolean }>;
}
