import { Project } from '../../interfaces/project.interface';
import { ProjectStatus } from '../../enums/project-status.enum';
import { Technology } from '../../interfaces/technology.interface';
import { File } from '../../interfaces/file.interface';

export class ProjectEntity implements Project {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | undefined,
    public readonly longDescription: string | undefined,
    public readonly demoUrl: string | undefined,
    public readonly repositoryUrl: string | undefined,
    public readonly status: ProjectStatus,
    public readonly technologies: Technology[],
    public readonly carouselImages: File[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  isPublished(): boolean {
    return this.status === ProjectStatus.PUBLISHED;
  }

  isDraft(): boolean {
    return this.status === ProjectStatus.DRAFT;
  }

  hasRepository(): boolean {
    return !!this.repositoryUrl;
  }

  hasDemo(): boolean {
    return !!this.demoUrl;
  }

  getTechnologyNames(): string[] {
    return this.technologies.map(tech => tech.name);
  }
}
