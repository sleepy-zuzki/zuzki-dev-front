import {
  AfterViewInit,
  ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges,
  ViewChild
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
export class ProjectEditModalComponent implements OnChanges, OnDestroy, AfterViewInit {
  private fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) isOpen = false;
  @Input() project: Project | null = null;

  @Output() save = new EventEmitter<{ id: string; data: UpdateProjectDto }>();
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild(ModalComponent) private modalComponent!: ModalComponent;

  form!: FormGroup<UpdateProjectForm>;
  private slugSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modalComponent && changes['isOpen'] && !changes['isOpen'].firstChange) {
      if (this.isOpen) {
        this.modalComponent.openModal();
      } else {
        this.modalComponent.closeModal();
      }
    }

    if (changes['project'] && this.project) {
      this.form = this.fb.group({
        title: [this.project.title, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        slug: [{ value: this.project.slug, disabled: true }, [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), Validators.minLength(2), Validators.maxLength(160)]],
        description: [this.project.description ?? null, [Validators.maxLength(1000)]],
        content: [this.project.content ?? null],
        repoUrl: [this.project.repoUrl ?? null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]],
        liveUrl: [this.project.liveUrl ?? null, [Validators.pattern(/^https?:\/\/.+/i), Validators.maxLength(255)]],
        areaId: [this.project.areaId ?? ''],
        year: [this.project.year ?? null, [Validators.min(1900), Validators.max(2100)]],
        isFeatured: [this.project.isFeatured ?? false],
        technologyIds: [this.project.technologies.map(t => t.id)],
        previewImageId: [this.project.previewImageId ?? null],
      });
      this.setupSlugGeneration();
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.modalComponent.openModal();
    }
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
    if (!this.form.valid || !this.project) return;

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
      previewImageId: raw.previewImageId,
    };

    this.save.emit({ id: this.project.id, data: payload });
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
