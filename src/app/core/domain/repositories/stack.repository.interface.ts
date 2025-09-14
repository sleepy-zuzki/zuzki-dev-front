import { Signal } from '@angular/core';
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
  abstract readonly stacks: Signal<StackEntity[]>;
  abstract readonly currentStack: Signal<StackEntity | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract getStacks(): void;
  abstract getStackBySlug(slug: string): void;
  abstract createStack(request: CreateStackRequest): void;
  abstract updateStack(id: number, request: UpdateStackRequest): void;
  abstract deleteStack(id: number): void;
}
