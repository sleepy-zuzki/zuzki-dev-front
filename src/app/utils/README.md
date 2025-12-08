# Utilidades

Este directorio contiene funciones y clases de utilidad que se pueden usar en toda la aplicación.

## Contenido

Actualmente, este directorio incluye:

- **Generador de sitemap**: Utilidades para generar el sitemap.xml dinámicamente basado en las rutas de Angular

## Componentes disponibles

### Generador de Sitemap

`sitemap-generator.ts` proporciona dos funciones principales:

- `generateSitemapXml`: Genera el XML del sitemap a partir de un array de rutas y una URL base
- `getSitemapRoutesFromAngularRoutes`: Convierte las rutas de Angular en el formato requerido para el sitemap

## Uso

Importa las utilidades necesarias directamente:

```typescript
import { generateSitemapXml, getSitemapRoutesFromAngularRoutes } from '@utils/sitemap-generator';

// Obtener rutas del sitemap desde las rutas de Angular
const routes = getSitemapRoutesFromAngularRoutes(angularRoutes);

// Generar el XML del sitemap
const xml = generateSitemapXml('https://zuzki.dev', routes);
```

Todas las utilidades están diseñadas para ser independientes y reutilizables en diferentes partes de la aplicación.
