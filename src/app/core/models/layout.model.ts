import { LayoutStatus } from '@core/enums/layout.enum';
import { Layout } from '../interfaces/layout.interface';
import { Overlay } from '@core/models/overlay.model';

/**
 * Modelo que representa un layout (diseño) de un overlay.
 * Implementa la interfaz Layout.
 */
export class LayoutModel implements Layout {
  #id: string;
  #name: string;
  #overlays: string | Overlay;
  #status: LayoutStatus;
  #preview: string;
  #source: string;

  /**
   * Crea una instancia de LayoutModel.
   * @param data Objeto opcional con datos iniciales que cumplen la interfaz Layout.
   * @param availableOverlays Array opcional de overlays disponibles para buscar por ID.
   */
  constructor(data?: Layout, availableOverlays?: Overlay[]) {
    this.#id = data?.id || '';
    this.#name = data?.name || '';

    // Procesar overlay
    if (typeof data?.overlays === 'string' && availableOverlays?.length) {
      this.#overlays = availableOverlays.find(overlay => overlay.id === data.overlays) || data.overlays;
    } else {
      this.#overlays = data?.overlays || '';
    }

    this.#status = data?.status ?? LayoutStatus.BORRADOR;
    this.#preview = data?.preview || '';
    this.#source = data?.source || '';
  }

  /** Obtiene el ID del layout. */
  public get id(): string {
    return this.#id;
  }

  /** Establece el ID del layout. */
  public set id(value: string) {
    this.#id = value;
  }

  /** Obtiene el nombre del layout. */
  public get name(): string {
    return this.#name;
  }

  /** Establece el nombre del layout. */
  public set name(value: string) {
    this.#name = value;
  }

  /** Obtiene el overlay asociado (ID u objeto). */
  public get overlays(): string | Overlay {
    return this.#overlays;
  }

  /** Establece el overlay asociado. */
  public set overlays(value: string | Overlay) {
    this.#overlays = value;
  }

  /** Obtiene el estado del layout. */
  public get status(): LayoutStatus {
    return this.#status;
  }

  /** Establece el estado del layout. */
  public set status(value: LayoutStatus) {
    this.#status = value;
  }

  /** Obtiene la URL de la vista previa. */
  public get preview(): string {
    return this.#preview;
  }

  /** Establece la URL de la vista previa. */
  public set preview(value: string) {
    this.#preview = value;
  }

  /** Obtiene la URL del fuente. */
  public get source(): string {
    return this.#source;
  }

  /** Establece la URL del fuente. */
  public set source(value: string) {
    this.#source = value;
  }
}
