import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisActividadesComponent } from './mis-actividades.component';

describe('MisActividadesComponent', () => {
  let component: MisActividadesComponent;
  let fixture: ComponentFixture<MisActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisActividadesComponent]
    });
    fixture = TestBed.createComponent(MisActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
