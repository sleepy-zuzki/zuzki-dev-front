import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <a
      [ngClass]="classes"
      [routerLink]="routerLink"
      [routerLinkActive]="routerLinkActiveClass"
      [target]="target"
      [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['./link.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavLinkComponent {
  @Input() routerLink: string | unknown[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() ariaLabel: string = '';
  @Input() classes: string = '';
}
