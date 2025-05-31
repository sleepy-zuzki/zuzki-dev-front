import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'about',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works/:id',
    renderMode: RenderMode.Client,
  },
  { path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  }
];
