import { Component, ChangeDetectionStrategy, input, computed, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { BlogEntryEntity } from '@core/interfaces/blog.interface';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherArrowRight } from '@ng-icons/feather-icons';
import { bootstrapPencil, bootstrapTrash, bootstrapCloudUpload } from '@ng-icons/bootstrap-icons';
import { ButtonComponent } from '../button/button.component';
import { BlogStatus } from '@core/enums';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TypographyTitleComponent,
    TypographyTextComponent,
    NgIcon,
    ButtonComponent,
    UpperCasePipe,
    CardComponent
  ],
  providers: [provideIcons({ featherArrowRight, bootstrapPencil, bootstrapTrash, bootstrapCloudUpload })],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  entry = input.required<BlogEntryEntity>();
  isAdmin = input(false);

  edit = output<BlogEntryEntity>();
  delete = output<string>();
  publish = output<string>();

  readonly BlogStatus = BlogStatus;

  coverImage = computed(() => {
    return this.entry()?.images?.find(img => img.type === 'cover')?.url || null;
  });

  onEdit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.edit.emit(this.entry());
  }

  onDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.delete.emit(this.entry().id);
  }

  onPublish(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.publish.emit(this.entry().id);
  }
}
