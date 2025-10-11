# Guardianes (Guards)

Este directorio contiene los guardianes de rutas de Angular (`Route Guards`).

Los guardianes son servicios que implementan una lógica para decidir si un usuario puede activar o desactivar una ruta específica. Se utilizan comúnmente para proteger rutas que requieren autenticación o permisos específicos.

## Tipos de Guardianes

-   **`CanActivate`**: Controla si se puede navegar a una ruta.
-   **`CanActivateChild`**: Controla si se puede navegar a las rutas hijas de una ruta.
-   **`CanDeactivate`**: Controla si se puede abandonar una ruta.
-   **`CanMatch`**: Controla si una ruta puede ser utilizada para una navegación.
