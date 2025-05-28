import { Component, Inject, Renderer2, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '@components/ui/button/button.component';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <app-button variant="secondary" ariaLabel="Alternar tema" (callback)="toggleDarkMode()">
      <fa-icon [icon]="faMoon" class="dark:hidden"></fa-icon>
      <fa-icon [icon]="faSun" class="hidden dark:block"></fa-icon>
    </app-button>
  `,
  imports: [
    ButtonComponent,
    FaIconComponent
  ],
  styles: []
})
export class ThemeToggleComponent {
  protected readonly faMoon: IconDefinition = faMoon;
  protected readonly faSun: IconDefinition = faSun;
  private isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkInitialMode();
  }

  checkInitialMode(): void {
    const isDarkModeStored: string | null = this.localStorageService.getItem('darkMode');

    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkModeStored === 'true' || (!isDarkModeStored && prefersDarkScheme)) {
        this.setDarkMode(true);
      } else {
        this.setDarkMode(false);
      }
    }
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.isDarkMode);
  }

  setDarkMode(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    if (isDarkMode) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }

    // Guardar preferencia solo si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.setItem('darkMode', isDarkMode ? 'true' : 'false');
    }
  }
}
