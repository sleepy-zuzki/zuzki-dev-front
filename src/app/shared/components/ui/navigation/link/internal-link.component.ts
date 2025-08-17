import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-internal-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [ngClass]="classes"
      [href]="href"
      [target]="target"
      [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </a>
  `,
  encapsulation: ViewEncapsulation.None
})
export class InternalLinkComponent {
  @Input() href: string = '';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() ariaLabel: string = '';
  @Input() classes: string = '';
}
