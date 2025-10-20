import { CarouselImage } from '@domain/entities/project/carousel-image.entity';
import { CarouselImageDto } from '@application/dtos/project/carousel-image.dto';

export class CarouselImageMapper {
  static toEntity(dto: CarouselImageDto): CarouselImage {
    return new CarouselImage(
      dto.id,
      dto.project_id,
      dto.image_url,
      dto.order,
      dto.alt_text
    );
  }

  static toDto(entity: CarouselImage): CarouselImageDto {
    return {
      id: entity.id,
      project_id: entity.projectId,
      image_url: entity.imageUrl,
      order: entity.order,
      alt_text: entity.altText,
    };
  }
}
