import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileStore } from '@core/stores/file.store';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherUpload, featherTrash2 } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-gallery-admin-feature',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TypographyTextComponent,
    NgIcon
  ],
  providers: [
    provideIcons({ featherUpload, featherTrash2 })
  ],
  templateUrl: './gallery-admin.feature.html',
  styleUrls: ['./gallery-admin.feature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryAdminFeatureComponent implements OnInit {
  private readonly fileStore = inject(FileStore);

  readonly files = this.fileStore.files;
  readonly loading = this.fileStore.loading;
  readonly error = this.fileStore.error;

  ngOnInit(): void {
    this.fileStore.getFiles();
  }

  reload(): void {
    this.fileStore.getFiles();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Validación básica de tipo (aunque el input ya tiene accept)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato no permitido. Por favor usa JPEG, PNG o WebP.');
      input.value = '';
      return;
    }

    this.fileStore.uploadFile(file);
    input.value = ''; // Reset file input
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      this.fileStore.deleteFile(id);
    }
  }
}
