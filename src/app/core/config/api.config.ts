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
        byId: (id: string) => `/projects/showcases/${id}`,
        // File management endpoints for projects
        files: (id: string) => `/projects/showcases/${id}/files`,
        removeFile: (id: string, fileId: string) => `/projects/showcases/${id}/files/${fileId}`,
        reorderFiles: (id: string) => `/projects/showcases/${id}/files/order`,
        cover: (id: string, fileId: string) => `/projects/showcases/${id}/cover/${fileId}`
      },
      files: {
        base: '/files',
        upload: '/files/upload',
        byId: (id: string) => `/files/${id}`
      }
    },

    // Blog
    blog: {
      entries: {
        base: '/blog/entries',
        byId: (id: string) => `/blog/entries/${id}`,
        bySlug: (slug: string) => `/blog/entries/slug/${slug}`,
        publish: (id: string) => `/blog/entries/${id}/publish`
      }
    },

    // Stack
    stack: {
      technologies: {
        base: '/stack/technologies',
        bySlug: (slug: string) => `/stack/technologies/${slug}`,
        byId: (id: string) => `/stack/technologies/${id}`
      },
      areas: {
        base: '/stack/areas',
        bySlug: (slug: string) => `/stack/areas/${slug}`,
        byId: (id: string) => `/stack/areas/${id}`
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