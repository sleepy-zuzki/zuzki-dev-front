/**
 * Utility for generating dynamic sitemap.xml
 */
import { SitemapRoute } from '../app/core/interfaces/sitemap.interface';

/**
 * Genera el contenido XML del sitemap basado en las rutas proporcionadas
 * @param baseUrl URL base del sitio web
 * @param routes Array de rutas para incluir en el sitemap
 * @returns Contenido XML del sitemap
 */
export function generateSitemapXml(baseUrl: string, routes: SitemapRoute[]): string {
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod || currentDate}</lastmod>\n`;

    if (route.changefreq) {
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }

    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

/**
 * Obtiene las rutas del sitemap desde la configuración de rutas de Angular
 * @returns Array de rutas para el sitemap
 * @param angularRoutes
 */
export function getSitemapRoutesFromAngularRoutes(angularRoutes: any[]): SitemapRoute[] {
  const sitemapRoutes: SitemapRoute[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Ruta principal
  sitemapRoutes.push({
    path: '/',
    priority: '1.0',
    lastmod: currentDate,
    changefreq: 'weekly'
  });

  // Procesar rutas de Angular
  angularRoutes.forEach(route => {
    if (route.path && !route.path.includes(':')) { // Excluir rutas con parámetros
      sitemapRoutes.push({
        path: `/${route.path}`,
        priority: route.path === '' ? '1.0' : '0.8',
        lastmod: currentDate,
        changefreq: 'weekly'
      });
    }
  });

  return sitemapRoutes;
}
