import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ProjectStore } from '@infrastructure/adapters/secondary/project/project.store';
import { TechnologyStore } from '@infrastructure/adapters/secondary/technology/technology.store';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppCheckboxComponent } from '@shared/components/checkbox/app-checkbox.component';
import { AppSelectComponent, Option } from '@shared/components/select/app-select.component';
import { toSlug } from '@shared/utils/slug.util';
import { ProjectEditModalComponent } from '@shared/modals/project-edit-modal.component';
import { ProjectEntity } from '@core/domain';
import { UpdateProjectDto } from '@app/application';
import { CreateProjectForm } from '@core/interfaces/forms/project.forms';

@Component({
  standalone: true,
  selector: 'app-projects-admin-feature',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypographyTitleComponent,
    TypographyTextComponent,
    ProjectCardComponent,
    AppInputComponent,
    AppCheckboxComponent,
    AppSelectComponent,
    ProjectEditModalComponent,
  ],
  templateUrl: './projects-admin.feature.html',
  styleUrls: ['./projects-admin.feature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminFeatureComponent {
  private projectStore = inject(ProjectStore);
  private technologyStore = inject(TechnologyStore);
  private fb = inject(NonNullableFormBuilder);

  projects = this.projectStore.projects;
  loading = this.projectStore.loading;
  error = this.projectStore.error;

  technologies = this.technologyStore.technologies;

  isEditModalOpen = signal(false);
  selectedProject = signal<ProjectEntity | null>(null);

  form: FormGroup<CreateProjectForm> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    slug: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), Validators.minLength(2), Validators.maxLength(160)]],
    description: this.fb.control<string | null>(null, [Validators.maxLength(1000)]),
    repoUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    liveUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    category: this.fb.control<string | null>(null),
    year: this.fb.control<number | null>(null, [Validators.min(1900), Validators.max(2100)]),
    isFeatured: this.fb.control<boolean>(false),
    technologyIds: this.fb.control<number[]>([]),
    previewImageId: this.fb.control<number | null>(null, [Validators.min(1)]),
  });

  constructor() {
    this.projectStore.getProjects();
    this.technologyStore.getTechnologies();
    this.setupSlugGeneration();
  }

  getTechnologyOptions(): Option[] {
    return this.technologies().map((technology): Option => ({
      label: technology.name,
      value: technology.slug
    }));
  }

  private setupSlugGeneration(): void {
    this.form.controls.name.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(name => {
        const slug = toSlug(name);
        this.form.controls.slug.setValue(slug, { emitEvent: false });
      });
  }

  reload(): void {
    this.projectStore.getProjects();
    this.technologyStore.getTechnologies();
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();

    this.projectStore.createProject({
      name: raw.name,
      slug: raw.slug,
      description: raw.description ?? null,
      repoUrl: raw.repoUrl ?? null,
      liveUrl: raw.liveUrl ?? null,
      category: raw.category ?? null,
      year: this.parseNumber(raw.year),
      isFeatured: !!raw.isFeatured,
      technologyIds: raw.technologyIds,
      previewImageId: this.parseNumber(raw.previewImageId),
    });
    this.form.reset();
  }

  onEditProject(project: ProjectEntity): void {
    this.selectedProject.set(project);
    this.isEditModalOpen.set(true);
  }

  onDeleteProject(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.projectStore.deleteProject(id);
    }
  }

  onSaveProject(event: { id: number; data: UpdateProjectDto }): void {
    this.projectStore.updateProject(event.id, event.data);
    this.onCloseModal();
  }

  onCloseModal(): void {
    this.isEditModalOpen.set(false);
    this.selectedProject.set(null);
  }

  private parseNumber(value: number | string | null | undefined): number | null {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }
    if (value === null || value === undefined) return null;
    const n = parseInt(String(value).trim(), 10);
    return Number.isFinite(n) ? n : null;
  }
}
