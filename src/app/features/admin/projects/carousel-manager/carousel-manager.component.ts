import { Component, OnInit, inject, computed } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ButtonComponent } from '@components/button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherUpload, featherTrash2 } from '@ng-icons/feather-icons';
import { lucideGripVertical } from '@ng-icons/lucide';
import { LoadState } from '@core/enums/load-state.enum';
import { FileEntity } from '@core/interfaces/file.interface';
import { ProjectStore } from '@core/stores/project.store';

@Component({
  selector: 'app-carousel-manager',
  standalone: true,
  imports: [DragDropModule, ButtonComponent, NgIcon],
  templateUrl: './carousel-manager.component.html',
  styleUrl: './carousel-manager.component.css',
  providers: [provideIcons({ featherUpload, featherTrash2, lucideGripVertical })],
})
export class CarouselManagerComponent implements OnInit {
  private readonly projectStore = inject(ProjectStore);
  private readonly route = inject(ActivatedRoute);

  private projectSlug!: string;

  readonly images = computed(() => this.projectStore.currentProject()?.images ?? []);
  readonly loadState = computed(() => {
    if (this.projectStore.loading()) return LoadState.LOADING;
    if (this.projectStore.error()) return LoadState.ERROR;
    return LoadState.LOADED;
  });
  readonly LoadState = LoadState; // Expose enum to template

  ngOnInit(): void {
    this.projectSlug = this.route.snapshot.paramMap.get('slug')!;
    if (this.projectSlug) {
      this.projectStore.getProjectBySlug(this.projectSlug);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const currentProject = this.projectStore.currentProject();
    if (!currentProject) return;

    this.projectStore.uploadCarouselImage(currentProject.id, file);

    input.value = ''; // Reset file input
  }

  onDrop(event: CdkDragDrop<FileEntity[]>) {
    const currentProject = this.projectStore.currentProject();
    if (!currentProject) return;

    const updatedImages = [...this.images()];
    moveItemInArray(updatedImages, event.previousIndex, event.currentIndex);

    const reorderRequest = { items: updatedImages.map((img, index) => ({ fileId: img.id, order: index })) };
    this.projectStore.reorderCarouselImages(currentProject.id, reorderRequest);
  }

  onDelete(fileId: string): void {
    const currentProject = this.projectStore.currentProject();
    if (currentProject && confirm('Are you sure you want to delete this image?')) {
      this.projectStore.removeImageFromCarousel(currentProject.id, fileId);
    }
  }
}

