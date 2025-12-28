# Zuzki Dev - Frontend

Frontend para el **portafolio de Zuzki**, construido con **Angular 21** y renderizado del lado del servidor (SSR). La aplicación está optimizada para ejecutarse en **Cloudflare Pages** (Workers) y utiliza una arquitectura **Core-Centric** moderna con **Signals** y **Zoneless**.

## 🚀 Tecnologías

- **Framework:** [Angular 21.x](https://angular.dev) (Standalone, Signals, Zoneless).
- **Estilos:** [Tailwind CSS 4.x](https://tailwindcss.com) (PostCSS).
- **Runtime:** [Cloudflare Pages](https://pages.cloudflare.com) + [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
- **Estado:** Native Angular Signals (Store Pattern).
- **Iconos:** [@ng-icons](https://ng-icons.github.io/ng-icons/).
- **Package Manager:** `pnpm`.

## Licensing
- **Code:** MIT License – see [LICENSE](./LICENSE) (with [translations](./LICENSE.TRANSLATIONS.md))
- **Art & Media:** CC BY-NC 4.0 – see [LICENSE-ASSETS.md](./LICENSE-ASSETS.md)

## Requisitos

- Node.js **20.x** (consulta `package.json`)
- npm **9.x**
- [pnpm](https://pnpm.io) – gestor de paquetes utilizado

## Instalación

Instala las dependencias con pnpm:

```bash
pnpm install
```

Configura el endpoint de la API en `src/environments/environment.ts` (y `.development.ts`) antes de ejecutar la aplicación.

## Características Principales

### Pública
- **Inicio**: Presentación general y servicios.
- **Proyectos (Works)**: Portafolio interactivo con detalles técnicos.
- **Blog**: Artículos y tutoriales sobre desarrollo web y tecnología.

### Panel de Administración (Dashboard)
Acceso protegido para gestión de contenido:
- **Proyectos**: CRUD completo de proyectos con gestión de carrusel de imágenes.
- **Tecnologías**: Administración del stack tecnológico.
- **Galería**: Gestión centralizada de archivos multimedia.
- **Blog**: Creación y edición de artículos con soporte para slugs SEO personalizados.

## Desarrollo

Para levantar el servidor de desarrollo de Angular:

```bash
ng serve
```

Visita `http://localhost:4200/` para ver la app. El servidor se recarga al modificar archivos.

Para desarrollo SSR en Cloudflare Workers ejecuta:

```bash
pnpm start
```

Este comando compila la aplicación y la sirve con `wrangler pages dev`.

## Compilación para Producción

Genera una compilación de producción y prepara el Worker de Cloudflare:

```bash
pnpm run build
```

Los archivos procesados se colocan en `dist/cloudflare`.

## Observación de Builds

Ejecuta el compilador en modo observación:

```bash
pnpm run watch
```

## Pruebas

Las pruebas unitarias se ejecutan con Karma:

```bash
pnpm run test
```

## Despliegue

Despliega el worker en Cloudflare Pages:

```bash
pnpm run deploy
```

## Estructura del Proyecto

```
/
├── src/
│   ├── app/                  # Código principal de la aplicación
│   │   ├── core/             # Servicios, Stores (Signals) e Interceptores
│   │   ├── features/         # Módulos funcionales (admin, blog, home, works)
│   │   ├── pages/            # Componentes de página (Rutas)
│   │   ├── shared/           # Componentes UI reutilizables y utilidades
│   │   └── worker/           # Código específico para Cloudflare Workers
│   ├── assets/               # Recursos estáticos
│   ├── environments/         # Configuración de entornos
│   ├── utils/                # Utilidades generales
│   ├── main.ts               # Punto de entrada para navegador
│   ├── main.server.ts        # Punto de entrada para SSR
│   └── server.ts             # Manejador para Cloudflare Workers
├── public/                   # Archivos estáticos servidos directamente
├── tools/                    # Scripts de build y generación de sitemap
└── ... archivos de configuración
```

## Scripts Disponibles

- `pnpm start` – compila y ejecuta con `wrangler pages dev`
- `pnpm run build` – compilación de producción y preparación del worker
- `pnpm run watch` – compila en modo observación
- `pnpm run test` – ejecuta pruebas unitarias
- `pnpm run deploy` – despliega en Cloudflare Pages
- `pnpm run cf-typegen` – actualiza las definiciones de tipos de Cloudflare
- `pnpm run process` – ejecuta scripts de post-procesamiento (copy-files, sitemap)

## Lecturas Adicionales

Para opciones y comandos de Angular CLI, consulta la [documentación de Angular CLI](https://angular.dev/tools/cli).