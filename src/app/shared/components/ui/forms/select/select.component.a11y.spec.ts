import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { SelectComponent, SelectOption } from './select.component';

describe('SelectComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(SelectComponent);
    const component = fixture.componentInstance;

    const options: SelectOption[] = [
      { value: '1', label: 'Uno' },
      { value: '2', label: 'Dos' }
    ];
    component.id = 'select-a11y';
    component.label = 'Seleccione una opción';
    component.helperText = 'Texto de ayuda para el select';
    component.placeholder = 'Elige...';
    component.options = options;
    component.selectedValue = '1';

    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
