# Checkpoint de mejoras UI (Fases 0-3)

Este documento resume el estado actual de las mejoras realizadas en la librería de UI y el plan para continuar.

## Resumen ejecutivo
- Fase 0 — Preparación y auditoría: completada
  - Inventario de componentes y barriles.
  - CI local listo (build, lint, test).
- Fase 1 — Normalización de barriles y rutas: completada
  - Alias `@ui` como API pública.
  - Barriles consistentes por carpeta y barril raíz consolidado.
  - Regla de lint evita deep imports desde `@components/ui/*`; se usa `@ui`.
- Fase 2 — Rendimiento base: completada
  - `ChangeDetectionStrategy.OnPush` aplicado a componentes de UI clave.
  - Listados con `trackBy` donde aplica.
  - Sin cambios de API pública ni funcionalidad visual.
- Fase 3 — Accesibilidad mínima viable: completada
  - Atributos ARIA en controles interactivos (checkbox, toggle, select).
  - Soporte de teclado en toggle (espacio/enter).
  - Focus visible mejorado en enlaces tipo botón.
  - Pruebas de a11y automáticas con axe para varios componentes.

## Cómo validar (local)
- Lint: `pnpm run lint`
- Test unitarios (headless): `pnpm run test:a11y`
- Smoke test manual (recomendado):
  - Verificar que botones, toggles y selects respondan correctamente con teclado.
  - Revisar que el foco visible sea claramente identificable.

## Entregables alcanzados
- API pública de UI estandarizada vía `@ui`.
- Barriles por submódulo (actions, forms, navigation, display, layout, etc.).
- OnPush extendido a la mayoría de componentes de UI.
- `trackBy` añadido en listados detectados.
- Accesibilidad mejorada (roles/ARIA/focus).
- Suite de pruebas a11y con axe para:
  - ThemeToggle
  - Select
  - ActionButton
  - LinkButton
  - Button
  - Checkbox
  - Toggle

## Observaciones y riesgos
- OnPush: si algún dato no refresca, usar `async` pipe, emitir nuevas referencias o `markForCheck`.
- Accesibilidad: mantener consistencia en labels y descripciones (`aria-label`, `aria-describedby`).
- Evitar funciones/objetos inline en bindings para no invalidar detección de cambios.

## Backlog próximo (Fases 4-9)

Fase 4 — Tokens de diseño y theming
- [ ] Introducir variables CSS (color, tipografía, spacing, radius, sombras).
- [ ] Tema claro/oscuro y alto contraste; respetar `prefers-color-scheme`.
- [ ] Migrar componentes a tokens (evitar “magic values”).

Fase 5 — Storybook y docs vivas
- [ ] Configurar Storybook.
- [ ] Historias con estados/variantes + checklist de a11y.
- [ ] (Opcional) Visual regression (Chromatic/Playwright).

Fase 6 — Pruebas unitarias y harness
- [ ] Pruebas unitarias por componente (inputs/outputs/interacción).
- [ ] Component Harness para desacoplar test de implementación.
- [ ] Cobertura objetivo en UI ≥ 80%.

Fase 7 — Primitivas de layout y patrones headless
- [ ] Layout primitives (Stack, HStack, Grid, Container).
- [ ] Slots (`ng-content select`) para header/footer en componentes compuestos.
- [ ] Directivas utilitarias (click-outside, trap-focus, autofocus seguro).

Fase 8 — DX y estandarización
- [ ] Generadores/snippets para nuevos componentes con convenciones.
- [ ] Reglas de lint adicionales (complejidad de plantilla, tamaño máximo).
- [ ] Prefijos/convenciones estables de selectores y nombres de archivos.

Fase 9 — Versionado, deprecations y comunicación
- [ ] Changesets/Changelog para releases de UI.
- [ ] Marcar APIs obsoletas con `@deprecated` y plan de migración.
- [ ] Métricas finales y retro.

## Métricas objetivo (al cierre de próximas fases)
- A11y ≥ 90 en vistas clave (Lighthouse) y 0 issues críticos en axe.
- Cobertura de tests de UI ≥ 80%.
- Disminuir tamaño de estilos y repetición con tokens/layout primitives.
- 0 deep imports desde UI (enforced por lint).

## Notas de operación
- Mantener `@ui` como única fuente de importación de componentes UI.
- Añadir historias y pruebas con cada nuevo componente como requisito de PR.
- Ejecutar `pnpm run lint` y `pnpm run test:a11y` en CI para prevenir regresiones.
