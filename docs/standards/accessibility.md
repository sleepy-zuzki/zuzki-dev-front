# Accesibilidad (A11y)

Garantizar que la plataforma sea usable para todos.

## 1. Semántica y Roles
- Usar elementos HTML semánticos (`<button>`, `<nav>`, ` <main> `, `<header>`).
- Proporcionar `aria-label` descriptivos para botones que solo contienen iconos.

## 2. Gestión del Foco
- **Prohibido:** Eliminar el outline (`outline-none`) sin proporcionar una alternativa visual clara.
- **Solución:** Usar siempre la utilidad `focus-brand`.
- Asegurar que el orden de tabulación sea lógico.

## 3. Contraste y Visibilidad
- Mantener una relación de contraste mínima de 4.5:1 para texto normal.
- Los estados `hover`, `focus-visible`, `active` y `disabled` deben ser visualmente distinguibles.

## 4. Checklist de Validación
- [ ] ¿Tienen todos los iconos decorativos `aria-hidden="true"`?
- [ ] ¿Los elementos interactivos son accionables mediante el teclado?
- [ ] ¿El texto es legible en modo claro y oscuro?
