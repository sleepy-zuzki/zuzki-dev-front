import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private currentTheme = new BehaviorSubject<Theme>('auto');

  public theme$ = this.currentTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.listenToSystemTheme();
    }
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const theme = savedTheme || 'auto';
    this.setTheme(theme);
  }

  private listenToSystemTheme(): void {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(() => {
        if (this.currentTheme.value === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    this.applyTheme(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;

    // Remove existing theme attributes
    root.removeAttribute('class');

    if (theme === 'light') {
      return;
    }

    if (theme === 'auto') {
      // Let CSS handle auto theme based on system preference
      // The CSS media query will apply dark theme if needed
    } else {
      root.setAttribute('class', theme);
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
        next = 'light';
        break;
      default:
        next = 'light';
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
