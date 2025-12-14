import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  public readonly baseUrl: string = environment.apiUrl || 'http://localhost:3000';
  public readonly version: string = 'v1';

  public readonly endpoints = {
    // Authentication
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      logout: '/auth/logout'
    },

    // Users
    users: {
      base: '/users',
      byId: (id: string) => `/users/${id}`
    },

    // Portfolio - Projects
    portfolio: {
      projects: {
        base: '/projects/showcases',
        featured: '/projects/showcases/featured',
        bySlug: (slug: string) => `/projects/showcases/${slug}`,
        byId: (id: number) => `/projects/showcases/${id}`,
        images: (id: number) => `/projects/showcases/${id}/images`,
        removeImage: (id: number, fileId: number) => `/projects/showcases/${id}/images/${fileId}`
      },
      files: {
        base: '/portfolio/files',
        byId: (id: number) => `/portfolio/files/${id}`
      }
    },

    // Stack
    stack: {
      technologies: {
        base: '/stack/technologies',
        bySlug: (slug: string) => `/stack/technologies/${slug}`,
        byId: (id: number) => `/stack/technologies/${id}`
      },
      areas: {
        base: '/stack/areas',
        bySlug: (slug: string) => `/stack/areas/${slug}`,
        byId: (id: number) => `/stack/areas/${id}`
      }
    },

    // Health
    health: '/health',

    forms: {
      contact: '/contact'
    }
  };

  getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }
}
