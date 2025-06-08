# Páginas de la Aplicación

Este directorio contiene los componentes de página principales de la aplicación. Cada página corresponde a una ruta específica definida en el sistema de enrutamiento de Angular.

## Estructura

Cada página se organiza en su propio directorio:

```
pages/
├── home/                  # Página principal
├── projects/              # Página de proyectos
├── about/                 # Página de información
└── contact/               # Página de contacto
```

## Routing

Las páginas están conectadas al sistema de enrutamiento principal de la aplicación a través de `app.routes.ts`. Algunas páginas también pueden tener sus propios archivos de rutas para subrutas.

## Componentes

Cada página puede contener sus propios componentes específicos que no se comparten con otras partes de la aplicación. Para componentes reutilizables, consulta el directorio `shared/`.
