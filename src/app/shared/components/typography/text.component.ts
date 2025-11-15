import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type TextAs = 'p' | 'span' | 'small' | 'div';
type TextVariant = 'base' | 'muted' | 'lead' | 'caption';
type Align = 'left' | 'center' | 'right';

@Component({
  standalone: true,
  selector: 'app-typography-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyTextComponent {
  @Input() as: TextAs = 'p';
  @Input() variant: TextVariant = 'base';
  @Input() align: Align = 'left';
  @Input() extraClasses = '';

  get classes(): string {
    const baseClass = 'typography-text';
    const alignClass = `typography-text--align-${this.align}`;
    const variantClass = `typography-text--variant-${this.variant}`;

    return [baseClass, alignClass, variantClass, this.extraClasses].filter(Boolean).join(' ');
  }
}
