import { Component, HostBinding, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-brand-intro',
  templateUrl: './brand-intro.component.html',
  styleUrls: ['./brand-intro.component.css'],
  standalone: true,
  imports: [
    NgOptimizedImage
  ]
})
export class BrandIntroComponent implements OnInit {
  @HostBinding('class.fade-out') isFadingOut = false;

  ngOnInit() {
    setTimeout(() => {
      this.isFadingOut = true;
    }, 2000); // Start fading out after 2 seconds
  }
}
