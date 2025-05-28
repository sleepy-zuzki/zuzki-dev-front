import { Component, effect, Signal } from '@angular/core';
import { ProjectCardComponent } from '@components/ui';
import { Overlay } from '@core/models/overlay.model';
import { RouterLink } from '@angular/router';
import { OverlayApiService } from '@services/overlay-api.service';

@Component({
  selector: 'app-works-feature',
  imports: [
    ProjectCardComponent,
    RouterLink
  ],
  templateUrl: './works.feature.html',
  styleUrl: './works.feature.css'
})
export class WorksFeature {
  projects: Signal<Overlay[]>;

  constructor(private overlayApiService: OverlayApiService) {
    this.projects = this.overlayApiService.data;

    effect(() => {
      if (this.projects().length === 0) {
        this.overlayApiService.fetchOverlays();
      }
    });
  }
}
