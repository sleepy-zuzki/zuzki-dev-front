import { writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * CONFIGURACIÓN DEL SITEMAP
 * Este script se ejecuta post-build para generar el archivo sitemap.xml
 * basado en rutas estáticas y contenido dinámico de la API.
 */
const BASE_URL = 'https://zuzki.dev';
const API_URL = 'https://api.zuzki.dev'; // Base URL de la API
const TARGET_FILE = resolve('src/sitemap.xml');

// 1. Definición de Rutas Estáticas Principales
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.1 },
];

/**
 * Obtiene las rutas dinámicas desde la API (Proyectos y Blog).
 */
async function fetchDynamicRoutes() {
  const dynamicRoutes = [];

  console.log('⏳ Consultando contenido dinámico desde la API...');

  try {
    // --- 1. PROYECTOS ---
    // console.log('   - Obteniendo proyectos...');
    // const projectsRes = await fetch(`${API_URL}/projects/showcases`);
    // if (projectsRes.ok) {
    //   const projects = await projectsRes.json();
    //   projects.forEach(p => {
    //     dynamicRoutes.push({
    //       url: `/projects/${p.slug}`,
    //       lastmod: p.updatedAt || p.createdAt || new Date().toISOString(),
    //       changefreq: 'monthly',
    //       priority: 0.7
    //     });
    //   });
    //   console.log(`     ✅ ${projects.length} proyectos añadidos.`);
    // } else {
    //   console.warn(`   ⚠️ Error al obtener proyectos: ${projectsRes.statusText}`);
    // }

    // --- 2. BLOG (Solo publicados) ---
    console.log('   - Obteniendo entradas del blog...');
    const blogRes = await fetch(`${API_URL}/blog/entries?status=published`);
    if (blogRes.ok) {
      const posts = await blogRes.json();
      posts.forEach(post => {
        dynamicRoutes.push({
          url: `/blog/${post.slug}`,
          lastmod: post.publishDate || post.updatedAt || post.createdAt,
          changefreq: 'weekly',
          priority: 0.6
        });
      });
      console.log(`     ✅ ${posts.length} artículos del blog añadidos.`);
    } else {
      console.warn(`   ⚠️ Error al obtener blogs: ${blogRes.statusText}`);
    }

  } catch (error) {
    console.warn('\n⚠️ Advertencia: No se pudo completar la consulta dinámica.');
    console.warn(`   Detalle: ${error.message}`);
    console.warn('   Se generará el sitemap solo con rutas estáticas.\n');
  }

  return dynamicRoutes;
}

/**
 * Genera el XML y lo guarda en disco
 */
async function generate() {
  console.log(`\n🗺️  Generando Sitemap para ${BASE_URL}...`);

  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const currentDate = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => {
  const lastmod = route.lastmod ? route.lastmod.split('T')[0] : currentDate;
  return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  try {
    writeFileSync(TARGET_FILE, xmlContent);
    console.log(`\n✅ Sitemap generado exitosamente con ${allRoutes.length} rutas.`);
    console.log(`📂 Guardado en: ${TARGET_FILE}\n`);
  } catch (err) {
    console.error(`❌ Error al escribir el archivo: ${err.message}`);
  }
}

// Ejecutar
generate();
