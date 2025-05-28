import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '@components/ui';
import { Overlay } from '@core/models/overlay.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCardComponent {
  @Input({ required: true }) project: Overlay = new Overlay();
  @Input() buttonText: string | null = null;
  @Input() variant: 'elongated' | 'square' = 'elongated';
  @Input() showDescription: boolean = true;

  @HostBinding('class') get hostClasses(): string {
    return `project-card-${this.variant}`;
  }
}
