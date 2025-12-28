import { Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import type { OutputData } from '@editorjs/editorjs';

@Component({
  selector: 'app-editor-renderer',
  standalone: true,
  templateUrl: './editor-renderer.component.html',
  styleUrls: ['./editor-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorRendererComponent {
  /**
   * Datos provenientes de EditorJS
   */
  data: InputSignal<OutputData | null | undefined> = input<OutputData | null | undefined>(null);

  /**
   * Permite añadir clases extra al contenedor
   */
  customClass: InputSignal<string> = input<string>('');
}
