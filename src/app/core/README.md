# Módulo Core

Este directorio contiene servicios, interceptores y utilidades fundamentales para el funcionamiento de la aplicación. Estos elementos son esenciales y generalmente se cargan una sola vez al inicio de la aplicación.

## Estructura

```
core/
├── http/                  # Clientes HTTP personalizados
├── interceptors/          # Interceptores HTTP
│   ├── github-data.interceptor.ts
│   └── make.interceptor.ts
├── services/              # Servicios principales
│   └── api.service.ts
├── models/                # Modelos de datos core
├── enums/                 # Enumeraciones
├── utils/                 # Utilidades específicas del core
├── tokens/                # Tokens de inyección
│   └── api-type.token.ts
└── interfaces/            # Interfaces core
```

## Servicios Core

Los servicios en este directorio proporcionan funcionalidades fundamentales como:

- Autenticación y autorización
- Comunicación con APIs externas
- Gestión de estado global
- Manejo de errores

## Interceptores HTTP

Los interceptores permiten consumir múltiples APIs externas de forma limpia y modular. Cada interceptor está condicionado para actuar solo cuando el contexto HTTP contiene el tipo de API específico.

### Ejemplos de uso

```typescript
// Importar el servicio API
import { ApiService } from '@core/services/api.service';

@Component({
  // ...
})
export class MyComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Consumir la API de GitHub
    this.apiService.getFromGithub<any>('users/octocat').subscribe(user => {
      console.log('GitHub User:', user);
    });

    // Consumir la API de Make.com
    this.apiService.getFromMake<any>('scenarios').subscribe(scenarios => {
      console.log('Make Scenarios:', scenarios);
    });
  }
}
```

## Configuración

Los interceptores están configurados en el archivo `app.config.ts` y utilizan variables de entorno para las URLs base de las APIs, definidas en `environment.ts`.
