import { Component } from '@angular/core';
import { NotFoundFeatureComponent } from '@features/not-found/not-found.feature';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [NotFoundFeatureComponent],
  template: `<app-not-found-feature />`
})
export class NotFoundPage { }