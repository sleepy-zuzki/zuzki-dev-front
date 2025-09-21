# Reglas de diseño y guía de implementación (Angular + Tailwind)

Objetivo: estandarizar cómo construimos UI para que humanos e IAs entreguen interfaces consistentes, accesibles y fáciles de mantener.

## 1) Principios
- Preferir utilidades de Tailwind y utilidades personalizadas antes que CSS ad-hoc.
- No hardcodear colores (hex, rgb, slate/gray arbitrarios); usar tokens y utilidades del tema.
- Mantener accesibilidad por defecto (focus visible, etiquetas ARIA, contraste).
- Componentes pequeños, reutilizables y predecibles. Estilos locales solo cuando Tailwind no alcance.

## 2) Tokens y paleta
Los colores y superficies del proyecto se exponen como tokens de tema. Úsalos con clases utilitarias:
- Marca y acento:
  - text-ui-accent
  - text-brand-primary
  - hover:text-brand-primary-hover
  - bg-brand-primary, bg-brand-primary/10
- Fondos según tema:
  - bg-background-default
  - bg-background-section
  - bg-background-surface
- Paleta “zuzki” (cuando necesites granularidad de escala):
  - bg-zuzki-500, hover:bg-zuzki-600, text-zuzki-500, etc.

Reglas:
- Evita bg-gray-*, text-gray-* y colores del core cuando exista un token equivalente.
- Para opacidades, usa la sintaxis /xx (ej: bg-brand-primary/10).
- Para sombras/overlays CSS nativos, usa color-mix con tokens en CSS (no en HTML).

## 3) Utilidades personalizadas clave
- transition-theme: transición suave para cambios de tema/estado.
- focus-brand: anillo de foco con color de marca y offset correcto.
- surface-*:
  - surface-primary => bg-background-default
  - surface-secondary => bg-background-section
  - surface-muted => bg-background-surface
- Componentes listos:
  - btn-cta
  - badge-brand
- Gradientes:
  - text-gradient-brand (texto con gradiente de marca)
  - text-gradient (utilidad base de gradient text)

Si dudas entre varias, prioriza: surface-* para fondos, focus-brand para focus, transition-theme para animaciones de color.

## 4) Modo oscuro
- El modo oscuro se gobierna a nivel root. No fuerces colores con dark: y paletas genéricas.
- Prefiere tokens “background-*”, “brand-*” y “ui-*” que ya son aware del tema.
- dark: se permite solo cuando el token no cubra el caso; documenta el motivo en el componente.

## 5) Accesibilidad (A11y)
- Siempre incluye aria-label o atributos equivalentes para icon buttons.
- Usa focus-brand en todos los elementos interactivos. No anules outline sin reemplazo.
- Mantén contraste suficiente (texto vs fondo). Los tokens están calibrados para ello.
- Estados: hover, focus-visible, active, disabled deben ser distinguibles.

## 6) Iconografía
- Usa <ng-icon> con tamaños consistentes: w-5 h-5 por defecto.
- Colores:
  - Base: text-ui-accent
  - Hover/active: hover:text-brand-primary (o brand-primary-hover)
- Transición: transition-all duration-300 o transition-theme.

## 7) Botones y enlaces
- CTA principal: btn-cta
- Botones icónicos (icon-only):
  - Base: p-2 rounded-lg
  - Fondo hover: hover:bg-background-section
  - Focus: focus-brand
  - Ícono: text-ui-accent, hover:text-brand-primary
- Enlaces:
  - text-brand-primary y hover:text-brand-primary-hover con underline-offset-2 cuando corresponda.

## 8) Estructura de estilos en componentes Angular
- HTML: utilidades de Tailwind + utilidades personalizadas (p.ej., focus-brand).
- CSS local: solo para:
  - Animaciones complejas (keyframes, ripple, etc.)
  - Casos donde Tailwind no cubra (p.ej., clipping avanzado, selects nativos)
- Evita redefinir colores en CSS local; usa tokens (var(--color-...)) si necesitas CSS puro.

Ejemplo (botón de icono):
- HTML:
  - button: "relative p-2 rounded-lg hover:bg-background-section transition-theme focus-brand overflow-hidden"
  - ng-icon: "w-5 h-5 text-ui-accent transition-all duration-300 hover:scale-110 hover:text-brand-primary"
  - ripple (opcional): span con "absolute inset-0 rounded-lg bg-brand-primary/10 scale-0 transition-transform duration-200 active:scale-100 pointer-events-none"
- CSS local (si hay ripple):
  - Keyframes ripple y background-color con var(--color-brand-primary) o color-mix.

## 9) Layout y espaciado
- Usa contenidores y spacing de Tailwind (p-*, m-*, gap-*) sin hardcodear px en CSS.
- Grillas y flex: grid, flex, gap y auto-fit/auto-fill cuando sean listas reactivas.
- Redondeado: rounded, rounded-lg; mantener consistencia por tipo de elemento.

## 10) Transiciones y animaciones
- Por defecto, transition-theme.
- Duraciones:
  - 150–200ms para hover/active
  - 300ms para cambios de tema/estado de componentes
- Bezier recomendada: cubic-bezier(0.4, 0, 0.2, 1) cuando se defina en CSS local.

## 11) Sombras y elevación
- Usa sombras de Tailwind (shadow, shadow-md, shadow-lg) en lugar de personalizadas, salvo justificación.
- No uses sombras coloreadas; prioriza claridad y contraste del fondo.

## 12) Extensión del sistema de diseño
Cuando necesites nuevos tokens/utilidades:
- Agrega tokens de color bajo el esquema existente (prefijo claro y escala si aplica).
- Crea utilidades vía @utility o componentes vía @layer components manteniendo convención de nombres.
- Añade documentación breve del uso y ejemplo.

## 13) Checklist para PRs de UI
- [ ] No hay colores hardcodeados fuera de tokens/ utilidades del tema.
- [ ] Estados hover/focus/active/disabled definidos y accesibles.
- [ ] Modo oscuro cubierto por tokens (sin hacks innecesarios).
- [ ] Se usan focus-brand y transition-theme.
- [ ] No hay CSS local para cosas resolubles con Tailwind/utilidades existentes.
- [ ] Nombres de clases coherentes con el sistema (btn-*, badge-*, surface-*, ...).

---

Notas para IAs:
- Prioriza clases basadas en tokens del tema (brand, ui, background, zuzki).
- Evita introducir nuevas paletas del core de Tailwind si existe un token análogo.
- Si una clase de color no existe, usa var(--color-...) en CSS local o solicita la creación de la utilidad/token correspondiente.
