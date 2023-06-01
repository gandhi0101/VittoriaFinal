import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintelefonoComponent } from './logintelefono.component';

describe('LogintelefonoComponent', () => {
  let component: LogintelefonoComponent;
  let fixture: ComponentFixture<LogintelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogintelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogintelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
