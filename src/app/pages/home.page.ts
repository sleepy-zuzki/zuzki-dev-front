import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeFeatureComponent } from '@features/home/home.feature';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeFeatureComponent
  ],
  template: `<app-home-feature/>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
/**
 * Componente que representa la página de inicio (Home Page) de la aplicación.
 * Actúa como contenedor de layout para la característica de Home.
 */
export class HomePage {
  // Logic moved to HomeFeatureComponent
}
