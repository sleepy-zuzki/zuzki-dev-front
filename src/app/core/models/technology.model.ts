import { Technology } from '../interfaces/technology.interface';

/**
 * Modelo que representa una tecnología utilizada.
 * Implementa la interfaz Technology.
 */
export class TechnologyModel implements Technology {
  #id: string;
  #name: string;
  #color: string;

  /**
   * Crea una instancia de TechnologyModel.
   * @param data Objeto opcional con datos iniciales que cumplen la interfaz Technology.
   */
  constructor(data?: Technology) {
    this.#id = data?.id || '';
    this.#name = data?.name || '';
    this.#color = data?.color || '#FFFFFF'; // Default to white if not provided
  }

  /** Obtiene el ID de la tecnología. */
  public get id(): string {
    return this.#id;
  }

  /** Establece el ID de la tecnología. */
  public set id(value: string) {
    this.#id = value;
  }

  /** Obtiene el nombre de la tecnología. */
  public get name(): string {
    return this.#name;
  }

  /** Establece el nombre de la tecnología. */
  public set name(value: string) {
    this.#name = value;
  }

  /** Obtiene el color asociado a la tecnología. */
  public get color(): string {
    return this.#color;
  }

  /** Establece el color asociado a la tecnología. */
  public set color(value: string) {
    this.#color = value;
  }
} 