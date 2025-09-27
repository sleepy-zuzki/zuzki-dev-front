import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from '@components/tags-list/tags-list.component';

type TimelineInputItem = {
  title: string;
  period: string;
  description: string;
  tags: string[];
};

@Component({
  selector: 'app-about-timeline',
  standalone: true,
  imports: [CommonModule, TagsListComponent],
  templateUrl: './about-timeline.component.html',
  styleUrl: './about-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutTimelineComponent {
  @Input({ required: true }) items: ReadonlyArray<TimelineInputItem> = [];
  @Input() heading = 'Mi Trayectoria';
}
