/**
 * Define los posibles estados de un layout.
 */
export enum LayoutStatus {
  /** El layout está activo y listo para usarse. */
  ACTIVO = 'Activo',
  /** El layout está en desarrollo o revisión. */
  BORRADOR = 'Borrador',
  /** El layout ha sido desactivado (estado futuro). */
  DESACTIVADO = 'Desactivado' // Estado futuro
}
