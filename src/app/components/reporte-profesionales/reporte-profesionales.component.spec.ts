import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProfesionalesComponent } from './reporte-profesionales.component';

describe('ReporteProfesionalesComponent', () => {
  let component: ReporteProfesionalesComponent;
  let fixture: ComponentFixture<ReporteProfesionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteProfesionalesComponent]
    });
    fixture = TestBed.createComponent(ReporteProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
