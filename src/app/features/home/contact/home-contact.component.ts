import { Component } from '@angular/core';

import { ContactFormComponent } from '@components/forms/contact-form/contact-form.component';
import { SocialIconsComponent } from '@components/social-icons/social-icons.component';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [ContactFormComponent, SocialIconsComponent],
  templateUrl: './home-contact.component.html'
})
export class HomeContactComponent {}
