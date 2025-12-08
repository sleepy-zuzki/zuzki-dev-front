import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private currentTheme = new BehaviorSubject<Theme>('light');

  public theme$ = this.currentTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.listenToSystemTheme();
    }
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const theme = savedTheme || 'light';
    this.setTheme(theme);
  }

  private listenToSystemTheme(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      // Modern addEventListener
      mediaQuery.addEventListener('change', () => {
        if (this.currentTheme.value === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  setTheme(theme: Theme): void {
    try {
      this.currentTheme.next(theme);
      this.applyTheme(theme);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.THEME_KEY, theme);
      }
    } catch (e) {
      console.error('No ha sido posible cambiar el tema')
    }
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;

    if (!root) {
      return;
    }

    let isDark = theme === 'dark';

    if (theme === 'auto') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }

  toggleTheme(): void {
    const current = this.currentTheme.value;
    let next: Theme;

    switch (current) {
      case 'light':
        next = 'dark';
        break;
      case 'dark':
        next = 'auto';
        break;
      case 'auto':
        next = 'light';
        break;
      default:
        next = 'auto';
        break;
    }

    this.setTheme(next);
  }

  getSystemTheme(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  getEffectiveTheme(): 'light' | 'dark' {
    const current = this.currentTheme.value;

    if (current === 'auto') {
      return this.getSystemTheme();
    }

    return current as 'light' | 'dark';
  }
}
