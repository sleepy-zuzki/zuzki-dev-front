import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsListComponent } from '@components/tags-list/tags-list.component';
import {
  bootstrapArrowRightShort,
  bootstrapArrowUpRight,
  bootstrapChevronLeft,
  bootstrapChevronRight,
  bootstrapGithub,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ProjectEntity } from '@core/domain';
import { TypographyTextComponent } from '@components/typography/text.component';
import { TypographyTitleComponent } from '@components/typography/title.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule, TagsListComponent, NgIcon, TypographyTextComponent, TypographyTitleComponent],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      bootstrapArrowRightShort,
      bootstrapX,
      bootstrapArrowUpRight,
      bootstrapGithub,
      bootstrapChevronLeft,
      bootstrapChevronRight,
    }),
  ],
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectEntity;

  currentImageIndex = 0;

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

  openModal(modal: HTMLDialogElement) {
    this.currentImageIndex = 0;
    modal.showModal();
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
