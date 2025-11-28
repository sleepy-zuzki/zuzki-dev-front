import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpAdapter } from '@infrastructure/adapters/secondary/auth/auth-http.adapter';

@Component({
  standalone: true,
  selector: 'app-login-feature',
  imports: [ReactiveFormsModule],
  templateUrl: './login.feature.html',
  styleUrl: './login.feature.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFeatureComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthHttpAdapter);

  // Conectar UI a las signals del adaptador (source of truth)
  loading = this.auth.loading;
  error = this.auth.error;

  constructor() {
    // Redirige cuando la autenticación se completa correctamente
    effect(() => {
      if (this.auth.isAuthenticated()) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get usernameInvalid(): boolean {
    const c = this.form.controls.username;
    return c.invalid && (c.dirty || c.touched);
  }

  get passwordInvalid(): boolean {
    const c = this.form.controls.password;
    return c.invalid && (c.dirty || c.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();
    this.auth.login({ email: username, password });
  }
}
