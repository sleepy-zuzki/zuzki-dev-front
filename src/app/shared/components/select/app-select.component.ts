import { Component, Input, Self, Optional, HostListener, ElementRef, computed, Signal } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css'],
})
export class AppSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = 'Selecciona una opción';
  @Input() multiple = false;
  @Input() options: any[] = [];
  @Input() optionValue = 'id';
  @Input() optionLabel = 'name';

  isOpen = false;
  selectedValue: any | any[] | null = null;
  isDisabled = false;

  processedOptions: Signal<SelectOption[]> = computed(() => {
    return this.options.map(option => ({
      value: option[this.optionValue],
      label: option[this.optionLabel],
    }));
  });

  displayValue: Signal<string> = computed(() => {
    if (this.multiple) {
      if (!Array.isArray(this.selectedValue) || this.selectedValue.length === 0) {
        return this.placeholder;
      }
      if (this.selectedValue.length === 1) {
        const selectedOption = this.processedOptions().find(opt => this.isOptionSelected(opt));
        return selectedOption?.label ?? this.placeholder;
      }
      return `${this.selectedValue.length} seleccionados`;
    } else {
      const selectedOption = this.processedOptions().find(opt => this.isOptionSelected(opt));
      return selectedOption?.label ?? this.placeholder;
    }
  });

  constructor(private elementRef: ElementRef, @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: SelectOption): void {
    if (this.multiple) {
      this.toggleMultiSelect(option.value);
    } else {
      this.selectedValue = option.value;
      this.isOpen = false;
    }
    this.onChange(this.selectedValue);
    this.onTouched();
  }

  private toggleMultiSelect(value: any): void {
    const currentSelection = Array.isArray(this.selectedValue) ? [...this.selectedValue] : [];
    const index = currentSelection.indexOf(value);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(value);
    }
    this.selectedValue = currentSelection;
  }

  isOptionSelected(option: SelectOption): boolean {
    if (this.multiple && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(option.value);
    }
    return this.selectedValue === option.value;
  }
}
