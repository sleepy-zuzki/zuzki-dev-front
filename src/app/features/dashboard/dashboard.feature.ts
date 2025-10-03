import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-feature',
  imports: [CommonModule, RouterLink, TypographyTitleComponent, TypographyTextComponent],
  template: `
    <main id="dashboard" aria-label="Panel principal" class="min-h-[60vh] p-6">
      <header class="mb-6">
        <app-typography-title [level]="1" variant="page">Dashboard</app-typography-title>
        <app-typography-text variant="muted">Administra el contenido del sitio.</app-typography-text>
      </header>

      <section aria-label="Acciones rápidas">
        <ul role="list" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <a
              routerLink="/dashboard/projects"
              class="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition"
              aria-label="Gestionar proyectos"
            >
              <header class="mb-2">
                <app-typography-title [level]="2" variant="card">Proyectos</app-typography-title>
              </header>
              <app-typography-text variant="muted">Crear, editar y organizar los proyectos del portafolio.</app-typography-text>
            </a>
          </li>
        </ul>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeatureComponent {}
