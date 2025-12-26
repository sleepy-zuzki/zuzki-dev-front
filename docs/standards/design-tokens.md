# Sistema de Diseño y Tokens

Guía para el uso consistente de colores, superficies y temas.

## 1. Tokens de Color
No hardcodear colores (HEX, RGB). Usar exclusivamente los tokens definidos:

### Marca y Acento
- `text-brand-primary`: Color principal de la marca.
- `bg-brand-primary`: Fondo con el color de la marca.
- `text-ui-accent`: Color para detalles y acentos de UI.
- `hover:text-brand-primary-hover`: Variación para interacciones.

### Superficies y Fondos
- `bg-background-default`: Fondo principal de la página.
- `bg-background-section`: Fondo para secciones diferenciadas.
- `bg-background-surface`: Fondo para tarjetas o elementos elevados.

### Escala Zuzki
Para casos de diseño granular: `bg-zuzki-500`, `text-zuzki-600`, etc.

## 2. Modo Oscuro
- El tema se gestiona de forma global. Los tokens anteriores son "theme-aware".
- **Regla:** Evitar el uso excesivo de `dark:`. Si el token `bg-background-default` cambia correctamente entre temas, no es necesario forzarlo.
- Usar `dark:` solo para excepciones visuales específicas que el sistema de tokens no cubra.

## 3. Utilidades Personalizadas
- `transition-theme`: Aplicar a cualquier elemento que cambie de color al alternar el modo oscuro.
- `focus-brand`: Anillo de foco estandarizado para accesibilidad.
- `surface-*`: Atajos para los fondos (`surface-primary`, `surface-secondary`).

## 4. Extensión
Para añadir nuevos tokens, deben definirse en `src/styles/colors.css` bajo el esquema de variables CSS y luego registrarse en el sistema de Tailwind si es necesario.
