import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogListComponent } from '@features/blog/blog-list/blog-list.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [BlogListComponent, BreadcrumbComponent],
  template: `
    <div class="container mx-auto px-6 pb-4">
      <app-breadcrumb [items]="items" />
      <app-blog-list />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Blog' }
  ];
}
