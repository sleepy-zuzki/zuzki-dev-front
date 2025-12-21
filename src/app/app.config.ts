import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideCloudflareLoader } from '@angular/common';
import { authTokenInterceptor } from '@core/interceptors/auth-token.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor, errorInterceptor])),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideCloudflareLoader('https://zuzki.dev'),
    provideHotToastConfig()
  ]
};
