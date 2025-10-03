import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';
import { ProjectHttpAdapter } from '@infrastructure/adapters/secondary/project/project-http.adapter';

@Component({
  standalone: true,
  selector: 'app-projects-admin-feature',
  imports: [CommonModule, TypographyTitleComponent, TypographyTextComponent],
  template: `
    <main id="projects-admin" aria-label="Gestión de Proyectos" class="min-h-[60vh] p-6">
      <header class="mb-6">
        <app-typography-title [level]="1" variant="page">
          Gestión de Proyectos
        </app-typography-title>
        <app-typography-text variant="muted">
          Aquí podrás crear y editar la información de los proyectos.
        </app-typography-text>
      </header>

      <section aria-label="Listado de proyectos" class="space-y-4">
        @if (loading()) {
          <app-typography-text variant="muted">Cargando proyectos…</app-typography-text>
        } @else if (error()) {
          <div role="alert" class="rounded-md border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 p-4">
            <app-typography-text class="block text-red-800 dark:text-red-300">{{ error() }}</app-typography-text>
            <button
              type="button"
              (click)="reload()"
              class="mt-2 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition"
              aria-label="Reintentar cargar proyectos"
            >
              Reintentar
            </button>
          </div>
        } @else if (projects().length === 0) {
          <app-typography-text>No hay proyectos aún.</app-typography-text>
        } @else {
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
            @for (p of projects(); track p.id) {
              <li class="py-4 flex items-start justify-between">
                <div class="min-w-0 pr-4">
                  <app-typography-title [level]="3" variant="subsection">{{ p.name }}</app-typography-title>
                  <app-typography-text variant="muted">{{ p.description }}</app-typography-text>
                </div>
                <span class="shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                             bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  {{ p.status }}
                </span>
              </li>
            }
          </ul>
        }
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAdminFeatureComponent {
  private projectAdapter = inject(ProjectHttpAdapter);

  projects = this.projectAdapter.projects;
  loading = this.projectAdapter.loading;
  error = this.projectAdapter.error;

  constructor() {
    this.projectAdapter.getProjects();
  }

  reload(): void {
    this.projectAdapter.getProjects();
  }
}
