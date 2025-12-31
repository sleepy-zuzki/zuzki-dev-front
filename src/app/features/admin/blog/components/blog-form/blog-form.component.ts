import { Component, input, output, InputSignal, viewChild, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherUpload, featherImage, featherX, featherGrid } from '@ng-icons/feather-icons';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import EditorComponent from '@shared/components/editor/editor.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { GallerySelectorModalComponent } from '@shared/modals/gallery-selector-modal.component';
import { FileStore } from '@core/stores/file.store';
import { TypographyTextComponent } from '@shared/components/typography/text.component';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppInputComponent,
    EditorComponent,
    ButtonComponent,
    NgIconComponent,
    GallerySelectorModalComponent,
    TypographyTextComponent
  ],
  providers: [provideIcons({ featherUpload, featherImage, featherX, featherGrid })],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent {
  private readonly fileStore = inject(FileStore);
  
  form: InputSignal<FormGroup> = input.required<FormGroup>();
  isEditing = input(false);
  coverImageSelected = output<File>();
  galleryImageSelected = output<{id: string, url: string}>();

  galleryModal = viewChild.required(GallerySelectorModalComponent);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.coverImageSelected.emit(input.files[0]);
      input.value = ''; // Reset input
    }
  }

  openGalleryModal(): void {
    this.galleryModal().open();
  }

  onGallerySelected(ids: string[]): void {
    if (ids.length > 0) {
      const selectedId = ids[0];
      const file = this.fileStore.files().find(f => f.id === selectedId);
      
      if (file) {
        this.galleryImageSelected.emit({ id: file.id, url: file.url });
      }
    }
  }

  clearCoverImage(): void {
    this.form().patchValue({ coverImage: '' });
  }

  get coverImageUrl(): string | null {
    return this.form().get('coverImage')?.value || null;
  }
}
