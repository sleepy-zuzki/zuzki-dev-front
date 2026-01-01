# Shared (Recursos Compartidos)

El directorio `shared/` contiene elementos transversales que son utilizados por múltiples features o páginas. Su objetivo es mantener la consistencia visual y funcional (DRY - Don't Repeat Yourself).

## Estructura

- **components/**: UI Atómica y componentes altamente reutilizables (Botones, Inputs, Cards, Header, Footer).
- **modals/**: Componentes específicos para ventanas modales y diálogos.
- **services/**: Servicios auxiliares que no pertenecen a la lógica de negocio (ej: scroll, notificaciones visuales).
- **utils/**: Helpers, funciones puras y utilidades de TypeScript.

## Reglas de Shared

1. **Sin Lógica de Negocio**: Los componentes en `shared/` deben ser "puros" o de presentación. No deben inyectar Stores del Core directamente si esto compromete su reutilización.
2. **Altamente Parametrizables**: Deben usar `@Input` y `@Output` (o las nuevas `input()` y `output()` de Angular) para comunicarse.
3. **Independencia**: Un componente shared no debería depender de una feature específica.