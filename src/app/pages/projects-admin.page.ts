import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectsAdminFeatureComponent } from '@features/admin/projects/projects-admin.feature';

@Component({
  standalone: true,
  selector: 'app-projects-admin-page',
  imports: [ProjectsAdminFeatureComponent],
  template: `
    <app-projects-admin-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminPage {}
