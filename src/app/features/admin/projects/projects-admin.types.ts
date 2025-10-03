import { FormControl } from '@angular/forms';
import { ProjectStatus } from '@core/domain';

export type CreateProjectForm = {
  name: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string>;
  longDescription: FormControl<string>;
  demoUrl: FormControl<string>;
  repositoryUrl: FormControl<string>;
  status: FormControl<ProjectStatus | ''>;
  technologyIds: FormControl<string>;
};
