import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-not-found-feature',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './not-found.feature.html',
  styleUrl: './not-found.feature.css'
})
export class NotFoundFeatureComponent {
  private _router = inject(Router);

  goHome(): void {
    this._router.navigate(['/']);
  }
}
