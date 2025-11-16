import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, finalize, throwError } from 'rxjs';
import { ApiConfig } from '@infrastructure/config/api.config';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  loading = false;
  private readonly apiConfig = inject(ApiConfig);
  private http = inject(HttpClient);
  private toast = inject(HotToastService);
  private cdr = inject(ChangeDetectorRef);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  contactForm = new FormGroup({
    name: new FormControl(this.contactData.name, {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    email: new FormControl(this.contactData.email, {
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl(this.contactData.message, {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
      nonNullable: true
    })
  });

  // Getters para simplificar la plantilla
  get name() { return this.contactForm.controls.name; }
  get email() { return this.contactForm.controls.email; }
  get message() { return this.contactForm.controls.message; }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.error('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.loading = true;
    const payload = this.contactForm.getRawValue();

    this.http.post(this.apiConfig.getFullUrl(this.apiConfig.endpoints.forms.contact), payload).pipe(
      catchError(err => {
        console.error('Error al enviar el contacto:', err);
        return throwError(() => new Error('Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.'));
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.toast.success('¡Gracias por tu mensaje! Te responderé pronto.');
        this.contactForm.reset({ name: '', email: '', message: '' });
      },
      error: (error) => {
        this.toast.error(error.message);
      }
    });
  }
}
