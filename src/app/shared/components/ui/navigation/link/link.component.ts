import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavLinkComponent } from './nav-link.component';
import { ExternalLinkComponent } from './external-link.component';
import { InternalLinkComponent } from './internal-link.component';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, NavLinkComponent, ExternalLinkComponent, InternalLinkComponent],
  templateUrl: './link.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {
  @Input() href: string = '';
  @Input() routerLink: string | unknown[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() variant: 'internal' | 'external' | 'nav' = 'internal';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() showExternalIcon: boolean = true;

  get isExternal(): boolean {
    if (this.routerLink) return false;

    if (this.href) {
      return this.href.startsWith('http') ||
        this.href.startsWith('//') ||
        this.target === '_blank';
    }

    return false;
  }

  get linkClasses(): string {
    const classes = [
      this.variant === 'internal' ? 'link-internal' : '',
      (this.variant === 'external' || this.isExternal) ? 'link-external' : '',
      this.variant === 'nav' ? 'link-nav' : '',
      (this.variant === 'nav' && this.routerLinkActiveClass) ? 'link-nav-animation' : '',
      this.disabled ? 'link-disabled' : '',
      'cursor-pointer',
    ];

    return classes.filter(c => c).join(' ');
  }

  ngOnInit(): void {
    if (this.variant === 'internal' && this.isExternal) {
      this.variant = 'external';
    }

    if (this.isExternal && this.target === '_self') {
      this.target = '_blank';
    }
  }
}
