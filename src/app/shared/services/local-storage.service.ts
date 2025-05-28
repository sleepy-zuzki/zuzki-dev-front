import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Obtiene un item del localStorage verificando que estemos en un navegador
   * @param key Clave del item a obtener
   * @returns El valor del item o null si no existe o no estamos en un navegador
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Guarda un item en el localStorage verificando que estemos en un navegador
   * @param key Clave del item a guardar
   * @param value Valor a guardar
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Elimina un item del localStorage verificando que estemos en un navegador
   * @param key Clave del item a eliminar
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Verifica si estamos en un navegador
   * @returns true si estamos en un navegador, false si estamos en servidor
   */
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
