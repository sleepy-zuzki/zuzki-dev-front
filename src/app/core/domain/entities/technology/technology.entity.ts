import { Technology } from '../../interfaces/technology.interface';
import { TechnologyCategory } from '../../enums/technology-category.enum';

export class TechnologyEntity implements Technology {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | undefined,
    public readonly category: TechnologyCategory,
    public readonly iconUrl: string | undefined,
    public readonly websiteUrl: string | undefined,
    public readonly color: string | undefined,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  isFrontend(): boolean {
    return this.category === TechnologyCategory.FRONTEND;
  }

  isBackend(): boolean {
    return this.category === TechnologyCategory.BACKEND;
  }

  hasIcon(): boolean {
    return !!this.iconUrl;
  }

  hasWebsite(): boolean {
    return !!this.websiteUrl;
  }
}
