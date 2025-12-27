import { Component, input } from '@angular/core';

import { ServiceCard, ServiceCardComponent } from '@shared/components/service-card/service-card.component';

@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './home-services.component.html'
})
export class HomeServicesComponent {
  services = input<ServiceCard[]>([]);

  // SEO: encabezado y descripción personalizables
  heading = input('Servicios');
  description = input('Soluciones personalizadas que transforman tu presencia digital');

  // SEO/A11y: id del encabezado para aria-labelledby
  headingId = input('services-heading');
}