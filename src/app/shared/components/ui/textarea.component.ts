import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="textarea-wrapper">
      <label *ngIf="label" class="textarea-label">{{ label }}</label>
      <textarea
        [placeholder]="placeholder"
        [disabled]="disabled"
        [rows]="rows"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        class="textarea-field"></textarea>
      <small *ngIf="helperText" class="textarea-helper">{{ helperText }}</small>
    </div>
  `,
  styles: [`
    .textarea-wrapper {
      @apply flex flex-col gap-1;
    }

    .textarea-label {
      @apply text-sm text-sleepy-light-text-secondary;
      @apply dark:text-sleepy-dark-text-secondary;
    }

    .textarea-field {
      @apply bg-white text-sleepy-light-text-primary;
      @apply border border-sleepy-light-border rounded-md px-3;
      @apply py-2 focus:outline-none focus:ring-1;
      @apply focus:ring-sleepy-accent;
      @apply transition-colors duration-200;
      @apply resize-y w-full min-h-[80px];

      /* Dark mode */
      @apply dark:bg-sleepy-dark-bg-input dark:text-sleepy-dark-text-primary;
      @apply dark:border-sleepy-dark-border-input;
      @apply dark:focus:ring-sleepy-accent;
    }

    .textarea-field:disabled {
      @apply bg-sleepy-light-bg-surface text-sleepy-light-text-secondary;
      @apply opacity-70 cursor-not-allowed;
      @apply dark:bg-sleepy-dark-bg-surface dark:text-sleepy-dark-text-secondary;
    }

    .textarea-helper {
      @apply text-xs text-sleepy-light-text-secondary mt-1;
      @apply dark:text-sleepy-dark-text-secondary;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() helperText: string = '';
  @Input() disabled: boolean = false;
  @Input() rows: number = 4;
  @Input() value: string = '';
  @Input() onChange: (value: string) => void = () => {};
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.onChange(value);
    this.valueChange.emit(value);
    this.onChangeCallback(value);
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implementación de ControlValueAccessor
  private onChangeCallback: (_: any) => void = () => {};

  private onTouchedCallback: () => void = () => {};
}
