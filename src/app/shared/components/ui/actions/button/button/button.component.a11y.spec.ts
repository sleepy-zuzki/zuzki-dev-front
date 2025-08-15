import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { ButtonComponent } from './button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ButtonComponent (a11y)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad (como enlace)', async () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    component.ariaLabel = 'Navegar a inicio';
    component.routerLink = '/';
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  it('no debe tener violaciones de accesibilidad (como botón de acción)', async () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    component.ariaLabel = 'Ejecutar acción';
    component.routerLink = null;
    component.href = null;
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
