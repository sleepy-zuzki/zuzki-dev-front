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
  // Initialize to false to prevent SSR hydration mismatch (Server renders false, Client checks LS)
  showIntro: boolean = false;
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
      // Show intro only if it hasn't been seen before (handling legacy 'false' value)
      const introStatus: string | null = localStorage.getItem(this.introKey);
      if (introStatus !== 'seen') {
        this.showIntro = true;
      }
    }
  }

  ngOnInit() {
    // Inicializar el servicio SEO para la actualización automática de metadatos
    this.seoService.init();
  }

  /**
   * Called when the brand intro animation is finished.
   * Hides the intro and sets a flag in localStorage so it's not shown again.
   */
  onIntroAnimationDone(): void {
    this.showIntro = false;
    if (isPlatformBrowser(this.platformId)) {
      console.log('Animation Ended...');
      localStorage.setItem(this.introKey, 'seen');
    }
  }

  ngOnDestroy() {
  }
}
