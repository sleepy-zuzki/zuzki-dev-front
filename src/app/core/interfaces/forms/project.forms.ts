import { FormControl } from '@angular/forms';
import type { OutputData } from '@editorjs/editorjs';

export interface CreateProjectForm {
  title: FormControl<string>;
  slug: FormControl<string>;
  description: FormControl<string | null>;
  content: FormControl<OutputData | null>;
  repoUrl: FormControl<string | null>;
  liveUrl: FormControl<string | null>;
  areaId: FormControl<string>;
  year: FormControl<number | null>;
  isFeatured: FormControl<boolean>;
  technologyIds: FormControl<string[]>;
}

export type UpdateProjectForm = CreateProjectForm;
