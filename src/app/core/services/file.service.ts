import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@core/config/api.config';
import { FileEntity } from '@core/interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) { }

  uploadFile(file: File): Observable<FileEntity> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.upload),
      formData
    );
  }
}