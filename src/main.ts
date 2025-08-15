import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@src/app.config';
import { AppComponent } from '@src/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
