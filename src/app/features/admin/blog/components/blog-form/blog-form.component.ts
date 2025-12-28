import { Component, input, InputSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppInputComponent } from '@shared/components/input/app-input.component';
import EditorComponent from '@shared/components/editor/editor.component';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppInputComponent,
    EditorComponent
  ],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent {
  form: InputSignal<FormGroup> = input.required<FormGroup>();
}
