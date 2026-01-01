import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { SocialIconsComponent } from '@components/social-icons/social-icons.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [NgIcon, SocialIconsComponent, NgOptimizedImage],
  templateUrl: './home-hero.component.html'
})
export class HomeHeroComponent {}
