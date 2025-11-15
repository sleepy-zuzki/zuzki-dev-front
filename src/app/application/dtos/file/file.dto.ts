export interface UpdateFileDto {
  url?: string;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: number | null;
}

export interface FileResponseDto {
  id: number;
  url: string;
  provider?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  projectId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFileResponseDto {
  success: boolean;
}
