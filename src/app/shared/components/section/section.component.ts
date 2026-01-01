import { Component, computed, input } from '@angular/core';


type SectionVariant = 'base' | 'raised' | 'overlay' | 'transparent' | 'coffee';
type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  variant = input<SectionVariant>('base');
  padding = input<SectionPadding>('md');
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

    // Paddings verticales
    const paddingMap: Record<SectionPadding, string> = {
      none: 'py-0',
      sm: 'py-6',
      md: 'py-10',
      lg: 'py-16'
    };
    base.push(paddingMap[this.padding()]);

    // Clases extra para permitir fondos/layout sin wrappers
    const extras = Array.isArray(this.extraClasses()) ? (this.extraClasses() as string[]).join(' ') : (this.extraClasses() as string || '').trim();
    if (extras) base.push(extras);

    return base.join(' ');
  });
}