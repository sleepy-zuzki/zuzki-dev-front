import { Injectable, signal, WritableSignal, Signal } from '@angular/core';
import { Overlay } from '@core/models/overlay.model';
import { LayoutModel } from '@core/models/layout.model';

/**
 * Servicio para gestionar el estado del overlay y layout seleccionados actualmente.
 * Utiliza Signals para mantener y exponer el estado reactivamente.
 */
@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  /** Signal privado para el overlay actualmente seleccionado. */
  private currentOverlaySignal: WritableSignal<Overlay | null> = signal<Overlay | null>(null);
  /** Signal privado para los layouts asociados al overlay actual. */
  private overlayLayoutsSignal: WritableSignal<LayoutModel[]> = signal<LayoutModel[]>([]);
  /** Signal privado para el layout actualmente seleccionado. */
  private currentLayoutSignal: WritableSignal<LayoutModel | null> = signal<LayoutModel | null>(null);

  /** Obtiene un Signal de solo lectura para el overlay actual. */
  get currentOverlay(): Signal<Overlay | null> {
    return this.currentOverlaySignal.asReadonly(); // Exponer como solo lectura
  }

  /**
   * Obtiene un Signal de solo lectura para los layouts del overlay actual.
   */
  get overlayLayouts(): Signal<LayoutModel[]> {
    return this.overlayLayoutsSignal.asReadonly(); // Exponer como solo lectura
  }

  /** Obtiene un Signal de solo lectura para el layout actual. */
  get currentLayout(): Signal<LayoutModel | null> {
    return this.currentLayoutSignal.asReadonly(); // Exponer como solo lectura
  }

  /**
   * Establece el overlay actual y actualiza la lista de layouts correspondientes.
   * @param overlay El overlay a establecer como actual, o null.
   */
  setCurrentOverlay(overlay: Overlay | null): void {
    this.currentOverlaySignal.set(overlay);

    // Actualizar layouts basados en el overlay actual
    if (overlay && overlay.layouts && Array.isArray(overlay.layouts)) {
      this.setOverlayLayouts(overlay.layouts);
    } else {
      this.setOverlayLayouts([]); // Limpiar layouts si no hay overlay o no tiene layouts válidos
    }
  }

  /**
   * Establece el layout actual seleccionado.
   * @param layout El layout a establecer como actual, o null.
   */
  setCurrentLayout (layout: LayoutModel | null): void {
    this.currentLayoutSignal.set(layout);
  }

  /**
   * Establece la lista de layouts disponibles para el overlay actual.
   * Este método es llamado internamente por setCurrentOverlay, pero puede ser
   * llamado externamente si es necesario actualizar los layouts independientemente.
   * @param layouts Array de LayoutModel.
   */
  setOverlayLayouts (layouts: LayoutModel[]): void {
    this.overlayLayoutsSignal.set(layouts);
  }
}
