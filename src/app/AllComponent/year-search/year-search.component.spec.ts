import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSearchComponent } from './year-search.component';

describe('YearSearchComponent', () => {
  let component: YearSearchComponent;
  let fixture: ComponentFixture<YearSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
