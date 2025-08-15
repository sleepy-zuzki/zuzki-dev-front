import { Component, Inject, Renderer2, PLATFORM_ID, DOCUMENT, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherMoon, featherSun } from '@ng-icons/feather-icons';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '@services/local-storage.service';
import { ActionButtonComponent } from '@ui';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
  imports: [
    ActionButtonComponent,
    NgIconComponent
  ],
  providers: [provideIcons({ featherMoon, featherSun })]
})
export class ThemeToggleComponent {
  public isDarkMode: boolean = false;
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
