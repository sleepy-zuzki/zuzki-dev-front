/**
 * Interfaz para las rutas del sitemap
 */
export interface SitemapRoute {
  path: string;
  priority: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}
