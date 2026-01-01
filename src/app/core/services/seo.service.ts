import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  robots?: string;
  image?: string; // URL de la imagen para compartir (OG)
  twitterImage?: string; // URL específica para Twitter Card
  imageAlt?: string; // Texto alternativo para la imagen
  type?: string;  // website, article, profile, etc.
  author?: string;
  publishedTime?: string; // ISO String para artículos
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  // URL base desde variables de entorno
  private readonly baseUrl = environment.appUrl;
  private jsonLdScript: HTMLScriptElement | null = null;

  /**
   * Inicializa el servicio para escuchar cambios en la navegación
   * y actualizar los metadatos según las rutas.
   */
  init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Limpiamos datos estructurados anteriores al cambiar de ruta
      this.removeJsonLd();

      let route: ActivatedRoute = this.activatedRoute;


      // Navegamos hasta la ruta activa más profunda (hijo)
      while (route.firstChild) {
        route = route.firstChild;
      }

      // Obtenemos los datos SEO de la ruta actual usando snapshot para evitar suscripciones anidadas
      const data = route.snapshot.data;

      // Combinamos datos por defecto con los de la ruta
      const seoData: SEOData = {
        title: data['title'] as string,
        description: data['description'] as string,
        keywords: data['keywords'] as string[],
        robots: data['robots'] as string,
        image: data['image'] as string,
        twitterImage: data['twitterImage'] as string,
        type: data['type'] as string,
        author: data['author'] as string
      };

      this.update(seoData);
    });
  }

  /**
   * Actualiza manualmente los metadatos SEO.
   * Útil para páginas dinámicas que cargan datos desde una API.
   */
  public update(data: SEOData): void {
    this.updateMetaTags(data);
    this.updateCanonicalUrl();
  }

  /**
   * Actualiza todas las metaetiquetas (Estándar, OG, Twitter)
   */
  private updateMetaTags(data: SEOData): void {
    // 1. Título y Descripción Básicos
    if (data.title) {
      this.title.setTitle(data.title);
    }

    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
    } else {
      this.meta.removeTag("name='description'");
    }

    // 2. Keywords
    if (data.keywords && Array.isArray(data.keywords) && data.keywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords.join(', ') });
    } else {
      this.meta.removeTag("name='keywords'");
    }

    // 3. Robots
    if (data.robots) {
      this.meta.updateTag({ name: 'robots', content: data.robots });
    } else {
      // Valor por defecto seguro si no se especifica
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }

    // 4. Author
    const author = data.author || 'Sleepy Zuzki';
    this.meta.updateTag({ name: 'author', content: author });

    // --- OPEN GRAPH (Facebook, LinkedIn, Discord, etc.) ---

    // OG:URL
    // Se calcula dinámicamente basada en la ruta actual
    const currentUrl = this.getAbsoluteUrl(this.router.url);
    this.meta.updateTag({ property: 'og:url', content: currentUrl });

    // OG:Title
    if (data.title) {
      this.meta.updateTag({ property: 'og:title', content: data.title });
    }

    // OG:Description
    if (data.description) {
      this.meta.updateTag({ property: 'og:description', content: data.description });
    }

    // OG:Type
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });

    // OG:Image
    // Imagen por defecto unificada
    const defaultImage = 'https://zuzki.dev/assets/logo/47_2.png';
    let imageUrl = defaultImage;

    if (data.image) {
       imageUrl = data.image.startsWith('http') ? data.image : this.getAbsoluteUrl(data.image);
    }

    this.meta.updateTag({ property: 'og:image', content: imageUrl });

    if (data.imageAlt) {
      this.meta.updateTag({ property: 'og:image:alt', content: data.imageAlt });
      this.meta.updateTag({ name: 'twitter:image:alt', content: data.imageAlt });
    }

    // Article Specifics
    if (data.type === 'article' && data.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
    }

    // --- TWITTER CARDS ---

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@sleepy_zuzki' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@sleepy_zuzki' });

    if (data.title) {
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }

    if (data.description) {
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }

    // Twitter Image específica o fallback a OG Image
    let twitterImageUrl = imageUrl;
    if (data.twitterImage) {
      twitterImageUrl = data.twitterImage.startsWith('http') ? data.twitterImage : this.getAbsoluteUrl(data.twitterImage);
    }
    this.meta.updateTag({ name: 'twitter:image:src', content: twitterImageUrl });
  }

  /**
   * Gestiona la etiqueta <link rel="canonical">
   */
  private updateCanonicalUrl(): void {
    try {
      const head = this.document.head;
      let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
      const canonicalUrl = this.getAbsoluteUrl(this.router.url.split('?')[0]); // Ignorar query params para canonical

      if (!link) {
        link = this.document.createElement('link') as HTMLLinkElement;
        link.setAttribute('rel', 'canonical');
        head.appendChild(link);
      }

      link.setAttribute('href', canonicalUrl);
    } catch (e) {
      console.warn('No se pudo actualizar el canonical URL', e);
    }
  }

  /**
   * Convierte una ruta relativa en absoluta usando la baseUrl
   */
  private getAbsoluteUrl(path: string): string {
    // Asegurar que no haya doble slash (excepto el del protocolo)
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${this.baseUrl}/${cleanPath}`;
  }

  /**
   * Inyecta o actualiza datos estructurados (JSON-LD) en el head.
   * @param data Objeto o Array de objetos con el esquema Schema.org
   */
  public setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
    if (!this.jsonLdScript) {
      this.jsonLdScript = this.document.createElement('script');
      this.jsonLdScript.type = 'application/ld+json';
      this.document.head.appendChild(this.jsonLdScript);
    }
    this.jsonLdScript.text = JSON.stringify(data);
  }

  /**
   * Elimina el script de datos estructurados del DOM.
   */
  public removeJsonLd(): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
      this.jsonLdScript = null;
    }
  }
}
