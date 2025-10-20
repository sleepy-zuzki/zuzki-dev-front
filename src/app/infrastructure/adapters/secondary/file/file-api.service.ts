import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { FileResponseDto } from '@app/application';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) { }

  uploadFile(file: File): Observable<FileResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    // The backend endpoint for upload should be configured to return the FileResponseDto
    return this.http.post<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base),
      formData
    );
  }
}
