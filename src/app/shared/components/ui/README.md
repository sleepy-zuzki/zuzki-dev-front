# UI Library — Política de importación

Objetivo: exponer una API pública estable y evitar imports profundos (deep imports) que acoplan al árbol de carpetas.

## Cómo importar

- Preferido (API pública):
  ```ts
  import { ButtonComponent, LinkButtonComponent, BadgeComponent, ProjectCardComponent } from '@ui';
  ```
- Evitar:
  ```ts
  // deep imports (no garantizarán estabilidad)
  import { ButtonComponent } from '@components/ui/button/button.component';
  ```

## Reglas

- Todos los subpaquetes deben tener `index.ts` (barril).
- El barril raíz de `ui` reexporta la API pública.
- La regla de ESLint `import/no-internal-modules` advierte sobre deep imports.

## Roadmap

- Fase 1: normalización de barriles y alias `@ui`.
- Fase 2+: rendimiento (OnPush, trackBy), accesibilidad, theming, Storybook, pruebas y harness.
