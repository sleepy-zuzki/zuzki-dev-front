export interface BlogEntryEntity {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: any; // EditorJS output object
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  // Agrega campos opcionales si existen en la respuesta real pero no en la doc básica (ej: author, coverImage)
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  description?: string;
  content?: any;
  publishDate?: string;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}
