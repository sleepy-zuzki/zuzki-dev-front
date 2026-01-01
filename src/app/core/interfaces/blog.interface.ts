import type { OutputData } from '@editorjs/editorjs';
import { BlogStatus } from '@core/enums';

export interface BlogImage {
  id: string;
  url: string;
  type: 'cover' | 'gallery';
  order: number;
}

export interface BlogEntryEntity {
  id: string;
  status: BlogStatus;
  title: string;
  slug: string;
  description: string;
  images: BlogImage[];
  content?: OutputData | null; // EditorJS output object
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  description?: string;
  content?: OutputData | null;
  publishDate?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateBlogDto extends Partial<CreateBlogDto> {}
