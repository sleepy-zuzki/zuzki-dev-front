import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { routes } from './app/app.routes';
import { generateSitemapXml, getSitemapRoutesFromAngularRoutes } from './utils/sitemap-generator';

const angularApp = new AngularAppEngine();

// Función para generar el sitemap dinámico
function generateSitemap() {
	const baseUrl = 'https://zuzki.dev';

	// Obtener rutas del sitemap desde las rutas de Angular
	const sitemapRoutes = getSitemapRoutesFromAngularRoutes(routes);

	// Genera el XML del sitemap
	return generateSitemapXml(baseUrl, sitemapRoutes);
}

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req) => {
	const url = new URL(req.url);

  debugger;
	// Maneja la solicitud de sitemap.xml
	if (url.pathname === '/sitemap.xml') {
		const sitemap = generateSitemap();
		return new Response(sitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}

	const res = await angularApp.handle(req);

	return res ?? new Response('Page not found.', { status: 404 });
});


export default { fetch: reqHandler };
