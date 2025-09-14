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
# Features (Presentation Layer)

Esta carpeta contiene las **características/módulos** de la aplicación Angular.

## Estructura Hexagonal en Frontend
- Cada feature representa un módulo de funcionalidad
- Los componentes actúan como adaptadores primarios
- Los servicios de presentación orquestan casos de uso
- Se comunican con la capa de aplicación a través de puertos

## Ejemplo de estructura:
## Autonomía

Cada módulo de características está diseñado para ser relativamente autónomo, conteniendo todos los componentes y servicios necesarios para su funcionalidad. Sin embargo, pueden depender de servicios core y componentes compartidos.

## Integración

Las características se integran en la aplicación principal a través del sistema de enrutamiento y/o importándolas en los componentes de página correspondientes.
