import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    component.id = 'chk-a11y';
    component.label = 'Aceptar términos';
    component.checked = false;
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
