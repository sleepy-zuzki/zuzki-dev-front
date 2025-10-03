import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ProjectHttpAdapter } from '@infrastructure/adapters/secondary/project/project-http.adapter';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectStatus } from '@core/domain';
import { CreateProjectForm } from './projects-admin.types';

@Component({
  standalone: true,
  selector: 'app-projects-admin-feature',
  imports: [CommonModule, ReactiveFormsModule, TypographyTitleComponent, TypographyTextComponent],
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
    name: ['', [Validators.required, Validators.minLength(3)]],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    longDescription: [''],
    demoUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    repositoryUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    status: this.fb.control<ProjectStatus | ''>('', [Validators.required]),
    technologyIds: [''],
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

    if (!raw.status) {
      // This case should be handled by the form validation,
      // but this check provides an extra layer of safety.
      return;
    }

    this.projectAdapter.createProject({
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      longDescription: raw.longDescription || '',
      demoUrl: raw.demoUrl || '',
      repositoryUrl: raw.repositoryUrl || '',
      status: raw.status,
      technologyIds,
    });

    // Opcional: reset parcial sin perder status habitual
    // this.form.reset({ status: raw.status }, { emitEvent: false });
  }

  private parseIds(input: string | null | undefined): number[] {
    if (!input) return [];
    return input
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => Number.isFinite(n));
  }

  // Helpers de template
  get f() { return this.form.controls; }
}
