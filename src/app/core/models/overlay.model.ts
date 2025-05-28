import { Overlay as IOverlay } from '@core/interfaces/overlay.interface';
import { Creator } from '@core/models/creator.model';
import { LayoutModel } from '@core/models/layout.model';
import { OverlayStatus } from '@core/enums/overlays.enum';

/**
 * Modelo que representa un overlay.
 * Implementa la interfaz IOverlay.
 */
export class Overlay implements IOverlay {
  #id: string;
  #name: string;
  #description: string;
  #status: OverlayStatus;
  #preview: string;
  #owner: string | Creator;
  #creator: string | Creator;
  #technologies: string;
  #layouts: string | LayoutModel[];
  #creation_date: Date;

  /**
   * Crea una instancia de Overlay.
   * @param data Objeto opcional con datos parciales iniciales que cumplen la interfaz IOverlay.
   * @param availableCreators Array opcional de creadores disponibles para buscar por ID.
   * @param availableLayouts Array opcional de layouts disponibles para buscar por ID.
   */
  constructor(data?: Partial<IOverlay>, availableCreators?: Creator[], availableLayouts?: LayoutModel[]) {
    this.#id = data?.id ?? '';
    this.#name = data?.name ?? '';
    this.#status = data?.status ?? OverlayStatus.BORRADOR;
    this.#preview = data?.preview ?? '';
    this.#description = data?.description ?? '';
    this.#creation_date = data?.creation_date ?? new Date();

    // Procesar owner
    if (typeof data?.owner === 'string' && availableCreators?.length) {
      this.#owner = availableCreators.find(creator => creator.id === data.owner) || data.owner;
    } else {
      this.#owner = data?.owner ?? '';
    }

    // Procesar creator
    if (typeof data?.creator === 'string' && availableCreators?.length) {
      this.#creator = availableCreators.find(creator => creator.id === data.creator) || data.creator;
    } else {
      this.#creator = data?.creator ?? '';
    }

    this.#technologies = data?.technologies ?? '';

    // Procesar layouts
    if (typeof data?.layouts === 'string' && availableLayouts?.length) {
      // Si layouts es un string de IDs separados por coma
      this.#layouts = data.layouts
        .split(',')
        .map(id => id.trim()) // Limpiar espacios
        .filter(id => id !== '') // Filtrar IDs vacíos
        .map(id => availableLayouts.find(layout => layout.id === id)) // Buscar layout por ID
        .filter((layout): layout is LayoutModel => layout !== undefined); // Filtrar no encontrados
    } else if (Array.isArray(data?.layouts)) {
      // Si layouts ya es un array de LayoutModel
      this.#layouts = data.layouts;
    } else {
      // Valor por defecto si no es string ni array
      this.#layouts = []; // Cambiado a array vacío en lugar de string vacío
    }
  }

  /** Obtiene el ID del overlay. */
  get id(): string {
    return this.#id;
  }

  /** Establece el ID del overlay. */
  set id(value: string) {
    this.#id = value;
  }

  /** Obtiene el nombre del overlay. */
  get name(): string {
    return this.#name;
  }

  /** Establece el nombre del overlay. */
  set name(value: string) {
    this.#name = value;
  }

  get description(): string {
    return this.#description;
  }

  set description(value: string) {
    this.#description = value;
  }

  /** Obtiene el estado del overlay. */
  get status(): OverlayStatus {
    return this.#status;
  }

  /** Establece el estado del overlay. */
  set status(value: OverlayStatus) {
    this.#status = value;
  }

  /** Obtiene la URL de la vista previa. */
  get preview(): string {
    return this.#preview;
  }

  /** Establece la URL de la vista previa. */
  set preview(value: string) {
    this.#preview = value;
  }

  /** Obtiene el propietario (ID o Creator). */
  get owner(): string | Creator {
    return this.#owner;
  }

  /** Establece el propietario. */
  set owner(value: string | Creator) {
    this.#owner = value;
  }

  /** Obtiene el creador (ID o Creator). */
  get creator(): string | Creator {
    return this.#creator;
  }

  /** Establece el creador. */
  set creator(value: string | Creator) {
    this.#creator = value;
  }

  /** Obtiene las tecnologías (string). */
  get technologies(): string {
    return this.#technologies;
  }

  /** Establece las tecnologías. */
  set technologies(value: string) {
    this.#technologies = value;
  }

  /** Obtiene los layouts asociados (array de LayoutModel o string vacío si no hay). */
  get layouts(): string | LayoutModel[] {
    return this.#layouts;
  }

  /** Establece los layouts asociados. */
  set layouts(value: string | LayoutModel[]) {
    this.#layouts = value;
  }

  get creation_date(): Date {
    return this.#creation_date;
  }

  set creation_date(value: Date) {
    this.#creation_date = value;
  }

  /**
   * Convierte el modelo Overlay a un objeto JSON que cumple la interfaz IOverlay.
   * @returns Objeto IOverlay.
   */
  toJson(): IOverlay {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      status: this.#status,
      preview: this.#preview,
      owner: this.#owner,
      creator: this.#creator,
      technologies: this.#technologies,
      layouts: this.#layouts,
      creation_date: this.#creation_date,
    };
  }
}
