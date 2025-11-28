import { Component, Input } from '@angular/core';


type SectionVariant = 'primary' | 'secondary' | 'muted' | 'transparent' | 'coffee';
type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html'
})
export class SectionComponent {
  @Input() variant: SectionVariant = 'primary';
  @Input() padding: SectionPadding = 'md';
  @Input() container = true;

  // Accesibilidad / anclaje
  @Input() id: string | null = null;
  @Input() ariaLabel: string | null = null;

  // Clases adicionales para el <section> host (ej. fondos, layouts personalizados)
  @Input() extraClasses: string | string[] = '';

  get hostClasses(): string {
    const base = ['w-full'];
    // Variante de superficie
    const surfaceMap: Record<SectionVariant, string> = {
      primary: 'surface-primary',
      secondary: 'surface-secondary',
      muted: 'surface-muted',
      transparent: 'bg-transparent',
      coffee: 'surface-coffee'
    };
    base.push(surfaceMap[this.variant]);

    // Paddings verticales
    const paddingMap: Record<SectionPadding, string> = {
      none: 'py-0',
      sm: 'py-6',
      md: 'py-10',
      lg: 'py-16'
    };
    base.push(paddingMap[this.padding]);

    // Clases extra para permitir fondos/layout sin wrappers
    const extras = Array.isArray(this.extraClasses) ? this.extraClasses.join(' ') : (this.extraClasses || '').trim();
    if (extras) base.push(extras);

    return base.join(' ');
  }
}
