# Componentes Compartidos

Este directorio contiene componentes, directivas, pipes y otros elementos que se utilizan en múltiples partes de la aplicación.

## Estructura

```
shared/
├── components/     # Componentes reutilizables (botones, tarjetas, etc.)
├── directives/     # Directivas personalizadas
├── pipes/          # Pipes para transformación de datos
├── layouts/        # Componentes de diseño (headers, footers, etc.)
└── models/         # Interfaces y tipos compartidos
```

## Componentes
# Shared

Esta carpeta contiene **elementos compartidos** entre diferentes capas y features.

## Estructura
- **Components**: Componentes UI reutilizables
- **Utils**: Utilidades y helpers
- **Constants**: Constantes de la aplicación
- **Types**: Tipos TypeScript compartidos
- **Validators**: Validadores comunes

## Ejemplo de estructura:
Los componentes compartidos están diseñados para ser reutilizables y mantener una experiencia de usuario consistente en toda la aplicación.

## Uso

Para utilizar estos componentes en otras partes de la aplicación:

```typescript
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  // ...
  imports: [ButtonComponent]
})
export class MyComponent {
  // ...
}
```
