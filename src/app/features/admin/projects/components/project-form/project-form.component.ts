import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppSelectComponent, Option } from '@shared/components/select/app-select.component';
import { AppCheckboxComponent } from '@shared/components/checkbox/app-checkbox.component';
import { TechnologyStore } from '@infrastructure/adapters/secondary/technology/technology.store';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppInputComponent,
    AppSelectComponent,
    AppCheckboxComponent
],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() technologyOptions: SelectOption[] = [];

  private technologyStore = inject(TechnologyStore);
  technologies = this.technologyStore.technologies;

  constructor() {
    this.technologyStore.getTechnologies();
  }

  get categoryOptions(): Option[] {
    return [
      {label: 'Frontend', value: 'front'},
      {label: 'Backend', value: 'back'},
      {label: 'Mobile', value: 'mobile'},
      {label: 'DevOps', value: 'devops'},
      {label: 'Design', value: 'design'}
    ]
  };

  get getTechnologyOptions(): Option[] {
    return this.technologies().map((technology): Option => ({
      label: technology.name,
      value: technology.slug
    }));
  }
}
