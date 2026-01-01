import { Component, inject, input, OnDestroy, effect, computed, InputSignal, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BlogStore } from '@core/stores/blog.store';
import { SeoService } from '@core/services/seo.service';
import { SectionComponent } from '@shared/components/section/section.component';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { EditorRendererComponent } from '@components/editor-renderer/editor-renderer.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCalendar, featherClock, featherLoader } from '@ng-icons/feather-icons';
import { BlogEntryEntity } from '@core/interfaces';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    DatePipe,
    SectionComponent,
    TypographyTitleComponent,
    TypographyTextComponent,
    NgIcon,
    EditorRendererComponent,
    NgOptimizedImage
  ],
  providers: [provideIcons({ featherCalendar, featherClock, featherLoader })],
  template: `
    <app-section variant="transparent" paddingY="none" paddingX="none" [container]="false">
      <div class="mx-auto">

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
              <div class="mb-10 rounded-2xl overflow-hidden shadow-lg relative h-[300px] md:h-[500px]">
                <img [ngSrc]="coverImage()!" [alt]="entry.title" fill priority class="object-fill">
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
  slug: InputSignal<string | undefined> = input<string>();

  coverImage: Signal<string | null> = computed(() => {
    return this.store.currentEntry()?.images.find(img => img.type === 'cover')?.url || null;
  });

  constructor() {
    effect((): void => {
        const slug: string | undefined = this.slug();
        if (slug) {
            this.store.setSelectedSlug(slug);
        }
    });

    effect(() => {
      const entry: BlogEntryEntity | null = this.store.currentEntry();
      if (entry) {
        this.seo.update({
          title: entry.title + ' | Zuzki Blog',
          description: entry.description,
          image: this.coverImage() || undefined,
          imageAlt: 'Portada del artículo: ' + entry.title,
          type: 'article',
          author: 'Zuzki',
          publishedTime: entry.publishDate || entry.createdAt
        });
      }
    });
  }

  ngOnDestroy() {
    this.store.setSelectedSlug(null);
  }
}
