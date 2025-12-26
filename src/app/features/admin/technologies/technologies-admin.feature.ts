import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { AppInputComponent } from '@shared/components/input/app-input.component';
import { TechnologyStore } from '@core/stores/technology.store';
import { toSlug } from '@shared/utils/slug.util';
import { CreateTechnologyForm } from '@core/interfaces/forms/technology.forms';

@Component({
  standalone: true,
  selector: 'app-technologies-admin-feature',
  imports: [
    ReactiveFormsModule,
    TypographyTitleComponent,
    TypographyTextComponent,
    AppInputComponent
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

  form: FormGroup<CreateTechnologyForm> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    slug: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    websiteUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i)]),
    areaId: ['', [Validators.required]],
    docsUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i)]),
    iconClass: this.fb.control<string | null>(null),
    primaryColor: this.fb.control<string | null>(null),
  });

  constructor() {
    this.technologyStore.getTechnologies();
    this.setupSlugGeneration();
  }

  private setupSlugGeneration(): void {
    this.form.controls.name.valueChanges.subscribe(name => {
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
      websiteUrl: raw.websiteUrl ?? undefined,
      areaId: raw.areaId,
      docsUrl: raw.docsUrl ?? undefined,
      iconClass: raw.iconClass ?? undefined,
      primaryColor: raw.primaryColor ?? undefined,
    });

    this.form.reset();
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tecnología?')) {
      this.technologyStore.deleteTechnology(id);
    }
  }
}