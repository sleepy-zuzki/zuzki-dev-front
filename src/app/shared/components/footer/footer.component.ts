import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialIconsComponent } from '../social-icons/social-icons.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, SocialIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
