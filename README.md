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
src/
 ├── app/            # módulos core, features y shared
 ├── environments/   # archivos de entorno
 ├── main.ts         # arranque en navegador
 ├── main.server.ts  # arranque para servidor
 └── server.ts       # manejador para Cloudflare
```

Utilidades como `src/utils/sitemap-generator.ts` ayudan a generar un sitemap dinámico. Las fuentes y archivos estáticos se encuentran en el directorio `public/`.

## Scripts Disponibles

- `pnpm start` – compila y ejecuta con `wrangler pages dev`
- `pnpm run build` – compilación de producción y preparación del worker
- `pnpm run watch` – compila en modo observación
- `pnpm run test` – ejecuta pruebas unitarias
- `pnpm run deploy` – despliega en Cloudflare Pages
- `pnpm run cf-typegen` – actualiza las definiciones de tipos de Cloudflare

## Lecturas Adicionales

Para opciones y comandos de Angular CLI, consulta la [documentación de Angular CLI](https://angular.dev/tools/cli).
