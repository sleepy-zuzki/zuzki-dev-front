import { Component, inject, input, OnDestroy, effect, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogStore } from '@core/stores/blog.store';
import { SeoService } from '@core/services/seo.service';
import { SectionComponent } from '@shared/components/section/section.component';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
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
    TypographyTextComponent,
    ButtonComponent,
    NgIcon,
    EditorRendererComponent
  ],
  providers: [provideIcons({ featherArrowLeft, featherCalendar, featherClock, featherLoader })],
  template: `
    <app-section variant="transparent" padding="lg" [container]="false">
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
            @if (coverImage()) {
              <div class="mb-10 rounded-2xl overflow-hidden shadow-lg">
                <img [src]="coverImage()" [alt]="entry.title" class="w-full h-auto object-cover max-h-[500px]">
              </div>
            }

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
               <app-typography-text variant="lead" extraClasses="mb-8 font-medium">
                 {{ entry.description }}
               </app-typography-text>

               <app-editor-renderer [data]="entry.content || null"></app-editor-renderer>
            </div>
          </article>
        }
      </div>
    </app-section>
  `
})
export class BlogDetailComponent implements OnDestroy {
  readonly store = inject(BlogStore);
  private readonly seo = inject(SeoService);

  // Router Input Binding
  slug = input<string>();

  coverImage = computed(() => {
    return this.store.currentEntry()?.images.find(img => img.type === 'cover')?.url || null;
  });

  constructor() {
    effect(() => {
        const s = this.slug();
        if (s) {
            this.store.setSelectedSlug(s);
        }
    });

    effect(() => {
      const entry = this.store.currentEntry();
      if (entry) {
        this.seo.update({
          title: entry.title + ' | Zuzki Blog',
          description: entry.description,
          image: this.coverImage() || undefined,
          type: 'article',
          author: 'Zuzki'
        });
      }
    });
  }

  ngOnDestroy() {
    this.store.setSelectedSlug(null);
  }
}
