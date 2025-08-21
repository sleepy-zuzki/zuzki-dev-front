import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex items-center p-6 pt-0'
  }
})
export class CardFooterComponent {}
