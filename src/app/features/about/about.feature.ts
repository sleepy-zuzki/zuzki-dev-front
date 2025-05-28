import { Component, effect, HostListener, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProjectCardComponent } from '@components/ui';
import { Overlay } from '@core/models/overlay.model';
import { GithubDataApiService } from '@services/github-data-api.service';
import { OverlayApiService } from '@services/overlay-api.service';

@Component({
  selector: 'app-about-feature',
  imports: [
    NgOptimizedImage,
    ProjectCardComponent
  ],
  templateUrl: './about.feature.html',
  styleUrl: './about.feature.css'
})
export class AboutFeatureComponent {
  projects: Signal<Overlay[]>;
  windowWidth: number = 0;

  constructor (
    private overlayApiService: OverlayApiService,
  ) {
    this.projects = this.overlayApiService.data;
    this.windowWidth = window.innerWidth;

    effect(() => {
      if (this.projects().length === 0) {
        this.overlayApiService.fetchOverlays();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }
}
