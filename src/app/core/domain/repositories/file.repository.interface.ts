import { Signal } from '@angular/core';
import { FileEntity } from '../entities/file/file.entity';

export interface UploadFileRequest {
  file: File;
  projectId?: string;
}

export interface UpdateFileRequest {
  originalName?: string;
  alt?: string;
  caption?: string;
  projectId?: number;
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
