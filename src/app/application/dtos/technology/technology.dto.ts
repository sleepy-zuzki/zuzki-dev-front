export interface CreateTechnologyDto {
  name: string;
  slug: string;
  description?: string;
  category: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
}

export interface UpdateTechnologyDto {
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
}

export interface TechnologyResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: string;
  iconUrl?: string;
  websiteUrl?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}
