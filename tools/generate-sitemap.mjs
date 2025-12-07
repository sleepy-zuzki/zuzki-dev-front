import { writeFileSync } from 'fs';
import { resolve } from 'path';

// CONFIGURACIÓN
const BASE_URL = 'https://zuzki.dev';
const API_URL = 'https://api.zuzki.dev/api/v1'; // Tu URL de API futura
const TARGET_FILE = resolve('src/sitemap.xml');

// 1. Definición de Rutas Estáticas
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.1 }, // Generalmente login tiene baja prioridad
  // { url: '/blog', changefreq: 'weekly', priority: 0.8 }, // Futura página de blog
];

/**
 * Obtiene las rutas dinámicas desde la API.
 * Actualmente configurado con datos simulados (mock) hasta que la API esté lista.
 */
async function fetchDynamicRoutes() {
  const dynamicRoutes = [];

  try {
    console.log('⏳ Consultando contenido dinámico...');

    // ---------------------------------------------------------
    // SECCIÓN PROYECTOS
    // ---------------------------------------------------------
    // TODO: Descomentar cuando la API de proyectos esté lista
    /*
    const projectsRes = await fetch(`${API_URL}/projects`);
    if (!projectsRes.ok) throw new Error(`Error fetching projects: ${projectsRes.statusText}`);
    const projects = await projectsRes.json();
    */

    // MOCK DATA (Simulación)
    const projects = [
      // Ejemplo: { slug: 'mi-super-proyecto', updated_at: '2025-01-15' }
    ];

    projects.forEach(p => {
      dynamicRoutes.push({
        url: `/projects/${p.slug}`,
        lastmod: p.updated_at || new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      });
    });

    // ---------------------------------------------------------
    // SECCIÓN BLOG (FUTURO)
    // ---------------------------------------------------------
    // TODO: Descomentar cuando implementes el blog
    /*
    const postsRes = await fetch(`${API_URL}/posts`);
    const posts = await postsRes.json();

    posts.forEach(post => {
      dynamicRoutes.push({
        url: `/blog/${post.slug}`,
        lastmod: post.updated_at,
        changefreq: 'weekly',
        priority: 0.6
      });
    });
    */

  } catch (error) {
    console.warn('⚠️ Advertencia: No se pudo obtener contenido dinámico o la API no es accesible.');
    console.warn(`   Detalle: ${error.message}`);
    // No lanzamos error para permitir que se genere al menos el sitemap estático
  }

  return dynamicRoutes;
}

/**
 * Genera el XML y lo guarda en disco
 */
async function generate() {
  console.log(`🗺️  Generando Sitemap para ${BASE_URL}...`);

  // const dynamicRoutes = await fetchDynamicRoutes();
  const dynamicRoutes = [];
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const currentDate = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => {
  const lastmod = route.lastmod ? route.lastmod.split('T')[0] : currentDate;
  return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  writeFileSync(TARGET_FILE, xmlContent);
  console.log(`✅ Sitemap generado exitosamente con ${allRoutes.length} rutas.`);
  console.log(`📂 Guardado en: ${TARGET_FILE}`);
}

// Ejecutar
generate();
