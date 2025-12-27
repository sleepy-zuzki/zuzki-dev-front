import { Component, inject, input, computed, InputSignal, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import { AppSelectComponent, Option } from '@shared/components/select/app-select.component';
import { AppCheckboxComponent } from '@shared/components/checkbox/app-checkbox.component';
import EditorComponent from '@shared/components/editor/editor.component';
import { TechnologyStore } from '@core/stores/technology.store';
import { StackService } from '@core/services/stack.service';
import { Stack, Technology } from '@core/interfaces';

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
    AppCheckboxComponent,
    EditorComponent
],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent {
  form: InputSignal<FormGroup> = input.required<FormGroup>();
  technologyOptions: InputSignal<SelectOption[]> = input<SelectOption[]>([]);

  private technologyStore: TechnologyStore = inject(TechnologyStore);
  private stackService: StackService = inject(StackService);

  technologies: Signal<Technology[]> = this.technologyStore.technologies;
  stacks: Signal<Stack[]> = this.stackService.stacks;

  constructor() {
    this.technologyStore.getTechnologies();
    this.stackService.getStacks();
  }

  areaOptions: Signal<Option[]> = computed((): Option[] => {
    return this.stacks().map(stack => ({
      label: stack.name,
      value: stack.id
    }));
  });

  technologyOptionsList: Signal<Option[]> = computed((): Option[] => {
    return this.technologies().map((technology): Option => ({
      label: technology.name,
      value: technology.id
    }));
  });
}
