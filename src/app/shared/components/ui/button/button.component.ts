import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LinkButtonComponent } from './link-button.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ActionButtonComponent, LinkButtonComponent],
  template: `
    @if (routerLink || href) {
      <app-link-button
        [routerLink]="routerLink"
        [routerLinkActiveClass]="routerLinkActiveClass"
        [variant]="variant"
        [href]="href"
        [ariaLabel]="ariaLabel">
        <ng-content select="button-text">
          <ng-content/>
        </ng-content>
      </app-link-button>
    } @else {
      <app-action-button
        [variant]="variant"
        [disabled]="disabled"
        [type]="type"
        [ariaLabel]="ariaLabel"
        (click)="emitCallback($event)">
        <ng-content select="button-text">
          <ng-content/>
        </ng-content>
      </app-action-button>
    }
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() routerLink: string | any[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() href: string | null = null;
  @Output() callback: EventEmitter<unknown> = new EventEmitter<unknown>();

  emitCallback(event: Event): void {
    this.callback.emit(event);
  }
}
