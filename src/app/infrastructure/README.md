# Capa de Infraestructura (Infrastructure Layer)

Este directorio contiene las implementaciones concretas de las abstracciones (interfaces/puertos) definidas en las capas de `core` y `application`. Se encarga de la comunicación con el mundo exterior, como bases de datos, APIs externas, sistemas de archivos, etc.

Gracias a esta separación, la lógica de negocio (`domain`) no depende de ninguna tecnología específica, y podemos intercambiar las implementaciones fácilmente (por ejemplo, cambiar de un servicio REST a gRPC).

## Subdirectorios

-   **/adapters**: Contiene los `adaptadores`.
    -   **Primary/Driving Adapters**: (No siempre presentes) Conectan al usuario con la aplicación (ej. Controladores de API REST).
    -   **Secondary/Driven Adapters**: Implementan los puertos de salida (ej. repositorios que usan `HttpClient` para conectarse a una API, en lugar de una base de datos).
-   **/config**: Almacena la configuración relacionada con la infraestructura, como la configuración de la API o la inyección de dependencias.
-   **/interceptors**: Contiene interceptores HTTP que se aplican a nivel de infraestructura, como añadir tokens de autenticación a las peticiones salientes.
