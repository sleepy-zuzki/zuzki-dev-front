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
        base: '/portfolio/projects',
        featured: '/portfolio/projects/featured',
        bySlug: (slug: string) => `/portfolio/projects/${slug}`,
        byId: (id: number) => `/portfolio/projects/${id}`,
        images: (id: number) => `/portfolio/projects/${id}/images`,
        removeImage: (id: number, fileId: number) => `/portfolio/projects/${id}/images/${fileId}`
      },
      files: {
        base: '/portfolio/files',
        byId: (id: number) => `/portfolio/files/${id}`
      }
    },

    // Catalog
    catalog: {
      technologies: {
        base: '/catalog/technologies',
        bySlug: (slug: string) => `/catalog/technologies/${slug}`,
        byId: (id: number) => `/catalog/technologies/${id}`
      },
      stacks: {
        base: '/catalog/stacks',
        bySlug: (slug: string) => `/catalog/stacks/${slug}`,
        byId: (id: number) => `/catalog/stacks/${id}`
      }
    },

    // Health
    health: '/health'
  };

  getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }
}
