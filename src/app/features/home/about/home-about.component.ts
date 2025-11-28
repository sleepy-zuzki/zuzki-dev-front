import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AboutTimelineComponent } from './components/about-timeline/about-timeline.component';
import { AboutStackComponent } from './components/about-stack/about-stack.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherLayout, featherDatabase, featherServer, featherPenTool, featherMail, featherExternalLink } from '@ng-icons/feather-icons';

type Stat = { value: string; label: string };
type TimelineItem = { title: string; period: string; description: string; tags: string[] };
type KeyValue = { key: string; value: string };
type StackCategory = { name: string; tags: string[]; icon?: string; color?: string };

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [AboutTimelineComponent, AboutStackComponent, NgIcon],
  templateUrl: './home-about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ featherLayout, featherDatabase, featherServer, featherPenTool, featherMail, featherExternalLink })]
})
export class HomeAboutComponent {
  readonly stats: Stat[] = [
    { value: '4+', label: 'Años de experiencia' },
    { value: '10+', label: 'Proyectos en GitHub' },
    { value: '4', label: 'Áreas de especialización' },
    { value: '∞', label: 'Tazas de café' }
  ];

  readonly curiosities: string[] = [
    'Mi pasión por el gaming fue el detonante que me llevó a aprender a programar.',
    'Soy un desarrollador nocturno: mi máxima concentración es entre las 10 PM y las 3 AM.',
    'Una cafetera italiana es una pieza esencial de mi setup de desarrollo.',
    'Disfruto diseñando mis propios wallpapers y personalizando mi entorno de trabajo.'
  ];

  readonly timeline: TimelineItem[] = [
    {
      title: 'Ingeniero de Software',
      period: '2021 – Presente',
      description:
        'En mi rol actual, he aplicado y expandido mis habilidades en un entorno profesional, contribuyendo a proyectos de gran escala y especializándome en el desarrollo de aplicaciones web modernas con Angular.',
      tags: ['Angular', 'TypeScript', 'PHP', 'Arquitectura de Software']
    },
    {
      title: 'Aprendizaje Autodidacta Intensivo',
      period: '2020 – 2021',
      description:
        'Aprovechando el tiempo durante la pandemia, me sumergí de lleno en el ecosistema de JavaScript, aprendiendo React de forma autodidacta y preparando el terreno para mi primer trabajo en la industria.',
      tags: ['React', 'JavaScript', 'Autodidacta', 'Proyectos Personales']
    },
    {
      title: 'Inicio en la Universidad',
      period: '2015 – 2020',
      description:
        'Fue en la universidad donde tuve mi primer contacto con la programación. Allí adquirí las bases teóricas y el pensamiento lógico que fundamentan mi carrera como desarrollador.',
      tags: ['Ciencias de la Computación', 'Algoritmos', 'Estructura de Datos', 'Java']
    }
  ];

  readonly setup: KeyValue[] = [
    { key: 'Editor', value: 'Web Storm' },
    { key: 'Terminal', value: 'WSL 2 • Oh My Zsh' },
    { key: 'OS', value: 'Windows • Ubuntu' },
    { key: 'Juegos', value: 'Shooter Looters' },
    { key: 'Música', value: 'Nightcore 🎧' }
  ];

  readonly stack: StackCategory[] = [
    {
      name: 'Frontend',
      icon: 'featherLayout',
      color: '#8b5cf6',
      tags: ['React', 'Angular', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3']
    },
    {
      name: 'Backend',
      icon: 'featherDatabase',
      color: '#10b981',
      tags: ['Python', 'PostgreSQL', 'REST APIs', 'Django', 'Nest JS']
    },
    {
      name: 'DevOps',
      icon: 'featherServer',
      color: '#3b82f6',
      tags: ['Docker', 'AWS', 'Gitlab CI/CD', 'Cloudflare', 'Linux']
    },
    {
      name: 'Design',
      icon: 'featherPenTool',
      color: '#f43f5e',
      tags: ['Figma', 'Stitch', 'Photoshop', 'UI/UX', 'Prototyping', 'Diseño Web']
    }
  ];
}
