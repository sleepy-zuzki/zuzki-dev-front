import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface ProjectCardData {
  id: string | number;
  title: string;
  description: string;
  tags?: string[];
  category?: string;
  url?: string;
  year?: string | number;
  imageUrl?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  @Input({ required: true }) data!: ProjectCardData;
}
