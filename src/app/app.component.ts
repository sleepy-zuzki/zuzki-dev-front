import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/services/seo.service';
import { IMAGE_CONFIG, ImageConfig } from '@angular/common';

const customImageConfig: ImageConfig = {
  breakpoints: [480, 960, 1280, 1920],
  disableImageSizeWarning: false
}
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  providers: [
    {provide: IMAGE_CONFIG, useValue: customImageConfig}
  ],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Sleepy Zuzki';

  /**
   * @param seoService
   */
  constructor (
    private seoService: SeoService
  ) {
  }

  ngOnInit() {
    // Inicializar el servicio SEO para la actualización automática de metadatos
    this.seoService.init();
  }

  ngOnDestroy() {
  }
}
