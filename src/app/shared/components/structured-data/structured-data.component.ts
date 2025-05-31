import { Component, Input, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-structured-data',
  template: '',
  standalone: true
})
export class StructuredDataComponent implements OnInit {
  @Input() schema!: Record<string, any> | Record<string, any>[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.schema) return;

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.schema);
    this.document.head.appendChild(script);
  }
}
