import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { LocalStorageService } from '@services/local-storage.service';

describe('ThemeToggleComponent (a11y)', () => {
  const localStorageMock = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [{ provide: LocalStorageService, useValue: localStorageMock }]
    }).compileComponents();
  });

  it('no debe tener violaciones de accesibilidad', async () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();

    const results = await axe.run(fixture.nativeElement as HTMLElement);
    expect(results.violations).withContext(JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
