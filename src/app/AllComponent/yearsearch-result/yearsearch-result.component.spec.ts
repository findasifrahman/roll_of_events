import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsearchResultComponent } from './yearsearch-result.component';

describe('YearsearchResultComponent', () => {
  let component: YearsearchResultComponent;
  let fixture: ComponentFixture<YearsearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
