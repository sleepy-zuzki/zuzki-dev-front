/**
 * Interfaz mínima de ruta de Angular utilizada para generar el sitemap
 */
export interface AngularRouteForSitemap {
  path?: string;
  children?: AngularRouteForSitemap[];
}
