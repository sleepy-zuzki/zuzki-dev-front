import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideCloudflareLoader } from '@angular/common';
import { GithubDataInterceptor } from '@core/interceptors/github-data.interceptor';
import { MakeInterceptor } from '@core/interceptors/make.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([GithubDataInterceptor, MakeInterceptor])),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideCloudflareLoader('https://zuzki.dev'),
    provideHotToastConfig()
  ]
};
