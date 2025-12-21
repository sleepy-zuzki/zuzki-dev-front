import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsListComponent } from '@components/tags-list/tags-list.component';
import {
  bootstrapArrowRightShort,
  bootstrapArrowUpRight,
  bootstrapGithub,
  bootstrapTrash,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Project } from '@core/interfaces';
import { TypographyTextComponent } from '@components/typography/text.component';
import { TypographyTitleComponent } from '@components/typography/title.component';
import { ProjectInfoModalComponent } from '@shared/modals/project-info-modal.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    RouterModule,
    TagsListComponent,
    NgIcon,
    TypographyTextComponent,
    TypographyTitleComponent,
    ProjectInfoModalComponent,
    ButtonComponent,
    TitleCasePipe,
    NgOptimizedImage
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      bootstrapArrowRightShort,
      bootstrapArrowUpRight,
      bootstrapGithub,
      bootstrapTrash,
    }),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // Reemplaza con la URL base de tu CDN
        // Nota: Asegúrate de que termine con '/' si tus src no lo tienen
        return `${config.src}`;
      }
    }
  ],
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input() isAdmin = false;

  @Output() edit = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<string>();

  get imageUrl(): string | undefined {
    if (!this.project) return undefined;
    const primaryImage = this.project.previewImageId
      ? this.project.carouselImages.find(f => f.id === this.project.previewImageId) ?? this.project.carouselImages[0]
      : this.project.carouselImages[0];
    return primaryImage?.url ?? undefined;
  }

  get actionUrl(): string | null {
    if (!this.project) return null;
    return this.project.liveUrl ?? this.project.repoUrl ?? null;
  }

  get tags(): string[] {
    if (!this.project) return [];
    return this.project.technologies.map(t => t.name);
  }

  openProjectModal(modal: ProjectInfoModalComponent) {
    modal.open();
  }

  onEdit(): void {
    this.edit.emit(this.project);
  }

  onDelete(): void {
    this.delete.emit(this.project.id);
  }
}
