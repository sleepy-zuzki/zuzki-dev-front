# Componentes de UI e Implementación

Guía de construcción de elementos visuales y layouts.

## 1. Iconografía
- **Componente:** Usar `<ng-icon>`.
- **Tamaño:** Por defecto `w-5 h-5` (20px).
- **Colores:** Usar `text-ui-accent` por defecto y `hover:text-brand-primary` para estados activos.
- **Animación:** Preferir `transition-all duration-300` o `transition-theme`.

## 2. Botones y Enlaces
- **CTA Principal:** Clase `btn-cta`.
- **Botones de Icono:** 
  - Clase base: `p-2 rounded-lg`.
  - Estados: `hover:bg-background-section` y `focus-brand`.
- **Enlaces:** Usar `text-brand-primary` con `hover:underline-offset-2`.

## 3. Layout y Espaciado
- **Contenedores:** Usar utilidades de Tailwind (`p-*`, `m-*`, `gap-*`).
- **Grid/Flex:** Preferir `grid` con `auto-fit`/`auto-fill` para listas reactivas de elementos (como cards).
- **Bordes:** Mantener consistencia con `rounded-lg` para la mayoría de los contenedores.

## 4. Transiciones y Animaciones
- **Hover/Active:** Duración de 150-200ms.
- **Cambios de Estado:** 300ms.
- **Bezier:** `cubic-bezier(0.4, 0, 0.2, 1)`.

## 5. Sombras
- Usar sombras nativas de Tailwind: `shadow-sm`, `shadow-md`, `shadow-lg`.
- No usar sombras de colores, priorizar el contraste y la elevación natural.
