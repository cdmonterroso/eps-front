import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActividadComponent } from './detalle-actividad.component';

describe('DetalleActividadComponent', () => {
  let component: DetalleActividadComponent;
  let fixture: ComponentFixture<DetalleActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleActividadComponent]
    });
    fixture = TestBed.createComponent(DetalleActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
