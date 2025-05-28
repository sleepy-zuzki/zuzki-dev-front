import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, catchError, finalize, of } from 'rxjs';
import { LoadState } from '@core/enums/load-state.enum';
import { ErrorMessage } from '@core/interfaces/error-message.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal } from '@angular/core';

/**
 * Servicio base que implementa funcionalidad común para todos los servicios API
 * Gestiona Signals, BehaviorSubjects, estados de carga y manejo de errores
 */
@Injectable()
export abstract class BaseApiService<T> {
  // Signal pública para datos
  data: Signal<T[]>;

  // Signal pública para estado de carga
  state: Signal<LoadState>;

  // Signal pública para errores
  error: Signal<ErrorMessage | null>;

  /** BehaviorSubject para datos - estado interno mutable */
  protected dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  /** BehaviorSubject para estado de carga - estado interno mutable */
  protected stateSubject: BehaviorSubject<LoadState> = new BehaviorSubject<LoadState>(LoadState.INIT);

  /** BehaviorSubject para errores - estado interno mutable */
  protected errorSubject: BehaviorSubject<ErrorMessage | null> = new BehaviorSubject<ErrorMessage | null>(null);

  protected constructor(protected http: HttpClient) {
    // Inicializar signals usando toSignal
    this.data = toSignal(this.dataSubject.asObservable(), { initialValue: [] });
    this.state = toSignal(this.stateSubject.asObservable(), { initialValue: LoadState.INIT });
    this.error = toSignal(this.errorSubject.asObservable(), { initialValue: null });
  }

  /**
   * Verifica si se puede iniciar una carga de datos
   * @returns true si se puede iniciar la carga, false en caso contrario
   */
  protected canStartFetch(): boolean {
    const currentState = this.stateSubject.getValue();
    return currentState !== LoadState.LOADED && currentState !== LoadState.LOADING;
  }

  /**
   * Inicia el estado de carga y limpia errores
   */
  protected startLoading(): void {
    this.stateSubject.next(LoadState.LOADING);
    this.errorSubject.next(null);
  }

  /**
   * Método centralizado para manejar errores HTTP
   * @param error Error HTTP o cualquier otro error
   * @param logMessage Mensaje para log de error
   * @param fallbackData Datos por defecto en caso de error
   * @returns Observable con los datos por defecto
   */
  protected handleError<D>(
    error: any,
    logMessage: string,
    fallbackData: D
  ): Observable<D> {
    console.error(logMessage, error);

    const errorMessage: ErrorMessage = {
      message: error instanceof HttpErrorResponse
        ? `${error.status}: ${error.statusText}`
        : error?.message || 'Unknown error',
      status: error instanceof HttpErrorResponse ? error.status : undefined,
      timestamp: new Date()
    };

    this.errorSubject.next(errorMessage);
    this.stateSubject.next(LoadState.ERROR);

    return of(fallbackData);
  }

  /**
   * Método auxiliar para finalizar la carga
   */
  protected finishLoading(): void {
    if (this.stateSubject.getValue() === LoadState.LOADING) {
      this.stateSubject.next(LoadState.LOADED);
    }
  }

  /**
   * Obtiene el operador finalize configurado para actualizar el estado a LOADED
   * @returns Un operador que mantiene el tipo genérico
   */
  protected getFinishLoadingOperator<D>(): MonoTypeOperatorFunction<D> {
    return finalize(() => this.finishLoading());
  }
}
