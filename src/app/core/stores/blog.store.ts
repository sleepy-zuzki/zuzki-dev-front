import { Injectable, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
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

  // --- Resources ---

  // 1. Entries List (Owned by Store, using Service Loader via rxResource)
  readonly entriesResource = rxResource<BlogEntryEntity[], {}>({
    params: () => ({}),
    stream: () => this.blogService.getEntries()
  });

  // 2. Current Entry (Local Resource dependent on selectedSlug via rxResource)
  readonly currentEntryResource = rxResource<BlogEntryEntity | null, { slug: string | null }>({
    params: () => ({ slug: this.selectedSlug() }),
    stream: ({ params }) => {
      const slug = params.slug;
      if (!slug) return of(null);
      return this.blogService.getEntryBySlug(slug);
    }
  });

  // --- Signals (Computed Wrappers for Backward Compatibility/Ease of Use) ---

  readonly entries = computed(() => this.entriesResource.value() ?? []);
  readonly currentEntry = computed(() => this.currentEntryResource.value() ?? null);

  readonly isLoading = computed(() =>
    this.entriesResource.isLoading() || this.currentEntryResource.isLoading()
  );

  readonly error = computed(() => {
    const entriesErr = this.entriesResource.error();
    const currentErr = this.currentEntryResource.error();
    return entriesErr ? 'Error cargando lista' : (currentErr ? 'Error cargando entrada' : null);
  });

  // --- Actions ---

  setSelectedSlug(slug: string | null): void {
    this.selectedSlug.set(slug);
  }

  refreshEntries(): void {
    this.entriesResource.reload();
  }

  async createEntry(dto: CreateBlogDto): Promise<void> {
    try {
      // Using firstValueFrom to await the Observable from service
      await firstValueFrom(this.blogService.createEntry(dto));
      this.toast.success('Entrada creada');
      this.refreshEntries();
    } catch (err) {
      this.toast.error('Error al crear');
      console.error(err);
    }
  }

  async updateEntry(id: string, dto: UpdateBlogDto): Promise<void> {
    try {
      await firstValueFrom(this.blogService.updateEntry(id, dto));
      this.toast.success('Entrada actualizada');

      this.refreshEntries();

      // Reload current entry if it matches the updated one
      if (this.currentEntry()?.id === id) {
        this.currentEntryResource.reload();
      }
    } catch (err) {
      this.toast.error('Error al actualizar');
      console.error(err);
    }
  }

  async deleteEntry(id: string): Promise<void> {
    try {
      await firstValueFrom(this.blogService.deleteEntry(id));
      this.toast.success('Entrada eliminada');

      this.refreshEntries();

      if (this.currentEntry()?.id === id) {
        this.setSelectedSlug(null);
      }
    } catch (err) {
      this.toast.error('Error al eliminar');
      console.error(err);
    }
  }

  async publishEntry(id: string): Promise<void> {
    try {
      await firstValueFrom(this.blogService.publishEntry(id));
      this.toast.success('Entrada publicada');
      this.refreshEntries();
    } catch (err) {
      this.toast.error('Error al publicar');
      console.error(err);
    }
  }
}
