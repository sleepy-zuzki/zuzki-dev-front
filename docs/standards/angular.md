# Estándares de Angular (v21+)

Reglas obligatorias para la implementación de lógica y componentes en el proyecto.

## 1. Componentes y Estructura
- **Standalone:** Todos los componentes, directivas y pipes deben ser `standalone: true`.
- **Inyección de Dependencias:** Preferir el uso de la función `inject()` sobre el constructor para inyectar servicios y tokens.
- **Ciclo de Vida:** Minimizar el uso de `OnInit` si la lógica puede resolverse con Signals o inicialización de propiedades.

## 2. Reactividad con Signals
- **Mandato:** El estado local y la comunicación entre componentes DEBE usar Signals.
- **Inputs/Outputs:** Usar `input()`, `output()` y `model()` en lugar de los antiguos decoradores `@Input()` y `@Output()`.
- **Estado Derivado:** Usar `computed()` para cualquier valor que dependa de otros signals.
- **Efectos:** Usar `effect()` solo para efectos secundarios (logging, sincronización con APIs externas de JS), nunca para cambiar el estado de otros signals.

## 3. Control Flow
- Usar exclusivamente la nueva sintaxis de Angular:
  - `@if (condicion) { ... } @else { ... }`
  - `@for (item of items; track item.id) { ... }`
  - `@switch (valor) { ... }`
- Siempre incluir `track` en los bucles `@for` para optimizar el renderizado.

## 4. Estilos en Componentes
- **Prioridad:** Clases de Tailwind CSS directamente en el HTML.
- **CSS Local:** Reservado solo para:
  - Animaciones complejas (`@keyframes`).
  - Selectores avanzados que Tailwind no soporte de forma limpia.
  - Uso de tokens mediante `var(--color-...)`.
- **Evitar:** Hardcodear valores en el CSS; usar siempre variables de entorno de CSS (tokens).
