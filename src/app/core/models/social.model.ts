import { Social as ISocial } from '@core/interfaces/social.interface';

/**
 * Modelo que representa una red social.
 * Implementa la interfaz ISocial.
 */
export class Social implements ISocial {
  #id: string;
  #page: string;
  #url: string;

  /**
   * Crea una instancia de Social.
   * @param data Objeto con datos iniciales que cumplen la interfaz ISocial.
   */
  constructor(data: ISocial) {
    this.#id = data.id;
    this.#page = data.page;
    this.#url = data.url;
  }

  /** Obtiene el ID de la red social. */
  get id(): string {
    return this.#id;
  }

  /** Obtiene el nombre o página de la red social. */
  get page(): string {
    return this.#page;
  }

  /** Obtiene la URL del perfil en la red social. */
  get url(): string {
    return this.#url;
  }
} 