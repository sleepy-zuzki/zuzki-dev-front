/**
 * Define los posibles estados de un overlay.
 */
export enum OverlayStatus {
  /** El overlay está activo y listo para usarse. */
  ACTIVO = 'Activo',
  /** El overlay está en desarrollo o revisión. */
  BORRADOR = 'Borrador',
  /** El overlay ha sido desactivado (estado futuro). */
  DESACTIVADO = 'Desactivado' // Estado futuro
}
