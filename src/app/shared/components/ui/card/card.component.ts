import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-container rounded-lg overflow-hidden"
         [ngClass]="{
           'with-border': withBorder,
           'shadow-sleepy': withShadow,
           'hover:shadow-lg hover:translate-y-[-2px]': withHoverEffect,
           'card-accent': variant === 'accent',
           'card-surface': variant === 'surface',
           'card-primary': variant === 'primary'
         }">

      <!-- Imagen superior (si existe) -->
      <div *ngIf="imageUrl" class="card-image">
        <img [src]="imageUrl" [alt]="imageAlt" class="w-full h-auto object-cover" [style.max-height]="imageMaxHeight">
      </div>

      <!-- Cabecera (si existe) -->
      <div *ngIf="hasHeaderContent" class="card-header p-4 border-b border-sleepy-light-border dark:border-sleepy-dark-border">
        <ng-content select="[slot=header]"></ng-content>
      </div>

      <!-- Contenido principal -->
      <div class="card-body p-4">
        <ng-content></ng-content>
      </div>

      <!-- Pie (si existe) -->
      <div *ngIf="hasFooterContent" class="card-footer p-4 border-t border-sleepy-light-border dark:border-sleepy-dark-border">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card-container {
      @apply transition-all duration-200 flex flex-col;
    }

    /* Variantes de estilo */
    .card-primary {
      @apply bg-sleepy-light-bg-primary text-sleepy-light-text-primary;
      @apply dark:bg-sleepy-dark-bg-primary dark:text-sleepy-dark-text-primary;
    }

    .card-surface {
      @apply bg-sleepy-light-bg-surface text-sleepy-light-text-primary;
      @apply dark:bg-sleepy-dark-bg-surface dark:text-sleepy-dark-text-primary;
    }

    .card-accent {
      @apply bg-sleepy-accent text-sleepy-light-text-onAccent;
      @apply dark:text-sleepy-dark-text-onAccent;
    }

    .with-border {
      @apply border border-sleepy-light-border;
      @apply dark:border-sleepy-dark-border;
    }

    .card-header, .card-footer {
      @apply bg-opacity-50;
    }

    .card-image {
      @apply overflow-hidden;
    }

    .card-body {
      @apply flex-grow;
    }
  `]
})
export class CardComponent {
  @Input() withBorder: boolean = false;
  @Input() withShadow: boolean = true;
  @Input() withHoverEffect: boolean = false;
  @Input() variant: 'primary' | 'surface' | 'accent' = 'surface';

  // Propiedades para imagen
  @Input() imageUrl?: string;
  @Input() imageAlt: string = 'Card image';
  @Input() imageMaxHeight: string = '200px';

  // Content checks
  @Input() hasHeaderContent: boolean = false;
  @Input() hasFooterContent: boolean = false;
}
