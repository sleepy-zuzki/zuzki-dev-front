import {
  Component, Inject,
  OnDestroy,
  OnInit, PLATFORM_ID
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { IMAGE_CONFIG, ImageConfig, isPlatformBrowser } from '@angular/common';
import { BrandIntroComponent } from '@shared/components/brand-intro/brand-intro.component';

const customImageConfig: ImageConfig = {
  breakpoints: [480, 960, 1280, 1920],
  disableImageSizeWarning: false
}
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BrandIntroComponent],
  providers: [
    {provide: IMAGE_CONFIG, useValue: customImageConfig}
  ],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Sleepy Zuzki';
  showIntro: boolean = true;
  introKey = 'intro_animation';

  /**
   * @param seoService
   * @param platformId
   */
  constructor (
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.showIntro = localStorage.getItem(this.introKey) === 'true';
    }
  }

  ngOnInit() {
    // Inicializar el servicio SEO para la actualización automática de metadatos
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.showIntro = false;
        localStorage.setItem(this.introKey, 'false');
      }, 3000);
    }
    this.seoService.init();
  }

  ngOnDestroy() {
  }
}
