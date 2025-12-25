import { Component, inject, Input, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppSelectComponent, Option } from '@shared/components/select/app-select.component';
import { AppCheckboxComponent } from '@shared/components/checkbox/app-checkbox.component';
import { TechnologyStore } from '@core/stores/technology.store';
import { StackService } from '@core/services/stack.service';

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
  private stackService = inject(StackService);

  technologies = this.technologyStore.technologies;
  stacks = this.stackService.stacks;

  constructor() {
    this.technologyStore.getTechnologies();
    this.stackService.getStacks();
  }

  areaOptions = computed((): Option[] => {
    return this.stacks().map(stack => ({
      label: stack.name,
      value: stack.id
    }));
  });

  get getTechnologyOptions(): Option[] {
    return this.technologies().map((technology): Option => ({
      label: technology.name,
      value: technology.id
    }));
  }
}
