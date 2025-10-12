import { TechnologyResponseDto } from '@app/application';
import { TechnologyEntity, TechnologyCategory } from '@core/domain';

/**
 * Mapper para transformar datos de tecnología entre la capa de DTO y la de Entidad.
 */
export class TechnologyMapper {
  /**
   * Convierte un DTO de respuesta de tecnología a una entidad de tecnología.
   * @param dto - El objeto de transferencia de datos de la API.
   * @returns Una instancia de TechnologyEntity.
   */
  static toEntity(dto: TechnologyResponseDto): TechnologyEntity {
    return new TechnologyEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.category as TechnologyCategory,
      dto.iconUrl,
      dto.websiteUrl,
      dto.color,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }
}
