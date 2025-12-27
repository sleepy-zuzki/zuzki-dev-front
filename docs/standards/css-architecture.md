# Arquitectura de Estilos y CSS

Organización de los archivos de estilo y Tailwind CSS v4.

## 1. Organización de Archivos
Ubicación: `src/styles/`

### Núcleo
- **`colors.css`**: Definición de variables CSS (tokens semánticos OKLCH) y configuración del tema (`@theme`).
- **`utilities.css`**: Agregador global. Importa todos los módulos de `utils/` para retrocompatibilidad global.

### Módulos de Utilidades (`src/styles/utils/`)
Para optimizar el bundle, las utilidades se dividen en archivos específicos. Los componentes deben importar solo lo que necesitan.

- **`core.css`**: Utilidades base (gradientes, transiciones, `focus-brand`).
- **`buttons.css`**: Variantes de botones (`btn-*`).
- **`cards.css`**: Superficies y estados de tarjetas (`card-*`).
- **`forms.css`**: Inputs, checkboxes y validaciones (`form-*`).
- **`layout.css`**: Estructuras mayores (header, glass effects).
- **`navigation.css`**: Enlaces y menús (`nav-link`).
- **`panels.css`**: Elementos flotantes como dropdowns (`floating-*`).
- **`typography.css`**: Helpers de texto (`text-muted-sm`).
- **`icons.css`**: Contenedores de iconos (`icon-box`).
- **`badges.css`**: Etiquetas (`badge`).

## 2. Punto de Entrada
`src/styles.css` es el único punto de entrada global. Importa el tema y las utilidades base:
```css
@reference "tailwindcss";
@reference "./styles/colors.css";
@reference "./styles/utilities.css";
```

## 3. Uso en Componentes (Angular)
En lugar de importar `utilities.css` completo, referencia el módulo específico:

```css
/* src/app/shared/components/button/button.component.css */
@reference "../../../../styles/utils/buttons.css";

.btn {
  @apply btn-base;
}
```

## 4. Directivas de Tailwind
- Usar `@utility` para definir clases reutilizables en los archivos de `utils/`.
- Evitar `@layer components`; el nuevo estándar de Tailwind v4 favorece `@utility` o CSS nativo.

## 5. Mejores Prácticas
- **Primero Utilidades:** Antes de escribir CSS personalizado, busca si existe una utilidad en `src/styles/utils/` (ej. `card-surface`, `form-input-base`).
- **Semántica:** Usa los tokens semánticos (`bg-surface-100`) en lugar de colores directos (`bg-gray-100`) para garantizar soporte de modo oscuro.
