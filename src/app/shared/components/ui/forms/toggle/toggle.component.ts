import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @Input() id: string = 'toggle-' + Math.random().toString(36).substring(2, 9);
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggleChange(event: Event): void {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }

  onToggleKeydown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
