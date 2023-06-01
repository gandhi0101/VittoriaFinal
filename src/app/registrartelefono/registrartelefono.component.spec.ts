import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrartelefonoComponent } from './registrartelefono.component';

describe('RegistrartelefonoComponent', () => {
  let component: RegistrartelefonoComponent;
  let fixture: ComponentFixture<RegistrartelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrartelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrartelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
