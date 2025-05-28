import { AfterViewInit, Component, effect, ElementRef, Signal, ViewChild } from '@angular/core';
import { Overlay } from '@core/models/overlay.model';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { OverlayService } from '@services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { LayoutModel } from '@core/models/layout.model';
import { ButtonComponent } from '@components/ui';
import { OverlayApiService } from '@services/overlay-api.service';

@Component({
  selector: 'app-work-detail-feature',
  imports: [
    ButtonComponent
  ],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css'
})
export class WorkDetailsComponent implements AfterViewInit {
  /** Señal con el ID del overlay obtenido de los parámetros de la ruta. */
  overlayId: Signal<string | null>;
  currentOverlay: Overlay | null = null;
  @ViewChild('streamerView') viewElement?: ElementRef<HTMLIFrameElement>;
  @ViewChild('layoutsMenuDialog') layoutsMenuDialog!: ElementRef<HTMLDialogElement>;

  /**
   * @param route Servicio para acceder a los parámetros de la ruta activa.
   * @param apiService Servicio para obtener datos de la API.
   * @param overlayApiService
   * @param overlayService Servicio para gestionar el estado del overlay/layout.
   */
  constructor (
    private route: ActivatedRoute,
    private overlayApiService: OverlayApiService,
    private overlayService: OverlayService
  ) {
    const availableOverlays: Signal<Overlay[]> = this.overlayApiService.data;

    this.overlayId = toSignal(
      this.route.paramMap.pipe(map(params => params.get('id'))),
      { initialValue: null }
    );

    effect(() => {
      if (availableOverlays().length === 0) {
        this.overlayApiService.fetchOverlays();
      }
    });

    effect((): void => {
      const currentOverlaysValue: Overlay[] = availableOverlays();
      const currentOverlayId: string | null = this.overlayId();
      if (currentOverlaysValue && currentOverlaysValue.length > 0 && currentOverlayId !== null) {
        this.currentOverlay = currentOverlaysValue.find(
          (overlay: Overlay) => overlay.id === currentOverlayId
        ) ?? null;

        this.overlayService.setCurrentOverlay(this.currentOverlay);

        // Si se encontró el overlay, intentar establecer su primer layout
        if (this.currentOverlay && Array.isArray(this.currentOverlay.layouts)) {
          const layouts: LayoutModel[] = this.currentOverlay.layouts;
          this.overlayService.setCurrentLayout(layouts.length > 0 ? layouts[0] : null);
        }
      } else {
        // Si no hay overlays disponibles, o no hay currentOverlayId, resetea
        this.currentOverlay = null;
        this.overlayService.setCurrentOverlay(null);
        this.overlayService.setCurrentLayout(null);
      }

    });

    /**
     * Efecto que reacciona a cambios en el layout actual seleccionado en OverlayService.
     * Actualiza el atributo 'src' del iframe para mostrar el nuevo layout.
     */
    effect(() => {
      const layout = this.overlayService.currentLayout();
      const element = this.viewElement?.nativeElement;

      if (element) {
        element.src = layout ? layout.source : 'about:blank';
      }
    });

  }

  ngAfterViewInit(): void {
    const initialLayout: LayoutModel | null = this.overlayService.currentLayout();
    if (this.viewElement && initialLayout) {
      this.viewElement.nativeElement.src = initialLayout.source;
    } else if (this.viewElement) {
      this.viewElement.nativeElement.src = 'about:blank';
    }
  }

  openLayoutsMenu(): void {
    this.layoutsMenuDialog.nativeElement.showModal();
  }

  closeLayoutsMenu(): void {
    this.layoutsMenuDialog.nativeElement.close();
  }

  getOverlayLayouts() {
    return this.overlayService.overlayLayouts();
  }

  /**
   * Cambia el layout actual del overlay seleccionado.
   * @param layout_id El ID del layout a establecer como actual.
   */
  changeLayout(layout_id: string): void {
    const reqLayout: LayoutModel | undefined = this.overlayService.overlayLayouts().find((layout: LayoutModel) => layout.id === layout_id);
    if (reqLayout) {
      this.overlayService.setCurrentLayout(reqLayout);
      this.closeLayoutsMenu();
    }
  }
}
