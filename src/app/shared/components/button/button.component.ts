import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';

export type ButtonVariant = 'brand' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ featherLoader })],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'brand';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() block = false;
  @Input() disabled = false;
  @Input() loading = false;

  // Accesibilidad
  @Input() ariaLabel: string | null = null;
  @Input() title: string | null = null;

  private _base = signal('btn');

  classes = computed(() => {
    const cls = [
      this._base(),
      `btn--${this.variant}`,
      `btn--${this.size}`,
      this.block ? 'btn--block' : ''
    ];
    return cls.filter(Boolean).join(' ');
  });
}
