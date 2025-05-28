import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutFeatureComponent } from '@features/about/about.feature';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutFeatureComponent
  ],
  template: `<app-about-feature />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPage {
  // Logic moved to HomeFeatureComponent
}
