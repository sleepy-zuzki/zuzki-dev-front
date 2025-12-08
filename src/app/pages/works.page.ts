import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { WorksFeature } from '@features/works/works.feature';
import { ProjectStore } from '@infrastructure/adapters/secondary/project/project.store';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    WorksFeature
  ],
  template: `<app-works-feature />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorksPage implements OnInit, OnDestroy {
  private readonly projectStore = inject(ProjectStore);
  private readonly seoService = inject(SeoService);

  constructor() {
    effect(() => {
      const projects = this.projectStore.projects();
      if (projects.length > 0) {
        const schema = this.buildSchema();
        this.seoService.setJsonLd(schema);
      }
    });
  }

  ngOnInit(): void {
    // Carga inicial del schema (opcional, si el effect tarda o para SSR inmediato)
    const initialSchema = this.buildSchema();
    this.seoService.setJsonLd(initialSchema);
  }

  ngOnDestroy(): void {
    this.seoService.removeJsonLd();
  }

  private buildSchema(): Record<string, unknown> | Record<string, unknown>[] {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Proyectos de Sleepy Zuzki - Soluciones Interactivas',
      'description': 'Explora los proyectos de desarrollo web, overlays y soluciones creativas de Sleepy Zuzki.',
      'url': 'https://zuzki.dev/projects',
      // 'mainEntity': {
      //   '@type': 'ItemList',
      //   'itemListElement': this.projectStore.projects().map((project, index) => ({
      //     '@type': 'ListItem',
      //     'position': index + 1,
      //     'item': {
      //       '@type': 'CreativeWork',
      //       'name': project.name,
      //       'url': `https://zuzki.dev/projects/${project.slug}`,
      //       'description': project.description
      //     }
      //   }))
      // }
    };
  }
}
