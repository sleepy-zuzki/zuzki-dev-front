# Componentes Compartidos (Shared Components)

Este directorio contiene componentes de interfaz de usuario (UI) reutilizables que se comparten entre diferentes `features` y páginas de la aplicación.

Estos componentes están diseñados para ser genéricos y autocontenidos, asegurando una apariencia y comportamiento consistentes en toda la aplicación. No deben contener ninguna lógica de negocio específica de una `feature`.

## Estructura de un Componente

Cada componente reside en su propio subdirectorio y típicamente consiste en:

-   Un archivo `.ts` para la lógica del componente.
-   Un archivo `.html` para la plantilla.
-   Un archivo `.css` o `.scss` para los estilos.

## Componentes Disponibles

-   **`/button`**: Un componente de botón genérico con diferentes estilos.
-   **`/footer`**: El pie de página principal de la aplicación.
-   **`/forms`**: Controles y elementos de formulario reutilizables.
-   **`/header`**: La cabecera principal y navegación de la aplicación.
-   **`/modal`**: Un componente base para mostrar diálogos modales.
-   **`/project-card`**: Una tarjeta para mostrar resúmenes de proyectos.
-   **`/section`**: Un componente para estructurar el contenido de la página en secciones.
-   **`/service-card`**: Una tarjeta para mostrar los servicios ofrecidos.
-   **`/social-icons`**: Un componente para mostrar enlaces a redes sociales.
-   **`/tags-list`**: Un componente para mostrar una lista de etiquetas o tecnologías.
-   **`/theme-toggle`**: Un botón para cambiar entre los temas claro y oscuro.
-   **`/typography`**: Componentes para un estilo de texto consistente (títulos, párrafos, etc.).
