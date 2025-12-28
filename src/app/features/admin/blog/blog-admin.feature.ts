import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, UpperCasePipe } from '@angular/common';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { BlogStore } from '@core/stores/blog.store';
import { toSlug } from '@shared/utils/slug.util';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import type { OutputData } from '@editorjs/editorjs';
import { ButtonComponent } from '@components/button/button.component';

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
  private readonly fb = inject(NonNullableFormBuilder);

  readonly entries = this.blogStore.entries;
  readonly loading = this.blogStore.isLoading;
  readonly error = this.blogStore.error;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    description: ['', [Validators.required]],
    content: [null]
  });

  constructor() {
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

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();

    this.blogStore.createEntry({
      title: raw.title,
      slug: raw.slug,
      description: raw.description,
      content: raw.content as OutputData
    });

    this.form.reset();
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
