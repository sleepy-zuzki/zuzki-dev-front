import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileRepository, UploadFileRequest, UpdateFileRequest } from '@domain/repositories/file.repository.interface';
import { FileEntity } from '@domain/entities/file/file.entity';
import { UpdateFileDto, FileResponseDto } from '@application/dtos/file/file.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FileHttpAdapter extends FileRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getFiles(): Observable<FileEntity[]> {
    return this.http.get<FileResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base)
    ).pipe(
      map(files => files.map(this.mapToFileEntity))
    );
  }

  getFileById(id: number): Observable<FileEntity> {
    return this.http.get<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id))
    ).pipe(
      map(this.mapToFileEntity)
    );
  }

  uploadFile(request: UploadFileRequest): Observable<FileEntity> {
    const formData = new FormData();
    formData.append('file', request.file);

    if (request.projectId) {
      formData.append('projectId', request.projectId);
    }

    return this.http.post<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base),
      formData
    ).pipe(
      map(this.mapToFileEntity)
    );
  }

  updateFile(id: number, request: UpdateFileRequest): Observable<FileEntity> {
    const updateDto: UpdateFileDto = {
      originalName: request.originalName,
      alt: request.alt,
      caption: request.caption,
      projectId: request.projectId
    };

    return this.http.patch<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id)),
      updateDto
    ).pipe(
      map(this.mapToFileEntity)
    );
  }

  deleteFile(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id))
    );
  }

  private mapToFileEntity = (dto: FileResponseDto): FileEntity => {
    return new FileEntity(
      dto.id,
      dto.originalName,
      dto.filename,
      dto.mimeType,
      dto.size,
      dto.url,
      dto.alt,
      dto.caption,
      dto.projectId,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
