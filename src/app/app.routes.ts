import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'about',
    title: 'Acerca de Sleepy Zuzki - Desarrollo Web y Streaming',
    loadComponent: () => import('@pages/about.page').then(m => m.AboutPage)
  },
  {
    path: 'works',
    title: 'Proyectos de Sleepy Zuzki - Soluciones Interactivas',
    loadComponent: () => import('@pages/works.page').then(m => m.WorksPage)
  },
  {
    path: 'works/:id',
    title: 'Detalle de Proyecto - Sleepy Zuzki',
    loadComponent: () => import('@pages/work-details.page').then(m => m.WorkDetailsPage)
  },
  {
    path: '',
    title: 'Portafolio de Sleepy Zuzki - Inicio',
    loadComponent: () => import('@pages/home.page').then(m => m.HomePage)
  }
];
