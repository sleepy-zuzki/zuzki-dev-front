import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { authTokenInterceptor } from '@core/interceptors/auth-token.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor, errorInterceptor])),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // Base URL for Cloudflare Image Resizing
        const cfBase = 'https://zuzki.dev/cdn-cgi/image';
        
        // Build options array safely
        const params: string[] = ['format=auto', 'quality=85'];
        
        if (config.width) {
          params.push(`width=${config.width}`);
        }

        const options = params.join(',');

        // Source URL logic
        let src = config.src;
        if (!src.startsWith('http')) {
          // If relative, prefix with our CDN
          const path = src.startsWith('/') ? src.slice(1) : src;
          src = `https://cdn.zuzki.dev/${path}`;
        }

        return `${cfBase}/${options}/${src}`;
      }
    },
    provideHotToastConfig()
  ]
};
