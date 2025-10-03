import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Portafolio de Sleepy Zuzki - Inicio',
    data: {
      description: "Conoce a Sleepy Zuzki y su portafolio de desarrollo web y experiencias creativas. Descubre proyectos inspiradores y contacta para impulsar tu proxima idea.",
      keywords: ["sleepy zuzki", "portafolio", "desarrollo web", "experiencias creativas"],
    },
    loadComponent: () => import('@pages/home.page').then(m => m.HomePage)
  },
  {
    path: 'works',
    title: 'Proyectos de Sleepy Zuzki - Soluciones Interactivas',
    data: {
      description: "Sleepy Zuzki muestra proyectos con soluciones interactivas y disenos a medida. Revisa sus overlays y descubre como mejorar tu presencia en linea.",
      keywords: ["sleepy zuzki", "proyectos", "soluciones interactivas", "overlays", "disenos a medida"],
    },
    loadComponent: () => import('@pages/works.page').then(m => m.WorksPage)
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('@pages/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('@pages/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
