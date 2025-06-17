import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'about',
    title: 'Acerca de Sleepy Zuzki - Desarrollo Web y Streaming',
    data: {
      description: "Sleepy Zuzki, ingeniero de software, comparte su enfoque en experiencias accesibles y visuales. Descubre habilidades clave y vision para proyectos creativos.",
      keywords: ["sleepy zuzki", "ingeniero de software", "experiencias accesibles", "perfil profesional"],
    },
    loadComponent: () => import('@pages/about.page').then(m => m.AboutPage)
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
    path: 'works/:id',
    title: 'Detalle de Proyecto - Sleepy Zuzki',
    data: {
      description: "Explora a fondo los proyectos de Sleepy Zuzki y prueba sus layouts interactivos. Comprueba como cada solucion personalizada impulsa tu presencia en streaming.",
      keywords: ["sleepy zuzki", "layout interactivo", "proyecto", "streaming", "solucion personalizada"],
    },
    loadComponent: () => import('@pages/work-details.page').then(m => m.WorkDetailsPage)
  },
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
    path: '404',
    title: 'Página no encontrada - Error 404',
    data: {
      description: "La página que estás buscando no existe o ha sido movida. Regresa al inicio para continuar explorando el portafolio de Sleepy Zuzki.",
      keywords: ["error 404", "página no encontrada", "sleepy zuzki"],
    },
    loadComponent: () => import('@pages/not-found.page').then(m => m.NotFoundPage)
  },
  {
    path: '**',
    title: 'Página no encontrada - Error 404',
    data: {
      description: "La página que estás buscando no existe o ha sido movida. Regresa al inicio para continuar explorando el portafolio de Sleepy Zuzki.",
      keywords: ["error 404", "página no encontrada", "sleepy zuzki"],
    },
    loadComponent: () => import('@pages/not-found.page').then(m => m.NotFoundPage)
  }
];
