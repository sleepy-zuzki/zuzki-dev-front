import { HttpContextToken } from '@angular/common/http';

/**
 * Enumeración que define los tipos de API disponibles
 */
export enum ApiType {
  MAKE = 'make',
  WORKER = 'worker',
  NONE = 'none'
}

/**
 * Token de contexto HTTP para identificar el tipo de API al que se dirige una solicitud
 * Valor predeterminado: ApiType.NONE
 */
export const API_TYPE = new HttpContextToken<ApiType>(() => ApiType.NONE);
