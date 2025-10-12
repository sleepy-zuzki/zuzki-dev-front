import { ProjectEntity, TechnologyEntity, FileEntity, TechnologyCategory } from '@core/domain';
import { ProjectResponseDto } from '@app/application';

export class ProjectMapper {
  static toEntity(dto: ProjectResponseDto): ProjectEntity {
    return new ProjectEntity(
      dto.id,
      dto.name,
      dto.slug,
      dto.description,
      dto.liveUrl ?? undefined,
      dto.repoUrl ?? undefined,
      dto.category ?? undefined,
      dto.year ?? undefined,
      dto.isFeatured ?? undefined,
      dto.previewImageId ?? undefined,
      dto.technologies.map(tech => new TechnologyEntity(
        tech.id,
        tech.name,
        tech.slug,
        tech.website
      )),
      dto.carouselImages.map(file => {
        const url = (file as any).url || '';
        const filename = url ? url.split('/').pop() || '' : '';
        const originalName = filename;
        const size = (file as any).sizeBytes ?? 0;
        const mimeType = (file as any).mimeType || '';
        const projectId = (file as any).projectId ?? undefined;

        return new FileEntity(
          (file as any).id,
          originalName,
          filename,
          mimeType,
          size,
          url,
          projectId,
          new Date((file as any).createdAt),
          new Date((file as any).updatedAt)
        );
      }),
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }
}
