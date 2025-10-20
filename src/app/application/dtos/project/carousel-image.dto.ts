export interface CarouselImageDto {
  id: string;
  project_id: string;
  image_url: string;
  order: number;
  alt_text?: string;
}

export interface UpdateCarouselImageOrderDto {
  images: { id: string; order: number }[];
}
