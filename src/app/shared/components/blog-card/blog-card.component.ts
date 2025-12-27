import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogEntryEntity } from '@core/interfaces/blog.interface';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowRight } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TypographyTitleComponent,
    TypographyTextComponent,
    ButtonComponent,
    NgIcon
  ],
  providers: [provideIcons({ featherArrowRight })],
  template: `
    <article class="blog-card group">
      <div class="blog-card__content">
        <header class="blog-card__header">
          <time [dateTime]="entry().publishDate" class="blog-card__date">
            {{ entry().publishDate | date:'longDate' }}
          </time>
          <app-typography-title [level]="3" variant="card" class="group-hover:text-zuzki-500 transition-colors">
            {{ entry().title }}
          </app-typography-title>
        </header>

        <app-typography-text variant="base" extraClasses="line-clamp-3 mb-4">
          {{ entry().description }}
        </app-typography-text>

        <div class="blog-card__footer">
          <app-button 
            variant="link" 
            [routerLink]="['/blog', entry().slug]"
            ariaLabel="Leer artículo completo: {{ entry().title }}">
            Leer artículo <ng-icon name="featherArrowRight" class="ml-1 group-hover:translate-x-1 transition-transform"></ng-icon>
          </app-button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    @reference "../../../../styles/utilities.css";

    .blog-card {
      @apply h-full bg-background-surface border border-background-section rounded-xl overflow-hidden transition-all duration-300;
      @apply hover:shadow-lg hover:border-zuzki-500/30 hover:-translate-y-1;
    }

    .blog-card__content {
      @apply p-6 flex flex-col h-full;
    }

    .blog-card__header {
      @apply mb-4;
    }

    .blog-card__date {
      @apply block text-xs font-semibold text-zuzki-500 uppercase tracking-wider mb-2;
    }

    .blog-card__footer {
      @apply mt-auto pt-4 border-t border-gray-100 dark:border-gray-800;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  entry = input.required<BlogEntryEntity>();
}
