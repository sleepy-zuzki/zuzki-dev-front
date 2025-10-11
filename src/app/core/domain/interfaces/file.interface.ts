export interface File {
  id: number;
  alt?: string;
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  projectId?: number;
  createdAt: Date;
  updatedAt: Date;
}
