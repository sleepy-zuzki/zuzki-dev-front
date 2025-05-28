import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize, map, of, switchMap, tap, catchError } from 'rxjs';
import { Creator } from '@core/models/creator.model';
import { Creator as ICreator } from '@core/interfaces/creator.interface';
import { LoadState } from '@core/enums/load-state.enum';
import { BaseApiService } from './base-api.service';
import { SocialApiService } from './social-api.service';
import { Social } from '@core/models/social.model';

/**
 * Servicio para obtener y gestionar creadores desde la API
 */
@Injectable({
  providedIn: 'root'
})
export class CreatorApiService extends BaseApiService<Creator> {
  constructor(
    http: HttpClient,
    private socialApiService: SocialApiService
  ) {
    super(http);
  }

  /**
   * Obtiene los creadores con sus redes sociales
   * Realiza una carga en cascada si es necesario
   * Evita iniciar una nueva carga si los datos ya están cargados o en proceso de carga.
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con los creadores obtenidos
   */
  fetchCreators(params?: HttpParams, autoSubscribe: boolean = true): Observable<Creator[]> {
    if (!this.canStartFetch()) {
      return of(this.dataSubject.getValue());
    }

    this.startLoading();

    const availableSocials: Social[] = this.socialApiService.data();

    const observable: Observable<Creator[]> = availableSocials.length === 0
      ? this.socialApiService.fetchSocials(params, false).pipe(
          switchMap(() => this.loadCreators(params))
        )
      : this.loadCreators(params);

    const finalObservable: Observable<Creator[]> = observable.pipe(
      this.getFinishLoadingOperator()
    );

    if (autoSubscribe) {
      finalObservable.subscribe();
      return of(this.dataSubject.getValue());
    }

    return finalObservable;
  }

  /**
   * Carga los creadores con las redes sociales disponibles
   * @param params Parámetros HTTP opcionales
   * @returns Observable con los creadores obtenidos
   * @private
   */
  private loadCreators(params?: HttpParams): Observable<Creator[]> {
    return this.http.get<ICreator[]>('creators', { params }).pipe(
      map((response: ICreator[]): Creator[] => {
        const socials: Social[] = this.socialApiService.data();
        return response.map((data: ICreator) => new Creator(data, socials));
      }),
      tap((creators: Creator[]) => {
        this.dataSubject.next(creators);
        this.stateSubject.next(LoadState.LOADED);
      }),
      catchError((error: any) => this.handleError<Creator[]>(
        error,
        'Error fetching creators',
        []
      ))
    );
  }
}
