import { Observable } from 'rxjs';
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
  abstract getFiles(): Observable<FileEntity[]>;
  abstract getFileById(id: number): Observable<FileEntity>;
  abstract uploadFile(request: UploadFileRequest): Observable<FileEntity>;
  abstract updateFile(id: number, request: UpdateFileRequest): Observable<FileEntity>;
  abstract deleteFile(id: number): Observable<{ success: boolean }>;
}
