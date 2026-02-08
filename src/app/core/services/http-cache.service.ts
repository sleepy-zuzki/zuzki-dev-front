import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

interface CacheContent {
  response: HttpResponse<any>;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  private cache = new Map<string, CacheContent>();
  private readonly DEFAULT_TTL = 300000;

  put(url: string, response: HttpResponse<any>, ttl: number = this.DEFAULT_TTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(url, { response, expiry });
  }

  get(url: string): HttpResponse<any> | null {
    const cached = this.cache.get(url);
    
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() > cached.expiry;
    if (isExpired) {
      this.cache.delete(url);
      return null;
    }

    return cached.response;
  }

  invalidate(url?: string): void {
    if (url) {
      this.cache.delete(url);
    } else {
      this.cache.clear();
    }
  }
}