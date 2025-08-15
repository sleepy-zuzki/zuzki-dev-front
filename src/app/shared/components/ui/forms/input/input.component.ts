import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
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
  writeValue(value: string | null | undefined): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implementación de ControlValueAccessor
  private onChangeCallback: (value: string) => void = () => {};

  private onTouchedCallback: () => void = () => {};
}
