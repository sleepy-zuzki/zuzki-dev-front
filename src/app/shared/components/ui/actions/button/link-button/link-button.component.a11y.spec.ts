import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { LinkButtonComponent } from './link-button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinkButtonComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkButtonComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(LinkButtonComponent);
    const component = fixture.componentInstance;
    component.ariaLabel = 'Ir al inicio';
    component.routerLink = '/';
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
