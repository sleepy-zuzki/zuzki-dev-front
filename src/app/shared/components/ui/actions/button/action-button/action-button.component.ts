import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { BtnVariant, BtnSize, Breakpoint } from '@core/models/ui.types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass
  ],
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() variant: BtnVariant = 'primary';

  // Icono y posición
  @Input() iconPosition: 'left' | 'right' = 'left';

  // Tamaños
  @Input() size: BtnSize = 'md';
  @Input() responsiveSize?: Partial<Record<Breakpoint, BtnSize>>;

  @Output() callback: EventEmitter<unknown> = new EventEmitter<unknown>();

  get btnClass(): string {
    switch (this.variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'ghost':
        return 'btn-ghost';
      case 'link':
        return 'btn-link';
      case 'contrast':
        return 'btn-contrast';
      case 'primary':
      default:
        return 'btn-primary';
    }
  }

  get sizeClass(): string {
    // No aplicar tamaños sobre el estilo de enlace plano
    if (this.variant === 'link') return '';
    return `btn-${this.size}`;
  }

  get responsiveSizeClasses(): { [klass: string]: boolean } {
    if (this.variant === 'link') return {};
    const r = this.responsiveSize || {};
    return {
      'sm:btn-sm': r.sm === 'sm',
      'sm:btn-md': r.sm === 'md',
      'sm:btn-lg': r.sm === 'lg',
      'sm:btn-xl': r.sm === 'xl',
      'md:btn-sm': r.md === 'sm',
      'md:btn-md': r.md === 'md',
      'md:btn-lg': r.md === 'lg',
      'md:btn-xl': r.md === 'xl',
      'lg:btn-sm': r.lg === 'sm',
      'lg:btn-md': r.lg === 'md',
      'lg:btn-lg': r.lg === 'lg',
      'lg:btn-xl': r.lg === 'xl',
      'xl:btn-sm': r.xl === 'sm',
      'xl:btn-md': r.xl === 'md',
      'xl:btn-lg': r.xl === 'lg',
      'xl:btn-xl': r.xl === 'xl',
    };
  }

  emitCallback(event: Event): void {
    this.callback.emit(event);
  }
}
