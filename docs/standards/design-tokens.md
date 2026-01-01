# Sistema de Diseño y Tokens

Guía para el uso consistente de colores, superficies y temas basada en OKLCH.

## 1. Tokens de Color (Semánticos)
No hardcodear colores (HEX, RGB). Usar exclusivamente los tokens definidos o las utilidades semánticas.

### Niveles de Superficie (Surface Levels)
El sistema utiliza una escala de elevación para manejar el contraste y la profundidad en modo claro y oscuro.

- **Nivel 0: `bg-canvas`** (`--surface-canvas`)
  - Fondo global de la aplicación.
- **Nivel 1: `bg-surface-100`** (`--surface-100`)
  - Secciones de contenido principales, sidebars, headers de tablas.
- **Nivel 2: `bg-surface-200`** (`--surface-200`)
  - Tarjetas (`cards`), inputs de formulario, elementos elevados.
- **Nivel 3: `bg-surface-300`** (`--surface-300`)
  - Elementos flotantes, dropdowns, modales, tooltips.

### Marca y Acento
- **`text-brand-primary`**: Color principal (Naranja Zuzki).
- **`bg-gradient-brand`**: Gradiente oficial (de Naranja Claro a Rojizo).
- **`focus-brand`**: Anillo de foco accesible y consistente.

### Bordes
- **`border-border-subtle`**: Divisores suaves.
- **`border-border-strong`**: Bordes de inputs o tarjetas.

## 2. Modo Oscuro
- El tema se gestiona de forma global. Los tokens semánticos (`surface-*`, `canvas`) se adaptan automáticamente.
- **Regla:** **Nunca** usar `bg-white` o `bg-gray-*` para contenedores estructurales. Usar siempre `bg-surface-*`.

## 3. Utilidades Personalizadas
- **`transition-theme`**: Transición suave de colores (300ms).
- **`glass-header` / `glass-scrim`**: Efectos de cristal esmerilado adaptables.
- **`text-muted-sm`**: Texto secundario en mayúsculas pequeño.

## 4. Extensión
Para añadir nuevos tokens, deben definirse en `src/styles/colors.css` dentro de `:root` (Light) y `:root.dark` (Dark), y luego mapearse en el bloque `@theme`.