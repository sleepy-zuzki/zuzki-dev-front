/**
 * Interfaz genérica para una respuesta de la API de Strapi.
 * @template T Tipo de los datos contenidos en la respuesta.
 */
export interface StrapiResponse<T> {
  /** Array de datos de la respuesta. */
  data: T[];
  /** Metadatos de la respuesta, incluyendo información de paginación. */
  meta: {
    /** Información sobre la paginación de los resultados. */
    pagination: {
      /** Número de la página actual. */
      page: number;
      /** Tamaño de la página (número de elementos por página). */
      pageSize: number;
      /** Número total de páginas disponibles. */
      pageCount: number;
      /** Número total de elementos encontrados. */
      total: number;
    };
  };
}

/**
 * Interfaz que representa un único elemento de datos dentro de la respuesta de Strapi.
 */
export interface Datum {
  /** Identificador único del elemento. */
  id: string;
  /** Atributos del elemento. */
  attributes: {
    /** Etiqueta o nombre del elemento. */
    label: string;
    /** URL asociada al elemento. */
    url: string;
    /** URL del repositorio asociado al elemento. */
    repository: string;
    /** Información de la captura de pantalla (opcional). */
    screenshot?: {
      /** Datos de la imagen. */
      data: {
        /** Atributos de la imagen. */
        attributes: {
          /** Formatos disponibles de la imagen. */
          formats: {
            /** Formato de miniatura. */
            thumbnail: {
              /** URL de la miniatura. */
              url: string;
              /** Ancho de la miniatura. */
              width: number;
              /** Alto de la miniatura. */
              height: number;
            };
          };
        };
      };
    };
    /** Tecnologías asociadas al elemento. */
    techs: {
      /** Array de datos de las tecnologías. */
      data: Array<{
        /** Identificador único de la tecnología. */
        id: string;
        /** Atributos de la tecnología. */
        attributes: {
          /** Etiqueta o nombre de la tecnología. */
          label: string;
          /** Nombre del icono asociado a la tecnología. */
          icon_name: string;
          /** Familia o categoría del icono. */
          family: string;
          /** Color asociado a la tecnología. */
          color: string;
        };
      }>;
    };
  };
} 