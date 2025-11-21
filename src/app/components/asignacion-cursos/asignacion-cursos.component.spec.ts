import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionCursosComponent } from './asignacion-cursos.component';

describe('AsignacionCursosComponent', () => {
  let component: AsignacionCursosComponent;
  let fixture: ComponentFixture<AsignacionCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionCursosComponent]
    });
    fixture = TestBed.createComponent(AsignacionCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
