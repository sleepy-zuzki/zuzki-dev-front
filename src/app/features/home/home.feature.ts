import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, HostListener, Inject, PLATFORM_ID, Signal } from '@angular/core';
import { ButtonComponent, ProjectCardComponent } from '@components/ui';
import { BadgeComponent } from '@components/ui/badge/badge.component';
import { Overlay } from '@core/models/overlay.model';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { ContactFormComponent } from '@components/forms/contact-form/contact-form.component';
import { DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { OverlayApiService } from '@services/overlay-api.service';
import { StructuredDataComponent } from '@components/structured-data/structured-data.component';

@Component({
  selector: 'app-home-feature',
  standalone: true,
  imports: [
    ButtonComponent,
    BadgeComponent,
    ProjectCardComponent,
    FormsModule,
    ContactFormComponent,
    NgOptimizedImage,
    StructuredDataComponent
  ],
  templateUrl: './home.feature.html',
  styleUrl: './home.feature.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
/**
 * Componente que representa la característica de la página de inicio (Home Page) de la aplicación.
 * Muestra componentes como Proyectos y Redes Sociales.
 */
export class HomeFeatureComponent {
  technologies: string[] = ['Javascript', 'React', 'Node.js', 'Express', 'HTML5', 'CSS3', 'MongoDB', 'PostgreSQL', 'Git', 'AWS', 'Docker', 'Webpack'];
  projects: Signal<Overlay[]>;
  windowWidth: number = 0;

  schema: Record<string, any>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sleepy Zuzki",
      "alternateName": "Zuzki",
      "url": "https://zuzki.dev",
      "dateModified": new Date(document.lastModified).toISOString(),
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
      "dateModified": new Date(document.lastModified).toISOString(),
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
      "dateModified": new Date(document.lastModified).toISOString(),
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
    private overlayApiService: OverlayApiService,
    private http: HttpClient,
    private toast: HotToastService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.projects = this.overlayApiService.data;
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }

    effect(() => {
      if (this.projects().length === 0) {
        this.overlayApiService.fetchOverlays();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  onSubmit(form: FormGroup) {
    const url = "https://hook.us2.make.com/zl0p2vv4190wklivjadktnec326qzqs6";
    const values = form.value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.http.post(url, values, httpOptions)
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.'));
      })
    )
    .subscribe({
      next: data => {
        this.toast.show('Tu mensaje ha sido enviado correctamente. Gracias por contactarnos.');
      },
      error: err => {
        // Aquí puedes manejar el error que fue relanzado o uno nuevo
        console.error('Error en la suscripción:', err);
        // Podrías mostrar un mensaje de error al usuario aquí
      }

    });
  }
}
