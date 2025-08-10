# Características (Features)

Este directorio contiene módulos de características específicas de la aplicación. Cada característica representa una funcionalidad completa que puede incluir múltiples componentes, servicios y modelos relacionados.

## Estructura

Cada característica se organiza en su propio directorio:

```
features/
├── home/                  # Funcionalidad de la página principal
│   ├── components/        # Componentes específicos de home
│   ├── services/          # Servicios específicos 
│   └── models/            # Modelos de datos específicos
└── works/                 # Funcionalidad de portafolio de trabajos
```

## Autonomía

Cada módulo de características está diseñado para ser relativamente autónomo, conteniendo todos los componentes y servicios necesarios para su funcionalidad. Sin embargo, pueden depender de servicios core y componentes compartidos.

## Integración

Las características se integran en la aplicación principal a través del sistema de enrutamiento y/o importándolas en los componentes de página correspondientes.
