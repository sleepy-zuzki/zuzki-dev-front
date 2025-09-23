import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags?: string[];
  category?: string;
  url?: string;
}

@Component({
  selector: 'app-home-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeProjectsComponent {
  @Input({ required: true }) projects: Project[] = [];

  get featuredProjects(): Project[] {
    return (this.projects ?? []).slice(0, 4);
  }

  get total(): number {
    return this.projects?.length ?? 0;
  }
}
