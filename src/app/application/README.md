# Capa de Aplicación (Application Layer)

Este directorio contiene la lógica que orquesta los casos de uso de la aplicación. Actúa como un intermediario entre la capa de `features` (UI) y la capa de `domain` (lógica de negocio).

Su principal responsabilidad es recibir peticiones, invocar la lógica de dominio correspondiente y devolver los resultados.

## Subdirectorios

-   **/dtos**: Contiene los Data Transfer Objects (DTOs), que son objetos planos utilizados para transferir datos entre capas (ej. desde la API hacia la aplicación o viceversa).
-   **/ports**: Define los `puertos` (interfaces) que la capa de aplicación expone a las capas externas (como la UI). Estos puertos son la única manera de interactuar con los casos de uso.
-   **/use-cases**: Contiene la implementación de los casos de uso específicos de la aplicación (ej. `CrearUsuario`, `ObtenerProyectoPorId`). Cada caso de uso encapsula una funcionalidad completa.
