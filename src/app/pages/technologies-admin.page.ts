import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TechnologiesAdminFeatureComponent } from '@features/admin/technologies/technologies-admin.feature';

@Component({
  standalone: true,
  imports: [TechnologiesAdminFeatureComponent],
  template: `<app-technologies-admin-feature />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesAdminPage {}
