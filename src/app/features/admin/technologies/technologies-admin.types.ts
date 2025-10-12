import { FormControl } from '@angular/forms';
import { TechnologyCategory } from '@core/domain';

export type CreateTechnologyForm = {
  name: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string | null>;
  category: FormControl<TechnologyCategory | null>;
  iconUrl: FormControl<string | null>;
  websiteUrl: FormControl<string | null>;
  color: FormControl<string | null>;
};
