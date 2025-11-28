import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-checkbox.component.html',
  styleUrls: ['./app-checkbox.component.css'],
})
export class AppCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';

  value = false;
  isDisabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // --- Implementación de ControlValueAccessor ---

  writeValue(value: boolean): void {
    this.value = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- Funciones internas para propagar cambios ---

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.onChange(this.value);
    this.onTouched();
  }
}
