import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'works',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: '404',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
    status: 404
  }
];
