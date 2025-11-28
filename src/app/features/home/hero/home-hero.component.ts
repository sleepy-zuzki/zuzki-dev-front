import { Component } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { SocialIconsComponent } from '@components/social-icons/social-icons.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [NgIcon, SocialIconsComponent, NgOptimizedImage],
  templateUrl: './home-hero.component.html',
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // Reemplaza con la URL base de tu CDN
        // Nota: Asegúrate de que termine con '/' si tus src no lo tienen
        return `https://cdn.zuzki.dev/${config.src}`;
      }
    }
  ]
})
export class HomeHeroComponent {}
