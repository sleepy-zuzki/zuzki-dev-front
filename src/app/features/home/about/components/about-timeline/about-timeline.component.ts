import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  imports: [TagsListComponent],
  templateUrl: './about-timeline.component.html',
  styleUrl: './about-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutTimelineComponent {
  items = input.required<ReadonlyArray<TimelineInputItem>>();
  heading = input('Mi Trayectoria');
}