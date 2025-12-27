import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type TitleVariant = 'page' | 'section' | 'subsection' | 'card';
type Align = 'left' | 'center' | 'right';

@Component({
  standalone: true,
  selector: 'app-typography-title',
  imports: [CommonModule],
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyTitleComponent {
  id = input<string>();
  level = input<1 | 2 | 3 | 4 | 5 | 6>(2);
  variant = input<TitleVariant>('section');
  align = input<Align>('left');
  extraClasses = input('');

  classes = computed(() => {
    const base = 'font-semibold tracking-tight';
    const color = 'text-gray-900 dark:text-gray-100';
    const align =
      this.align() === 'center' ? 'text-center' :
      this.align() === 'right' ? 'text-right' : 'text-left';
    const size =
      this.variant() === 'page' ? 'text-3xl md:text-4xl' :
      this.variant() === 'section' ? 'text-2xl md:text-3xl' :
      this.variant() === 'subsection' ? 'text-xl md:text-2xl' :
      'text-lg';
    return [base, color, align, size, this.extraClasses()].filter(Boolean).join(' ');
  });
}