import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="select-wrapper">
      <label *ngIf="label" [for]="id" class="select-label">{{ label }}</label>
      <div class="select-container">
        <select
          [id]="id"
          class="select-field"
          [disabled]="disabled"
          [(ngModel)]="selectedValue"
          (ngModelChange)="onSelectChange($event)">
          <option *ngIf="placeholder" value="" disabled selected>{{ placeholder }}</option>
          <option *ngFor="let option of options"
                  [value]="option.value"
                  [disabled]="option.disabled">
            {{ option.label }}
          </option>
          <ng-content></ng-content>
        </select>
        <div class="select-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <small *ngIf="helperText" class="select-helper">{{ helperText }}</small>
    </div>
  `,
  styles: [`
    .select-wrapper {
      @apply flex flex-col gap-1;
    }

    .select-label {
      @apply text-sm text-sleepy-light-text-secondary;
      @apply dark:text-sleepy-dark-text-secondary;
    }

    .select-container {
      @apply relative;
    }

    .select-field {
      @apply appearance-none w-full py-2 px-3 rounded-md;
      @apply bg-white text-sleepy-light-text-primary;
      @apply border border-sleepy-light-border;
      @apply focus:outline-none focus:ring-2 focus:ring-sleepy-accent;
      @apply focus:border-sleepy-accent;
      @apply transition-colors duration-200;

      /* Dark mode */
      @apply dark:bg-sleepy-dark-bg-input dark:text-sleepy-dark-text-primary;
      @apply dark:border-sleepy-dark-border-input;
      @apply dark:focus:ring-sleepy-accent;
    }

    .select-field:disabled {
      @apply bg-sleepy-light-bg-surface text-sleepy-light-text-secondary;
      @apply opacity-70 cursor-not-allowed;
      @apply dark:bg-sleepy-dark-bg-surface dark:text-sleepy-dark-text-secondary;
    }

    .select-arrow {
      @apply absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
      @apply text-sleepy-light-text-secondary;
      @apply dark:text-sleepy-dark-text-secondary;
    }

    .select-helper {
      @apply text-xs text-sleepy-light-text-secondary mt-1;
      @apply dark:text-sleepy-dark-text-secondary;
    }
  `]
})
export class SelectComponent {
  @Input() id: string = 'select-' + Math.random().toString(36).substring(2, 9);
  @Input() options: SelectOption[] = [];
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() helperText: string = '';
  @Input() disabled: boolean = false;
  @Input() selectedValue: string | number = '';

  @Output() selectionChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  onSelectChange(value: string | number): void {
    this.selectionChange.emit(value);
  }
}
