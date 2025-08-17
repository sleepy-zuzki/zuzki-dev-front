import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherExternalLink } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-external-link',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ featherExternalLink })],
  template: `
    <a
      [ngClass]="classes"
      [href]="href"
      [target]="target"
      rel="noopener noreferrer"
      [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
      @if (showExternalIcon) {
        <ng-icon
          name="featherExternalLink"
          class="ml-1 text-xs"
          [ngClass]="{'opacity-70': disabled}">
        </ng-icon>
      }
    </a>
  `,
  encapsulation: ViewEncapsulation.None
})
export class ExternalLinkComponent {
  @Input() href: string = '';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_blank';
  @Input() ariaLabel: string = '';
  @Input() disabled: boolean = false;
  @Input() showExternalIcon: boolean = true;
  @Input() classes: string = '';
}
