import { Technology } from './technology.interface';
import { File } from './file.interface';
import { ProjectStatus } from '@domain/enums/project-status.enum';

export interface Project {
  id: number;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  status: ProjectStatus;
  technologies: Technology[];
  carouselImages: File[];
  createdAt: Date;
  updatedAt: Date;
}
