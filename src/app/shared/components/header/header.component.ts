import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCode } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';
import { ButtonComponent } from '@components/ui/button/button.component';
import { ThemeToggleComponent } from '@components/ui/button/theme-toggle.component';
import { LinkComponent } from '@components/ui/link/link.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FaIconComponent,
    ButtonComponent,
    ThemeToggleComponent,
    LinkComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  faCode?: IconDefinition;

  // Referencia al elemento dialog
  @ViewChild('mobileMenuDialog') mobileMenuDialog?: ElementRef<HTMLDialogElement>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar FontAwesome sólo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.faCode = faCode;
    }
  }

  /**
   * Lifecycle hook que se ejecuta cuando la vista ha sido inicializada
   */
  ngAfterViewInit(): void {
    // No es necesario hacer nada aquí, solo asegurarse de que se inicialice correctamente
  }

  /**
   * Abre el diálogo del menú móvil
   */
  openMobileMenu(): void {
    if (isPlatformBrowser(this.platformId) && this.mobileMenuDialog) {
      this.mobileMenuDialog.nativeElement.showModal();
    }
  }

  /**
   * Cierra el diálogo del menú móvil
   */
  closeMobileMenu(): void {
    if (isPlatformBrowser(this.platformId) && this.mobileMenuDialog) {
      this.mobileMenuDialog.nativeElement.close();
    }
  }
}
