import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Portafolio de Sleepy Zuzki - Inicio',
    data: {
      description: "Conoce a Sleepy Zuzki y su portafolio de desarrollo web y experiencias creativas. Descubre proyectos inspiradores y contacta para impulsar tu proxima idea.",
      keywords: ["sleepy zuzki", "portafolio", "desarrollo web", "experiencias creativas"],
      type: 'website',
      image: 'https://zuzki.dev/assets/logo/47_2.png'
    },
    loadComponent: () => import('@pages/home.page').then(m => m.HomePage)
  },
  {
    path: 'projects',
    title: 'Proyectos de Sleepy Zuzki - Soluciones Interactivas',
    data: {
      description: "Sleepy Zuzki muestra proyectos con soluciones interactivas y disenos a medida. Revisa sus overlays y descubre como mejorar tu presencia en linea.",
      keywords: ["sleepy zuzki", "proyectos", "soluciones interactivas", "overlays", "disenos a medida"],
      type: 'website',
      image: 'https://zuzki.dev/assets/logo/47_2.png'
    },
    loadComponent: () => import('@pages/works.page').then(m => m.WorksPage)
  },
  {
    path: 'login',
    title: 'Login - Zuzki Dev',
    data: {
      description: "Acceso al panel de administración de Zuzki Dev.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    title: 'Dashboard - Zuzki Dev',
    canActivate: [authGuard],
    data: {
      description: "Panel de administración principal de Zuzki Dev.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'dashboard/projects',
    title: 'Gestión de Proyectos - Zuzki Dev',
    canActivate: [authGuard],
    data: {
      description: "Administra los proyectos del portafolio.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/projects-admin.page').then(m => m.ProjectsAdminPage)
  },
  {
    path: 'dashboard/projects/:slug/carousel',
    title: 'Gestión de Carrusel - Zuzki Dev',
    canActivate: [authGuard],
    data: {
      description: "Administra las imágenes del carrusel de un proyecto.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/project-carousel-admin.page').then(m => m.ProjectCarouselAdminPageComponent)
  },
  {
    path: 'dashboard/technologies',
    title: 'Gestión de Tecnologías - Zuzki Dev',
    canActivate: [authGuard],
    data: {
      description: "Administra las tecnologías del portafolio.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/technologies-admin.page').then(m => m.TechnologiesAdminPage)
  },
  {
    path: 'dashboard/gallery',
    title: 'Galería de Imágenes - Zuzki Dev',
    canActivate: [authGuard],
    data: {
      description: "Gestiona la galería de imágenes del portafolio.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/gallery-admin.page').then(m => m.GalleryAdminPage)
  },
  {
    path: '**',
    title: 'Página no encontrada - Zuzki Dev',
    data: {
      description: "La página que buscas no existe.",
      robots: "noindex, nofollow"
    },
    loadComponent: () => import('@pages/not-found.page').then(m => m.NotFoundPage)
  }
];
