import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectsAdminFeatureComponent } from '@features/admin/projects/projects-admin.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-projects-admin-page',
  imports: [ProjectsAdminFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="px-6 pt-6">
      <app-breadcrumb [items]="items" />
    </div>
    <app-projects-admin-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Proyectos' }
  ];
}
