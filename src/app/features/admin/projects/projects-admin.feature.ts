import { ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal } from '@angular/core';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ProjectStore } from '@core/stores/project.store';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { toSlug } from '@shared/utils/slug.util';
import { ProjectEditModalComponent } from '@shared/modals/project-edit-modal.component';
import { Project, UpdateProjectDto } from '@core/interfaces';
import { CreateProjectForm } from '@core/interfaces/forms/project.forms';
import type { OutputData } from '@editorjs/editorjs';

import { ProjectFormComponent } from '@features/admin/projects/components/project-form/project-form.component';

@Component({
  standalone: true,
  selector: 'app-projects-admin-feature',
  imports: [
    ReactiveFormsModule,
    TypographyTitleComponent,
    TypographyTextComponent,
    ProjectCardComponent,
    ProjectEditModalComponent,
    ProjectFormComponent
],
  templateUrl: './projects-admin.feature.html',
  styleUrls: ['./projects-admin.feature.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminFeatureComponent {
  private projectStore: ProjectStore = inject(ProjectStore);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  projects: Signal<Project[]> = this.projectStore.projects;
  loading: Signal<boolean> = this.projectStore.loading;
  error: Signal<string | null> = this.projectStore.error;

  isEditModalOpen: WritableSignal<boolean> = signal(false);
  selectedProject: WritableSignal<Project | null> = signal<Project | null>(null);

  form: FormGroup<CreateProjectForm> = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    slug: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), Validators.minLength(2), Validators.maxLength(160)]],
    description: this.fb.control<string | null>(null, [Validators.maxLength(1000)]),
    content: this.fb.control<OutputData | null>(null),
    repoUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    liveUrl: this.fb.control<string | null>(null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]),
    areaId: this.fb.control<string>('', [Validators.required]),
    year: this.fb.control<number | null>(null, [Validators.min(1900), Validators.max(2100)]),
    isFeatured: this.fb.control<boolean>(false),
    technologyIds: this.fb.control<string[]>([]),
  });

  constructor() {
    this.projectStore.getProjects();
    this.setupSlugGeneration();
  }

  private setupSlugGeneration(): void {
    this.form.controls.title.valueChanges
      .subscribe(title => {
        const slug = toSlug(title);
        this.form.controls.slug.setValue(slug, { emitEvent: false });
      });
  }

  reload(): void {
    this.projectStore.getProjects();
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();

    this.projectStore.createProject({
      title: raw.title,
      slug: raw.slug,
      description: raw.description ?? null,
      content: raw.content ?? null,
      repoUrl: raw.repoUrl ?? null,
      liveUrl: raw.liveUrl ?? null,
      areaId: raw.areaId,
      year: this.parseNumber(raw.year),
      isFeatured: !!raw.isFeatured,
      technologyIds: raw.technologyIds,
    });
    this.form.reset();
  }

  onEditProject(project: Project): void {
    this.selectedProject.set(project);
    this.isEditModalOpen.set(true);
  }

  onDeleteProject(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.projectStore.deleteProject(id);
    }
  }

  onSaveProject(event: { id: string; data: UpdateProjectDto }): void {
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
