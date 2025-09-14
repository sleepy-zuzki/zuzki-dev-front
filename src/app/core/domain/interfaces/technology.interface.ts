import { TechnologyCategory } from '../enums/technology-category.enum';

export interface Technology {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: TechnologyCategory;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}
