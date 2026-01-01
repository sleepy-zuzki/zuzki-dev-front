import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/blog-list.page').then(m => m.BlogListPage)
  },
  {
    path: ':slug',
    loadComponent: () => import('@pages/blog-detail.page').then(m => m.BlogDetailPage)
  }
];
