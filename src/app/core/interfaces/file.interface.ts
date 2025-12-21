export interface FileEntity {
  id: string;
  url: string;
  key?: string | null;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateFileDto {
  url?: string;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: string | null;
}

export interface UploadFileResponseDto {
  success: boolean;
  file: FileEntity;
}
