import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogAdminFeatureComponent } from '@features/admin/blog/blog-admin.feature';

@Component({
  standalone: true,
  selector: 'app-blog-admin-page',
  imports: [BlogAdminFeatureComponent],
  template: `
    <app-blog-admin-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogAdminPage {}
