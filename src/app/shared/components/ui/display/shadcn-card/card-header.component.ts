import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col space-y-1.5 p-6'
  }
})
export class CardHeaderComponent {}
