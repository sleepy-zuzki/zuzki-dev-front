// DTO for creating a new technology, aligned with the latest API documentation
export interface CreateTechnologyDto {
  name: string;
  slug: string;
  website?: string;
}

// DTO for updating a technology, aligned with the latest API documentation
export interface UpdateTechnologyDto {
  name?: string;
  slug?: string;
  website?: string;
}

// DTO for the technology data returned by the API
export interface TechnologyResponseDto {
  id: number;
  name: string;
  slug: string;
  website?: string;
}
