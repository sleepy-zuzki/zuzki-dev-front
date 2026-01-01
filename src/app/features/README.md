# Features (Capa de Aplicación)

Este directorio contiene las unidades funcionales de la aplicación. Cada feature agrupa la lógica y la UI necesaria para cumplir un objetivo específico de negocio.

## Estructura de una Feature

Cada feature es autónoma y suele organizarse de la siguiente manera:

- **Componentes**: Componentes inteligentes (Smart Components) que se conectan a los Stores del Core y componentes de presentación (Dumb Components).
- **Servicios locales**: (Opcional) Lógica que solo pertenece a esta feature.
- **Modelos/Interfaces locales**: (Opcional) Definiciones de datos específicas.

## Features Actuales

- **admin**: Gestión interna de proyectos y tecnologías.
- **auth**: Lógica de acceso y login.
- **home**: Sección principal del portafolio (Hero, Sobre mí, Contacto).
- **works**: Visualización de proyectos y detalles de trabajos.
- **not-found**: Página de error 404.

## Integración
Las features no suelen importarse entre sí. Si dos features necesitan compartir lógica o UI, esta debe moverse a `core/` o `shared/` respectivamente. Las features son orquestadas por las **Pages**.