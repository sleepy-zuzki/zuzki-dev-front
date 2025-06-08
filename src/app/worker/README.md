# Módulo Worker

Este directorio contiene código específico para el entorno de Cloudflare Workers, donde se despliega la aplicación.

## Propósito

El código en este directorio está diseñado para aprovechar las capacidades específicas de Cloudflare Workers, como:

- KV Storage
- Durable Objects
- Funcionalidades de borde (edge functions)
- Manejo de solicitudes y respuestas

## Estructura

```
worker/
├── services/              # Servicios específicos para Workers
├── models/                # Modelos de datos para funcionalidades de Workers
└── utils/                 # Utilidades para el entorno de Workers
```

## Integración con Angular

El código en este directorio se integra con la aplicación Angular a través del archivo `src/server.ts`, que configura el manejador de solicitudes para el Worker de Cloudflare.

## Despliegue

El despliegue de la aplicación en Cloudflare Workers se realiza utilizando Wrangler, configurado en `wrangler.jsonc`. Para desplegar, utiliza:

```bash
pnpm run deploy
```
