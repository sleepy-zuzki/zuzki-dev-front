import { Component, Input } from '@angular/core';

import { ServiceCard, ServiceCardComponent } from '@shared/components/service-card/service-card.component';

@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './home-services.component.html'
})
export class HomeServicesComponent {
  @Input() services: ServiceCard[] = [];

  // SEO: encabezado y descripción personalizables
  @Input() heading: string = 'Servicios';
  @Input() description: string = 'Soluciones personalizadas que transforman tu presencia digital';

  // SEO/A11y: id del encabezado para aria-labelledby
  @Input() headingId: string = 'services-heading';
}
