import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  DOCUMENT,
  Renderer2
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCode } from '@awesome.me/kit-6cba0026a3/icons/duotone/solid';
import { ButtonComponent } from '@components/ui/button/button.component';
import { ThemeToggleComponent } from '@components/ui/button/theme-toggle.component';
import { LinkComponent } from '@components/ui/link/link.component';
import { ApiService } from '@core/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { YoutubeStream, TwitchStream } from '@core/interfaces/streaming.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FaIconComponent,
    ButtonComponent,
    ThemeToggleComponent,
    LinkComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  faCode?: IconDefinition;
  isLive: boolean = false;

  // Referencia a los elementos html
  @ViewChild('mobileMenuDialog') mobileMenuDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('banner') bannerElement?: ElementRef<HTMLElement>;

  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar FontAwesome sólo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.faCode = faCode;
    }
  }

  /**
   * Lifecycle hook que se ejecuta cuando la vista ha sido inicializada
   */
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchStreamingStatus();
    }
  }

  /**
   * Abre el diálogo del menú móvil
   */
  openMobileMenu(): void {
    if (isPlatformBrowser(this.platformId) && this.mobileMenuDialog) {
      this.mobileMenuDialog.nativeElement.showModal();
    }
  }

  /**
   * Cierra el diálogo del menú móvil
   */
  closeMobileMenu(): void {
    if (isPlatformBrowser(this.platformId) && this.mobileMenuDialog) {
      this.mobileMenuDialog.nativeElement.close();
    }
  }

  fetchStreamingStatus(): void {
    const youtubeObservable: Observable<YoutubeStream> = this.apiService.getFromWorker('youtube/stream/UCt-dbUNJOibace29JGFA2rw')
    const twitchObservable: Observable<TwitchStream> = this.apiService.getFromWorker('twitch/stream/sleepy_zuzki')

    const streamingStatus: Observable<[YoutubeStream, TwitchStream]> = forkJoin([youtubeObservable, twitchObservable]);

    streamingStatus.subscribe(
      (data: [YoutubeStream, TwitchStream]) => {
        if (data.some((stream: YoutubeStream | TwitchStream) => stream.isLive)) {
          // Aplicar la clase appear al banner después de un pequeño retraso
          if (this.bannerElement) {
            this.renderer.addClass(this.bannerElement.nativeElement, 'appear');
          }
        }
      }
    );
  }
}
