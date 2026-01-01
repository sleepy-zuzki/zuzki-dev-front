# Zuzki Dev - Application Layer

Este directorio contiene la lógica principal de la aplicación Angular, organizada siguiendo un enfoque **Core-Centric**.

## Estructura Principal

- **core/**: Lógica de negocio, estado (Signals), servicios e infraestructura.
- **features/**: Unidades funcionales y componentes de negocio.
- **pages/**: Orquestadores de rutas y layouts.
- **shared/**: Componentes de UI, modales y utilidades reutilizables.

## Guía de Desarrollo Rápida

1. **Estado**: Define el estado en `core/stores/` usando `signalStore`.
2. **API**: Los servicios en `core/services/` deben manejar la comunicación.
3. **Componentes**: Usa componentes `standalone` y prefiere `inject()`.
4. **Rutas**: Configura las rutas en `app.routes.ts` apuntando a componentes en `pages/`.

Para más detalles sobre la arquitectura, consulta [ARCHITECTURE.md](./ARCHITECTURE.md).