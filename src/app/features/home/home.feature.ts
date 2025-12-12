import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { featherMail, featherArrowRight, featherZap } from '@ng-icons/feather-icons';
import { bootstrapPalette, bootstrapCodeSlash } from '@ng-icons/bootstrap-icons';
import { ServiceCard } from '@shared/components/service-card/service-card.component';
import { SectionComponent } from '@components/section/section.component';
import { HomeHeroComponent } from '@features/home/hero/home-hero.component';
import { HomeAboutComponent } from '@features/home/about/home-about.component';
import { HomeServicesComponent } from '@features/home/services/home-services.component';
import { HomeContactComponent } from '@features/home/contact/home-contact.component';
import { HomeProjectsComponent } from '@features/home/projects/home-projects.component';

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
export class HomeFeatureComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private viewportScroller = inject(ViewportScroller);

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

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe((fragment: any) => {
        if (fragment) {
          // Pequeño delay para permitir que @defer (on idle) cargue y expanda el contenido
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(fragment);
          }, 100);
        }
      });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
}
