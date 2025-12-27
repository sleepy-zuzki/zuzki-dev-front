import { Component, computed, input, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';

export type ButtonVariant = 'brand' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ featherLoader })],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('brand');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');
  block = input(false);
  disabled = input(false);
  loading = input(false);

  // Accesibilidad
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);

  private _base = signal('btn');

  classes = computed(() => {
    const cls = [
      this._base(),
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
      this.block() ? 'btn--block' : ''
    ];
    return cls.filter(Boolean).join(' ');
  });
}