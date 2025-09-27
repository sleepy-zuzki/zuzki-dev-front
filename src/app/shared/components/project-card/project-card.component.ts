import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsListComponent } from '@components/tags-list/tags-list.component';
import { bootstrapArrowRightShort } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

export interface ProjectCardData {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  url?: string;
  year?: string | number;
  imageUrl?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule, TagsListComponent, NgIcon],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({bootstrapArrowRightShort})],
})
export class ProjectCardComponent {
  @Input({ required: true }) data!: ProjectCardData;
}
