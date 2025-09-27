import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ContactFormComponent } from '@components/forms/contact-form/contact-form.component';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [CommonModule, NgIcon, ContactFormComponent],
  templateUrl: './home-contact.component.html'
})
export class HomeContactComponent {}
