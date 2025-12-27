import { Component, inject } from '@angular/core';
import { BlogService } from '@core/services/blog.service';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { BlogCardComponent } from '@shared/components/blog-card/blog-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';
import { SectionComponent } from '@components/section/section.component';

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
  private readonly blogService = inject(BlogService);
  readonly blogsResource = this.blogService.blogsResource;
}
