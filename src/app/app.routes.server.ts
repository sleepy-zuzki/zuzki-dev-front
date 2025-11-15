import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';

// Automatically generate server routes from the main application routes
// to keep them synchronized. This avoids duplication and ensures that
// all defined paths are configured for server-side rendering.
const generatedRoutes: ServerRoute[] = routes
  // Filter out redirects or routes without a path, like the wildcard redirect.
  .filter(route => route.path !== undefined && route.path !== '**')
  .map(route => ({
    path: route.path!,
    renderMode: RenderMode.Server,
  }));

export const serverRoutes: ServerRoute[] = [
  ...generatedRoutes,
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];

