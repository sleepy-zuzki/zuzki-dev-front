import { FormControl } from '@angular/forms';

export interface CreateTechnologyForm {
  name: FormControl<string>;
  slug: FormControl<string>;
  websiteUrl: FormControl<string | null>;
  areaId: FormControl<string>;
  docsUrl: FormControl<string | null>;
  iconClass: FormControl<string | null>;
  primaryColor: FormControl<string | null>;
}