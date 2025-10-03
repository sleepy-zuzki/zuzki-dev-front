import { Technology } from '@core/domain';
import { File } from '@core/domain';

export interface Project {
  id: number;
  name: string;
  slug: string;
  description?: string;
  liveUrl?: string | null;
  repoUrl?: string | null;
  category?: string | null;
  year?: number | null;
  isFeatured?: boolean;
  previewImageId?: number | null;
  technologies: Technology[];
  carouselImages: File[];
  createdAt: Date;
  updatedAt: Date;
}
