import { Component, Inject, Renderer2, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { ButtonComponent } from '@components/ui/button/button.component';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <app-button variant="secondary" ariaLabel="Alternar tema" (callback)="toggleDarkMode()">
      @if (faMoon && faSun) {
        <fa-icon [icon]="faMoon" class="dark:hidden"></fa-icon>
        <fa-icon [icon]="faSun" class="hidden dark:block"></fa-icon>
      }
    </app-button>
  `,
  imports: [
    ButtonComponent,
    FaIconComponent
  ],
  styles: []
})
export class ThemeToggleComponent {
  protected readonly faMoon?: IconDefinition;
  protected readonly faSun?: IconDefinition;
  private isDarkMode: boolean = false;
  themeBroadcastChannel: BroadcastChannel | null = null;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkInitialMode();

    if (isPlatformBrowser(this.platformId)) {
      this.themeBroadcastChannel = new BroadcastChannel('theme');
      this.faMoon = faMoon;
      this.faSun = faSun;

      this.themeBroadcastChannel.onmessage = (event: MessageEvent<boolean> ) => {
        if (typeof event.data === 'boolean') {
          this.setDarkMode(event.data);
        } else {
          this.checkInitialMode();
        }
      }
    }
  }

  checkInitialMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkModeStored: string | null = this.localStorageService.getItem('darkMode');
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkModeStored === 'true' || (!isDarkModeStored && prefersDarkScheme)) {
        this.setDarkMode(true);
      } else {
        this.setDarkMode(false);
      }
    }
  }

  toggleDarkMode(): void {
    const newDarkMode: boolean  = !this.isDarkMode;
    this.setDarkMode(newDarkMode);
    this.themeBroadcastChannel?.postMessage(newDarkMode);
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
