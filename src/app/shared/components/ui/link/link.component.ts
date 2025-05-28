import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FaIconComponent],
  template: `
    <a
      [ngClass]="linkClasses"
      [href]="!routerLink ? href : null"
      [routerLink]="routerLink"
      [routerLinkActive]="routerLinkActiveClass"
      [target]="target"
      [attr.rel]="isExternal ? 'noopener noreferrer' : null"
      [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
      <fa-icon
        *ngIf="isExternal && showExternalIcon"
        [icon]="externalIcon"
        class="external-icon ml-1 text-xs"
        [ngClass]="{'opacity-70': disabled}"
        aria-hidden="true">
      </fa-icon>
    </a>
  `,
  styles: [`
    :host {
      display: inline;
    }

    .link-internal {
      @apply text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary;
      @apply hover:text-sleepy-accent focus:outline-none;
      @apply transition-colors duration-200;
    }

    .link-external {
      @apply text-sleepy-light-text-secondary dark:text-sleepy-dark-text-secondary;
      @apply hover:text-sleepy-accent hover:underline;
      @apply focus:outline-none focus:ring-2 focus:ring-sleepy-accent;
      @apply transition-colors duration-200;
    }

    .link-nav {
      @apply relative font-medium transition-colors duration-200;
      @apply text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary;
      @apply hover:text-sleepy-accent;
      @apply after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5;
      @apply after:bg-sleepy-accent after:transition-all after:duration-300;

    }

    .link-nav-animation {
      @apply hover:after:w-full;
    }

    .link-nav.active {
      @apply text-sleepy-accent;
      @apply after:w-full;
    }

    .link-disabled {
      @apply opacity-60 cursor-not-allowed pointer-events-none;
    }

    .external-icon {
      @apply inline-block;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {
  @Input() href: string = '';
  @Input() routerLink: string | any[] | null = null;
  @Input() routerLinkActiveClass: string = 'active';
  @Input() variant: 'internal' | 'external' | 'nav' = 'internal';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() showExternalIcon: boolean = true;

  externalIcon: IconDefinition = faArrowUpRightFromSquare;

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
      this.variant === 'external' || this.isExternal ? 'link-external' : '',
      this.variant === 'nav' ? 'link-nav' : '',
      this.variant === 'nav' && this.routerLinkActiveClass ? 'link-nav-animation' : '',
      this.disabled ? 'link-disabled' : '',
      'cursor-pointer',
    ];

    return classes.filter(c => c).join(' ');
  }

  ngOnInit(): void {
    // Si no se ha especificado una variante y es un enlace externo,
    // establecemos la variante como 'external'
    if (this.variant === 'internal' && this.isExternal) {
      this.variant = 'external';
    }

    // Si es un enlace externo, establecemos target="_blank" por defecto
    if (this.isExternal && this.target === '_self') {
      this.target = '_blank';
    }
  }
}
