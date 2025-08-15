import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SEOData {
  description?: string;
  keywords?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Inicializa el servicio para escuchar cambios en la navegación
   * y actualizar los metadatos según las rutas
   */
  init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route: ActivatedRoute = this.activatedRoute;

      // Navegamos hasta la ruta activa más profunda (hijo)
      while (route.firstChild) {
        route = route.firstChild;
      }

      // Obtenemos los datos SEO de la ruta actual
      route.data.subscribe(data => {
        if (data) {
          this.updateMetaTags(data);
        }
      });
    });
  }

  /**
   * Actualiza los meta tags de descripción y palabras clave
   * @param data Datos SEO de la ruta actual
   */
  private updateMetaTags(data: SEOData & { title?: string }): void {
    // Actualizar título si está disponible
    if (data.title) {
      this.title.setTitle(data.title);
    }

    // Actualizar meta description
    if (data.description) {
      this.meta.updateTag({
        name: 'description',
        content: data.description
      });
    } else {
      this.meta.removeTag("name='description'");
    }

    // Actualizar meta keywords
    if (data.keywords && Array.isArray(data.keywords) && data.keywords.length > 0) {
      this.meta.updateTag({
        name: 'keywords',
        content: data.keywords.join(', ')
      });
    } else {
      this.meta.removeTag("name='keywords'");
    }
  }
}
