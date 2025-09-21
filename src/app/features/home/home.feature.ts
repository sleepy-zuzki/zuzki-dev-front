import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMail, featherArrowRight, featherZap } from '@ng-icons/feather-icons';
import { bootstrapPalette, bootstrapCodeSlash } from '@ng-icons/bootstrap-icons';
import { ServiceCardComponent, ServiceCard } from '@shared/components/service-card/service-card.component';
import { SectionComponent } from '@shared/components/section/section.component';

@Component({
  selector: 'app-home-feature',
  standalone: true,
  imports: [
    FormsModule,
    NgIcon,
    ServiceCardComponent,
    SectionComponent
  ],
  providers: [provideIcons({featherMail, featherArrowRight, featherZap, bootstrapPalette, bootstrapCodeSlash})],
  templateUrl: './home.feature.html'
})
/**
 * Componente que representa la característica de la página de inicio (Home Page) de la aplicación.
 * Muestra componentes como Proyectos y Redes Sociales.
 */
export class HomeFeatureComponent {
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;

      this.schema.forEach(schema => {
        schema['dateModified'] = new Date(document.lastModified).toISOString();
      })
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
}
