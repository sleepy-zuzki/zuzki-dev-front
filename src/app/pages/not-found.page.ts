import { Component } from '@angular/core';
import { NotFoundFeatureComponent } from '@features/not-found/not-found.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [NotFoundFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="container mx-auto px-6 pb-4">
      <app-breadcrumb [items]="items" />
    </div>
    <app-not-found-feature />
  `
})
export class NotFoundPage {
  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: '404' }
  ];
}
