import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
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
