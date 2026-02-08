# Arquitectura Core-Centric - Zuzki Dev Front

Este documento describe la arquitectura actual de la aplicación Angular, optimizada para rendimiento, mantenibilidad y despliegue en el Edge (Cloudflare Pages).

## 🚀 De Hexagonal a Core-Centric
Originalmente el proyecto se planteó bajo una Arquitectura Hexagonal. Sin embargo, para reducir la verbosidad y aprovechar mejor las capacidades nativas de **Angular 21 (Signals, Standalone, Zoneless)**, hemos simplificado la estructura hacia un modelo centrado en el **Core**.

### Objetivos
- **Reducción de Boilerplate**: Eliminación de capas intermedias (Application/Ports) que no aportaban valor real en el frontend.
- **Reactividad Nativa**: Uso extensivo de Signals para el estado y la lógica.
- **Rendimiento Edge**: Preparado para Zoneless y SSR en Cloudflare.

## 🏗️ Estructura de Capas

### 1. Core (`src/app/core/`)
Es el motor de la aplicación y la "fuente de la verdad".
- **Stores**: Gestión de estado reactivo mediante servicios `@Injectable` que utilizan Signals nativos y `rxResource`. Sustituyen a la lógica de dominio anterior y manejan el `TransferState` de forma transparente.
- **Services**: Servicios de infraestructura y comunicación API.
- **Interfaces**: Contratos de datos compartidos.
- **Interceptores**: Lógica funcional para Auth, Error handling y **Caché HTTP** (en memoria para el cliente).

### 2. Features (`src/app/features/`)
Módulos funcionales de la aplicación.
- Cada feature agrupa componentes inteligentes y de presentación.
- Se comunican con el `Core` para obtener datos o ejecutar acciones.

### 3. Pages (`src/app/pages/`)
Orquestadores de alto nivel vinculados al Router.
- Componen las páginas combinando una o más Features.

### 4. Shared (`src/app/shared/`)
Componentes de UI puros, utilidades y servicios de soporte (notificaciones, modales).

## 🔄 Flujo de Datos
1. La **Page** carga y activa las **Features**.
2. La **Feature** inyecta un **Store** del **Core**.
3. El **Store** utiliza un **Resource** (vía `rxResource`) que delega en un **Service**.
4. El **Interceptor de Caché** verifica si existe una respuesta previa válida para ahorrar peticiones de red.
5. Los datos fluyen de vuelta a la UI mediante **Signals**, asegurando una reactividad óptima sin Zone.js.

## 🛠️ Tecnologías Clave
- **Angular 21**: Standalone Components, Signals, `inject()`, Control Flow, `rxResource`.
- **Zoneless**: Ejecución sin Zone.js para máximo rendimiento.
- **Tailwind CSS 4**: Sistema de diseño basado en tokens.
- **Cloudflare Wrangler**: Para el ciclo de vida de desarrollo y despliegue.