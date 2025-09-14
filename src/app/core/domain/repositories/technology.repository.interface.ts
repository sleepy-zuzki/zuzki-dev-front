import { Signal } from '@angular/core';
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
  abstract readonly technologies: Signal<TechnologyEntity[]>;
  abstract readonly currentTechnology: Signal<TechnologyEntity | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract getTechnologies(): void;
  abstract getTechnologyBySlug(slug: string): void;
  abstract createTechnology(request: CreateTechnologyRequest): void;
  abstract updateTechnology(id: number, request: UpdateTechnologyRequest): void;
  abstract deleteTechnology(id: number): void;
}
