import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogDetailComponent } from '@features/blog/blog-detail/blog-detail.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [BlogDetailComponent, BreadcrumbComponent],
  template: `
    <div class="container mx-auto px-6 pt-24 pb-4">
      <app-breadcrumb [items]="items" />
      <app-blog-detail />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Blog', link: '/blog' },
    { label: 'Artículo' }
  ];
}
