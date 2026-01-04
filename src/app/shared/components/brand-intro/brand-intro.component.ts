import { Component, HostBinding, OnInit, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-brand-intro',
  templateUrl: './brand-intro.component.html',
  styleUrls: ['./brand-intro.component.css'],
  standalone: true,
  imports: [
  ]
})
export class BrandIntroComponent implements OnInit {
  @HostBinding('class.fade-out') isFadingOut = false;
  readonly animationDone: OutputEmitterRef<void> = output<void>();

  ngOnInit() {
    setTimeout(() => {
      this.isFadingOut = true;
      this.animationDone.emit();
    }, 3000);
  }
}
