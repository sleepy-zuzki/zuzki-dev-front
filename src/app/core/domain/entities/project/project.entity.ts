import { Project } from '@core/domain';
import { Technology } from '@core/domain';
import { File } from '@core/domain';

export class ProjectEntity implements Project {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | undefined,
    public readonly liveUrl: string | undefined,
    public readonly repoUrl: string | undefined,
    public readonly category: string | undefined,
    public readonly year: number | undefined,
    public readonly isFeatured: boolean | undefined,
    public readonly previewImageId: number | undefined,
    public readonly technologies: Technology[],
    public readonly carouselImages: File[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  hasRepository(): boolean {
    return !!this.repoUrl;
  }

  hasDemo(): boolean {
    return !!this.liveUrl;
  }

  getTechnologyNames(): string[] {
    return this.technologies.map(tech => tech.name);
  }
}
