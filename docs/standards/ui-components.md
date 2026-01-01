# Componentes de UI e Implementación

Guía de construcción de elementos visuales y layouts utilizando el sistema de utilidades modular.

## 1. Iconografía
- **Componente:** Usar `<ng-icon>`.
- **Contenedor:** Usar utilidad `icon-box` (en `icons.css`).
- **Tamaño:** `icon-box-md` (default) o `icon-box-lg`.
- **Colores:** `text-ui-accent` por defecto.

## 2. Botones y Enlaces
Referencia: `src/styles/utils/buttons.css`
- **Botón Base:** `@utility btn-base`.
- **Variantes:**
  - `btn-brand`: Acción principal (Gradiente).
  - `btn-secondary`: Acciones secundarias (Surface).
  - `btn-outline`: Bordes definidos.
  - `btn-ghost`: Solo texto/icono, fondo al hover.
- **Enlaces:** Usar utilidad `nav-link` (en `navigation.css`).

## 3. Tarjetas (Cards)
Referencia: `src/styles/utils/cards.css`
- **Estructura:**
  ```css
  .mi-tarjeta {
    @apply card-group card-interactive card-surface card-rounded card-border card-padding;
  }
  ```
- **Interacción:** `card-interactive` maneja hover y focus automáticamente.

## 4. Formularios
Referencia: `src/styles/utils/forms.css`
- **Inputs:** `form-input-base` (Cubre background, border, text, placeholder y focus).
- **Labels:** `form-label`.
- **Errores:** `form-error`.
- **Selects:** `form-select-trigger`.

## 5. Paneles Flotantes
Referencia: `src/styles/utils/panels.css`
- **Contenedor:** `floating-panel` (Sombra, borde, fondo surface-300).
- **Items:** `floating-item` y `floating-item-hover`.

## 6. Layout y Espaciado
- **Modales:** Usar estructura Flex vertical con `max-height` y `overflow-y-auto` en el cuerpo para evitar recortes de popovers.
- **Transiciones:** `transition-all duration-200` o `transition-theme`.
- **Sombras:** Usar sombras nativas (`shadow-md`, `shadow-xl`) o las incluidas en las utilidades `card-*` y `floating-*`.