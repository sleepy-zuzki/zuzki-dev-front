import {
  AfterViewInit,
  ChangeDetectionStrategy, Component, effect, inject, input, InputSignal, OnDestroy, output, OutputEmitterRef,
  Signal, viewChild
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Project, UpdateProjectDto } from '@core/interfaces';
import { toSlug } from '@shared/utils/slug.util';

import { ProjectFormComponent } from '@features/admin/projects/components/project-form/project-form.component';
import { ModalComponent } from '@components/modal/modal.component';
import { UpdateProjectForm } from '@core/interfaces/forms/project.forms';

@Component({
  standalone: true,
  selector: 'app-project-edit-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    ProjectFormComponent
],
  templateUrl: './project-edit-modal.component.html',
  styleUrls: ['./project-edit-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditModalComponent implements OnDestroy, AfterViewInit {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  isOpen: InputSignal<boolean> = input.required<boolean>();
  project: InputSignal<Project | null> = input<Project | null>(null);

  save: OutputEmitterRef<{id: string, data: UpdateProjectDto}> = output<{ id: string; data: UpdateProjectDto }>();
  closeModal: OutputEmitterRef<void> = output<void>();

  modalComponent: Signal<ModalComponent | undefined> = viewChild(ModalComponent);

  form!: FormGroup<UpdateProjectForm>;
  private slugSubscription?: Subscription;

  constructor() {
    effect(() => {
        const modal: ModalComponent | undefined = this.modalComponent();
        if (modal) {
            if (this.isOpen()) {
                modal.openModal();
            } else {
                modal.closeModal();
            }
        }
    });

    effect(() => {
        const p: Project | null = this.project();
        if (p) {
            this.form = this.fb.group({
                title: [p.title, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
                slug: [{ value: p.slug, disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), Validators.minLength(2), Validators.maxLength(160)]],
                description: [p.description ?? null, [Validators.maxLength(1000)]],
                content: [p.content ?? null],
                repoUrl: [p.repoUrl ?? null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]],
                liveUrl: [p.liveUrl ?? null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]],
                areaId: [p.area?.id ?? ''],
                year: [p.year ?? null, [Validators.min(1900), Validators.max(2100)]],
                isFeatured: [p.isFeatured ?? false],
                technologyIds: [p.technologies.map(t => t.id)],
            });
            this.setupSlugGeneration();
        }
    });
  }

  ngAfterViewInit(): void {
    // Logic handled by effect
  }

  ngOnDestroy(): void {
    this.slugSubscription?.unsubscribe();
  }

  private setupSlugGeneration(): void {
    this.slugSubscription?.unsubscribe();
    this.slugSubscription = this.form.controls.title.valueChanges
      .subscribe(title => {
        const slug = toSlug(title);
        this.form.controls.slug.setValue(slug, { emitEvent: false });
      });
  }

  onSave(): void {
    const p = this.project();
    if (!this.form.valid || !p) return;

    const raw = this.form.getRawValue();
    const payload: UpdateProjectDto = {
      title: raw.title,
      slug: raw.slug,
      description: raw.description,
      content: raw.content,
      repoUrl: raw.repoUrl,
      liveUrl: raw.liveUrl,
      areaId: raw.areaId,
      year: this.parseNumber(raw.year),
      isFeatured: raw.isFeatured,
      technologyIds: raw.technologyIds,
    };

    this.save.emit({ id: p.id, data: payload });
  }

  onClose(): void {
    this.closeModal.emit();
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
