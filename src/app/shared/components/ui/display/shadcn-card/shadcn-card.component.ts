import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shadcn-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'rounded-lg border bg-card text-card-foreground shadow-sm'
  }
})
export class ShadcnCardComponent {}
