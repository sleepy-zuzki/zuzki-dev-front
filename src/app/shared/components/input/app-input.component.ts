import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css'],
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() controlType: 'input' | 'textarea' = 'input';
  @Input() rows: number | null = null;

  value: string | number | null = null;
  isDisabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // --- Implementación de ControlValueAccessor ---

  writeValue(value: string | number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- Funciones internas para propagar cambios ---

  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onInputBlur(): void {
    this.onTouched();
  }

  // --- Getter para el estado de validez ---

  get isInvalid(): boolean {
    return !!(this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched));
  }
}
