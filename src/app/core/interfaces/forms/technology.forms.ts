import { FormControl } from '@angular/forms';

export interface CreateTechnologyForm {
  name: FormControl<string>;
  slug: FormControl<string>;
  website: FormControl<string | null>;
}
