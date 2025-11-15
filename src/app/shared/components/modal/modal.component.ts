import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapX } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@components/button/button.component';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgIcon, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [provideIcons({ bootstrapX })],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() size: ModalSize = 'md';
  @Output() close = new EventEmitter<void>();

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'size-sm';
      case 'lg':
        return 'size-lg';
      case 'xl':
        return 'size-xl';
      case 'full':
        return 'size-full';
      case 'md':
      default:
        return 'size-md';
    }
  }

  openModal() {
    this.dialogRef.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef.nativeElement.close();
  }

  onClose() {
    this.close.emit();
  }
}
