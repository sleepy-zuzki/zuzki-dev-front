import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFeatureComponent } from '../features/auth/login/login.feature';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [LoginFeatureComponent],
  template: `
    <app-login-feature />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
