import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ProjectEntity } from '@core/domain';
import { ModalComponent } from '@components/modal/modal.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapChevronLeft, bootstrapChevronRight } from '@ng-icons/bootstrap-icons';
import { featherGithub } from '@ng-icons/feather-icons';
import { TypographyTitleComponent } from '@components/typography/title.component';
import { TypographyTextComponent } from '@components/typography/text.component';
import { TagsListComponent } from '@components/tags-list/tags-list.component';
import { register } from 'swiper/element/bundle';


register();

@Component({
  selector: 'app-project-info-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgIcon, TypographyTitleComponent, TypographyTextComponent, TagsListComponent, NgOptimizedImage],
  templateUrl: './project-info-modal.component.html',
  providers: [
    provideIcons({ bootstrapChevronLeft, bootstrapChevronRight, featherGithub }),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // Reemplaza con la URL base de tu CDN
        // Nota: Asegúrate de que termine con '/' si tus src no lo tienen
        return `${config.src}`;
      }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectInfoModalComponent {
  @Input({ required: true }) project!: ProjectEntity;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  currentImageIndex = 0;

  get projectTags(): string[] {
    return this.project.technologies.map(t => t.name);
  }

  open() {
    this.currentImageIndex = 0;
    this.modal.openModal();
  }

  onProgress(event: CustomEvent<[unknown, number]>) {
    const [, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide change');
  }
}
