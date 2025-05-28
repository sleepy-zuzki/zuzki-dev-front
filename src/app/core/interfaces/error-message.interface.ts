/**
 * Interfaz para el mensaje de error
 */
export interface ErrorMessage {
  /** Mensaje descriptivo del error */
  message: string;
  /** Código de estado HTTP (opcional) */
  status?: number;
  /** Momento en que ocurrió el error */
  timestamp: Date;
} 