import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@core/config/api.config';
import { BlogEntryEntity, CreateBlogDto, UpdateBlogDto } from '@core/interfaces/blog.interface';
import { BlogStatus } from '@core/enums';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getEntries(status?: BlogStatus): Observable<BlogEntryEntity[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    
    return this.http.get<BlogEntryEntity[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.base),
      { params }
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

  publishEntry(id: string): Observable<void> {
    return this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.publish(id)),
      {}
    );
  }

  attachFile(entryId: string, fileId: string, context: string, order: number): Observable<void> {
    return this.http.post<void>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.blog.entries.files(entryId)),
      { fileId, contextSlug: context, order }
    );
  }
}
