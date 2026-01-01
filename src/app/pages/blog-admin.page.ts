import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogAdminFeatureComponent } from '@features/admin/blog/blog-admin.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-blog-admin-page',
  imports: [BlogAdminFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="px-6 pt-6">
      <app-breadcrumb [items]="items" />
    </div>
    <app-blog-admin-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogAdminPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Blog' }
  ];
}
