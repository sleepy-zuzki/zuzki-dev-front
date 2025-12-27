import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsListComponent } from '@components/tags-list/tags-list.component';
import {
  bootstrapArrowRightShort,
  bootstrapArrowUpRight,
  bootstrapGithub,
  bootstrapTrash,
  bootstrapImages
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
      bootstrapImages
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
  project = input.required<Project>();
  isAdmin = input(false);

  edit = output<Project>();
  delete = output<string>();

  imageUrl = computed(() => {
    const proj = this.project();
    if (!proj || !proj.images || proj.images.length === 0) return undefined;
    
    // 1. Try to find explicit 'cover'
    const cover = proj.images.find(img => img.type === 'cover');
    if (cover) return cover.url;

    // 2. Fallback to 'hero-slide' (often high quality)
    const hero = proj.images.find(img => img.type === 'hero-slide');
    if (hero) return hero.url;

    // 3. Fallback to any 'gallery' or first image
    return proj.images[0].url;
  });

  actionUrl = computed(() => {
    const proj = this.project();
    if (!proj) return null;
    return proj.liveUrl ?? proj.repoUrl ?? null;
  });

  tags = computed(() => {
    const proj = this.project();
    if (!proj) return [];
    return proj.technologies.map(t => t.name);
  });

  openProjectModal(modal: ProjectInfoModalComponent) {
    modal.open();
  }

  onEdit(): void {
    this.edit.emit(this.project());
  }

  onDelete(): void {
    this.delete.emit(this.project().id);
  }
}