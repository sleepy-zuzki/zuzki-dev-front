import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('@pages/about.page').then(m => m.AboutPage)
  },
  {
    path: 'works',
    loadComponent: () => import('@pages/works.page').then(m => m.WorksPage)
  },
  {
    path: 'works/:id',
    loadComponent: () => import('@pages/work-details.page').then(m => m.WorkDetailsPage)
  },
  { path: '',
    loadComponent: () => import('@pages/home.page').then(m => m.HomePage)
  }
];
