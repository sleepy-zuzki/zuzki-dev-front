import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Technology, CreateTechnologyDto, UpdateTechnologyDto } from '@core/interfaces/technology.interface';
import { ApiConfig } from '@core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    this.baseUrl = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.base);
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.baseUrl);
  }

  getTechnologyBySlug(slug: string): Observable<Technology> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.bySlug(slug));
    return this.http.get<Technology>(url);
  }

  createTechnology(request: CreateTechnologyDto): Observable<Technology> {
    return this.http.post<Technology>(this.baseUrl, request);
  }

  updateTechnology(id: string, request: UpdateTechnologyDto): Observable<Technology> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.patch<Technology>(url, request);
  }

  deleteTechnology(id: string): Observable<{ success: boolean }> {
    const url = this.apiConfig.getFullUrl(this.apiConfig.endpoints.stack.technologies.byId(id));
    return this.http.delete<{ success: boolean }>(url);
  }
}
