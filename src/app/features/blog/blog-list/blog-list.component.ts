import { Component, inject, OnInit } from '@angular/core';
import { BlogStore } from '@core/stores/blog.store';
import { SectionComponent } from '@shared/components/section/section.component';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { BlogCardComponent } from '@shared/components/blog-card/blog-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    SectionComponent,
    TypographyTitleComponent,
    TypographyTextComponent,
    BlogCardComponent,
    NgIcon
  ],
  providers: [provideIcons({ featherLoader })],
  template: `
    <app-section variant="transparent" padding="lg">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <app-typography-title [level]="1" variant="page" class="mb-4">
          Blog & <span class="text-zuzki-500">Artículos</span>
        </app-typography-title>
        <app-typography-text variant="lead">
          Pensamientos, tutoriales y aprendizajes sobre desarrollo web y tecnología.
        </app-typography-text>
      </div>

      @if (store.isLoading() && store.entries().length === 0) {
        <div class="flex justify-center py-20">
          <ng-icon name="featherLoader" class="animate-spin text-4xl text-zuzki-500"></ng-icon>
        </div>
      } @else if (store.error()) {
        <div class="text-center py-10">
          <p class="text-red-500">Hubo un error al cargar los artículos.</p>
          <button (click)="store.refreshEntries()" class="mt-4 underline text-zuzki-500">Reintentar</button>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (entry of store.entries(); track entry.id) {
            <app-blog-card [entry]="entry"></app-blog-card>
          } @empty {
            <div class="col-span-full text-center py-10 opacity-60">
              <p>No hay artículos publicados aún.</p>
            </div>
          }
        </div>
      }
    </app-section>
  `
})
export class BlogListComponent implements OnInit {
  readonly store = inject(BlogStore);

  ngOnInit() {
    // Ensure data is loaded (resource might be lazy or auto-loading depending on implementation details, 
    // but rxResource with no trigger usually loads immediately on subscription/effect, 
    // however explicitly calling refresh or just relying on template access is fine. 
    // Given the store implementation, just accessing the signal triggers nothing if no one subscribed? 
    // Actually rxResource is cold-ish but Angular signals in template make it hot. 
    // But good practice to ensure consistency.)
    // In our store, 'loader' is a function. rxResource auto-executes.
  }
}
