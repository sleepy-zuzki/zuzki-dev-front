import { FormControl } from '@angular/forms';

export interface CreateProjectForm {
  name: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string | null>;
  repoUrl: FormControl<string | null>;
  liveUrl: FormControl<string | null>;
  category: FormControl<string | null>;
  year: FormControl<number | null>;
  isFeatured: FormControl<boolean>;
  technologyIds: FormControl<number[]>;
  previewImageId: FormControl<number | null>;
}

export interface UpdateProjectForm extends CreateProjectForm {}
