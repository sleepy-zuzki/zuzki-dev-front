import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogDetailComponent } from '@features/blog/blog-detail/blog-detail.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [BlogDetailComponent, BreadcrumbComponent],
  template: `
    <div class="container max-w-5xl mx-auto pb-4">
      <app-breadcrumb [items]="items" />
      <app-blog-detail [slug]="slug()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailPage {
  // Recibe automáticamente el parámetro ':slug' de la ruta gracias a withComponentInputBinding()
  slug = input<string>('');

  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Blog', link: '/blog' },
    { label: 'Artículo' }
  ];
}
