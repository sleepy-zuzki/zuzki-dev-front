import { Component, HostListener, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { featherMail, featherArrowRight, featherZap } from '@ng-icons/feather-icons';
import { bootstrapPalette, bootstrapCodeSlash } from '@ng-icons/bootstrap-icons';
import { ServiceCard, ServiceCardComponent } from '@shared/components/service-card/service-card.component';
import { SectionComponent } from '@components/section/section.component';
import { HomeHeroComponent } from '@features/home/hero/home-hero.component';
import { HomeAboutComponent } from '@features/home/about/home-about.component';
import { HomeServicesComponent } from '@features/home/services/home-services.component';
import { HomeContactComponent } from '@features/home/contact/home-contact.component';
import { HomeProjectsComponent, Project } from '@features/home/projects/home-projects.component';

@Component({
  selector: 'app-home-feature',
  standalone: true,
  imports: [
    FormsModule,
    SectionComponent,
    HomeHeroComponent,
    HomeAboutComponent,
    HomeServicesComponent,
    HomeContactComponent,
    HomeProjectsComponent
  ],
  providers: [provideIcons({featherMail, featherArrowRight, featherZap, bootstrapPalette, bootstrapCodeSlash})],
  templateUrl: './home.feature.html'
})
/**
 * Componente que representa la característica de la página de inicio (Home Page) de la aplicación.
 * Muestra componentes como Proyectos y Redes Sociales.
 */
export class HomeFeatureComponent implements AfterViewInit, OnDestroy {
  windowWidth: number = 0;

  services: ServiceCard[] = [
    {
      icon: 'bootstrapCodeSlash',
      iconColor: 'purple',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas y responsivas con las últimas tecnologías. Desde landing pages hasta aplicaciones complejas.',
      features: [
        'Angular, React, Vue.js',
        'Node.js, Express',
        'Bases de datos relacionales y NoSQL'
      ]
    },
    {
      icon: 'bootstrapPalette',
      iconColor: 'blue',
      title: 'Overlays & Widgets',
      description: 'Overlays personalizados para streamers que potencian la interacción con tu audiencia. Diseños únicos y funcionalidades avanzadas.',
      features: [
        'Overlays animados',
        'Widgets interactivos',
        'Integración con OBS/Streamlabs'
      ]
    },
    {
      icon: 'featherZap',
      iconColor: 'green',
      title: 'Consultoría Técnica',
      description: 'Asesoramiento especializado para optimizar tu setup de streaming y mejorar la experiencia técnica de tu canal.',
      features: [
        'Setup de streaming optimizado',
        'Automatización de workflows',
        'Optimización de rendimiento'
      ]
    }
  ];

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
      "description": "Portafolio de Sleepy Zuzki, desarrollador y VTuber.",
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

  projects: Project[] = [
    {
      id: 1,
      title: 'Stream Overlay Animado',
      description: 'Overlay personalizado con animaciones y eventos en tiempo real.',
      tags: ['HTML/CSS', 'JavaScript', 'OBS'],
      category: 'Overlay'
    },
    {
      id: 2,
      title: 'Dashboard de Analytics',
      description: 'App para visualizar estadísticas de streaming en tiempo real.',
      tags: ['Angular', 'TypeScript', 'Chart.js'],
      category: 'Web App'
    },
    {
      id: 3,
      title: 'Chat Command Bot',
      description: 'Bot para gestión de comandos de chat con moderación automática.',
      tags: ['Node.js', 'WebSocket', 'Twitch API'],
      category: 'Widget'
    },
    {
      id: 4,
      title: 'Landing de Producto',
      description: 'Landing optimizada para SEO y performance.',
      tags: ['Angular', 'TailwindCSS'],
      category: 'Web'
    },
    {
      id: 5,
      title: 'Generador de Clips',
      description: 'Herramienta para crear clips automáticos a partir de streams.',
      tags: ['FFmpeg', 'Cloudflare Workers'],
      category: 'Herramientas'
    },
    {
      id: 6,
      title: 'Widget de Alertas',
      description: 'Widget personalizable para alertas de donaciones y follows.',
      tags: ['Web Components', 'CSS Animations'],
      category: 'Widget'
    }
  ];

  private jsonLdScripts: HTMLScriptElement[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;

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

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
}
