import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LinkButtonComponent } from '@ui';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LinkButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
      <div class="w-full max-w-2xl mx-auto text-center space-y-8">
        <h1 class="text-8xl md:text-9xl font-bold text-sleepy-accent">404</h1>
        <h2 class="text-2xl md:text-3xl font-semibold text-sleepy-light-text-primary dark:text-sleepy-dark-text-primary">
          ¡Página no encontrada!
        </h2>
        <p class="text-lg text-sleepy-light-text-secondary dark:text-sleepy-dark-text-secondary mt-4">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div class="mt-12 max-w-xs mx-auto">
          <app-link-button routerLink="/" ariaLabel="Volver a la página de inicio">
            <button-text>
              Volver al inicio
            </button-text>
          </app-link-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      @apply bg-sleepy-light-bg-primary dark:bg-sleepy-dark-bg-primary;
      min-height: 100vh;
    }
  `]
})
export class NotFoundPage {
  constructor() {}
}
