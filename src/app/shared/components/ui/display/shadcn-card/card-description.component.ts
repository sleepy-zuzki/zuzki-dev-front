import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-description',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-sm text-muted-foreground'
  }
})
export class CardDescriptionComponent {}
