import { Injectable, signal, computed, WritableSignal, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotToastService } from '@ngxpert/hot-toast';

import { FileEntity, UpdateFileDto } from '@core/interfaces/file.interface';
import { ApiConfig } from '@core/config/api.config';
import { FileService } from '@core/services/file.service';

@Injectable({
  providedIn: 'root'
})
export class FileStore {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);
  private readonly fileService = inject(FileService);
  private readonly toast = inject(HotToastService);

  private _files: WritableSignal<FileEntity[]> = signal([]);
  private _currentFile: WritableSignal<FileEntity | null> = signal(null);
  private _loading: WritableSignal<boolean> = signal(false);
  private _error: WritableSignal<string | null> = signal(null);

  // Public readonly signals
  public readonly files: Signal<FileEntity[]> = computed(() => this._files());
  public readonly currentFile: Signal<FileEntity | null> = computed(() => this._currentFile());
  public readonly loading: Signal<boolean> = computed(() => this._loading());
  public readonly error: Signal<string | null> = computed(() => this._error());

  getFiles(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<FileEntity[]>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.base)
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (files) => {
        this._files.set(files);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar archivos';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  getFileById(id: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<FileEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id))
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (file) => {
        this._currentFile.set(file);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al cargar archivo';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  uploadFile(file: File): void {
    this._loading.set(true);
    this._error.set(null);

    this.fileService.uploadFile(file).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (uploadedFile) => {
        this._files.update(current => [...current, uploadedFile]);
        this._currentFile.set(uploadedFile);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al subir archivo';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }

  updateFile(id: number, request: UpdateFileDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.patch<FileEntity>(
      this.apiConfig.getFullUrl(this.apiConfig.endpoints.portfolio.files.byId(id)),
      request
    ).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (file) => {
        this._files.update(current => current.map(f => f.id === id ? file : f));
        this._currentFile.set(file);
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al actualizar archivo';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
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
        this._files.update(current => current.filter(f => f.id !== id));
        this._loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.message || 'Error al eliminar archivo';
        this._error.set(errorMessage);
        this.toast.error(errorMessage);
        this._loading.set(false);
      }
    });
  }
}
