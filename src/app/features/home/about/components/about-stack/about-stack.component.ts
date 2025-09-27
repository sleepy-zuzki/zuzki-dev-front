import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

type StackCategory = {
  name: string;
  tags: string[];
  icon?: string;  // nombre del ícono (proveído por el padre vía provideIcons)
  color?: string; // color de acento para icono y hover de tags (e.g. "#8b5cf6")
};

@Component({
  selector: 'app-about-stack',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './about-stack.component.html',
  styleUrl: './about-stack.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutStackComponent {
  @Input({ required: true }) categories: ReadonlyArray<StackCategory> = [];
  @Input() heading = 'Stack Tecnológico';
  @Input() subheading = 'Las herramientas que uso para dar vida a las ideas';
}
