import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselManagerComponent } from '@features/admin/projects/carousel-manager/carousel-manager.component';

@Component({
  selector: 'app-project-carousel-admin-page',
  standalone: true,
  imports: [CarouselManagerComponent],
  template: `
    <app-carousel-manager></app-carousel-manager>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCarouselAdminPageComponent {}
