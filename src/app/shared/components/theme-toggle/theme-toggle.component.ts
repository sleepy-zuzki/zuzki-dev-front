import { Component } from '@angular/core';
import { ThemeService, Theme } from '@shared/services/theme.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSun, featherMoon, featherMonitor } from '@ng-icons/feather-icons';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgIcon, ButtonComponent],
  providers: [provideIcons({ featherSun, featherMoon, featherMonitor })],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  get currentTheme(): Theme {
    return this.themeService.getCurrentTheme();
  }

  get themeIcon(): string {
    const theme = this.currentTheme;
    switch (theme) {
      case 'light':
        return 'featherSun';
      case 'dark':
        return 'featherMoon';
      default:
        return 'featherSun';
    }
  }

  get themeLabel(): string {
    const theme = this.currentTheme;
    switch (theme) {
      case 'light':
        return 'Tema Claro';
      case 'dark':
        return 'Tema Oscuro';
      default:
        return 'Tema Automático';
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
