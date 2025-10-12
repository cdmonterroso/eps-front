import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCapacitacionesComponent } from './reporte-capacitaciones.component';

describe('ReporteCapacitacionesComponent', () => {
  let component: ReporteCapacitacionesComponent;
  let fixture: ComponentFixture<ReporteCapacitacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteCapacitacionesComponent]
    });
    fixture = TestBed.createComponent(ReporteCapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
