import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
  element = input<TextAs>('p', { alias: 'as' });
  variant = input<TextVariant>('base');
  align = input<Align>('left');
  extraClasses = input('');

  classes = computed(() => {
    const baseClass = 'typography-text';
    const alignClass = `typography-text--align-${this.align()}`;
    const variantClass = `typography-text--variant-${this.variant()}`;

    return [baseClass, alignClass, variantClass, this.extraClasses()].filter(Boolean).join(' ');
  });
}