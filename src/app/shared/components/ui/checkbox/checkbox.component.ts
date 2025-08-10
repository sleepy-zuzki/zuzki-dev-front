import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        class="checkbox-input"
        [id]="id"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onCheckboxChange($event)" />
      <label [for]="id" class="checkbox-label" [ngClass]="{'disabled': disabled}">
        <span class="checkbox-custom"></span>
        <span *ngIf="label" class="checkbox-text">{{ label }}</span>
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styles: [`
    .checkbox-wrapper {
      @apply flex items-start;
    }

    .checkbox-input {
      @apply sr-only; /* Oculto visualmente pero accesible */
    }

    .checkbox-label {
      @apply flex items-center cursor-pointer select-none;
      @apply text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary;
    }

    .checkbox-label.disabled {
      @apply cursor-not-allowed opacity-70;
      @apply text-sleepy-light-text-secondary dark:text-sleepy-dark-text-secondary;
    }

    .checkbox-custom {
      @apply relative flex-shrink-0 w-5 h-5 mr-2 rounded border-2;
      @apply border-sleepy-light-border bg-white;
      @apply dark:border-sleepy-dark-border-input dark:bg-sleepy-dark-bg-input;
      @apply transition-colors duration-200;
    }

    /* Estilo cuando está marcado */
    .checkbox-input:checked + .checkbox-label .checkbox-custom {
      @apply bg-sleepy-accent border-sleepy-accent;
    }

    /* Marca (checkmark) */
    .checkbox-input:checked + .checkbox-label .checkbox-custom::after {
      content: '';
      @apply absolute block left-1/2 top-1/2 w-2.5 h-1.5;
      @apply border-b-2 border-l-2;
      @apply border-sleepy-light-text-onAccent dark:border-sleepy-dark-text-onAccent;
      transform: translate(-50%, -65%) rotate(-45deg);
    }

    /* Focus state - para accesibilidad */
    .checkbox-input:focus + .checkbox-label .checkbox-custom {
      @apply ring-2 ring-sleepy-accent ring-opacity-50;
    }

    /* Hover state */
    .checkbox-label:hover .checkbox-custom {
      @apply border-sleepy-accent-hover;
    }

    /* Disabled state */
    .checkbox-input:disabled + .checkbox-label .checkbox-custom {
      @apply opacity-50;
      @apply bg-sleepy-light-bg-surface dark:bg-sleepy-dark-bg-surface;
      @apply border-sleepy-light-border dark:border-sleepy-dark-border;
    }

    .checkbox-text {
      @apply text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary;
    }
  `]
})
export class CheckboxComponent {
  @Input() id: string = 'checkbox-' + Math.random().toString(36).substring(2, 9);
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onCheckboxChange(event: Event): void {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
