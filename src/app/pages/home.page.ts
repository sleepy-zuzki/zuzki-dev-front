import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HomeFeatureComponent } from '@features/home/home.feature';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeFeatureComponent
  ],
  template: `<app-home-feature/>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
/**
 * Componente que representa la página de inicio (Home Page) de la aplicación.
 * Actúa como contenedor de layout para la característica de Home y gestiona el SEO (JSON-LD).
 */
export class HomePage implements AfterViewInit, OnDestroy {
  schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sleepy Zuzki",
      "alternateName": "Zuzki",
      "url": "https://zuzki.dev",
      "dateModified": '',
      "sameAs": [
        "https://x.com/sleepy_zuzki",
        "https://twitter.com/sleepy_zuzki",
        "https://twitch.tv/sleepy_zuzki",
        "https://youtube.com/@sleepy_zuzki",
        "https://github.com/sleepy-zuzki"
      ],
      "image": "https://cdn.zuzki.dev/large_zuzki_christmas_c4ace767dc.jpg",
      "description": "VTuber and creative technologist.",
      "jobTitle": "Streamer / Developer"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Zuzki Dev",
      "url": "https://zuzki.dev",
      "inLanguage": "es",
      "description": "Portafolio de Sleepy Zuzki, Desarrollador y VTuber.",
      "dateModified": '',
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://zuzki.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sleepy Zuzki",
      "url": "https://zuzki.dev",
      "dateModified": '',
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.zuzki.dev/large_zuzki_christmas_c4ace767dc.jpg"
      },
      "sameAs": [
        "https://x.com/sleepy_zuzki",
        "https://twitch.tv/sleepy_zuzki",
        "https://youtube.com/@sleepy_zuzki"
      ]
    }
  ];

  private jsonLdScripts: HTMLScriptElement[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.schema.forEach(schema => {
        schema['dateModified'] = new Date(document.lastModified).toISOString();
      })
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.injectJsonLd();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.jsonLdScripts.forEach(s => s.remove());
      this.jsonLdScripts = [];
    }
  }

  private injectJsonLd(): void {
    // Limpia anteriores por seguridad
    this.jsonLdScripts.forEach(s => s.remove());
    this.jsonLdScripts = [];

    this.jsonLdScripts = this.schema.map((node) => {
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(node);
      this.renderer.appendChild(this.document.head, script);
      return script;
    });
  }
}
