import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent {
  @Input({ required: true }) tags: ReadonlyArray<string> = [];
  @Input() ariaLabel = 'Etiquetas';
}
