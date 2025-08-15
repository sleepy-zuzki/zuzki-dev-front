import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
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

  trackByValue(index: number, option: SelectOption): string | number {
    return option.value;
  }
}
