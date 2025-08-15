import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LayoutModel } from '@core/models/layout.model';
import { Layout } from '@core/interfaces/layout.interface';
import { LayoutStatus } from '@core/enums/layout.enum';
import { LoadState } from '@core/enums/load-state.enum';
import { BaseApiService } from './base-api.service';
import { Overlay } from '@core/models/overlay.model';
import { ApiService } from '@core/services/api.service';
import { ApiError } from '@core/interfaces/api-error.interface';

/**
 * Servicio para obtener y gestionar layouts desde la API
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutApiService extends BaseApiService<LayoutModel> {
  constructor(
    http: HttpClient,
    private apiService: ApiService
  ) {
    super(http);
  }

  /**
   * Obtiene los layouts
   * Evita iniciar una nueva carga si los datos ya están cargados o en proceso de carga.
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @param overlays Overlays relacionados con los layouts
   * @returns Observable con los layouts obtenidos
   */
  fetchLayouts(
    params?: HttpParams,
    autoSubscribe: boolean = true,
    overlays: Overlay[] = []
  ): Observable<LayoutModel[]> {
    if (!this.canStartFetch()) {
      return of(this.dataSubject.getValue());
    }

    this.startLoading();

    const observable: Observable<LayoutModel[]> = this.apiService.getFromWorker<Layout[]>('github/layouts').pipe(
      map((response: Layout[]): LayoutModel[] => {
        return response
          .filter((data: Layout) => data.status === LayoutStatus.ACTIVO)
          .map((data: Layout) => new LayoutModel(data, overlays));
      }),
      tap((layouts: LayoutModel[]) => {
        this.dataSubject.next(layouts);
        this.stateSubject.next(LoadState.LOADED);
      }),
      catchError((error: ApiError) => this.handleError<LayoutModel[]>(
        error,
        'Error fetching layouts',
        []
      )),
      this.getFinishLoadingOperator()
    );

    if (autoSubscribe) {
      observable.subscribe();
      return of(this.dataSubject.getValue());
    }

    return observable;
  }
}
