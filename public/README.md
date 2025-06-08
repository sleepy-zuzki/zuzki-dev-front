# Directorio Public

Este directorio contiene archivos estáticos que se sirven directamente sin procesamiento.

## Contenido

- **Fuentes**: Archivos de fuentes tipográficas utilizadas en la aplicación
- **Imágenes**: Logotipos, iconos y otras imágenes estáticas
- **Documentos**: PDFs y otros documentos para descarga
- **Manifiestos**: Archivos manifest.json y browserconfig.xml
- **Iconos**: Favicons en diferentes tamaños

## Uso

Estos archivos se copian directamente al directorio de salida durante la compilación y pueden referenciarse en la aplicación utilizando rutas relativas a la raíz:

```html
<img src="/images/logo.svg" alt="Logo" />
```

## Notas

- Los archivos en este directorio no pasan por el proceso de empaquetado de Angular/Webpack
- Para recursos que necesitan procesamiento, colócalos en `src/assets/` en su lugar
