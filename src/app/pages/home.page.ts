import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, OnDestroy } from '@angular/core';
import { HomeFeatureComponent } from '@features/home/home.feature';
import { SeoService } from '@core/services/seo.service';

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
export class HomePage implements OnInit, OnDestroy {
  private seoService = inject(SeoService);

  schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sleepy Zuzki",
      "url": "https://zuzki.dev",
      "image": "https://cdn.zuzki.dev/public/images/zuzki/bust-yellow-2.webp",
      "description": "Ingeniero de Sistemas, Consultor TI y VTuber creativo.",
      "jobTitle": ["Ingeniero de Software", "VTuber", "Consultor"],
      "knowsAbout": [
        "Angular",
        "Desarrollo Web",
        "Nest Js",
        "VTubing"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Universidad Tecnológica de Panamá",
        "sameAs": "https://utp.ac.pa/"
      },
      "sameAs": [
        "https://x.com/sleepy_zuzki",
        "https://twitter.com/sleepy_zuzki",
        "https://twitch.tv/sleepy_zuzki",
        "https://youtube.com/@sleepy_zuzki",
        "https://github.com/sleepy-zuzki",
        "https://zuzki.dev"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Zuzki Dev",
      "url": "https://zuzki.dev",
      "inLanguage": "es",
      "description": "Portafolio oficial de Sleepy Zuzki. Proyectos de ingeniería, desarrollo Angular y creación de contenido.",
      "author": {
        "@type": "Person",
        "name": "Sleepy Zuzki"
      }
    }
  ];

  ngOnInit(): void {
    // Calcular fecha de modificación (seguro para SSR y Browser gracias a Domino/Angular)
    const lastModified = new Date().toISOString();
    // Nota: document.lastModified en SSR puede no ser preciso, usamos fecha actual o estática
    // Si prefieres la del documento real en navegador:
    // try { lastModified = new Date(this.document.lastModified).toISOString(); } catch(e) {}

    this.schema.forEach(schema => {
      schema['dateModified'] = lastModified;
    });

    this.seoService.setJsonLd(this.schema);
  }

  ngOnDestroy(): void {
    // La limpieza es automática al cambiar de ruta gracias al init() del servicio,
    // pero podemos forzarla aquí si el componente se destruye por otras razones.
    this.seoService.removeJsonLd();
  }
}
