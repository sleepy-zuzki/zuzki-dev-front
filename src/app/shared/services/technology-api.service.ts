import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { TechnologyModel } from '@core/models/technology.model';
import { Technology } from '@core/interfaces/technology.interface';
import { LoadState } from '@core/enums/load-state.enum';
import { BaseApiService } from './base-api.service';

/**
 * Servicio para obtener y gestionar tecnologías desde la API
 */
@Injectable({
  providedIn: 'root'
})
export class TechnologyApiService extends BaseApiService<TechnologyModel> {
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene las tecnologías
   * Evita iniciar una nueva carga si los datos ya están cargados o en proceso de carga.
   * @param params Parámetros HTTP opcionales
   */
  fetchTechnologies(params?: HttpParams): void {
    if (!this.canStartFetch()) {
      return;
    }

    this.startLoading();

    this.http.get<Technology[]>('tecnologies', { params })
      .pipe(
        map((response: Technology[]): TechnologyModel[] =>
          response.map((data: Technology) => new TechnologyModel(data))
        ),
        tap((technologies: TechnologyModel[]) => {
          this.dataSubject.next(technologies);
          this.stateSubject.next(LoadState.LOADED);
        }),
        catchError((error: any) => this.handleError<TechnologyModel[]>(
          error,
          'Error fetching technologies',
          []
        )),
        this.getFinishLoadingOperator()
      )
      .subscribe();
  }
}
