import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, Inject, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { WorksFeature } from '@features/works/works.feature';
import { ProjectStore } from '@infrastructure/adapters/secondary/project/project.store';
import { CollectionPage, WithContext } from 'schema-dts';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    WorksFeature
  ],
  template: `<app-works-feature />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorksPage implements OnDestroy {
  private readonly projectStore = inject(ProjectStore);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private jsonLdScript: HTMLScriptElement | null = null;

  constructor() {
    // Effect that reacts to project changes to update the JSON-LD schema
    effect(() => {
      const projects = this.projectStore.projects();
      if (projects.length > 0 && isPlatformBrowser(this.platformId)) {
        const schema = this.buildSchema(projects);
        this.injectJsonLd(schema);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
    }
  }

  private buildSchema(projects: any[]): WithContext<CollectionPage> {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Proyectos de Sleepy Zuzki - Soluciones Interactivas',
      'description': 'Explora los proyectos de desarrollo web, overlays y soluciones creativas de Sleepy Zuzki.',
      'url': 'https://zuzki.dev/projects',
      // 'mainEntity': {
      //   '@type': 'ItemList',
      //   'itemListElement': projects.map((project, index) => ({
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

  private injectJsonLd(schema: WithContext<CollectionPage>): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
    }
    this.jsonLdScript = this.renderer.createElement('script') as HTMLScriptElement;
    this.jsonLdScript.type = 'application/ld+json';
    this.jsonLdScript.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, this.jsonLdScript);
  }
}
