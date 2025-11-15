import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { SocialIconsComponent } from '@components/social-icons/social-icons.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, NgIcon, SocialIconsComponent],
  templateUrl: './home-hero.component.html'
})
export class HomeHeroComponent {}
