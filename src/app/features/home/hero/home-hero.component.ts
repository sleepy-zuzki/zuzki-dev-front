import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './home-hero.component.html'
})
export class HomeHeroComponent {}
