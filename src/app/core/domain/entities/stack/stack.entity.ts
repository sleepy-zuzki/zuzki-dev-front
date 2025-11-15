import { Stack } from '@domain/interfaces/stack.interface';
import { Technology } from '@domain/interfaces/technology.interface';

export class StackEntity implements Stack {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | undefined,
    public readonly iconUrl: string | undefined,
    public readonly websiteUrl: string | undefined,
    public readonly color: string | undefined,
    public readonly technologies: Technology[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  hasIcon(): boolean {
    return !!this.iconUrl;
  }

  hasWebsite(): boolean {
    return !!this.websiteUrl;
  }

  getTechnologyCount(): number {
    return this.technologies.length;
  }

  getTechnologyNames(): string[] {
    return this.technologies.map(tech => tech.name);
  }

  hasTechnology(technologyId: number): boolean {
    return this.technologies.some(tech => tech.id === technologyId);
  }
}
