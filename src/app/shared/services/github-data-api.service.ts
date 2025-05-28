import { Injectable, Signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Overlay } from '@core/models/overlay.model';
import { Creator } from '@core/models/creator.model';
import { Social } from '@core/models/social.model';
import { LayoutModel } from '@core/models/layout.model';
import { TechnologyModel } from '@core/models/technology.model';
import { LoadState } from '@core/enums/load-state.enum';
import { ErrorMessage } from '@core/interfaces/error-message.interface';
import { Observable, of } from 'rxjs';
import { SocialApiService } from './social-api.service';
import { CreatorApiService } from './creator-api.service';
import { LayoutApiService } from './layout-api.service';
import { TechnologyApiService } from './technology-api.service';
import { OverlayApiService } from './overlay-api.service';

/**
 * Servicio fachada para acceder a todos los datos de la API
 * Delega las responsabilidades específicas a servicios dedicados para cada entidad
 */
@Injectable({
  providedIn: 'root'
})
export class GithubDataApiService {
  /**
   * Constructor del servicio
   * Inyecta todos los servicios específicos necesarios
   */
  constructor(
    private socialApiService: SocialApiService,
    private creatorApiService: CreatorApiService,
    private layoutApiService: LayoutApiService,
    private technologyApiService: TechnologyApiService,
    private overlayApiService: OverlayApiService
  ) {}

  // Getters para signals de datos
  get overlays(): Signal<Overlay[]> {
    return this.overlayApiService.data;
  }

  get creators(): Signal<Creator[]> {
    return this.creatorApiService.data;
  }

  get socials(): Signal<Social[]> {
    return this.socialApiService.data;
  }

  get layouts(): Signal<LayoutModel[]> {
    return this.layoutApiService.data;
  }

  get technologies(): Signal<TechnologyModel[]> {
    return this.technologyApiService.data;
  }

  // Getters para signals de estados de carga
  get overlaysState(): Signal<LoadState> {
    return this.overlayApiService.state;
  }

  get creatorsState(): Signal<LoadState> {
    return this.creatorApiService.state;
  }

  get socialsState(): Signal<LoadState> {
    return this.socialApiService.state;
  }

  get layoutsState(): Signal<LoadState> {
    return this.layoutApiService.state;
  }

  get technologiesState(): Signal<LoadState> {
    return this.technologyApiService.state;
  }

  // Getters para signals de errores
  get overlaysError(): Signal<ErrorMessage | null> {
    return this.overlayApiService.error;
  }

  get creatorsError(): Signal<ErrorMessage | null> {
    return this.creatorApiService.error;
  }

  get socialsError(): Signal<ErrorMessage | null> {
    return this.socialApiService.error;
  }

  get layoutsError(): Signal<ErrorMessage | null> {
    return this.layoutApiService.error;
  }

  get technologiesError(): Signal<ErrorMessage | null> {
    return this.technologyApiService.error;
  }

  /**
   * Obtiene los overlays con toda su información relacionada
   * Delega al servicio específico de overlays
   * @param params Parámetros HTTP opcionales
   */
  fetchOverlays(params?: HttpParams): void {
    this.overlayApiService.fetchOverlays(params);
  }

  /**
   * Obtiene todos los overlays con sus layouts
   * Delega al servicio específico de overlays
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con los overlays obtenidos
   */
  fetchOverlaysWithLayouts(
    params?: HttpParams,
    autoSubscribe: boolean = false
  ): Observable<Overlay[]> {
    return this.overlayApiService.fetchOverlaysWithLayouts(params, autoSubscribe);
  }

  /**
   * Obtiene las redes sociales
   * Delega al servicio específico de redes sociales
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con las redes sociales obtenidas
   */
  fetchSocials(
    params?: HttpParams,
    autoSubscribe: boolean = true
  ): Observable<Social[]> {
    return this.socialApiService.fetchSocials(params, autoSubscribe);
  }

  /**
   * Obtiene los creadores con sus redes sociales
   * Delega al servicio específico de creadores
   * @param params Parámetros HTTP opcionales
   * @param autoSubscribe Si es true, autogestiona la suscripción
   * @returns Observable con los creadores obtenidos
   */
  fetchCreators(
    params?: HttpParams,
    autoSubscribe: boolean = true
  ): Observable<Creator[]> {
    return this.creatorApiService.fetchCreators(params, autoSubscribe);
  }

  /**
   * Obtiene los layouts
   * Delega al servicio específico de layouts
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
    return this.layoutApiService.fetchLayouts(params, autoSubscribe, overlays);
  }

  /**
   * Obtiene las tecnologías
   * Delega al servicio específico de tecnologías
   * @param params Parámetros HTTP opcionales
   */
  fetchTechnologies(params?: HttpParams): void {
    this.technologyApiService.fetchTechnologies(params);
  }
}
