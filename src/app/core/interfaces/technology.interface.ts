export interface Technology {
  id: string;
  areaId: string;
  name: string;
  slug: string;
  websiteUrl?: string;
  docsUrl?: string;
  iconClass?: string;
  primaryColor?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTechnologyDto {
  areaId: string;
  name: string;
  slug: string;
  websiteUrl?: string;
  docsUrl?: string;
  iconClass?: string;
  primaryColor?: string;
}

export interface UpdateTechnologyDto {
  areaId?: string;
  name?: string;
  slug?: string;
  websiteUrl?: string;
  docsUrl?: string;
  iconClass?: string;
  primaryColor?: string;
}
