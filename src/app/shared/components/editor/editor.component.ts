import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  input,
  viewChild,
  ViewEncapsulation,
  InputSignal,
  Signal
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

// Importamos solo los TIPOS para evitar que se incluyan en el bundle inicial
import type EditorJS from '@editorjs/editorjs';
import type { API, BlockToolConstructable, OutputData } from '@editorjs/editorjs';

// Estos plugins suelen ser ligeros, pero podrías cargarlos dinámicamente si fuera necesario
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import createGenericInlineTool from 'editorjs-inline-tool';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
class EditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  // Inputs usando la API de Signals de Angular 21
  label: InputSignal<string> = input<string>('');
  id: InputSignal<string> = input<string>('');
  placeholder: InputSignal<string> = input<string>('Escribe tu historia...');
  readOnly: InputSignal<boolean> = input<boolean>(false);

  // ViewChild usando Signal Queries
  editorContainer: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('editorContainer');

  private platformId = inject(PLATFORM_ID);
  public ngControl: NgControl | null = inject(NgControl, { optional: true, self: true });

  private editorInstance: EditorJS | null = null;
  private onChange: (value: OutputData | null) => void = () => {};
  private onTouched: () => void = () => {};

  private initialValue: OutputData | null = null;
  private isReady = false;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initEditor();
    }
  }

  private async initEditor(): Promise<void> {
    try {
      // Importación dinámica real para optimizar chunks y SSR
      const EditorJSModule = (await import('@editorjs/editorjs')).default;

      if (!this.editorContainer()) return;

      this.editorInstance = new EditorJSModule({
        holder: this.editorContainer().nativeElement,
        placeholder: this.placeholder(),
        readOnly: this.readOnly(),
        data: this.initialValue || undefined,
        onChange: async (api: API): Promise<void> => {
          const data = await api.saver.save();
          this.onChange(data);
        },
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
              placeholder: 'Escribe un encabezado...',
            },
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph as unknown as BlockToolConstructable,
            inlineToolbar: true,
          },
          bold: {
            class: createGenericInlineTool({
              sanitize: {
                strong: {},
              },
              shortcut: 'CMD+B',
              tagName: 'STRONG',
              toolboxIcon:
                '<svg class="icon icon--bold" width="12px" height="14px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bold"></use></svg>',
            })
          },
          list: {
            class: List as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
        }
      });

      await this.editorInstance.isReady;
      this.isReady = true;

      // Sincronizar estado de deshabilitado si cambió antes de estar listo
      if (this.readOnly()) {
         this.editorInstance.readOnly.toggle(true);
      }

    } catch (error) {
      console.error('Error al inicializar EditorJS:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.editorInstance && typeof this.editorInstance.destroy === 'function') {
      this.editorInstance.destroy();
      this.editorInstance = null;
    }
  }

  get isInvalid(): boolean {
    return !!(this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched));
  }

  // --- Implementación de ControlValueAccessor ---

  writeValue(value: OutputData | string | null): void {
    let parsedValue: OutputData | null = null;

    if (value) {
      if (typeof value === 'string') {
        try {
          parsedValue = JSON.parse(value);
        } catch {
          parsedValue = {
            blocks: [{ type: 'paragraph', data: { text: value } }]
          };
        }
      } else {
        parsedValue = value;
      }
    }

    if (this.isReady && this.editorInstance) {
      if (parsedValue) {
        this.editorInstance.render(parsedValue);
      } else {
        this.editorInstance.clear();
      }
    } else {
      this.initialValue = parsedValue;
    }
  }

  registerOnChange(fn: (value: OutputData | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.isReady && this.editorInstance) {
      this.editorInstance.readOnly.toggle(isDisabled);
    }
  }
}

export default EditorComponent;
