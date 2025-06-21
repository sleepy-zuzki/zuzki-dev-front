import { Component, DOCUMENT, effect, HostListener, Inject, PLATFORM_ID, Signal } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ProjectCardComponent } from '@components/ui';
import { Overlay } from '@core/models/overlay.model';
import { OverlayApiService } from '@services/overlay-api.service';

@Component({
  selector: 'app-about-feature',
  imports: [
    NgOptimizedImage,
    ProjectCardComponent
  ],
  templateUrl: './about.feature.html',
  standalone: true,
  styleUrl: './about.feature.css'
})
export class AboutFeatureComponent {
  projects: Signal<Overlay[]>;
  windowWidth: number = 0;

  constructor (
    private overlayApiService: OverlayApiService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.projects = this.overlayApiService.data;
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }

    effect(() => {
      if (this.projects().length === 0) {
        this.overlayApiService.fetchOverlays();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
}
