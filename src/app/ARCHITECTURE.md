# Arquitectura del Proyecto - Zuzki Dev Front

## Visión General
Este proyecto sigue una arquitectura **Core-Centric** simplificada, diseñada para aprovechar al máximo las capacidades modernas de **Angular (Signals, Standalone, Zoneless)** y optimizar el rendimiento en **Cloudflare Pages**.

Se ha abandonado la complejidad de la Arquitectura Hexagonal en favor de un flujo de datos más directo y menos verboso, manteniendo una separación clara de responsabilidades.

## Estructura de Capas

### 🔵 Core (`src/app/core/`)
Es el motor de la aplicación. Contiene toda la lógica de negocio, estado y servicios fundamentales.
- **Stores**: Gestión de estado reactivo utilizando `@ngrx/signals`. Es la "fuente de la verdad".
- **Services**: Servicios de comunicación con APIs externas y lógica compartida.
- **Interfaces**: Definiciones de contratos de datos.
- **Interceptors**: Lógica funcional para interceptar peticiones HTTP (Auth, API Selection).
- **Guards**: Protección de rutas mediante funciones.
- **Tokens**: `InjectionTokens` para desacoplar configuraciones y servicios.
- **Config & Enums**: Constantes y enumeraciones globales.

### 🟡 Features (`src/app/features/`)
Contiene los módulos funcionales de la aplicación. Cada feature es independiente y agrupa:
- Componentes inteligentes y de presentación.
- Lógica específica de la funcionalidad.
- Estilos y assets locales.

### 🟠 Shared (`src/app/shared/`)
Recursos reutilizables en toda la aplicación:
- **Components**: UI Atómica (Botones, Inputs, Modales, Cards).
- **Utils**: Funciones puras y helpers.
- **Services**: Servicios auxiliares de UI (notificaciones, scroll).

### 🟢 Pages (`src/app/pages/`)
Actúan como contenedores de alto nivel para el router. Su única responsabilidad es:
- Definir el layout de la página.
- Orquestar una o varias **Features**.

## Principios Técnicos
- **Signals**: Uso mandatorio para la reactividad y gestión de estado.
- **Standalone**: 100% de los componentes, directivas y pipes son standalone.
- **Inyección de Dependencias**: Preferencia por la función `inject()` sobre el constructor.
- **Zoneless**: Preparado para funcionar sin `Zone.js`, optimizando el ciclo de vida de Angular.
- **Multi-API**: Uso de interceptores condicionales para consumir diferentes backends (GitHub, Make, Custom API).