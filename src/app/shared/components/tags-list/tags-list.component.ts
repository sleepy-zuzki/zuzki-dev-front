import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';


@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent {
  tags = input.required<ReadonlyArray<string>>();
  ariaLabel = input('Etiquetas');
  clickable = input(false);

  tagClick = output<string>();
}