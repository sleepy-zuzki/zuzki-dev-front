import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppSelectComponent, Option } from '@shared/components/select/app-select.component';
import { AppCheckboxComponent } from '@shared/components/checkbox/app-checkbox.component';
import { TechnologyStore } from '@core/stores/technology.store';

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
      {label: 'Frontend', value: 'uuid-front-placeholder'},
      {label: 'Backend', value: 'uuid-back-placeholder'},
      {label: 'Mobile', value: 'uuid-mobile-placeholder'},
      {label: 'DevOps', value: 'uuid-devops-placeholder'},
      {label: 'Design', value: 'uuid-design-placeholder'}
    ]
  };

  get getTechnologyOptions(): Option[] {
    return this.technologies().map((technology): Option => ({
      label: technology.name,
      value: technology.id
    }));
  }
}
