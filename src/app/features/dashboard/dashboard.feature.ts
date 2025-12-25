import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { TypographyTitleComponent } from '@shared/components/typography/title.component';
import { TypographyTextComponent } from '@shared/components/typography/text.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-feature',
  imports: [RouterLink, TypographyTitleComponent, TypographyTextComponent],
  template: `
    <main id="dashboard" aria-label="Panel principal" class="min-h-[60vh] p-6">
      <header class="mb-6">
        <app-typography-title [level]="1" variant="page">Dashboard</app-typography-title>
        <app-typography-text variant="muted">Administra el contenido del sitio.</app-typography-text>
      </header>

      <section aria-label="Acciones rápidas">
        <ul role="list" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Tarjeta de Proyectos -->
          <li>
            <a
              routerLink="/dashboard/projects"
              class="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zuzki-500 dark:focus-visible:ring-zuzki-400 transition"
              aria-label="Gestionar proyectos"
            >
              <header class="mb-2">
                <app-typography-title [level]="2" variant="card">Proyectos</app-typography-title>
              </header>
              <app-typography-text variant="muted">Crear, editar y organizar los proyectos del portafolio.</app-typography-text>
            </a>
          </li>

          <!-- Tarjeta de Tecnologías -->
          <li>
            <a
              routerLink="/dashboard/technologies"
              class="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zuzki-500 dark:focus-visible:ring-zuzki-400 transition"
              aria-label="Gestionar tecnologías"
            >
              <header class="mb-2">
                <app-typography-title [level]="2" variant="card">Tecnologías</app-typography-title>
              </header>
              <app-typography-text variant="muted">Administrar el catálogo de tecnologías, lenguajes y herramientas.</app-typography-text>
            </a>
          </li>

          <!-- Tarjeta de Galería -->
          <li>
            <a
              routerLink="/dashboard/gallery"
              class="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zuzki-500 dark:focus-visible:ring-zuzki-400 transition"
              aria-label="Gestionar galería de imágenes"
            >
              <header class="mb-2">
                <app-typography-title [level]="2" variant="card">Galería</app-typography-title>
              </header>
              <app-typography-text variant="muted">Subir, ver y eliminar imágenes globales para el portafolio.</app-typography-text>
            </a>
          </li>
        </ul>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFeatureComponent {}
