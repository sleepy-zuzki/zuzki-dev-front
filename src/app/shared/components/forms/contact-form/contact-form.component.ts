import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
      return;
    }

    const payload = this.contactForm.getRawValue();
    this.loading = true;

    this.http.post('/contact', payload).subscribe({
      next: () => {
        console.info('Contacto enviado:', payload);
        this.contactForm.reset({ name: '', email: '', message: '' });
      },
      error: (error) => {
        console.error('Error al enviar el contacto:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
