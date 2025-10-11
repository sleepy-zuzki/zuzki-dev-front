---
apply: always
---

### Reglas de Desarrollo para el Agente de IA (Gemini)

Este documento define las reglas y convenciones que el agente de IA debe seguir al desarrollar en el proyecto `zuzki-dev-front`.

#### **1. Arquitectura y Estructura de Código**

*   **Arquitectura Principal**: El proyecto sigue una **Arquitectura Hexagonal**. Debes respetar estrictamente la separación de capas:
    *   `core/domain`: Lógica de negocio pura. Sin dependencias de Angular o librerías externas. Contiene entidades, repositorios (interfaces) y servicios de dominio.
    *   `application`: Orquesta los casos de uso. Usa DTOs y puertos para comunicarse.
    *   `infrastructure`: Implementa los puertos del `domain` y `application` (ej. repositorios que llaman a una API HTTP). Aquí es donde se interactúa con el mundo exterior.
    *   `features`: Contiene componentes de Angular que implementan una funcionalidad específica (ej. `home`, `works`).
    *   `pages`: Ensambla los componentes de `features` para crear páginas completas.
    *   `shared`: Componentes, servicios y directivas reutilizables y agnósticos a las `features`.
*   **Componentes de Angular**: Todos los nuevos componentes deben ser **Standalone**. Utiliza la opción `--standalone` al generar componentes con Angular CLI.
*   **Inyección de Dependencias**: Utiliza el constructor para la inyección de dependencias. Para valores de configuración, usa los `InjectionToken` definidos en `src/app/core/tokens`.

#### **2. Lenguaje y Estilo de Código**

*   **Lenguaje**: Todo el código debe ser escrito en **TypeScript**.
*   **Estilo y Formato**: Sigue el estilo de código existente. Utiliza el linter para asegurar la consistencia.
*   **Linting**: Antes de finalizar una tarea, ejecuta `pnpm run lint` y corrige todos los errores.
*   **Nomenclatura**: Sigue las convenciones de Angular para nombrar archivos:
    *   Componentes: `nombre.component.ts`
    *   Servicios: `nombre.service.ts`
    *   Guardianes: `nombre.guard.ts`
    *   Interfaces: `nombre.interface.ts`

#### **3. Gestión de Dependencias y Comandos**

*   **Gestor de Paquetes**: Utiliza siempre **`pnpm`** para instalar o gestionar dependencias.
    *   Añadir dependencia: `pnpm add [paquete]`
    *   Añadir dependencia de desarrollo: `pnpm add -D [paquete]`
*   **Comandos del Proyecto**: Utiliza los scripts definidos en `package.json`:
    *   Desarrollo local (SSR): `pnpm start`
    *   Compilación de producción: `pnpm run build`
    *   Ejecutar pruebas: `pnpm run test`

#### **4. Estilos y UI**

*   **Framework de Estilos**: El proyecto utiliza **Tailwind CSS v4**.
*   **Metodología de Estilos**: **No se deben usar clases de utilidad directamente en los archivos HTML**. En su lugar, el flujo de trabajo es el siguiente:
    1.  Para cada componente, crea su archivo CSS correspondiente (ej. `mi-componente.component.css`).
    2.  En el archivo CSS, define clases semánticas para los elementos del componente.
    3.  Dentro de estas clases, utiliza la directiva `@apply` para componer las utilidades de Tailwind.
*   **Importar Utilidades en CSS**: Para que `@apply` funcione correctamente en la v4, es necesario importar las utilidades de Tailwind al inicio del archivo CSS usando `@reference`. Ejemplo:
    ```css
    /* Al inicio del archivo CSS del componente */
    @reference "tailwindcss/utilities";

    .card-container {
      @apply block p-4 border rounded-lg shadow-sm;
    }

    .card-title {
      @apply text-xl font-bold;
    }
    ```
*   **Variables de Color**: Utiliza las clases de color de Tailwind con `@apply`. Los colores base están definidos en `src/styles/colors.css`.

#### **5. Pruebas (Testing)**

*   **Pruebas Unitarias**: Es obligatorio añadir pruebas unitarias para cualquier nueva funcionalidad o corrección de bug.
*   **Framework de Pruebas**: Las pruebas se escriben con **Karma** y **Jasmine**.
*   **Ubicación de Pruebas**: Los archivos de prueba (`.spec.ts`) deben estar junto a los archivos que prueban.
*   **Ejecución de Pruebas**: Ejecuta `pnpm run test` para verificar que todas las pruebas pasan antes de considerar una tarea completada.

#### **6. Commits y Control de Versiones**

*   **Mensajes de Commit**: Sigue la convención de **Conventional Commits**.
    *   `feat:` para nuevas funcionalidades.
    *   `fix:` para correcciones de bugs.
    *   `docs:` para cambios en la documentación.
    *   `style:` para cambios de formato.
    *   `refactor:` para refactorizaciones de código.
    *   `test:` para añadir o modificar pruebas.
    *   `chore:` para tareas de mantenimiento.
*   **Revisión de Cambios**: Antes de hacer commit, revisa tus cambios con `git diff`.

#### **7. Despliegue**

*   **Plataforma**: La aplicación se despliega en **Cloudflare Pages/Workers**.
*   **Configuración**: La configuración de Cloudflare se encuentra en `wrangler.jsonc`.
*   **Proceso de Despliegue**: El despliegue se realiza con `pnpm run deploy`, que primero construye la aplicación.

#### **8. SEO y Semántica HTML**

*   **HTML Semántico**: Utiliza siempre las etiquetas HTML semánticas apropiadas para estructurar el contenido (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, etc.). Esto es crucial para la accesibilidad y el SEO.
*   **Títulos de Página y Metadatos**: Para cada página, utiliza el `SeoService` inyectable (`@core/services/seo.service.ts`) para establecer un título único y una meta descripción relevante. No dejes los valores por defecto.
*   **Jerarquía de Encabezados**: Asegúrate de que cada página tenga una estructura de encabezados lógica, comenzando con una sola etiqueta `<h1>` para el título principal.
*   **Accesibilidad de Imágenes**: Todas las etiquetas `<img>` deben incluir un atributo `alt` descriptivo, a menos que sean puramente decorativas, en cuyo caso el `alt` debe estar vacío (`alt=""`).
