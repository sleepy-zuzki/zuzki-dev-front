import { Creator } from '@core/models/creator.model';
import { LayoutModel } from '@core/models/layout.model';
import { OverlayStatus } from '@core/enums/overlays.enum';

/**
 * Interfaz que representa un overlay.
 */
export interface Overlay {
  /** Identificador único del overlay. */
  id: string;
  /** Nombre del overlay. */
  name: string;
  /** Descripción del overlay. */
  description: string;
  /** Estado actual del overlay. */
  status: OverlayStatus;
  /** URL de la imagen de vista previa del overlay. */
  preview: string;
  /** Propietario del overlay (puede ser un ID o un objeto Creator). */
  owner: string | Creator;
  /** Creador del overlay (puede ser un ID o un objeto Creator). */
  creator: string | Creator;
  /** Cadena que representa las tecnologías utilizadas (formato por definir). */
  technologies: string;
  /** Layouts asociados al overlay (puede ser un ID o un array de objetos LayoutModel). */
  layouts: string | LayoutModel[];
  /** Fecha de creación del overlay. */
  creation_date: Date;
}
