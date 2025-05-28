/**
 * Interfaz que representa una tecnología utilizada.
 */
export interface Technology {
  /** Identificador único de la tecnología. */
  id: string;
  /** Nombre de la tecnología. */
  name: string;
  /** Código hexadecimal del color asociado a la tecnología. */
  color: string; // Hex color code string
}
