import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { bootstrapArrowRightShort } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ProjectStore } from '@infrastructure/adapters/secondary/project/project.store';
import { TypographyTextComponent } from '@components/typography/text.component';

@Component({
  selector: 'app-home-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent, NgIcon, TypographyTextComponent],
  templateUrl: './home-projects.component.html',
  styleUrl: './home-projects.component.css',
  providers: [provideIcons({ bootstrapArrowRightShort })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProjectsComponent {
  private readonly projectStore = inject(ProjectStore);

  projects = this.projectStore.featuredProjects;
  loading = this.projectStore.loading;
  error = this.projectStore.error;

  constructor() {
    this.projectStore.getFeaturedProjects();
  }

  reload(): void {
    this.projectStore.getFeaturedProjects();
  }
}
