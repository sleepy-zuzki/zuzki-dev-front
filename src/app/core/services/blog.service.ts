import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@core/config/api.config';
import { BlogEntryEntity, CreateBlogDto, UpdateBlogDto } from '@core/interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getEntries(): Observable<BlogEntryEntity[]> {
    return this.http.get<BlogEntryEntity[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.base)
    );
  }

  getEntryBySlug(slug: string): Observable<BlogEntryEntity> {
    return this.http.get<BlogEntryEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.bySlug(slug))
    );
  }

  getEntryById(id: string): Observable<BlogEntryEntity> {
    return this.http.get<BlogEntryEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.byId(id))
    );
  }

  createEntry(entry: CreateBlogDto): Observable<BlogEntryEntity> {
    return this.http.post<BlogEntryEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.base),
      entry
    );
  }

  updateEntry(id: string, entry: UpdateBlogDto): Observable<BlogEntryEntity> {
    return this.http.patch<BlogEntryEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.byId(id)),
      entry
    );
  }

  deleteEntry(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.byId(id))
    );
  }
}
