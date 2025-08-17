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
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCodeSlash } from '@ng-icons/bootstrap-icons';
import { featherCode } from '@ng-icons/feather-icons';
import { ThemeToggleComponent, LinkComponent, ActionButtonComponent, InternalLinkComponent } from '@ui';
import { ApiService } from '@core/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { YoutubeStream, TwitchStream } from '@core/interfaces/streaming.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    ThemeToggleComponent,
    LinkComponent,
    ActionButtonComponent,
    InternalLinkComponent
  ],
  providers: [provideIcons({ featherCode, bootstrapCodeSlash })],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  isLive: boolean = false;

  // Referencia a los elementos html
  @ViewChild('mobileMenuDialog') mobileMenuDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('banner') bannerElement?: ElementRef<HTMLElement>;

  constructor(
    private apiService: ApiService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

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
