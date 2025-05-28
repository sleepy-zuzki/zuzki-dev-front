import { Social } from './social.interface';

/**
 * Interfaz que representa al creador de contenido.
 */
export interface Creator {
  /** Identificador único del creador. */
  id: string;
  /** Nombre del creador. */
  name: string;
  /** Correo electrónico del creador. */
  email: string;
  /** Redes sociales del creador (puede ser un array de objetos Social o una cadena). */
  socials: Social[] | string;
}
