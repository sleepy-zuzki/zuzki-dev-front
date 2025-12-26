# Core Module

El directorio `core/` es el núcleo de la aplicación. Contiene todos los recursos esenciales que deben estar disponibles globalmente.

## Estructura

```text
core/
├── config/       # Configuraciones globales (API endpoints, etc.)
├── enums/        # Enumeraciones de negocio y UI
├── guards/       # Protectores de rutas funcionales
├── interceptors/ # Interceptores HTTP funcionales
├── interfaces/   # Modelos de datos y contratos
├── services/     # Servicios de comunicación y lógica
├── stores/       # Gestión de estado con NgRx Signals
└── tokens/       # InjectionTokens para DI
```

## Patrones en Core

### Gestión de Estado
Utilizamos `@ngrx/signals` para crear almacenes de estado (Stores) reactivos y ligeros. Ejemplo:
- `ProjectStore`: Gestiona la lista de proyectos y filtros.
- `AuthStore`: Gestiona el estado de la sesión.

### Comunicación API
Los servicios consumen directamente las APIs. El tipo de API (por ejemplo, si va a GitHub o a nuestro Backend) se gestiona mediante el `api-type.token.ts` y los interceptores en `interceptors/`.

### Reactividad
Se prefiere el uso de `signal` y `computed` sobre `BehaviorSubject` o `Observable` cuando el estado es local o de UI.