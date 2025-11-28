import { ChangeDetectionStrategy, Component, Input, output, OutputEmitterRef } from '@angular/core';


@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent {
  @Input({ required: true }) tags: ReadonlyArray<string> = [];
  @Input() ariaLabel = 'Etiquetas';
  @Input() clickable = false;

  tagClick: OutputEmitterRef<string> = output<string>();
}
