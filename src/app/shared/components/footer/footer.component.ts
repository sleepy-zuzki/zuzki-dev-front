import { Component, Inject, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { faGithub, faTwitch, faXTwitter } from '@awesome.me/kit-6cba0026a3/icons/classic/brands';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  lastUpdated?: Date;

  readonly faGithub: IconDefinition = faGithub;
  readonly faXTwitter: IconDefinition = faXTwitter;
  readonly faTwitch: IconDefinition = faTwitch;

  protected readonly externalIcon = faArrowUpRightFromSquare;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar FontAwesome sólo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.lastUpdated = new Date(document.lastModified);
    }
  }
}
