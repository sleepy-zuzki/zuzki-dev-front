import { Component, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // Para que los estilos afecten al contenido proyectado si es necesario
  host: {
    'class': 'app-card',
    '[class.app-card--interactive]': 'interactive()'
  }
})
export class CardComponent {
  interactive = input(false);
}
