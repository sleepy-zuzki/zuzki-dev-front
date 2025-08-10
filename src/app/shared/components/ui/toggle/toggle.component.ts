import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toggle-wrapper" [ngClass]="{'disabled': disabled}">
      <input
        type="checkbox"
        class="toggle-input"
        [id]="id"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onToggleChange($event)"/>
      <label [for]="id" class="toggle-label">
        <div class="toggle-track">
          <div class="toggle-thumb"></div>
        </div>
        <span *ngIf="label" class="toggle-text">{{ label }}</span>
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styles: [`
    .toggle-wrapper {
      @apply inline-flex items-center;
    }

    .toggle-input {
      @apply sr-only; /* Oculto visualmente pero accesible */
    }

    .toggle-label {
      @apply relative inline-flex items-center cursor-pointer select-none;
      @apply text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary;
    }

    .toggle-track {
      @apply relative w-11 h-6 bg-sleepy-light-border rounded-full transition-colors duration-200;
      @apply dark:bg-sleepy-dark-border;
    }

    .toggle-thumb {
      @apply absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200;
      @apply dark:bg-sleepy-dark-text-primary;
    }

    /* Estado activo */
    .toggle-input:checked + .toggle-label .toggle-track {
      @apply bg-sleepy-accent;
    }

    .toggle-input:checked + .toggle-label .toggle-thumb {
      @apply transform translate-x-5 bg-white;
      @apply dark:bg-sleepy-dark-text-onAccent;
    }

    /* Estado de focus para accesibilidad */
    .toggle-input:focus + .toggle-label .toggle-track {
      @apply ring-2 ring-offset-2 ring-sleepy-accent ring-opacity-50;
    }

    /* Estado hover */
    .toggle-label:hover .toggle-track {
      @apply bg-opacity-80;
    }

    /* Estado disabled */
    .toggle-wrapper.disabled {
      @apply opacity-60 cursor-not-allowed;
    }

    .toggle-wrapper.disabled .toggle-label {
      @apply cursor-not-allowed;
    }

    .toggle-text {
      @apply ml-3 text-sleepy-light-text-primary;
      @apply dark:text-sleepy-dark-text-primary;
    }

    /* Tamaños responsive */
    @media (min-width: 768px) {
      .toggle-track {
        @apply w-14 h-7;
      }

      .toggle-thumb {
        @apply w-5 h-5;
      }

      .toggle-input:checked + .toggle-label .toggle-thumb {
        @apply translate-x-7;
      }
    }
  `]
})
export class ToggleComponent {
  @Input() id: string = 'toggle-' + Math.random().toString(36).substring(2, 9);
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggleChange(event: Event): void {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
