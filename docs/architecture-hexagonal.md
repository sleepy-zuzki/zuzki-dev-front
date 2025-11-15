# Arquitectura Hexagonal (Ports & Adapters) en Zuzki Dev Front

Este documento describe cómo aplicamos una aproximación incremental a Arquitectura Hexagonal en la app Angular.

Objetivos:
- Separar el dominio y los casos de uso de los detalles de infraestructura (HTTP, almacenamiento, etc.).
- Facilitar pruebas, cambios de proveedor y consistencia de diseño.
- Mantener cambios mínimos y compatibilidad con el código existente.

Estructura propuesta:
- src/app/domain
  - entities/ -> modelos de dominio (p. ej. Overlay)
  - value-objects/
- src/app/application
  - ports/ -> contratos (interfaces) que la capa app usa
  - use-cases/ -> casos de uso orquestan a través de puertos
- src/app/infrastructure
  - adapters/ -> implementaciones de los puertos (HTTP, etc.)
  - mappers/
- src/app/ui (existente) -> componentes y features Angular

Primer caso de uso ejemplo: listar Overlays para Home.
- Puerto: OverlayRepositoryPort
- Use case: GetActiveOverlaysUseCase
- Adaptador: HttpOverlayRepositoryAdapter (implementa OverlayRepositoryPort usando ApiService y endpoints actuales).

Inyección de dependencias:
- Proveemos un InjectionToken OVERLAY_REPOSITORY_TOKEN y lo resolvemos a HttpOverlayRepositoryAdapter.
- Los use-cases se exponen como servicios inyectables con dependencia en el puerto.

Adopción incremental:
- El feature Home pasa a leer datos desde el use-case, pero mantenemos OverlayApiService para no romper otras áreas. Podemos integrar el use-case dentro de OverlayApiService inicialmente.

Testing:
- Los use-cases se pueden testear mockeando OverlayRepositoryPort sin HTTP.

Cómo extender:
- Crear un puerto por agregado (Creators, Layouts, etc.).
- Crear adaptadores HTTP o locales según necesidad.
