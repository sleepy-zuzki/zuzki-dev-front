import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ActionButtonComponent, LinkButtonComponent } from '@ui';
import { BtnVariant, BtnSize, Breakpoint } from '@core/models/ui.types';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionButtonComponent, LinkButtonComponent],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() variant: BtnVariant = 'primary';
  @Input() routerLink: string | unknown[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() href: string | null = null;

  // Icono y tamaños
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() size: BtnSize = 'md';
  @Input() responsiveSize?: Partial<Record<Breakpoint, BtnSize>>;

  @Output() callback: EventEmitter<unknown> = new EventEmitter<unknown>();

  emitCallback(event: Event): void {
    this.callback.emit(event);
  }
}
