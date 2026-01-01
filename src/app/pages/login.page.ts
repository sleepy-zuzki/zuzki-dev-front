import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { LoginFeatureComponent } from '@features/auth/login/login.feature';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [LoginFeatureComponent, BreadcrumbComponent],
  template: `
    <div class="container mx-auto px-6 pt-24 pb-4">
      <app-breadcrumb [items]="items" />
    </div>
    <app-login-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements AfterViewInit, OnDestroy {
  schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Login - Zuzki Dev',
    'description': 'Acceso al panel de administración de Zuzki Dev.',
    'url': 'https://zuzki.dev/login'
  };

  items: BreadcrumbItem[] = [
    { label: 'Home', link: '/', icon: 'featherHome' },
    { label: 'Login' }
  ];

  private jsonLdScript: HTMLScriptElement | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.injectJsonLd();
    }
  }

  ngOnDestroy(): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
    }
  }

  private injectJsonLd(): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
    }
    this.jsonLdScript = this.renderer.createElement('script') as HTMLScriptElement;
    this.jsonLdScript.type = 'application/ld+json';
    this.jsonLdScript.text = JSON.stringify(this.schema);
    this.renderer.appendChild(this.document.head, this.jsonLdScript);
  }
}
