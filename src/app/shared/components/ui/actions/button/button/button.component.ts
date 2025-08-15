import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LinkButtonComponent } from './link-button.component';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionButtonComponent, LinkButtonComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() routerLink: string | unknown[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() href: string | null = null;
  @Output() callback: EventEmitter<unknown> = new EventEmitter<unknown>();

  emitCallback(event: Event): void {
    this.callback.emit(event);
  }
}
