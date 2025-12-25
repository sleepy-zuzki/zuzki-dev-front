import { FormControl } from '@angular/forms';

export interface CreateProjectForm {
  title: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string | null>;
  content: FormControl<any>;
  repoUrl: FormControl<string | null>;
  liveUrl: FormControl<string | null>;
  areaId: FormControl<string>;
  year: FormControl<number | null>;
  isFeatured: FormControl<boolean>;
  technologyIds: FormControl<string[]>;
}

export type UpdateProjectForm = CreateProjectForm;
