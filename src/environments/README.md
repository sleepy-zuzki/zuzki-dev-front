# Entornos (Environments)

Este directorio contiene los archivos de configuración para los diferentes entornos de despliegue.

Angular CLI utiliza estos archivos durante el proceso de compilación para inyectar la configuración correcta según el entorno de destino (desarrollo, producción, etc.).

## Archivos

-   **`environment.ts`**: La configuración base, generalmente utilizada para producción.
-   **`environment.development.ts`**: La configuración para el entorno de desarrollo. Sobrescribe las propiedades definidas en `environment.ts`.

La sustitución de archivos se configura en `angular.json`, en la sección `build.configurations`.
