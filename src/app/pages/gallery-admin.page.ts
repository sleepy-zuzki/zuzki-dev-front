import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryAdminFeatureComponent } from '@features/admin/gallery/gallery-admin.feature';

@Component({
  standalone: true,
  selector: 'app-gallery-admin-page',
  imports: [GalleryAdminFeatureComponent],
  template: `
    <main class="min-h-screen bg-canvas">
      <app-gallery-admin-feature />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryAdminPage {}
