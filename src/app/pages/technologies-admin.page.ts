import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TechnologiesAdminFeatureComponent } from '@features/admin/technologies/technologies-admin.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  imports: [TechnologiesAdminFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="px-6 pt-6">
      <app-breadcrumb [items]="items" />
    </div>
    <app-technologies-admin-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesAdminPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Tecnologías' }
  ];
}
