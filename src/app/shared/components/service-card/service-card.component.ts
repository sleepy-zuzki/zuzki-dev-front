import { Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { NgClass } from '@angular/common';

export interface ServiceCard {
  icon: string;
  iconColor: 'purple' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'pink';
  title: string;
  description: string;
  features: string[];
  bgColorClass?: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [NgIconComponent, NgClass],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceCard;

  get iconColorClasses(): string {
    const colorMap = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colorMap[this.service.iconColor] || colorMap.purple;
  }
}
