export interface File {
  id: number;
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  projectId?: number;
  createdAt: Date;
  updatedAt: Date;
}
