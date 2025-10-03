import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardFeatureComponent } from '@features/dashboard/dashboard.feature';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [DashboardFeatureComponent],
  template: `
    <app-dashboard-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
