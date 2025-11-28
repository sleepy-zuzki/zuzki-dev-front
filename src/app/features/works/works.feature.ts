import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectStore } from '@infrastructure/adapters/secondary/project/project.store';
import { ProjectEntity } from '@domain/entities';
import { ProjectCardComponent } from '@shared/components/project-card/project-card.component';

import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSearch } from '@ng-icons/feather-icons';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TechnologyStore } from '@infrastructure/adapters/secondary/technology/technology.store';
import { TagsListComponent } from '@shared/components/tags-list/tags-list.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-works-feature',
  imports: [
    ProjectCardComponent,
    TypographyTitleComponent,
    TypographyTextComponent,
    NgIcon,
    ButtonComponent,
    TagsListComponent
],
  templateUrl: './works.feature.html',
  standalone: true,
  styleUrl: './works.feature.css',
  providers: [provideIcons({ featherSearch })]
})
export class WorksFeature implements OnInit {
  private readonly projectStore = inject(ProjectStore);
  private readonly technologyStore = inject(TechnologyStore);
  private readonly router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly allProjects: Signal<ProjectEntity[]>;
  public readonly projects: Signal<ProjectEntity[]>;
  public readonly technologyNames: Signal<string[]>;
  public readonly selectedTechnology: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
    this.allProjects = this.projectStore.projects;
    this.technologyNames = computed(() =>
      this.technologyStore.technologies().map(t => t.name)
    );

    this.projects = computed(() => {
      const selectedTech = this.selectedTechnology();
      const projects = this.allProjects();

      if (!selectedTech) {
        return projects;
      }

      return projects.filter(project =>
        project.technologies.some(tech => tech.name === selectedTech)
      );
    });
  }

  ngOnInit(): void {
    this.projectStore.getProjects();
    this.technologyStore.getTechnologies();
  }

  public handleTechnologyFilter(technologyName: string): void {
    if (this.selectedTechnology() === technologyName) {
      this.selectedTechnology.set(null);
    } else {
      this.selectedTechnology.set(technologyName);
    }
  }

  public navigateToContact(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/#contacto';
    }
  }

  public navigateToHome(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = '/';
    }
  }
}

