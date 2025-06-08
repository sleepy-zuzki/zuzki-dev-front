# ZuzkiDevFront

Frontend para el **portafolio de Zuzki**, construido con Angular 20 y renderizado del lado del servidor (SSR). La aplicación se ejecuta en un Worker de Cloudflare y utiliza Tailwind CSS para los estilos. El desarrollo se gestiona con **pnpm**.

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
│   │   ├── core/             # Servicios e interceptores esenciales
│   │   ├── features/         # Módulos de características (home, about, works)
│   │   ├── pages/            # Componentes de página principales
│   │   ├── shared/           # Componentes y utilidades compartidas
│   │   └── worker/           # Código específico para Cloudflare Workers
│   ├── assets/               # Recursos estáticos procesados por Angular
│   ├── environments/         # Configuración de entornos
│   ├── utils/                # Utilidades generales (ej: generador de sitemap)
│   ├── main.ts               # Punto de entrada para navegador
│   ├── main.server.ts        # Punto de entrada para SSR
│   └── server.ts             # Manejador para Cloudflare Workers
├── public/                   # Archivos estáticos servidos directamente
├── tools/                    # Scripts y herramientas de desarrollo
└── ... archivos de configuración (angular.json, tsconfig.json, etc.)
```

Cada carpeta principal contiene su propio archivo README.md con información específica sobre su propósito y estructura.

## Scripts Disponibles

- `pnpm start` – compila y ejecuta con `wrangler pages dev`
- `pnpm run build` – compilación de producción y preparación del worker
- `pnpm run watch` – compila en modo observación
- `pnpm run test` – ejecuta pruebas unitarias
- `pnpm run deploy` – despliega en Cloudflare Pages
- `pnpm run cf-typegen` – actualiza las definiciones de tipos de Cloudflare
- `pnpm run process` – ejecuta scripts de post-procesamiento (copy-files.mjs)

## Lecturas Adicionales

Para opciones y comandos de Angular CLI, consulta la [documentación de Angular CLI](https://angular.dev/tools/cli).
