import { Component, Inject, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapTwitch, bootstrapTwitterX } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  providers: [provideIcons({ bootstrapGithub, bootstrapTwitch, bootstrapTwitterX })],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  lastUpdated?: Date;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.lastUpdated = new Date(document.lastModified);
    }
  }
}
