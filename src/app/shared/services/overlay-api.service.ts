import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of, switchMap, tap, catchError } from 'rxjs';
import { Overlay } from '@core/models/overlay.model';
import { Overlay as IOverlay } from '@core/interfaces/overlay.interface';
import { OverlayStatus } from '@core/enums/overlays.enum';
import { LoadState } from '@core/enums/load-state.enum';
import { BaseApiService } from './base-api.service';
import { CreatorApiService } from './creator-api.service';
import { LayoutApiService } from './layout-api.service';
import { Creator } from '@core/models/creator.model';
import { LayoutModel } from '@core/models/layout.model';

/**
 * Servicio para obtener y gestionar overlays desde la API
 */
@Injectable({
  providedIn: 'root'
})
export class OverlayApiService extends BaseApiService<Overlay> {
  constructor(
    http: HttpClient,
    private creatorApiService: CreatorApiService,
    private layoutApiService: LayoutApiService
  ) {
    super(http);
  }

  /**
   * Obtiene los overlays con toda su información relacionada
   * Realiza una carga en cascada si es necesario (primero creadores, luego layouts)
   * Evita iniciar una nueva carga si los datos ya están cargados o en proceso de carga.
   * @param params Parámetros HTTP opcionales
   */
  fetchOverlays(params?: HttpParams): void {
    if (!this.canStartFetch()) {
      return;
    }

    this.startLoading();

    const availableCreators: Creator[] = this.creatorApiService.data();

    if (availableCreators.length === 0) {
      // Si no hay creadores, cargarlos primero
      this.creatorApiService.fetchCreators(params, false)
        .pipe(
          switchMap(() => this.fetchOverlaysWithLayouts(params, true)),
          this.getFinishLoadingOperator()
        )
        .subscribe();
    } else {
      // Si ya hay creadores, cargar overlays con layouts
      this.fetchOverlaysWithLayouts(params, true)
        .pipe(
          this.getFinishLoadingOperator()
        )
        .subscribe();
    }
  }

  /**
   * Obtiene todos los overlays con sus layouts
   * Realiza una carga en cascada si es necesario
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con los overlays obtenidos
   */
  fetchOverlaysWithLayouts(
    params?: HttpParams,
    autoSubscribe: boolean = false
  ): Observable<Overlay[]> {
    this.startLoading();

    const availableLayouts: LayoutModel[] = this.layoutApiService.data();

    const observable: Observable<Overlay[]> = availableLayouts.length === 0
      ? this.fetchRawOverlays(params).pipe(
          switchMap(() => this.layoutApiService.fetchLayouts(params, false, this.dataSubject.getValue())),
          switchMap(() => this.loadOverlaysWithFullData(params))
        )
      : this.loadOverlaysWithFullData(params);

    if (autoSubscribe) {
      observable.subscribe();
      return of(this.dataSubject.getValue());
    }

    return observable;
  }

  /**
   * Obtiene los datos básicos de overlays sin procesar layouts
   * @param params Parámetros HTTP opcionales
   * @returns Observable con los overlays obtenidos (sin layouts completos)
   * @private
   */
  private fetchRawOverlays(params?: HttpParams): Observable<Overlay[]> {
    return this.http.get<IOverlay[]>('overlays', { params }).pipe(
      map((response: IOverlay[]): Overlay[] => {
        const creators: Creator[] = this.creatorApiService.data();
        return response
        .filter((data: IOverlay) => data.status === OverlayStatus.ACTIVO)
        .map((data: IOverlay) =>
          new Overlay({...data, layouts: ''}, creators)
        );
      }),
      tap((overlays: Overlay[]) => {
        this.dataSubject.next(overlays);
      }),
      catchError((error: any) => this.handleError<Overlay[]>(
        error,
        'Error fetching raw overlays',
        []
      ))
    );
  }

  /**
   * Carga overlays con datos completos (creadores y layouts)
   * @param params Parámetros HTTP opcionales
   * @returns Observable con los overlays obtenidos (con layouts completos)
   * @private
   */
  private loadOverlaysWithFullData(params?: HttpParams): Observable<Overlay[]> {
    return this.http.get<IOverlay[]>('overlays', { params }).pipe(
      map((response: IOverlay[]): Overlay[] => {
        const creators: Creator[] = this.creatorApiService.data();
        const layouts: LayoutModel[] = this.layoutApiService.data();
        return response
          .filter((data: IOverlay) => data.status === OverlayStatus.ACTIVO)
          .map((data: IOverlay) => new Overlay(data, creators, layouts));
      }),
      tap((overlays: Overlay[]) => {
        this.dataSubject.next(overlays);
        this.stateSubject.next(LoadState.LOADED);
      }),
      catchError((error: any) => this.handleError<Overlay[]>(
        error,
        'Error fetching overlays with full data',
        this.dataSubject.getValue()
      ))
    );
  }
}
