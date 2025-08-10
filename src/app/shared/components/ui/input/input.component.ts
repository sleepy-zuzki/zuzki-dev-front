import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="input-wrapper">
      @if (label && name) {
        <label for="name" class="input-label">{{ label }}</label>
      }
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [name]="name"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        class="input-field" />
    </div>
  `,
  styles: [`
    .input-wrapper {
      @apply flex flex-col gap-1;
    }

    .input-label {
      @apply text-sm text-sleepy-light-text-secondary;
      @apply dark:text-sleepy-dark-text-secondary;
    }

    .input-field {
      @apply bg-white text-sleepy-light-text-primary;
      @apply border border-sleepy-light-border rounded-md px-3;
      @apply py-2 focus:outline-none focus:ring-1;
      @apply focus:ring-sleepy-accent;
      @apply transition-colors duration-200;

      /* Dark mode */
      @apply dark:bg-sleepy-dark-bg-input dark:text-sleepy-dark-text-primary;
      @apply dark:border-sleepy-dark-border-input;
      @apply dark:focus:ring-sleepy-accent;
    }

    .input-field:disabled {
      @apply bg-sleepy-light-bg-surface text-sleepy-light-text-secondary;
      @apply opacity-70 cursor-not-allowed;
      @apply dark:bg-sleepy-dark-bg-surface dark:text-sleepy-dark-text-secondary;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() value: string = '';
  @Input() name: string = '';
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
