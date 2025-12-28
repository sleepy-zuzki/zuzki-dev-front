import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, UpperCasePipe } from '@angular/common';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { BlogStore } from '@core/stores/blog.store';
import { FileService } from '@core/services/file.service';
import { toSlug } from '@shared/utils/slug.util';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import type { OutputData } from '@editorjs/editorjs';
import { ButtonComponent } from '@components/button/button.component';
import { BlogStatus } from '@core/enums';

@Component({
  selector: 'app-blog-admin-feature',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TypographyTitleComponent,
    TypographyTextComponent,
    BlogFormComponent,
    DatePipe,
    ButtonComponent,
    UpperCasePipe
  ],
  templateUrl: './blog-admin.feature.html',
  styleUrls: ['./blog-admin.feature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogAdminFeatureComponent {
  private readonly blogStore = inject(BlogStore);
  private readonly fileService = inject(FileService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly BlogStatus = BlogStatus;
  readonly entries = this.blogStore.entries;
  readonly loading = this.blogStore.isLoading;
  readonly error = this.blogStore.error;
  readonly uploading = signal(false);
  private coverImageId = signal<string | null>(null);
  readonly selectedEntryId = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    description: ['', [Validators.required]],
    coverImage: [''],
    content: [null]
  });

  constructor() {
    this.blogStore.setFilterStatus(undefined);
    this.blogStore.refreshEntries();
    this.setupSlugGeneration();
  }

  private setupSlugGeneration(): void {
    this.form.controls['title'].valueChanges.subscribe(title => {
      const slugControl = this.form.controls['slug'];
      if (slugControl.pristine) {
        const slug = toSlug(title);
        slugControl.setValue(slug, { emitEvent: false });
      }
    });
  }

  reload(): void {
    this.blogStore.refreshEntries();
  }

  onUploadCover(file: File): void {
    this.uploading.set(true);
    this.fileService.uploadFile(file).subscribe({
      next: (fileEntity) => {
        this.form.patchValue({ coverImage: fileEntity.url });
        this.coverImageId.set(fileEntity.id);
        this.uploading.set(false);
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploading.set(false);
        // TODO: Show toast error
      }
    });
  }

  onSelectFromGallery(selection: {id: string, url: string}): void {
    this.form.patchValue({ coverImage: selection.url });
    this.coverImageId.set(selection.id);
  }

  onEdit(entry: any): void {
    this.selectedEntryId.set(entry.id);
    
    // Find the cover image to populate the preview
    const cover = entry.images?.find((img: any) => img.type === 'cover');
    
    this.form.patchValue({
      title: entry.title,
      slug: entry.slug,
      description: entry.description,
      content: entry.content,
      coverImage: cover?.url || ''
    });

    if (cover) {
      this.coverImageId.set(cover.id);
    }

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onCancel(): void {
    this.form.reset();
    this.selectedEntryId.set(null);
    this.coverImageId.set(null);
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const entryId = this.selectedEntryId();

    if (entryId) {
      // Update Mode
      this.blogStore.updateEntry(entryId, {
        title: raw.title,
        slug: raw.slug,
        description: raw.description,
        content: raw.content as OutputData
      }, this.coverImageId() || undefined).then(() => {
        this.onCancel();
      });
    } else {
      // Create Mode
      this.blogStore.createEntry({
        title: raw.title,
        slug: raw.slug,
        description: raw.description,
        content: raw.content as OutputData
      }, this.coverImageId() || undefined);
      this.onCancel();
    }
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      this.blogStore.deleteEntry(id);
    }
  }

  onPublish(id: string): void {
    if (confirm('¿Estás seguro de que quieres publicar esta entrada?')) {
      this.blogStore.publishEntry(id);
    }
  }
}
