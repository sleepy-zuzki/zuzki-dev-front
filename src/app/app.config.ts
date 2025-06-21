import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideCloudflareLoader } from '@angular/common';
import { MakeInterceptor } from '@core/interceptors/make.interceptor';
import { WorkerDataInterceptor } from '@core/interceptors/worker-data.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([WorkerDataInterceptor, MakeInterceptor])),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideCloudflareLoader('https://zuzki.dev'),
    provideHotToastConfig()
  ]
};
