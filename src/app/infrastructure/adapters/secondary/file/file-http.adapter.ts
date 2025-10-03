import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FileRepository, UploadFileRequest, UpdateFileRequest } from '@domain/repositories/file.repository.interface';
import { FileEntity } from '@domain/entities/file/file.entity';
import { UpdateFileDto, FileResponseDto } from '@application/dtos/file/file.dto';
import { ApiConfig } from '@infrastructure/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FileHttpAdapter extends FileRepository {
  private _files: WritableSignal<FileEntity[]> = signal([]);
  private _currentFile: WritableSignal<FileEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly files: Signal<FileEntity[]> = computed(() => this._files());
  public readonly currentFile: Signal<FileEntity | null> = computed(() => this._currentFile());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfig
  ) {
    super();
  }

  getFiles(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<FileResponseDto[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base)
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (files) => {
        const mappedFiles = files.map(this.mapToFileEntity);
        this._files.set(mappedFiles);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar archivos');
        this._loading.set(false);
      }
    });
  }

  getFileById(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (file) => {
        const mappedFile = this.mapToFileEntity(file);
        this._currentFile.set(mappedFile);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al cargar archivo');
        this._loading.set(false);
      }
    });
  }

  uploadFile(request: UploadFileRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const payload = {
      url: request.url,
      provider: request.provider ?? null,
      mimeType: request.mimeType ?? null,
      sizeBytes: request.sizeBytes ?? null,
      projectId: request.projectId ?? null
    };

    this.http.post<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base),
      payload
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (file) => {
        const mappedFile = this.mapToFileEntity(file);
        const currentFiles = this._files();
        this._files.set([...currentFiles, mappedFile]);
        this._currentFile.set(mappedFile);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al subir archivo');
        this._loading.set(false);
      }
    });
  }

  updateFile(id: number, request: UpdateFileRequest): void {
    this._loading.set(true);
    this._error.set(null);

    const updateDto: UpdateFileDto = {
      url: request.url,
      provider: request.provider ?? null,
      mimeType: request.mimeType ?? null,
      sizeBytes: request.sizeBytes ?? null,
      projectId: request.projectId ?? null
    };

    this.http.patch<FileResponseDto>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id)),
      updateDto
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (file) => {
        const mappedFile = this.mapToFileEntity(file);
        const currentFiles = this._files();
        const updatedFiles = currentFiles.map(f => f.id === id ? mappedFile : f);
        this._files.set(updatedFiles);
        this._currentFile.set(mappedFile);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al actualizar archivo');
        this._loading.set(false);
      }
    });
  }

  deleteFile(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.delete<{ success: boolean }>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        const currentFiles = this._files();
        const filteredFiles = currentFiles.filter(f => f.id !== id);
        this._files.set(filteredFiles);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message || 'Error al eliminar archivo');
        this._loading.set(false);
      }
    });
  }

  private mapToFileEntity = (dto: FileResponseDto): FileEntity => {
    const url = dto.url || '';
    const filename = url ? url.split('/').pop() || '' : '';
    const originalName = filename;

    return new FileEntity(
      dto.id,
      originalName,
      filename,
      dto.mimeType || '',
      (dto.sizeBytes ?? 0) as number,
      url,
      dto.projectId ?? undefined,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  };
}
