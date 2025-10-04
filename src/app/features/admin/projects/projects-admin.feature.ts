import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ProjectHttpAdapter } from '@infrastructure/adapters/secondary/project/project-http.adapter';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProjectForm } from './projects-admin.types';
import { ProjectCardComponent } from '@components/project-card/project-card.component';

@Component({
  standalone: true,
  selector: 'app-projects-admin-feature',
  imports: [CommonModule, ReactiveFormsModule, TypographyTitleComponent, TypographyTextComponent, ProjectCardComponent],
  templateUrl: './projects-admin.feature.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminFeatureComponent {
  private projectAdapter = inject(ProjectHttpAdapter);
  private fb = inject(NonNullableFormBuilder);

  projects = this.projectAdapter.projects;
  loading = this.projectAdapter.loading;
  error = this.projectAdapter.error;

  form: FormGroup<CreateProjectForm> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), Validators.minLength(2), Validators.maxLength(160)]],
    description: this.fb.control<string | null>(null, [Validators.maxLength(1000)]),
    repoUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    liveUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    category: this.fb.control<string | null>(null),
    year: this.fb.control<number | null>(null, [Validators.min(1900), Validators.max(2100)]),
    isFeatured: this.fb.control<boolean>(false),
    technologyIds: this.fb.control<string>(''),
    previewImageId: this.fb.control<number | null>(null, [Validators.min(1)]),
  });

  constructor() {
    this.projectAdapter.getProjects();
  }

  reload(): void {
    this.projectAdapter.getProjects();
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const technologyIds = this.parseIds(raw.technologyIds);

    this.projectAdapter.createProject({
      name: raw.name,
      slug: raw.slug,
      description: raw.description ?? null,
      repoUrl: raw.repoUrl ?? null,
      liveUrl: raw.liveUrl ?? null,
      category: raw.category ?? null,
      year: this.parseNumber(raw.year),
      isFeatured: !!raw.isFeatured,
      technologyIds,
      previewImageId: this.parseNumber(raw.previewImageId),
    });

    // Opcional: reset parcial conservando algunos valores
    // this.form.reset({ isFeatured: raw.isFeatured }, { emitEvent: false });
  }

  private parseIds(input: string | null | undefined): number[] {
    if (!input) return [];
    return input
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => Number.isFinite(n));
  }

  private parseNumber(value: number | string | null | undefined): number | null {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }
    if (value === null || value === undefined) return null;
    const n = parseInt(String(value).trim(), 10);
    return Number.isFinite(n) ? n : null;
  }

  // Helpers de template
  get f() { return this.form.controls; }
}
