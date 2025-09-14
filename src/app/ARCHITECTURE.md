# Arquitectura Hexagonal - Documentación

## Visión General
Este proyecto implementa la **Arquitectura Hexagonal** (también conocida como Ports & Adapters), que permite crear aplicaciones más mantenibles y testeable separando las preocupaciones en capas bien definidas.

## Estructura de Capas

### 🔵 Core/Domain (Centro del Hexágono)
**Ubicación**: `src/app/core/domain/`

La capa más interna, contiene la lógica de negocio pura:
- **Entities**: Objetos centrales del dominio con identidad
- **Value Objects**: Objetos inmutables identificados por su valor
- **Repositories**: Interfaces para acceso a datos (puertos)
- **Services**: Servicios de dominio para lógica compleja
- **Events**: Eventos de dominio para comunicación desacoplada

### 🟡 Application (Casos de Uso)
**Ubicación**: `src/app/application/`

Orquesta las operaciones del dominio:
- **Use Cases**: Implementan los flujos de negocio específicos
- **DTOs**: Objetos de transferencia de datos
- **Ports**: Interfaces de entrada y salida de la aplicación

### 🟠 Infrastructure (Adaptadores)
**Ubicación**: `src/app/infrastructure/`

Implementa detalles técnicos:
- **Adapters**: Implementaciones concretas de puertos
  - **Primary**: Controllers, GraphQL resolvers (entrada)
  - **Secondary**: Repositories, servicios externos (salida)
- **Config**: Configuración de infraestructura

### 🟢 Features (Presentación)
**Ubicación**: `src/app/features/`

Capa de presentación Angular:
- **Components**: Componentes UI específicos de funcionalidad
- **Containers**: Componentes inteligentes que coordinan
- **Services**: Servicios de presentación que usan casos de uso

## Flujo de Dependencias
