# Herramientas de Desarrollo

Este directorio contiene scripts y utilidades para ayudar en el desarrollo, compilación y despliegue de la aplicación.

## Contenido

- **Scripts de build**: Ayudan a automatizar el proceso de compilación
- **Generadores**: Scripts para generar componentes, servicios o páginas según los estándares del proyecto
- **Analizadores**: Herramientas para analizar el tamaño y rendimiento del bundle
- **Utilidades de despliegue**: Scripts para facilitar el despliegue en entornos específicos

## Uso

La mayoría de estos scripts se ejecutan a través de npm/pnpm scripts definidos en `package.json`. Por ejemplo:

```bash
pnpm run analyze-bundle
```

## Desarrollo

Si necesitas agregar nuevos scripts o herramientas, asegúrate de documentarlos adecuadamente y, si es posible, agrégalos como un script npm para facilitar su uso por parte de otros desarrolladores.
