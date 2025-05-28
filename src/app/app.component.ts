import {
  Component,
  ElementRef,
  Signal,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Overlay } from '@core/models/overlay.model';
import { GithubDataApiService } from '@services/github-data-api.service';
import { LayoutModel } from '@core/models/layout.model';
import { OverlayService } from '@services/overlay.service';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCode } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { IMAGE_CONFIG, ImageConfig, NgClass } from '@angular/common';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OverlayApiService } from '@services/overlay-api.service';

const customImageConfig: ImageConfig = {
  breakpoints: [480, 960, 1280, 1920],
  disableImageSizeWarning: false
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, HeaderComponent, FooterComponent, NgClass],
  providers: [
    {provide: IMAGE_CONFIG, useValue: customImageConfig}
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** Referencia al elemento del cajón lateral (drawer). */
  @ViewChild('drawer') drawer?: ElementRef;
  /** Título de la aplicación. */
  title: string = 'Sleepy Zuzki';
  /** Señal que contiene la lista de overlays disponibles. */
  readonly overlays: Signal<Overlay[]>;
  readonly faCode: IconDefinition = faCode;
  isWorkDetailsPage: boolean = false;
  private readonly routerSubscription: Subscription;

  /**
   * @param overlayApiService Servicio para interactuar con la API de datos.
   * @param overlayService Servicio para gestionar el estado de los overlays y layouts.
   * @param router
   */
  constructor (
    readonly overlayApiService: OverlayApiService,
    readonly overlayService: OverlayService,
    private router: Router
  ) {
    this.overlays = this.overlayApiService.data;
    this.routerSubscription = this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verificamos si estamos en la ruta de detalles de trabajo (/works/:id)
      this.isWorkDetailsPage = event.urlAfterRedirects.includes('/works/') &&
        !event.urlAfterRedirects.endsWith('/works');
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Abre el cajón lateral.
   */
  openDrawer(): void {
    if (this.drawer) {
      this.drawer.nativeElement.open = true;
    }
  }

  /**
   * Cierra el cajón lateral.
   */
  closeDrawer(): void {
    if (this.drawer) {
      this.drawer.nativeElement.open = false;
    }
  }

  /**
   * Cambia el layout actual del overlay seleccionado.
   * @param layout_id El ID del layout a establecer como actual.
   */
  changeLayout(layout_id: string): void {
    const reqLayout: LayoutModel | undefined = this.overlayService.overlayLayouts().find((layout: LayoutModel) => layout.id === layout_id);
    if (reqLayout) {
      this.overlayService.setCurrentLayout(reqLayout);
      this.closeDrawer();
    }
  }
}
