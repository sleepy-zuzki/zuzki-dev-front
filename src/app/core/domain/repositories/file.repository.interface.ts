import { Signal } from '@angular/core';
import { FileEntity } from '@core/domain';

export interface UploadFileRequest {
  url: string;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: number | null;
}

export interface UpdateFileRequest {
  url?: string;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: number | null;
}

export abstract class FileRepository {
  abstract readonly files: Signal<FileEntity[]>;
  abstract readonly currentFile: Signal<FileEntity | null>;
  abstract readonly loading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract getFiles(): void;
  abstract getFileById(id: number): void;
  abstract uploadFile(request: UploadFileRequest): void;
  abstract updateFile(id: number, request: UpdateFileRequest): void;
  abstract deleteFile(id: number): void;
}
