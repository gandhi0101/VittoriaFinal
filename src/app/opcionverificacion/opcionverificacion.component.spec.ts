import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionverificacionComponent } from './opcionverificacion.component';

describe('OpcionverificacionComponent', () => {
  let component: OpcionverificacionComponent;
  let fixture: ComponentFixture<OpcionverificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionverificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionverificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
