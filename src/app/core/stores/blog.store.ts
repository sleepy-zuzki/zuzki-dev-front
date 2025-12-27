import { Injectable, inject, signal, resource } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, Subject } from 'rxjs';
import { switchMap, catchError, startWith, tap, shareReplay } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';

import { BlogService } from '@core/services/blog.service';
import { BlogEntryEntity, CreateBlogDto, UpdateBlogDto } from '@core/interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogStore {
  private readonly blogService = inject(BlogService);
  private readonly toast = inject(HotToastService);

  // --- State ---
  readonly selectedSlug = signal<string | null>(null);

  // Triggers for reloading
  private readonly refreshEntries$ = new Subject<void>();
  private readonly refreshCurrent$ = new Subject<void>();

  // --- Data Streams ---

  // Loading state
  readonly isLoading = signal(true); // Start loading

  readonly error = signal<string | null>(null);

  // --- Data Streams ---

  // 1. Entries List
  private readonly entries$ = this.refreshEntries$.pipe(
    startWith(undefined),
    tap(() => this.isLoading.set(true)),
    switchMap(() => this.blogService.getEntries().pipe(
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        console.error('Error fetching blog entries', err);
        this.isLoading.set(false);
        this.error.set('Error cargando lista');
        return of([] as BlogEntryEntity[]);
      })
    )),
    shareReplay(1)
  );

  // 2. Current Entry
  private readonly currentEntry$ = toObservable(this.selectedSlug).pipe(
    tap(slug => { if(slug) this.isLoading.set(true); }),
    switchMap(slug => {
      if (!slug) return of(null);
      return this.blogService.getEntryBySlug(slug).pipe(
        tap(() => this.isLoading.set(false)),
        catchError(err => {
          console.error(`Error fetching blog entry: ${slug}`, err);
          this.isLoading.set(false);
          this.error.set('Error cargando entrada');
          return of(null);
        })
      );
    }),
    shareReplay(1)
  );

  // --- Signals ---

  readonly entries = toSignal(this.entries$, { initialValue: [] });
  readonly currentEntry = toSignal(this.currentEntry$, { initialValue: null });

  // --- Actions ---

  setSelectedSlug(slug: string | null): void {
    this.selectedSlug.set(slug);
  }

  refreshEntries(): void {
    this.refreshEntries$.next();
  }

  createEntry(dto: CreateBlogDto): void {
    this.isLoading.set(true);
    this.blogService.createEntry(dto).subscribe({
      next: () => {
        this.toast.success('Entrada creada');
        this.refreshEntries();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.error('Error al crear');
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  updateEntry(id: string, dto: UpdateBlogDto): void {
    this.isLoading.set(true);
    this.blogService.updateEntry(id, dto).subscribe({
      next: () => {
        this.toast.success('Entrada actualizada');
        this.refreshEntries();
        if (this.currentEntry()?.id === id) {
           // Trigger re-fetch for current by toggling slug or custom subject?
           // Easiest is to just let the list update, user might need to reload or we add a specific trigger.
           // For now, simple re-assignment of same slug to trigger stream:
           const current = this.selectedSlug();
           this.selectedSlug.set(null);
           setTimeout(() => this.selectedSlug.set(current), 0);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.error('Error al actualizar');
        this.isLoading.set(false);
      }
    });
  }

  deleteEntry(id: string): void {
    this.isLoading.set(true);
    this.blogService.deleteEntry(id).subscribe({
      next: () => {
        this.toast.success('Entrada eliminada');
        this.refreshEntries();
        if (this.currentEntry()?.id === id) {
          this.setSelectedSlug(null);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.error('Error al eliminar');
        this.isLoading.set(false);
      }
    });
  }
}
