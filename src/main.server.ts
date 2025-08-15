import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@src/app.component';
import { config } from '@src/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
