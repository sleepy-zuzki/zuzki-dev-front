import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  template: `
    <main id="dashboard" aria-label="Panel principal" class="min-h-[60vh] p-6">
      <header class="mb-4">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <p class="text-sm text-gray-500">Bienvenido/a. Has iniciado sesión correctamente.</p>
      </header>

      <section aria-label="Contenido del dashboard" class="mt-6">
        <p>Este es tu panel privado.</p>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
