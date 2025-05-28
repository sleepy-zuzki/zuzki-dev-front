import { Component, Input } from '@angular/core';

@Component({
  selector: 'responsive-img',
  templateUrl: './responsive-img.component.html',
  styleUrls: ['./responsive-img.component.css'],
})
export class ResponsiveImgComponent {
  @Input() name!: string; // Sin extensión
  @Input() alt: string = '';
  @Input() sizes: string = '(max-width: 640px) 100vw, 640px';
  @Input() cdnBaseUrl: string = 'https://cdn.zuzki.dev/images'; // Tu bucket R2 público
  @Input() widths: number[] = [320, 460, 768, 1280, 1920];

  get srcset(): string {
    return this.widths
    .map(w => `${this.cdnBaseUrl}/${this.name}-${w}.webp ${w}w`)
    .join(', ');
  }

  get fallbackSrc(): string {
    return `${this.cdnBaseUrl}/${this.name}-${this.widths[1]}.webp`; // Fallback: tamaño medio
  }
}
