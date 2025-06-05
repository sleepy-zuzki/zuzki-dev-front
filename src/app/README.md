# Interceptores HTTP para APIs externas

## Estructura de carpetas

```
src/app/core/
├── interceptors/
│   ├── github-data.interceptor.ts
│   └── make.interceptor.ts
├── tokens/
│   └── api-type.token.ts
└── services/
    └── api.service.ts
```

## Uso de los interceptores

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

## Notas

- Las peticiones HTTP no necesitan incluir la base URL manualmente.
- Se utiliza HttpContextToken para identificar el tipo de API.
- Cada interceptor solo actúa si el contexto lo requiere.
