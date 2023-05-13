import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDatesComponent } from './search-dates.component';

describe('SearchDatesComponent', () => {
  let component: SearchDatesComponent;
  let fixture: ComponentFixture<SearchDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
