import { FormControl } from '@angular/forms';

// Simplificado para coincidir con la API
export type CreateTechnologyForm = {
  name: FormControl<string>;
  slug: FormControl<string>;
  website: FormControl<string | null>;
};
