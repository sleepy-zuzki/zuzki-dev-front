import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TechnologyRepository, CreateTechnologyRequest, UpdateTechnologyRequest } from '../../../../core/domain/repositories/technology.repository.interface';
import { TechnologyEntity } from '../../../../core/domain/entities/technology/technology.entity';
import { TechnologyCategory } from '../../../../core/domain/enums/technology-category.enum';
import { CreateTechnologyDto, UpdateTechnologyDto, TechnologyResponseDto } from '../../../../application/dtos/technology/technology.dto';
import { ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TechnologyHttpAdapter extends TechnologyRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getTechnologies(): Observable<TechnologyEntity[]> {
    return this.http.get<TechnologyResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.base)
    ).pipe(
      map(technologies => technologies.map(this.mapToTechnologyEntity))
    );
  }

  getTechnologyBySlug(slug: string): Observable<TechnologyEntity> {
    return this.http.get<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.bySlug(slug))
    ).pipe(
      map(this.mapToTechnologyEntity)
    );
  }

  createTechnology(request: CreateTechnologyRequest): Observable<TechnologyEntity> {
    const createDto: CreateTechnologyDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      category: request.category,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color
    };

    return this.http.post<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.base),
      createDto
    ).pipe(
      map(this.mapToTechnologyEntity)
    );
  }

  updateTechnology(id: number, request: UpdateTechnologyRequest): Observable<TechnologyEntity> {
    const updateDto: UpdateTechnologyDto = {
      name: request.name,
      slug: request.slug,
      description: request.description,
      category: request.category,
      iconUrl: request.iconUrl,
      websiteUrl: request.websiteUrl,
      color: request.color
    };

    return this.http.patch<TechnologyResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id)),
      updateDto
    ).pipe(
      map(this.mapToTechnologyEntity)
    );
  }

  deleteTechnology(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.catalog.technologies.byId(id))
    );
  }

  private mapToTechnologyEntity = (dto: TechnologyResponseDto): TechnologyEntity => {
    return new TechnologyEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.category as TechnologyCategory,
      dto.iconUrl,
      dto.websiteUrl,
      dto.color,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
