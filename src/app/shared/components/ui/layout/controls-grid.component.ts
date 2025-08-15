import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../actions';
import { InputComponent, CheckboxComponent, SelectComponent, ToggleComponent } from '../forms';
import { CardComponent } from '../display';

@Component({
  selector: 'app-controls-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
    CardComponent,
    ToggleComponent
  ],
  template: `
    <div class="grid grid-cols-2 gap-4 w-full">
      <app-button>Click aquí</app-button>
      <app-button [disabled]="true" >Click aquí</app-button>

      <app-input placeholder="Escribe aquí"></app-input>

      <app-checkbox></app-checkbox>

      <app-select>
        <option>Opción 1</option>
      </app-select>

      <app-card [withBorder]="true" [withHoverEffect]="true">
        Contenido destacado
      </app-card>

      <app-toggle id="toggle1" [checked]="false">
        Hungry?
      </app-toggle>

      <app-toggle id="toggle2" [checked]="true">
        Hungry?
      </app-toggle>
    </div>
  `,
  styles: []
})
export class ControlsGridComponent {}
