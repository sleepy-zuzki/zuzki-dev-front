import { Component, inject, input, OnDestroy, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogStore } from '@core/stores/blog.store';
import { SectionComponent } from '@shared/components/section/section.component';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { EditorRendererComponent } from '@components/editor-renderer/editor-renderer.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowLeft, featherCalendar, featherClock, featherLoader } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    SectionComponent,
    TypographyTitleComponent,
    ButtonComponent,
    NgIcon,
    EditorRendererComponent
  ],
  providers: [provideIcons({ featherArrowLeft, featherCalendar, featherClock, featherLoader })],
  template: `
    <app-section variant="transparent" padding="lg">
      <div class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <div class="mb-8">
          <app-button variant="ghost" routerLink="/blog">
            <ng-icon name="featherArrowLeft" class="mr-2"></ng-icon> Volver al blog
          </app-button>
        </div>

        @if (store.isLoading() && !store.currentEntry()) {
           <div class="flex justify-center py-20">
             <ng-icon name="featherLoader" class="animate-spin text-4xl text-zuzki-500"></ng-icon>
           </div>
        } @else if (store.error()) {
          <div class="text-center py-10 text-red-500">
            Error al cargar el artículo.
          </div>
        } @else if (store.currentEntry(); as entry) {
          <article>
            <header class="mb-10">
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span class="flex items-center gap-1">
                  <ng-icon name="featherCalendar"></ng-icon>
                  {{ entry.publishDate | date:'longDate' }}
                </span>
              </div>
              
              <app-typography-title [level]="1" variant="page" align="left">
                {{ entry.title }}
              </app-typography-title>
            </header>

            <div class="prose prose-lg dark:prose-invert max-w-none">
               <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8 font-medium">
                 {{ entry.description }}
               </p>
               
               <app-editor-renderer [data]="entry.content"></app-editor-renderer>
            </div>
          </article>
        }
      </div>
    </app-section>
  `
})
export class BlogDetailComponent implements OnDestroy {
  readonly store = inject(BlogStore);

  // Router Input Binding
  slug = input<string>();

  constructor() {
    effect(() => {
        const s = this.slug();
        if (s) {
            this.store.setSelectedSlug(s);
        }
    });
  }

  ngOnDestroy() {
    this.store.setSelectedSlug(null);
  }
}
