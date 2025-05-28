import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class HeaderComponent {
  faCode: IconDefinition = faCode;

  // Referencia al elemento dialog
  @ViewChild('mobileMenuDialog') mobileMenuDialog!: ElementRef<HTMLDialogElement>;

  /**
   * Abre el diálogo del menú móvil
   */
  openMobileMenu(): void {
    this.mobileMenuDialog.nativeElement.showModal();
  }

  /**
   * Cierra el diálogo del menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuDialog.nativeElement.close();
  }
}
