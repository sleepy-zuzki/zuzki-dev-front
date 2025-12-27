import { Component, Input, Self, Optional, HostListener, ElementRef, computed, Signal, WritableSignal, signal, input } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

import { bootstrapChevronExpand } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface Option {
  [key: string]: string | number;
}


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon],
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css'],
  providers: [provideIcons({bootstrapChevronExpand})]
})
export class AppSelectComponent implements ControlValueAccessor {
  label = input('');
  id = input('');
  placeholder = input('Selecciona una opción');
  multiple = input(false);
  options = input<Option[]>([]);
  optionValue = input('id');
  optionLabel = input('name');

  isOpen = false;
  selectedValue: WritableSignal<string | number | (string | number)[] | null> = signal(null);
  isDisabled = false;

  processedOptions: Signal<SelectOption[]> = computed(() => {
    return this.options().map((option: Option): SelectOption => ({
      value: option[this.optionValue()],
      label: option[this.optionLabel()].toString(),
    }));
  });

  displayValue: Signal<string> = computed(() => {
    const currentSelection = this.selectedValue();
    if (this.multiple()) {
      if (!Array.isArray(currentSelection) || currentSelection.length === 0) {
        return this.placeholder();
      }
      if (currentSelection.length === 1) {
        const selectedOption = this.processedOptions().find((opt: SelectOption) => this.isOptionSelected(opt));
        return selectedOption?.label ?? this.placeholder();
      }
      return `${currentSelection.length} seleccionados`;
    } else {
      const selectedOption = this.processedOptions().find((opt: SelectOption) => this.isOptionSelected(opt));
      return selectedOption?.label ?? this.placeholder();
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

  onChange: (value: string | number | (string | number)[] | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number | (string | number)[] | null): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (value: string | number | (string | number)[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
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
    if (this.multiple()) {
      this.toggleMultiSelect(option.value);
    } else {
      this.selectedValue.set(option.value);
      this.isOpen = false;
    }
    this.onChange(this.selectedValue());
    this.onTouched();
  }

  private toggleMultiSelect(value: string | number): void {
    const currentSelection = Array.isArray(this.selectedValue()) ? [...this.selectedValue() as (string | number)[]] : [];
    const index = currentSelection.indexOf(value);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(value);
    }
    this.selectedValue.set(currentSelection);
  }

  isOptionSelected(option: SelectOption): boolean {
    const currentSelection = this.selectedValue();
    if (this.multiple() && Array.isArray(currentSelection)) {
      return currentSelection.includes(option.value);
    }
    return currentSelection === option.value;
  }

  showPlaceholder(): boolean {
    const currentSelection = this.selectedValue();
    return !this.multiple() && (!currentSelection || currentSelection === '');
  }
}