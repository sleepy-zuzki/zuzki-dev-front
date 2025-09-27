import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { bootstrapArrowRightShort } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  url?: string;
}

@Component({
  selector: 'app-home-projects',
  standalone: true,
  imports: [RouterModule, ProjectCardComponent, NgIcon],
  templateUrl: './home-projects.component.html',
  styleUrl: './home-projects.component.css',
  providers: [provideIcons({bootstrapArrowRightShort})],
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
