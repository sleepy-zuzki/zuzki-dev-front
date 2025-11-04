import { ProjectEntity, TechnologyEntity, FileEntity } from '@core/domain';
import { ProjectResponseDto, FileResponseDto } from '@app/application';

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
      dto.details ?? undefined,
      dto.previewImageId ?? undefined,
      dto.technologies.map(tech => new TechnologyEntity(
        tech.id,
        tech.name,
        tech.slug,
        tech.website
      )),
      dto.carouselImages.map((file: FileResponseDto) => {
        const filename = file.url ? file.url.split('/').pop() || '' : '';
        const originalName = filename;

        return new FileEntity(
          file.id,
          originalName,
          filename,
          file.mimeType || '',
          file.sizeBytes ?? 0,
          file.url,
          file.projectId ?? undefined,
          new Date(file.createdAt),
          new Date(file.updatedAt)
        );
      }),
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }
}
