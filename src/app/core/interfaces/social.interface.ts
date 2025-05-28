/**
 * Interfaz que representa una red social.
 */
export interface Social {
  /** Identificador único de la red social. */
  id: string;
  /** Nombre o página de la red social (ej. Twitter, Github). */
  page: string;
  /** URL del perfil en la red social. */
  url: string;
}
