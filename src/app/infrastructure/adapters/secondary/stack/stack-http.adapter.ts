import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StackRepository, CreateStackRequest, UpdateStackRequest } from '@domain/repositories/stack.repository.interface';
import { StackEntity } from '@domain/entities/stack/stack.entity';
import { TechnologyEntity } from '@domain/entities/technology/technology.entity';
import { TechnologyCategory } from '@domain/enums/technology-category.enum';
import { CreateStackDto, UpdateStackDto, StackResponseDto } from '@application/dtos/stack/stack.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StackHttpAdapter extends StackRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getStacks(): Observable<StackEntity[]> {
    return this.http.get<StackResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.base)
    ).pipe(
      map(stacks => stacks.map(this.mapToStackEntity))
    );
  }

  getStackBySlug(slug: string): Observable<StackEntity> {
    return this.http.get<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.bySlug(slug))
    ).pipe(
      map(this.mapToStackEntity)
    );
  }

  createStack(request: CreateStackRequest): Observable<StackEntity> {
    const createDto: CreateStackDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color,
      technologyIds: request.technologyIds
    };

    return this.http.post<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.base),
      createDto
    ).pipe(
      map(this.mapToStackEntity)
    );
  }

  updateStack(id: number, request: UpdateStackRequest): Observable<StackEntity> {
    const updateDto: UpdateStackDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color,
      technologyIds: request.technologyIds
    };

    return this.http.patch<StackResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.byId(id)),
      updateDto
    ).pipe(
      map(this.mapToStackEntity)
    );
  }

  deleteStack(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.stacks.byId(id))
    );
  }

  private mapToStackEntity = (dto: StackResponseDto): StackEntity => {
    return new StackEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.iconUrl,
      dto.websiteUrl,
      dto.color,
      dto.technologies.map(tech => new TechnologyEntity(
        tech.id,
        tech.name,
        tech.slug,
        tech.description,
        tech.category as TechnologyCategory,
        tech.iconUrl,
        tech.websiteUrl,
        tech.color,
        new Date(tech.createdAt),
        new Date(tech.updatedAt)
      )),
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
