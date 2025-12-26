# Arquitectura de Estilos y CSS

Organización de los archivos de estilo y Tailwind CSS.

## 1. Organización de Archivos
Ubicación: `src/styles/`
- `colors.css`: Definición de variables CSS (tokens) y utilidades de color.
- `sections.css`: Estilos base para las secciones del layout.
- `utilities.css`: Clases de utilidad personalizadas no cubiertas por Tailwind.
- `cards.css`: Estilos específicos para componentes tipo tarjeta.

## 2. Punto de Entrada
`src/styles.css` es el único punto de entrada. Debe importar las capas de Tailwind y luego los archivos locales:
```css
@import "tailwindcss";
@import "./styles/colors.css";
@import "./styles/sections.css";
...
```

## 3. Directivas de Tailwind
- Usar `@layer components` para definir componentes reutilizables (como `btn-cta`).
- Usar `@utility` para clases de utilidad pequeñas y frecuentes.

## 4. Mejores Prácticas
- No usar `@apply` de forma indiscriminada; priorizar el uso de clases en el HTML.
- Mantener los estilos de los componentes Angular dentro de sus propios archivos `.css` solo cuando sea estrictamente necesario.
