import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherMenu, featherX } from '@ng-icons/feather-icons';
import { ThemeToggleComponent } from '@shared/components/theme-toggle/theme-toggle.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent, ThemeToggleComponent, ButtonComponent],
  providers: [provideIcons({ featherMenu, featherX })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateToContact(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/#contacto';
    }
  }

  isActiveRoute(route: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return this.router.url === route;
  }
}
