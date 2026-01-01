import { Component, inject } from '@angular/core';
import { BlogStore } from '@core/stores/blog.store';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { BlogCardComponent } from '@shared/components/blog-card/blog-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';
import { SectionComponent } from '@components/section/section.component';
import { BlogStatus } from '@core/enums';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    TypographyTitleComponent,
    TypographyTextComponent,
    BlogCardComponent,
    NgIcon,
    SectionComponent
  ],
  providers: [provideIcons({ featherLoader })],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  private readonly blogStore = inject(BlogStore);
  readonly blogsResource = this.blogStore.entriesResource;

  constructor() {
    this.blogStore.setFilterStatus(BlogStatus.PUBLISHED);
  }
}
