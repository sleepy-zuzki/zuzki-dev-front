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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyTextComponent {
  @Input() as: TextAs = 'p';
  @Input() variant: TextVariant = 'base';
  @Input() align: Align = 'left';
  @Input() extraClasses = '';

  get classes(): string {
    const align =
      this.align === 'center' ? 'text-center' :
      this.align === 'right' ? 'text-right' : 'text-left';

    const variant =
      this.variant === 'muted' ? 'text-gray-500 dark:text-gray-400' :
      this.variant === 'lead' ? 'text-lg text-gray-600 dark:text-gray-300' :
      this.variant === 'caption' ? 'text-xs text-gray-500 dark:text-gray-400' :
      'text-gray-700 dark:text-gray-300';

    return [align, variant, 'antialiased', this.extraClasses].filter(Boolean).join(' ');
  }
}
