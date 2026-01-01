import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselManagerComponent } from '@features/admin/projects/carousel-manager/carousel-manager.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-project-carousel-admin-page',
  standalone: true,
  imports: [CarouselManagerComponent, BreadcrumbComponent],
  template: `
    <div class="px-6 pt-6">
      <app-breadcrumb [items]="items" />
    </div>
    <app-carousel-manager></app-carousel-manager>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCarouselAdminPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  items: BreadcrumbItem[] = [];

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') || 'Proyecto';
    this.items = [
      { label: 'Home', link: '/', icon: 'featherHome' },
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Proyectos', link: '/dashboard/projects' },
      { label: slug },
      { label: 'Carrusel' }
    ];
  }
}
