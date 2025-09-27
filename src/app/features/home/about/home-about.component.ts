import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutTimelineComponent } from './components/about-timeline/about-timeline.component';
import { AboutStackComponent } from './components/about-stack/about-stack.component';
import { provideIcons } from '@ng-icons/core';
import { featherLayout, featherDatabase, featherServer, featherPenTool } from '@ng-icons/feather-icons';
type Stat = { value: string; label: string };
type TimelineItem = { title: string; period: string; description: string; tags: string[] };
type KeyValue = { key: string; value: string };
type StackCategory = { name: string; tags: string[]; icon?: string; color?: string };

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [CommonModule, AboutTimelineComponent, AboutStackComponent],
  templateUrl: './home-about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ featherLayout, featherDatabase, featherServer, featherPenTool })]
})
export class HomeAboutComponent {
  readonly stats: Stat[] = [
    { value: '25+', label: 'Proyectos Completados' },
    { value: '3+', label: 'Años de Experiencia' },
    { value: '15+', label: 'Tecnologías Dominadas' },
    { value: '∞', label: 'Tazas de Café' }
  ];

  readonly curiosities: string[] = [
    'Gamer desde los 8 años – me inspiró a programar',
    'Trabajo mejor entre 10 PM y 3 AM',
    'Mi setup incluye una cafetera italiana',
    'Diseño mis propios wallpapers y setups'
  ];

  readonly timeline: TimelineItem[] = [
    {
      title: 'Ingeniero de Software Senior',
      period: '2022 – Presente',
      description:
        'Desarrollo full‑stack con React, Node.js y Python. Liderazgo técnico en proyectos complejos.',
      tags: ['React', 'Node.js', 'AWS']
    },
    {
      title: 'Desarrollador Full‑Stack',
      period: '2020 – 2022',
      description:
        'Freelance y proyectos diversos. Desde landing pages hasta aplicaciones complejas.',
      tags: ['JavaScript', 'PHP', 'MySQL']
    },
    {
      title: 'Primeros Pasos',
      period: '2018 – 2020',
      description:
        'Aprendizaje autodidacta, primeros proyectos personales y descubrimiento de mi pasión.',
      tags: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  readonly setup: KeyValue[] = [
    { key: 'Editor', value: 'VS Code • Vim motions' },
    { key: 'Terminal', value: 'iTerm2 • Oh My Zsh' },
    { key: 'OS', value: 'macOS • Ubuntu' },
    { key: 'Café', value: 'Espresso doble' },
    { key: 'Música', value: 'Lo‑fi hip hop 🎧' }
  ];

  readonly stack: StackCategory[] = [
    {
      name: 'Frontend',
      icon: 'featherLayout',
      color: '#8b5cf6',
      tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3']
    },
    {
      name: 'Backend',
      icon: 'featherDatabase',
      color: '#10b981',
      tags: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs']
    },
    {
      name: 'DevOps',
      icon: 'featherServer',
      color: '#3b82f6',
      tags: ['Docker', 'AWS', 'GCP', 'GitHub Actions', 'Vercel', 'Linux']
    },
    {
      name: 'Design',
      icon: 'featherPenTool',
      color: '#f43f5e',
      tags: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Prototyping', 'Wireframing']
    }
  ];
}
