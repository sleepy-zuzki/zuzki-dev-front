export interface UpdateFileDto {
  originalName?: string;
  alt?: string;
  caption?: string;
  projectId?: number;
}

export interface FileResponseDto {
  id: number;
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  projectId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFileResponseDto {
  success: boolean;
}
