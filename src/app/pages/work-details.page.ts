import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkDetailsComponent } from '@features/works/details/work-details.component';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [
    WorkDetailsComponent
  ],
  template: `<app-work-detail-feature />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkDetailsPage {
}
