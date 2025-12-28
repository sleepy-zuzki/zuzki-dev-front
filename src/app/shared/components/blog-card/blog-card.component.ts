import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogEntryEntity } from '@core/interfaces/blog.interface';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
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
    NgIcon
  ],
  providers: [provideIcons({ featherArrowRight })],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  entry = input.required<BlogEntryEntity>();

  coverImage = computed(() => {
    return this.entry()?.images?.find(img => img.type === 'cover')?.url || null;
  });
}
