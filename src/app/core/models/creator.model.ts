import { Creator as ICreator } from '@core/interfaces/creator.interface';
import { Social } from './social.model';

/**
 * Modelo que representa al creador de contenido.
 * Implementa la interfaz ICreator.
 */
export class Creator implements ICreator {
  #id: string;
  #name: string;
  #email: string;
  #socials: Social[] | string; // Puede ser array de Social o string (posiblemente IDs)

  /**
   * Crea una instancia de Creator.
   * @param data Objeto opcional con datos iniciales que cumplen la interfaz ICreator.
   * @param availableSocials Array opcional de modelos Social disponibles para buscar por ID si data.socials es un string.
   */
  constructor(data?: Partial<ICreator>, availableSocials?: Social[]) {
    this.#id = data?.id ?? '';
    this.#name = data?.name ?? '';
    this.#email = data?.email ?? '';

    // Procesar socials
    if (typeof data?.socials === 'string' && availableSocials?.length) {
      // Asumimos que el string contiene IDs separados por comas
      const socialIds = data.socials.split(',').map(id => id.trim()).filter(id => id !== '');
      this.#socials = socialIds
        .map(id => availableSocials.find(s => s.id === id))
        .filter((s): s is Social => s !== undefined);
    } else if (Array.isArray(data?.socials)) {
      // Si ya es un array de objetos Social (o compatibles)
      // Podríamos instanciar Social si no lo son, pero asumimos que vienen correctos
      this.#socials = data.socials as Social[];
    } else {
      this.#socials = data?.socials ?? []; // Por defecto, array vacío
    }
  }

  /** Obtiene el ID del creador. */
  get id(): string {
    return this.#id;
  }

  /** Establece el ID del creador. */
  set id(value: string) {
    this.#id = value;
  }

  /** Obtiene el nombre del creador. */
  get name(): string {
    return this.#name;
  }

  /** Establece el nombre del creador. */
  set name(value: string) {
    this.#name = value;
  }

  /** Obtiene el correo electrónico del creador. */
  get email(): string {
    return this.#email;
  }

  /** Establece el correo electrónico del creador. */
  set email(value: string) {
    this.#email = value;
  }

  /** Obtiene las redes sociales del creador (array de Social o string original). */
  get socials(): Social[] | string {
    return this.#socials;
  }

  /** Establece las redes sociales del creador. */
  set socials(value: Social[] | string) {
    this.#socials = value;
  }
}
