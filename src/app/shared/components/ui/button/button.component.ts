import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (routerLink) {
      <a
        [routerLink]="routerLink"
        [routerLinkActive]="routerLinkActiveClass"
        [class]="variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
        [attr.href]="href || null"
        [attr.aria-label]="ariaLabel">
        <ng-content select="button-text">
          <ng-content/>
        </ng-content>
      </a>
    } @else {
      <button
        [class]="variant === 'primary' ? 'btn-primary' : 'btn-secondary'"
        [disabled]="disabled"
        [type]="type"
        [attr.aria-label]="ariaLabel"
        (click)="emitCallback($event)">
        <ng-content select="button-text">
          <ng-content/>
        </ng-content>
      </button>
    }
  `,
  styles: [`
    .btn-primary {
      @apply rounded-md font-medium transition-colors px-4 py-2;
      @apply select-none w-full inline-block text-center cursor-pointer;
      /* Colores primarios */
      @apply bg-sleepy-accent text-sleepy-light-text-primary;
      @apply hover:bg-sleepy-accent-hover disabled:opacity-70;
    }

    .btn-secondary {
      @apply rounded-md font-medium transition-colors px-4 py-2;
      @apply select-none w-full inline-block text-center cursor-pointer;
      /* Colores secundarios */
      @apply bg-sleepy-light-bg-surface text-sleepy-light-text-secondary;
      @apply hover:bg-sleepy-light-border disabled:opacity-70;
      @apply dark:bg-sleepy-dark-bg-surface dark:text-sleepy-dark-text-secondary;
      @apply dark:hover:bg-sleepy-dark-border;
    }

    a.btn-primary, a.btn-secondary {
      text-decoration: none;
      @apply text-sleepy-light-text-primary;
    }
  `],
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
