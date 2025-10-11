# Capa de Dominio (Domain Layer)

Este directorio representa la **Capa de Dominio** en una Arquitectura Hexagonal. Es el núcleo de la aplicación y contiene la lógica de negocio, las reglas y las estructuras de datos que son independientes de cualquier framework o tecnología externa.

El principio fundamental es que esta capa no debe tener dependencias de las otras capas de la aplicación (como `infrastructure` o `features`).

## Subdirectorios

-   **`/entities`**: Contiene las entidades de dominio, que son los objetos centrales del modelo de negocio (ej. `User`, `Project`). Tienen una identidad y un ciclo de vida.
-   **`/enums`**: Almacena enumeraciones que son específicas de la lógica de dominio.
-   **`/events`**: Define eventos de dominio que pueden ser despachados cuando algo significativo ocurre en el dominio (ej. `UserRegistered`).
-   **`/interfaces`**: Contiene interfaces que definen contratos para servicios de dominio u otros componentes.
-   **`/repositories`**: Define las interfaces para los repositorios (`puertos`), que abstraen el mecanismo de persistencia de datos. La implementación real (`adaptador`) reside en la capa de `infrastructure`.
-   **`/services`**: Contiene servicios de dominio que orquestan la lógica de negocio utilizando múltiples entidades u objetos de valor.
-   **`/value-objects`**: Contiene objetos de valor, que son objetos inmutables sin una identidad distintiva (ej. `Email`, `Money`).
