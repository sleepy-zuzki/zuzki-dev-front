import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardFeatureComponent } from '@features/dashboard/dashboard.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [DashboardFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="px-6 pt-6">
      <app-breadcrumb [items]="items" />
    </div>
    <app-dashboard-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Dashboard' }
  ];
}
