import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() withBorder: boolean = false;
  @Input() withShadow: boolean = true;
  @Input() withHoverEffect: boolean = false;
  @Input() variant: 'primary' | 'surface' | 'accent' = 'surface';

  // Propiedades para imagen
  @Input() imageUrl?: string;
  @Input() imageAlt: string = 'Card image';
  @Input() imageMaxHeight: string = '200px';

  // Content checks
  @Input() hasHeaderContent: boolean = false;
  @Input() hasFooterContent: boolean = false;
}
