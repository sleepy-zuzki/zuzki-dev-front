import { Overlay } from '@core/models/overlay.model';
import { LayoutStatus } from '@core/enums/layout.enum';

/**
 * Interfaz que representa un layout (diseño) de un overlay.
 */
export interface Layout {
  /** Identificador único del layout. */
  id: string;
  /** Nombre del layout. */
  name: string;
  /** Overlay al que pertenece este layout (puede ser un ID o un objeto Overlay). */
  overlays: string | Overlay;
  /** Estado del layout (ej. Borrador, Activo). */
  status: LayoutStatus;
  /** URL de la imagen de vista previa del layout. */
  preview: string;
  /** URL del archivo fuente o definición del layout. */
  source: string;
}
