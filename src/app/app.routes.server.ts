import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: '/sitemap.xml',
    renderMode: RenderMode.Prerender,
    fallback: async () => {
      const urls = [
        { loc: 'https://zuzki.dev/',       lastmod: '2025-05-31', priority: 1.0 },
        { loc: 'https://zuzki.dev/projects', lastmod: '2025-05-30', priority: 0.8 }
      ];

      const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${
        urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')
      }\n</urlset>`;

      return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
    }
  },
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
