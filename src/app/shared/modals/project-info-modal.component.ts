import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEntity } from '@core/domain';
import { ModalComponent } from '@components/modal/modal.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapChevronLeft, bootstrapChevronRight } from '@ng-icons/bootstrap-icons';
import { featherGithub } from '@ng-icons/feather-icons';
import { TypographyTitleComponent } from '@components/typography/title.component';
import { TypographyTextComponent } from '@components/typography/text.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-project-info-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgIcon, TypographyTitleComponent, TypographyTextComponent, ButtonComponent],
  templateUrl: './project-info-modal.component.html',
  styleUrls: ['./project-info-modal.component.css'],
  providers: [provideIcons({ bootstrapChevronLeft, bootstrapChevronRight, featherGithub })],
})
export class ProjectInfoModalComponent {
  @Input({ required: true }) project!: ProjectEntity;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  currentImageIndex = 0;

  get currentImageUrl(): string | undefined {
    return this.project.carouselImages[this.currentImageIndex]?.url;
  }

  open() {
    this.currentImageIndex = 0;
    this.modal.openModal();
  }

  nextImage() {
    if (this.project.carouselImages.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.project.carouselImages.length;
    }
  }

  prevImage() {
    if (this.project.carouselImages.length > 1) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.project.carouselImages.length) % this.project.carouselImages.length;
    }
  }
}
