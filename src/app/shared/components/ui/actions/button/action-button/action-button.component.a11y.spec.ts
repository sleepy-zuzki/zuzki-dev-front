import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { ActionButtonComponent } from './action-button.component';

describe('ActionButtonComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonComponent]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(ActionButtonComponent);
    const component = fixture.componentInstance;
    component.ariaLabel = 'Ejecutar acción';
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
