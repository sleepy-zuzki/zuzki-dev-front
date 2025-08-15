import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(ToggleComponent);
    const component = fixture.componentInstance;
    component.id = 'tgl-a11y';
    component.label = 'Activar opción';
    component.checked = false;
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
