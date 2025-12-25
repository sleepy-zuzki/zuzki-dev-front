import { Component, inject, signal, ViewChild, Output, EventEmitter } from '@angular/core';
import { FileStore } from '@core/stores/file.store';
import { ModalComponent } from '@components/modal/modal.component';
import { ButtonComponent } from '@components/button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheck } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-gallery-selector-modal',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, NgIcon],
  providers: [provideIcons({ featherCheck })],
  template: `
    <app-modal [title]="'Seleccionar de la Biblioteca'" size="xl" (close)="onClose()">
      <div class="gallery-selector">

        <!-- Estado de Carga -->
        @if (loading()) {
          <div class="p-8 text-center text-gray-500">Cargando biblioteca...</div>
        }

        <!-- Grid de Imágenes -->
        <div class="gallery-grid">
          @for (file of files(); track file.id) {
            <div
              class="gallery-item"
              [class.selected]="isSelected(file.id)"
              (click)="toggleSelection(file.id)">

              <img [src]="file.url" [alt]="'Imagen de galería'" loading="lazy">

              <!-- Check Overlay -->
              <div class="selection-overlay">
                <div class="check-circle">
                  <ng-icon name="featherCheck"></ng-icon>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Empty State -->
        @if (!loading() && files().length === 0) {
          <div class="p-8 text-center text-gray-500">
            No hay imágenes en la biblioteca global.
          </div>
        }

        <!-- Footer Actions -->
        <div class="modal-footer">
          <div class="selection-count">
            @if (selectedIds().length > 0) {
              <span class="font-medium text-brand-primary dark:text-white">{{ selectedIds().length }} seleccionadas</span>
            }
          </div>
          <div class="flex gap-2">
            <app-button variant="ghost" (click)="closeModal()">Cancelar</app-button>
            <app-button
              variant="brand"
              [disabled]="selectedIds().length === 0"
              (click)="confirmSelection()">
              Añadir Seleccionadas
            </app-button>
          </div>
        </div>

      </div>
    </app-modal>
  `,
  styleUrls: ['./gallery-selector-modal.component.css'],
})
export class GallerySelectorModalComponent {
  private fileStore = inject(FileStore);

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() selected = new EventEmitter<string[]>();

  readonly files = this.fileStore.files;
  readonly loading = this.fileStore.loading;

  // Signal para manejar selección múltiple
  selectedIds = signal<string[]>([]);

  constructor() {
    // Cargar archivos al iniciarse (podría ser lazy al abrir)
    this.fileStore.getFiles();
  }

  open() {
    this.selectedIds.set([]); // Resetear selección al abrir
    this.fileStore.getFiles(); // Refrescar por si hubo cambios
    this.modal.openModal();
  }

  closeModal() {
    this.modal.closeModal();
  }

  onClose() {
    // Lógica opcional al cerrar
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggleSelection(id: string) {
    this.selectedIds.update(current => {
      if (current.includes(id)) {
        return current.filter(x => x !== id);
      } else {
        return [...current, id];
      }
    });
  }

  confirmSelection() {
    this.selected.emit(this.selectedIds());
    this.closeModal();
  }
}
