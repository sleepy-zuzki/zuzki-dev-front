import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Social } from '@core/models/social.model';
import { Social as ISocial } from '@core/interfaces/social.interface';
import { BaseApiService } from './base-api.service';
import { LoadState } from '@core/enums/load-state.enum';

/**
 * Servicio para obtener y gestionar redes sociales desde la API
 */
@Injectable({
  providedIn: 'root'
})
export class SocialApiService extends BaseApiService<Social> {
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene las redes sociales
   * Evita iniciar una nueva carga si los datos ya están cargados o en proceso de carga.
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con las redes sociales obtenidas
   */
  fetchSocials(params?: HttpParams, autoSubscribe: boolean = true): Observable<Social[]> {
    if (!this.canStartFetch()) {
      return of(this.dataSubject.getValue());
    }

    this.startLoading();

    const observable: Observable<Social[]> = this.http.get<ISocial[]>('socials', { params }).pipe(
      map((response: ISocial[]): Social[] =>
        response.map((data: ISocial) => new Social(data))
      ),
      tap((socials: Social[]) => {
        this.dataSubject.next(socials);
        this.stateSubject.next(LoadState.LOADED);
      }),
      catchError((error: any) => this.handleError<Social[]>(
        error,
        'Error fetching socials',
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
