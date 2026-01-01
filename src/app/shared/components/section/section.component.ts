import { Component, computed, input } from '@angular/core';


type SectionVariant = 'base' | 'raised' | 'overlay' | 'transparent' | 'coffee';
type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  variant = input<SectionVariant>('base');
  
  // Granular padding control
  paddingY = input<SectionSpacing>('md');
  paddingX = input<SectionSpacing>('none');

  container = input(true);

  // Accesibilidad / anclaje
  id = input<string | null>(null);
  ariaLabel = input<string | null>(null);

  // Clases adicionales para el <section> host (ej. fondos, layouts personalizados)
  extraClasses = input<string | string[]>('');

  hostClasses = computed(() => {
    const base = ['w-full'];
    // Variante de superficie
    const surfaceMap: Record<SectionVariant, string> = {
      base: 'bg-canvas',
      raised: 'bg-surface-100',
      overlay: 'bg-surface-200',
      transparent: 'bg-transparent',
      coffee: 'bg-coffee-mix'
    };
    base.push(surfaceMap[this.variant()]);

    // Paddings
    const spacingMap: Record<SectionSpacing, string> = {
      none: '0',
      sm: '6', // 1.5rem
      md: '10', // 2.5rem
      lg: '16', // 4rem
      xl: '24'  // 6rem
    };

    if (this.paddingY() !== 'none') {
        base.push(`py-${spacingMap[this.paddingY()]}`);
    }
    
    if (this.paddingX() !== 'none') {
        base.push(`px-${spacingMap[this.paddingX()]}`);
    }

    // Clases extra para permitir fondos/layout sin wrappers
    const extras = Array.isArray(this.extraClasses()) ? (this.extraClasses() as string[]).join(' ') : (this.extraClasses() as string || '').trim();
    if (extras) base.push(extras);

    return base.join(' ');
  });
}