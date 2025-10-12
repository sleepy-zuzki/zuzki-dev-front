import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppSelectComponent, SelectOption } from '@shared/components/select/app-select.component';
import { TechnologyStore } from '@infrastructure/adapters/secondary/technology/technology.store';
import { CreateTechnologyForm } from './technologies-admin.types';
import { toSlug } from '@shared/utils/slug.util';
import { TechnologyCategory } from '@core/domain';

@Component({
  standalone: true,
  selector: 'app-technologies-admin-feature',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypographyTitleComponent,
    TypographyTextComponent,
    AppInputComponent,
    AppSelectComponent,
  ],
  templateUrl: './technologies-admin.feature.html',
  styleUrls: ['./technologies-admin.feature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesAdminFeatureComponent {
  private technologyStore = inject(TechnologyStore);
  private fb = inject(NonNullableFormBuilder);

  technologies = this.technologyStore.technologies;
  loading = this.technologyStore.loading;
  error = this.technologyStore.error;

  // Prepara las opciones para el selector de categorías
  categoryOptions: SelectOption[] = Object.values(TechnologyCategory).map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  form: FormGroup<CreateTechnologyForm> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    slug: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    description: this.fb.control<string | null>(null, [Validators.maxLength(1000)]),
    category: this.fb.control<TechnologyCategory | null>(null, [Validators.required]),
    iconUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i)]),
    websiteUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i)]),
    color: this.fb.control<string | null>(null, [Validators.pattern(/^#[0-9a-fA-F]{6}$/)]),
  });

  constructor() {
    this.technologyStore.getTechnologies();
    this.setupSlugGeneration();
  }

  private setupSlugGeneration(): void {
    this.form.controls.name.valueChanges.pipe(takeUntilDestroyed()).subscribe(name => {
      const slug = toSlug(name);
      this.form.controls.slug.setValue(slug, { emitEvent: false });
    });
  }

  reload(): void {
    this.technologyStore.getTechnologies();
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();

    this.technologyStore.createTechnology({
      name: raw.name,
      slug: raw.slug,
      description: raw.description ?? undefined,
      category: raw.category as TechnologyCategory, // El validador asegura que no sea null
      iconUrl: raw.iconUrl ?? undefined,
      websiteUrl: raw.websiteUrl ?? undefined,
      color: raw.color ?? undefined,
    });

    this.form.reset();
  }
}
