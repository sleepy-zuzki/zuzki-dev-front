import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorksFeature } from '@features/works/works.feature';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    WorksFeature
  ],
  template: `<app-works-feature />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorksPage {
}
