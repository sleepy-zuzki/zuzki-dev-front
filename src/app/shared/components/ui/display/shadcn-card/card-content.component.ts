import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-6 pt-0'
  }
})
export class CardContentComponent {}
